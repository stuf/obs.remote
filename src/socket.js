import { stream } from 'kefir';
import Atom from 'kefir.atom';
import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';
import WebSocket from 'ws';
import Debug from 'debug';

const debug = Debug('obs.remote:socket');

const defaultHost = 'localhost:4444';

const hostIn = L.get(['address',
                      L.defaults(defaultHost),
                      L.reread(x => `ws://${x}`)]);

//

export const newSocketState = args => {
  debug('Create new socket state object');
  const state = Atom();
  const _args = hostIn(args);
  const socket = new WebSocket(_args);

  return {
    state,
    socket,
    connected: state.view('connected')
  };
};

export const listenToEvent = socket => type => {
  return stream(emitter => {
    debug('Attaching listener to event `%s`', type);

    const eventCb = data => {
      emitter.emit(data);
    };

    socket.on(type, eventCb);
  });
};

//

let requestCounter = 0;

const getRequestId = () => String(requestCounter++);

const getObsMessageName = id => `obs:internal:message-${id}`;

export const send = (socket, type, args = {}) => {
  const id = getObsMessageName(getRequestId());

  const listen = listenToEvent(socket);

  const socketArgs =
    L.set(L.pick({ id: 'message-id', type: 'request-type' }),
          { id, type },
          args);

  debug('Send request to socket');
  socket.send(JSON.stringify(socketArgs));

  debug('Return filtered stream for message with ID %s', id);

  return U.seq(listen('message'),
               U.template,
               U.lift1(JSON.parse),
               U.skipUnless(R.whereEq({ 'message-id': id })),
               U.takeFirst(1));
};
