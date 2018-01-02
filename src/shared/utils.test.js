import * as R from 'ramda';
import * as L from 'partial.lenses';
import * as J from 'jsverify';
import { Observable } from 'kefir';

import * as H from './utils';

describe('shared/utils', () => {
  J.property('capitalize :: String -> String',
             J.constant('foobar'),
             x => {
               const r1 = R.join('', L.modify(0, R.toUpper, x));
               const r2 = H.capitalize(x);
               return r1 === r2;
             });

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

  J.property('toConstant :: a -> Observable a',
             J.oneof([J.nat, J.string, J.bool]),
             x => H.toConstant(x)
                   .toPromise()
                   .then(R.equals(x)));
});
