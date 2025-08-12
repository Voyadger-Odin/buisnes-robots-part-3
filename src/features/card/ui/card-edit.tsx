import { CardProps } from '@/features/card/types/types';
import { cn } from '@/shared/lib/utils';
import { CloseIcon } from '@/shared/icons/CloseIcon';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { ImgBottomIcon } from '@/shared/icons/ImgBottomIcon';
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/toggle-group';
import { OnlyTextIcon } from '@/shared/icons/OnlyTextIcon';
import { ImgTopIcon } from '@/shared/icons/ImgTopIcon';
import { ImgLeftIcon } from '@/shared/icons/ImgLeftIcon';
import { ArrowIcon } from '@/shared/icons/ArrowIcon';

export const CardEdit = ({
  cardData,
  onImgPositionChange,
  onEditClose,
  onEditSave,
  children,
}: {
  cardData: CardProps;
  onImgPositionChange?: (imgPosition: string) => void;
  onEditClose: () => void;
  onEditSave: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        'shadow-[0_0_8px_#0000001A] rounded-[25px]',
      )}
    >
      {cardData.edit && (
        <div className={cn('flex flex-row items-center', 'mt-4 px-4')}>
          <div className={'cursor-pointer'} onClick={onEditClose}>
            <CloseIcon />
          </div>

          <div className={'flex-1'} />

          <div className={'flex flex-row gap-6 items-center max-h-[24px]'}>
            <Popover>
              <PopoverTrigger asChild>
                <div
                  className={cn(
                    'border-[0.5px] border-[#818181] rounded-[5px] w-6 h-6',
                    'flex items-center justify-center',
                    'cursor-pointer',
                  )}
                >
                  <ImgBottomIcon />
                </div>
              </PopoverTrigger>
              <PopoverContent
                align={'end'}
                side={'top'}
                className={'p-0 w-fit'}
              >
                <ToggleGroup
                  variant={'outline'}
                  type="single"
                  value={cardData.imgPosition}
                  onValueChange={onImgPositionChange}
                >
                  <ToggleGroupItem value="onlyText" className={'w-12 h-12 p-0'}>
                    <OnlyTextIcon className={'min-w-[22px] min-h-[14px]'} />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="bottom" className={'w-12 h-12 p-0'}>
                    <ImgBottomIcon className={'min-w-[22px] min-h-[22px]'} />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="top" className={'w-12 h-12 p-0'}>
                    <ImgTopIcon className={'min-w-[22px] min-h-[22px]'} />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="left" className={'w-12 h-12 p-0'}>
                    <ImgLeftIcon className={'min-w-[32px] min-h-[12px]'} />
                  </ToggleGroupItem>
                </ToggleGroup>
              </PopoverContent>
            </Popover>

            {cardData.title ? (
              <div
                className={cn(
                  'w-6 h-6 flex items-center justify-center rounded-full cursor-pointer',
                  'bg-linear-to-tr from-[#068DFB] to-[#3FCCFF] bg-liner-[90]',
                  'drop-shadow-[0_0_5px_#149DFF36]',
                )}
                onClick={onEditSave}
              >
                <ArrowIcon />
              </div>
            ) : (
              <div
                className={
                  'w-6 h-6 flex items-center justify-center rounded-full bg-[#DCDCDC]'
                }
              >
                <ArrowIcon />
              </div>
            )}
          </div>
        </div>
      )}

      {children}
    </div>
  );
};
