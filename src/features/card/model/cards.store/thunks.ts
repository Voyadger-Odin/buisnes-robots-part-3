import { createAsyncThunk } from '@reduxjs/toolkit';
import { cardsSlice } from '@/features/card/model/cards.store/slice';
import { TImgPosition } from '@/features/card';

export const setCardPosition = createAsyncThunk(
  'cards-list/list',
  async (
    { cardId, imgPosition }: { cardId: number; imgPosition: TImgPosition },
    { dispatch },
  ) => {
    dispatch(
      cardsSlice.actions.setCardPosition({
        cardId: cardId,
        imgPosition: imgPosition,
      }),
    );
  },
);

export const setCardEdit = createAsyncThunk(
  'cards-list/list',
  async ({ cardId, edit }: { cardId: number; edit: boolean }, { dispatch }) => {
    dispatch(
      cardsSlice.actions.setCardEdit({
        cardId: cardId,
        edit: edit,
      }),
    );
  },
);

export const setCardTitle = createAsyncThunk(
  'cards-list/list',
  async (
    { cardId, title }: { cardId: number; title: string },
    { dispatch },
  ) => {
    dispatch(
      cardsSlice.actions.setCardTitle({
        cardId: cardId,
        title: title,
      }),
    );
  },
);

export const setCardRollback = createAsyncThunk(
  'cards-list/list',
  async ({ cardId }: { cardId: number }, { dispatch }) => {
    dispatch(
      cardsSlice.actions.setCardRollback({
        cardId: cardId,
      }),
    );
  },
);

export const setCardCounter = createAsyncThunk(
  'cards-list/list',
  async (
    { cardId, counter }: { cardId: number; counter: string },
    { dispatch },
  ) => {
    dispatch(
      cardsSlice.actions.setCardCounter({
        cardId: cardId,
        counter: counter,
      }),
    );
  },
);
