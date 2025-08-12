// Reference: https://github.com/fsd-course-hw/8-redux-mobx/blob/teacher-solution/src/features/dnd-board/model/board.store/index.ts
import { registerSlice } from '@/shared/lib/redux';

import * as selectors from './selectors';
import { cardsSlice } from './slice';
import * as thunks from './thunks';

registerSlice([cardsSlice]);

export const cardsStore = {
  selectors: selectors,
  actions: {
    ...cardsSlice.actions,
  },
  thunks: thunks,
};
