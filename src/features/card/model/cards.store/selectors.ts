import { createBaseSelector } from '@/shared/lib/redux';

import { cardsSlice } from './slice';

export const cardsBaseSelector = createBaseSelector(cardsSlice);
