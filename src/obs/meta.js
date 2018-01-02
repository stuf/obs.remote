import { lift1 } from 'kefir.combines';
import * as L from 'partial.lenses';

export const scenesIn = lift1(L.get('scenes'));
