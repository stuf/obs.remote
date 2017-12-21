import * as t from 'tcomb';

export const Status = t.struct({
  type: t.String,
  description: t.String
});
