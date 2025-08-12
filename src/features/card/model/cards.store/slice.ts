import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICardsStore } from '@/features/card/model/types';
import { TImgPosition } from '@/features/card';

export const initialState: ICardsStore = {
  cards: [
    // Only text
    {
      id: 1,
      title: "Drinking water isn't just about quenching",
      imgPosition: 'onlyText',
      counter: 1,
    },
    {
      id: 2,
      title:
        "Drinking water isn't just about quenching your thirst. It plays a crucial role in about quenching bbbbbb\n",
      imgPosition: 'onlyText',
      counter: 10,
    },
    {
      id: 3,
      title:
        "Drinking water isn't just about quenching your thirst. It plays a crucial role in maintaining the proper functioning of your",
      imgPosition: 'onlyText',
      counter: '+10',
    },
    {
      id: 4,
      title:
        "Drinking water isn't just about quenching your thirst. It plays a crucial role in maintaining the proper functioning of your body, and staying properly hydrated is vital ",
      imgPosition: 'onlyText',
    },
    // Image left
    {
      id: 5,
      title: 'quenching your thirst. It plays a cru',
      img: './img1.jpg',
      imgPosition: 'left',
      counter: 10,
    },
    {
      id: 6,
      title:
        "Drinking water isn't just about quenching your thirst. It plays a cru bbb",
      img: './img1.jpg',
      imgPosition: 'left',
      counter: 10,
    },
    {
      id: 7,
      title:
        "Drinking water isn't just about quenching your thirst. It plays a crucial role in  in maintaining the a bbbbbbbbb",
      img: './img1.jpg',
      imgPosition: 'left',
      counter: 10,
    },
    {
      id: 8,
      title:
        "Drinking water isn't just about quenching your thirst. It plays a crucial role in maintaining the proper functioning of your body a bbbbbbbbb",
      img: './img1.jpg',
      imgPosition: 'left',
      counter: 10,
    },
    // Image vertical
    {
      id: 9,
      title:
        "Drinking water isn't just about quenching your thirst. It plays a crucial role in maintaining the proper functioning of your body a bbbbbbbbb",
      img: './img2.jpg',
      imgPosition: 'top',
      counter: 10,
    },
    {
      id: 10,
      title:
        "Drinking water isn't just about quenching your thirst. It plays a crucial role in maintaining the proper functioning of your body a bbbbbbbbb",
      img: './img3.jpg',
      imgPosition: 'bottom',
      counter: 10,
    },
  ],
  cardsEdit: [],
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCardPosition: (
      state,
      action: PayloadAction<{ cardId: number; imgPosition: TImgPosition }>,
    ) => {
      if (!state.cards) {
        state.cards = [];
      }

      const index = state.cards.findIndex(
        (item) => item.id === action.payload.cardId,
      );

      if (typeof index === 'number') {
        state.cards[index].imgPosition = action.payload.imgPosition;
      }
    },
    setCardEdit: (
      state,
      action: PayloadAction<{ cardId: number; edit: boolean }>,
    ) => {
      if (!state.cards) {
        state.cards = [];
      }
      if (!state.cardsEdit) {
        state.cardsEdit = [];
      }

      const index = state.cards.findIndex(
        (item) => item.id === action.payload.cardId,
      );

      if (typeof index === 'number') {
        state.cards[index].edit = action.payload.edit;

        if (action.payload.edit) {
          state.cardsEdit?.push({
            ...state.cards[index],
          });
        } else {
          state.cardsEdit = state.cardsEdit.filter(
            (card) => card.id !== action.payload.cardId,
          );
        }
      }
    },
    setCardRollback: (state, action: PayloadAction<{ cardId: number }>) => {
      if (!state.cards) {
        state.cards = [];
      }
      if (!state.cardsEdit) {
        state.cardsEdit = [];
      }

      const index = state.cards.findIndex(
        (item) => item.id === action.payload.cardId,
      );

      const indexSave = state.cardsEdit.findIndex(
        (item) => item.id === action.payload.cardId,
      );

      if (typeof index === 'number' && typeof indexSave === 'number') {
        state.cards[index] = state.cardsEdit[indexSave];
      }
    },
    setCardTitle: (
      state,
      action: PayloadAction<{ cardId: number; title: string }>,
    ) => {
      if (!state.cards) {
        state.cards = [];
      }

      const index = state.cards.findIndex(
        (item) => item.id === action.payload.cardId,
      );

      if (typeof index === 'number') {
        state.cards[index].title = action.payload.title;
      }
    },
    setCardCounter: (
      state,
      action: PayloadAction<{ cardId: number; counter: string }>,
    ) => {
      if (!state.cards) {
        state.cards = [];
      }

      const index = state.cards.findIndex(
        (item) => item.id === action.payload.cardId,
      );

      if (typeof index === 'number') {
        state.cards[index].counter = action.payload.counter;
      }
    },
  },
});
