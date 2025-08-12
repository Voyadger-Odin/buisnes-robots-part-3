'use client';

import { useEffect, useState } from 'react';
import { CardBody, CardEdit, TImgPosition } from '@/features/card';
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux';
import { cardsStore } from '@/features/card/model/cards.store';

export const MainPage = () => {
  const dispatch = useAppDispatch();

  const cards = useAppSelector(cardsStore.selectors.cardsBaseSelector);

  const [counter, setCounter] = useState<number | string>('');

  const handleEditOpen = (cardId: number, open: boolean) => {
    dispatch(
      cardsStore.thunks.setCardEdit({
        cardId: cardId,
        edit: open,
      }),
    );
  };

  const handleCardRollback = (cardId: number) => {
    dispatch(
      cardsStore.thunks.setCardRollback({
        cardId: cardId,
      }),
    );
  };

  const handleImgPositionChange = (
    cardId: number,
    imgPosition: TImgPosition,
  ) => {
    dispatch(
      cardsStore.thunks.setCardPosition({
        cardId: cardId,
        imgPosition: imgPosition as TImgPosition,
      }),
    );
  };

  const handleInputTitle = (cardId: number, title: string) => {
    dispatch(
      cardsStore.thunks.setCardTitle({
        cardId: cardId,
        title: title,
      }),
    );
  };

  const handleCounter = (value: string) => {
    setCounter(value);
    dispatch(
      cardsStore.thunks.setCardCounter({
        cardId: 1,
        counter: value,
      }),
    );
  };

  return (
    <div className={'flex flex-col items-center gap-10 p-10'}>
      <div className={'flex flex-col gap-10 w-fit'}>
        <div className={'flex flex-row gap-4'}>
          <input
            value={counter}
            onChange={(event) => {
              handleCounter(event.target.value);
            }}
            placeholder={'Counter'}
            className={'shadow h-[48px] p-4 rounded-2xl'}
          />
        </div>

        {cards?.cards && (
          <div className={'flex flex-row gap-10 w-fit'}>
            <div className={'flex flex-col gap-4'}>
              {Array.from({ length: 4 }, (_, i) => i).map((value) => {
                return (
                  cards?.cards && (
                    <CardEdit
                      key={cards.cards[value].id}
                      cardData={{ ...cards.cards[value] }}
                      onImgPositionChange={(imgPosition) => {
                        if (!cards.cards) {
                          return;
                        }

                        handleImgPositionChange(
                          cards.cards[value].id,
                          imgPosition as TImgPosition,
                        );
                      }}
                      onEditClose={() => {
                        if (!cards.cards) {
                          return;
                        }

                        handleCardRollback(cards.cards[value].id);
                        handleEditOpen(cards.cards[value].id, false);
                      }}
                      onEditSave={() => {
                        if (!cards.cards) {
                          return;
                        }

                        handleEditOpen(cards.cards[value].id, false);
                      }}
                    >
                      <CardBody
                        cardData={{ ...cards.cards[value] }}
                        onOpenEdit={() => {
                          if (!cards.cards) {
                            return;
                          }

                          handleEditOpen(cards.cards[value].id, true);
                        }}
                        onInputTitle={(title) => {
                          if (!cards.cards) {
                            return;
                          }

                          handleInputTitle(cards.cards[value].id, title);
                        }}
                      />
                    </CardEdit>
                  )
                );
              })}
            </div>

            <div className={'flex flex-col gap-4'}>
              {Array.from({ length: 4 }, (_, i) => i + 4).map((value) => {
                return (
                  cards?.cards && (
                    <CardEdit
                      key={cards.cards[value].id}
                      cardData={{ ...cards.cards[value] }}
                      onImgPositionChange={(imgPosition) => {
                        if (!cards.cards) {
                          return;
                        }

                        handleImgPositionChange(
                          cards.cards[value].id,
                          imgPosition as TImgPosition,
                        );
                      }}
                      onEditClose={() => {
                        if (!cards.cards) {
                          return;
                        }

                        handleCardRollback(cards.cards[value].id);
                        handleEditOpen(cards.cards[value].id, false);
                      }}
                      onEditSave={() => {
                        if (!cards.cards) {
                          return;
                        }

                        handleEditOpen(cards.cards[value].id, false);
                      }}
                    >
                      <CardBody
                        cardData={{ ...cards.cards[value] }}
                        onOpenEdit={() => {
                          if (!cards.cards) {
                            return;
                          }

                          handleEditOpen(cards.cards[value].id, true);
                        }}
                        onInputTitle={(title) => {
                          if (!cards.cards) {
                            return;
                          }

                          handleInputTitle(cards.cards[value].id, title);
                        }}
                      />
                    </CardEdit>
                  )
                );
              })}
            </div>

            <div className={'flex flex-col gap-4'}>
              {Array.from({ length: 2 }, (_, i) => i + 8).map((value) => {
                return (
                  cards?.cards && (
                    <CardEdit
                      key={cards.cards[value].id}
                      cardData={{ ...cards.cards[value] }}
                      onImgPositionChange={(imgPosition) => {
                        if (!cards.cards) {
                          return;
                        }

                        handleImgPositionChange(
                          cards.cards[value].id,
                          imgPosition as TImgPosition,
                        );
                      }}
                      onEditClose={() => {
                        if (!cards.cards) {
                          return;
                        }

                        handleCardRollback(cards.cards[value].id);
                        handleEditOpen(cards.cards[value].id, false);
                      }}
                      onEditSave={() => {
                        if (!cards.cards) {
                          return;
                        }

                        handleEditOpen(cards.cards[value].id, false);
                      }}
                    >
                      <CardBody
                        cardData={{ ...cards.cards[value] }}
                        onOpenEdit={() => {
                          if (!cards.cards) {
                            return;
                          }

                          handleEditOpen(cards.cards[value].id, true);
                        }}
                        onInputTitle={(title) => {
                          if (!cards.cards) {
                            return;
                          }

                          handleInputTitle(cards.cards[value].id, title);
                        }}
                      />
                    </CardEdit>
                  )
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
