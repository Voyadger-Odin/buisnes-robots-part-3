import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export interface CardProps {
  title: string;
  img?: string | StaticImport;
  imgPosition: TImgPosition;
  counter?: number | string;
  edit?: boolean;
}

export type TImgPosition = 'onlyText' | 'left' | 'top' | 'bottom';
