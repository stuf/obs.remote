import * as R from 'ramda';
import * as J from 'jsverify';

import * as H from './utils';

describe('shared/utils', () => {
  J.property('camelCase :: String -> String',
              J.constant('foo-bar'),
              x => {
                const r1 = H.camelCase(x);
                const r2 = R.compose(R.join(''),
                                     R.adjust(R.toLower, 0),
                                     R.map(R.pipe(R.adjust(R.toUpper, 0), R.join(''))),
                                     R.split('-'))(x);

                return r1 === r2;
              });
});
