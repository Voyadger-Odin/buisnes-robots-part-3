'use client';

import { CardBody, CardEdit, TImgPosition } from '@/features/card';
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux';
import { cardsStore } from '@/features/card/model/cards.store';
import { useEffect, useMemo, useState } from 'react';

export const MainPage = () => {
  const dispatch = useAppDispatch();

  const cards = useAppSelector(cardsStore.selectors.cardsBaseSelector);

  const [hoverCardId, setHoverCardId] = useState<number | undefined>(undefined);
  const [selectedCardsId, setSelectedCardsId] = useState(new Set());

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

  const isCurrentEdit = useMemo(() => {
    if (cards?.cards) {
      for (let i = 0; i < cards.cards.length; i++) {
        if (cards.cards[i].edit) {
          return true;
        }
      }
    }
    return false;
  }, [cards?.cards]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowUp': {
          const cardHoverIndex = cards?.cards?.findIndex(
            (card) => card.id === hoverCardId,
          );

          if (
            !isCurrentEdit &&
            cards?.cards &&
            typeof cardHoverIndex === 'number' &&
            cardHoverIndex > 0
          ) {
            setHoverCardId(cards.cards[cardHoverIndex - 1].id);
          }

          break;
        }
        case 'ArrowDown': {
          const cardHoverIndex = cards?.cards?.findIndex(
            (card) => card.id === hoverCardId,
          );

          if (
            !isCurrentEdit &&
            cards?.cards &&
            typeof cardHoverIndex === 'number' &&
            cardHoverIndex < cards.cards.length - 1
          ) {
            setHoverCardId(cards.cards[cardHoverIndex + 1].id);
          }

          break;
        }
        case 'Space': {
          const cardHover = cards?.cards?.find(
            (card) => card.id === hoverCardId,
          );

          if (cardHover && !isCurrentEdit) {
            event.preventDefault();

            setSelectedCardsId((prevState) => {
              const newSet = new Set(prevState);
              if (selectedCardsId.has(hoverCardId)) {
                newSet.delete(hoverCardId);
              } else {
                newSet.add(hoverCardId);
              }
              return newSet;
            });
          }
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hoverCardId, selectedCardsId]);

  return (
    <div className={'flex flex-col items-center gap-4 p-10'}>
      {cards?.cards && (
        <div className={'flex flex-col gap-4'}>
          {cards?.cards.map((card) => (
            <CardEdit
              key={card.id}
              cardData={card}
              onImgPositionChange={(imgPosition) => {
                handleImgPositionChange(card.id, imgPosition as TImgPosition);
              }}
              onEditClose={() => {
                handleCardRollback(card.id);
                handleEditOpen(card.id, false);
              }}
              onEditSave={() => {
                handleEditOpen(card.id, false);
              }}
            >
              <CardBody
                cardData={card}
                isHover={!isCurrentEdit && hoverCardId === card.id}
                isSelected={!isCurrentEdit && selectedCardsId.has(card.id)}
                onOpenEdit={() => {
                  handleEditOpen(card.id, true);
                }}
                onInputTitle={(title) => {
                  handleInputTitle(card.id, title);
                }}
                onMouseEnter={() => {
                  setHoverCardId(card.id);
                }}
                onMouseLeave={() => {
                  // setHoverCardId(undefined);
                }}
                onClick={() => {
                  if (!isCurrentEdit) {
                    setSelectedCardsId((prevState) => {
                      const newSet = new Set(prevState);
                      if (selectedCardsId.has(card.id)) {
                        newSet.delete(card.id);
                      } else {
                        newSet.add(card.id);
                      }
                      return newSet;
                    });
                  }
                }}
              />
            </CardEdit>
          ))}
        </div>
      )}
    </div>
  );
};
