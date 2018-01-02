import * as U from 'karet.util';
import * as L from 'partial.lenses';

export const scenesIn = U.lift1(L.get('scenes'));
