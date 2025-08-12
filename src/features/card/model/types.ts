import { CardProps } from '@/features/card';

export interface ICardsStore {
  cards?: TCard[];
  cardsEdit?: TCard[];
}

export type TCard = CardProps & {
  id: number;
};
