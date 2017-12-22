import * as R from 'ramda';

export const capitalize =
  R.compose(R.join(''), R.adjust(R.toUpper, 0));

export const camelCase =
  R.compose(R.join(''),
            R.map(capitalize),
            R.split('-'));
