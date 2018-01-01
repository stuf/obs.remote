import { constant, Observable } from 'kefir';
import * as R from 'ramda';

// Functions

export const seq = (x, ...fns) => R.pipe(...fns)(x);

// String manipulation

export const capitalize =
  R.compose(R.join(''), R.adjust(R.toUpper, 0));

export const camelCase =
  R.compose(R.join(''),
            R.adjust(R.toLower, 0),
            R.map(capitalize),
            R.split('-'));

// Kefir

export const toConstant = x => x instanceof Observable ? x : constant(x);
export const startWith = R.curryN(2, (x, o) => toConstant(o).toProperty(() => x));

export const set = R.curry((a, x) => a.set(x));
