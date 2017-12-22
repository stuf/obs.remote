import { constant, stream, fromCallback } from 'kefir';
import * as R from 'ramda';
import * as L from 'partial.lenses';
import WebSocket from 'ws';

const defaultHost = 'localhost:4444';

const mkWebSocket1 = R.constructN(1, WebSocket);
const mkWebSocket2 = R.constructN(2, WebSocket);
const mkWebSocket3 = R.constructN(3, WebSocket);

const hostIn = L.get(['address',
                      L.defaults(defaultHost),
                      L.reread(x => `ws://${x}`)]);

export const createSocket = opts => constant(mkWebSocket1(hostIn(opts)));
export const on = (event, socket) => fromCallback(cb => socket.on(event, cb));
export const listenTo = (eventName, socket) => socket.flatMapLatest(x => on(eventName, x));
export const listenFrom = e => listenTo(e, ws);


