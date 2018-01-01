import K from 'kefir.combines';
import * as R from 'ramda';
import * as L from 'partial.lenses';
import * as S from './socket';

let requestCounter = 0;

const newMessageId = () => String(requestCounter++);

const getObsMessageName = id => `obs:internal:message-${id}`;

export const send = R.curry((socketA, requestType, args) => {
  const msgId = newMessageId();

  const socketArgs =
    L.set(L.pick({ type: 'request-type', id: 'message-id' }),
          { type: requestType, id: msgId },
          args);

  return;
});

export const onEvent = name => {

};
