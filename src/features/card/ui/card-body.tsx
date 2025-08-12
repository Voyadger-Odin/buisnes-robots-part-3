import { cn } from '@/shared/lib/utils';
import { MenuIcon } from '@/shared/icons/MenuIcon';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { CardProps } from '@/features/card/types/types';
import { ImgIcon } from '@/shared/icons/ImgIcon';

export const CardBody = ({
  cardData,
  onOpenEdit,
  onInputTitle,
}: {
  cardData: CardProps;
  onOpenEdit?: MouseEventHandler<HTMLDivElement> | undefined;
  onInputTitle: (title: string) => void;
}) => {
  const textEndRef = useRef(null);
  const countRef = useRef(null);
  const [overlayText, setOverlayText] = useState(false);

  const textareaRef = useRef(null);

  const handleInput = () => {
    const el = textareaRef.current;
    if (el) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      el.style.height = 'auto';

      // console.log(el.scrollHeight);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      el.style.height = `${el.scrollHeight}px`;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      onInputTitle(el.value);
    }
  };

  useEffect(() => {
    handleInput(); // Подстроить при монтировании, если есть начальный текст
  }, [cardData.edit, cardData.imgPosition]);

  useEffect(() => {
    const textElement = textEndRef.current;
    const countElement = countRef.current;
    if (textElement && countElement) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const rectText = textElement.getBoundingClientRect();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const rectCount = countElement.getBoundingClientRect();

      if (
        rectText.x + 10 >= rectCount.x &&
        cardData.counter &&
        cardData.imgPosition !== 'bottom' &&
        (cardData.imgPosition !== 'left' ||
          (cardData.imgPosition === 'left' && cardData.title.length > 40))
      ) {
        setOverlayText(true);
      } else {
        setOverlayText(false);
      }
    }
  }, [cardData.title, cardData.counter, cardData.imgPosition, cardData.edit]);

  return (
    <div
      className={cn(
        'relative',
        'w-[345px] min-h-[68px] p-4 overflow-hidden',
        'flex gap-2',
        'border-[1px] border-[#0000]',
        cardData.edit && 'border border-[#229CFD] rounded-[25px]',
        cardData.imgPosition === 'onlyText' && 'flex-row items-center',
        cardData.imgPosition === 'left' && 'flex-row items-center',
        cardData.imgPosition === 'top' && 'flex-col',
        cardData.imgPosition === 'bottom' && 'flex-col-reverse',
      )}
    >
      {cardData.imgPosition !== 'onlyText' && (
        <div
          className={cn(
            cardData.imgPosition === 'left' && 'h-full',
            (cardData.imgPosition === 'top' ||
              cardData.imgPosition === 'bottom') &&
              'h-[calc(180px-16px)]',
          )}
        >
          <div
            className={cn(
              'overflow-hidden',
              cardData.imgPosition === 'left' &&
                'w-[58px] h-full min-h-[58px] relative',
              cardData.imgPosition === 'top' &&
                'w-full h-[180px] absolute top-0 left-0 p-px',
              cardData.imgPosition === 'bottom' &&
                'w-full h-[180px] absolute bottom-0 left-0 p-px',
            )}
          >
            <div
              className={cn(
                'overflow-hidden',
                cardData.imgPosition === 'left' &&
                  'min-w-[58px] w-[58px] h-[58px] rounded-[13px] top-0',
                cardData.imgPosition === 'top' &&
                  'w-full h-full rounded-b-[5px] rounded-t-[24px]',
                cardData.imgPosition === 'bottom' &&
                  'w-full h-full rounded-b-[24px] rounded-t-[5px]',
              )}
            >
              {cardData.img ? (
                <Image
                  src={cardData.img}
                  alt={'123'}
                  width={1000}
                  height={1000}
                  quality={90}
                  className={cn('object-cover')}
                />
              ) : (
                <div
                  className={
                    'bg-[#F1F6FD] h-full flex items-center justify-center'
                  }
                >
                  <ImgIcon
                    className={cn(
                      'w-[121px] h-[77px]',
                      cardData.imgPosition === 'left' && 'w-[41px] h-[24px]',
                    )}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className={'flex-1 break-all'}>
        <div
          className={
            'w-full min-w-full max-w-full whitespace-break-spaces break-words text-[#3B4552] font-[Urbanist] tracking-[0px] font-normal text-[14px] leading-[140%]'
          }
        >
          {cardData.edit ? (
            <>
              <textarea
                ref={textareaRef}
                value={cardData.title}
                onInput={handleInput}
                placeholder={'Write your idea!'}
                rows={1}
                className={cn(
                  'w-full min-h-[16px] resize-none overflow-y-auto max-h-52',
                  'text-[#3B4552] font-[Urbanist] tracking-[0px] font-normal text-[14px] leading-[140%]',
                  'outline-none',
                )}
              />
            </>
          ) : (
            <>
              {cardData.title ? (
                <span>{cardData.title}</span>
              ) : (
                <span className={'text-gray-400'}>Some text</span>
              )}

              {cardData.counter && (
                <>
                  <span ref={textEndRef} className={'opacity-0 w-[100px]'}>
                    1
                  </span>
                  <span className={'opacity-0 px-3'}>
                    {overlayText ? cardData.counter : ''}
                  </span>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {!cardData.edit && (
        <div
          className={cn(
            'flex flex-col items-center',
            'absolute right-4 top-0 h-full w-5',
            'pb-[10px]',
          )}
        >
          <div
            className={cn(
              'py-2 cursor-pointer relative',
              cardData.imgPosition === 'top' &&
                'bg-[#8585854D] py-[10px] px-[6px] rounded-[11px] w-[28px] h-[26px] my-3 backdrop-blur-sm',
            )}
            onClick={onOpenEdit}
          >
            <MenuIcon
              fill={cardData.imgPosition === 'top' ? '#FFFFFF' : '#B4B4B4'}
            />
          </div>

          <div className={'flex-1'} />

          {cardData.counter && cardData.counter != '0' && (
            <div
              ref={countRef}
              className={cn(
                'absolute bottom-[10px] right-0',
                'w-fit min-w-[22px] h-[22px] pointer-events-none',
                'flex items-center justify-center',
                'text-[#B4B4B4] text-[12px] font-[Urbanist]',
                `${cardData.counter}`.length > 1 && 'px-[8px]',
                cardData.imgPosition === 'bottom' &&
                  'bg-[#3F3F3F66] border-none backdrop-blur-md text-white',

                Number(cardData.counter) &&
                  `${cardData.counter}`.length > 0 &&
                  `${cardData.counter}`[0] != '+'
                  ? 'border-[0.5px] border-[#B4B4B488] rounded-full'
                  : cn(
                      'border-none rounded-full text-white',
                      'bg-linear-to-tr from-[#068DFB] to-[#3FCCFF] bg-liner-[90]',
                      'drop-shadow-[0_0_5px_#149DFF36]',
                    ),
              )}
            >
              {cardData.counter}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
