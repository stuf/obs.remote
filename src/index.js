import Debug from 'debug';

import * as M from './meta';
import * as s from './socket';
import { createStore } from './store';
import * as H from './shared/utils';

const debug = Debug('obs.remote:index');

//

debug('Get socket state object');
const { socket } = s.newSocketState();

//

debug('Create state atom');
const state = createStore();

state.log('state');

// Events

const listen = s.listenToEvent(socket);

const open$ = listen('open');

// Perform first-time fetching of data when connecting

open$.onValue(() => {
  debug('Socket connected.');
  debug('Getting initial data.');

  const resp = s.send(socket, 'GetSceneList');

  resp.onError(err => {
    debug('Got error', err);
  });

  const scenes = M.OBS.scenesIn(resp);

  scenes.onValue(H.set(M.scenesIn(state)));
});
