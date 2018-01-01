import { fromEvents } from 'kefir';
import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';
import Debug from 'debug';

import * as M from './meta';
import * as s from './socket';
import { createStore } from './store';
import * as H from './shared/utils';

const debug = Debug('obs.remote:index');

//

debug('Get socket state object');
const { socket, connected } = s.newSocketState();

//

debug('Create state atom');
const state = createStore();

state.log('state');

// Events

const listen = s.listenToEvent(socket);

const open$ = listen('open');
const message$ = listen('message');

// Perform first-time fetching of data when connecting

open$.onValue(v => {
  debug('Socket connected.');
  debug('Getting initial data.');

  const resp = s.send(socket, 'GetSceneList');

  const currentScene = M.OBS.currentSceneIn(resp);
  const scenes = M.OBS.scenesIn(resp);

  scenes.onValue(H.set(M.scenesIn(state)));
});
