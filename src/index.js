import { fromEvents } from 'kefir';
import * as socket from './socket';

const ws = socket.createSocket();

const listenFrom = e => socket.listenTo(e, ws);

const message$ = listenFrom('message').log('message$');
