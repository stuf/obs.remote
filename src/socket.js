import { constant, stream, fromCallback } from 'kefir';
import { lift, lift1 } from 'kefir.combines';
import Atom from 'kefir.atom';
import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';
import WebSocket from 'ws';
import Debug from 'debug';

const debug = Debug('obs.remote:socket');

const defaultHost = 'localhost:4444';

const mkWebSocket1 = R.constructN(1, WebSocket);
const mkWebSocket2 = R.constructN(2, WebSocket);
const mkWebSocket3 = R.constructN(3, WebSocket);

const onEvent1 = R.invoker(1, 'on');
const onEvent2 = R.invoker(2, 'on');

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
}

export const listenToEvent = socket => (type, id) => {
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
  return U.template(listen('message')).map(JSON.parse).filter(x => {
    const msgId = x['message-id'];
    debug('Filtering message %s with ID %s; %s', msgId, id, msgId === id);
    return msgId === id;
  }).take(1);
};
