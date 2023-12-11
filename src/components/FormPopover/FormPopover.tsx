import {
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Popover } from '../ui/popover';
import { Button } from '../ui/button';
import { AlertCircle, X } from 'lucide-react';
import { UnsplashPicker } from '../UnsplashPicker/UnsplashPicker';

import { ElementRef, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';

import { v4 as uuid } from 'uuid';

interface FormPopoverProps {
  children: React.ReactNode;
  side?: 'left' | 'right' | 'top' | 'bottom';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  orgId: string | undefined;
}

export const FormPopover = ({
  children,
  side = 'bottom',
  align,
  sideOffset = 0,
  orgId,
}: FormPopoverProps) => {
  const closeRef = useRef<ElementRef<'button'>>(null);

  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // reset form error state after navigate
  const location = useLocation();
  useEffect(() => {
    setError('');
  }, [location.pathname]);

  const handleCreateBoard = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!title) {
      toast.error('Please provide a board title');
      return setError('Please provide a board title');
    }

    // TODO: handle read and write then redirect
    const newBoard = {
      board: title,
      id: uuid(),
      organization_id: orgId ? orgId : '',
      isActive: false,
      imageUrl: imageUrl,
      columns: [],
    };

    setError('');
    toast.success('Board created');
    closeRef.current?.click();
  };

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        side={side}
        sideOffset={sideOffset}
      >
        <div className='text-sm font-medium text-center text-neutral-600'>
          Create board
        </div>

        <PopoverClose ref={closeRef}>
          <Button
            variant='ghost'
            className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600'
          >
            <X className='h-4 w-4' />
          </Button>
        </PopoverClose>

        <form
          className='space-y-4'
          onSubmit={(e) => handleCreateBoard(e)}
        >
          <UnsplashPicker onSetImageUrl={setImageUrl} />

          <label
            htmlFor='title'
            className='font-semibold text-[0.75rem]'
          >
            Board title
          </label>
          <input
            type='text'
            className='w-full border-solid border-[0.09375rem] rounded p-1 focus:border-slate-800 outline-none text-sm'
            name='title'
            id='title'
            onChange={(e) => {
              setTitle(e.target.value);
              setError('');
            }}
          />

          {error && (
            <div className='flex items-center gap-x-2 bg-[#ec1333]/10 p-2 rounded-md'>
              <AlertCircle className='stroke-[#ec1333] w-4 h-4' />
              <p className='text-[0.75rem] font-[500] text-[#ec1333]'>
                {error}
              </p>
            </div>
          )}

          <Button
            size='sm'
            className='w-full'
          >
            Create
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};
