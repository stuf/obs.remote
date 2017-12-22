import * as t from 'tcomb';

export const StatusType =
  t.enums.of(['NOT_CONNECTED',
              'SOCKET_EXCEPTION',
              'AUTH_NOT_REQUIRED',
              'REQUEST_TYPE_NOT_SPECIFIED']);

export const Status =
  t.struct({
    type: t.String,
    description: t.String
  }, {
    name: 'Status',
    strict: true
  });
