import * as R from 'ramda';
import { makeJsverifyArbitrary, generateAndCheck } from 'tcomb-generate';

import * as models from './models';

const seq = (x, ...fns) => R.pipe(...fns)(x);

describe('shared/models', () => {
  seq(models,
      R.keys,
      R.forEach(m => test(m, generateAndCheck(models[m]))));
});

