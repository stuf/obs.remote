import * as J from 'jsverify';
import { makeJsverifyArbitrary, generateAndCheck } from 'tcomb-generate';

import * as models from './models';

describe('shared/models', () => {
  generateAndCheck(models.Status);
});
