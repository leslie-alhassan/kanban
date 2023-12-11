import { useEffect, useState } from 'react';
import { useOrganization } from '@clerk/clerk-react';

import { BadgePlus, User2 } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { FormPopover } from '../FormPopover/FormPopover';
import { Board, useGetBoards } from '@/hooks/useGetBoards';
import { Link } from 'react-router-dom';

export const BoardList = () => {
  const [boards, setBoards] = useState<Board[]>();

  const { organization, isLoaded } = useOrganization();

  useEffect(() => {
    const orgBoards = useGetBoards(organization?.id);

    setBoards(orgBoards);
  }, [organization]);

  if (!isLoaded) {
    return (
      <div className='space-y-4'>
        <div className='flex items-center font-semibold font text-lg text-neutral-700'>
          <User2 className='h-6 w-6 mr-2' />
          <Skeleton className='h-6 w-6 mr-2' />
          <Skeleton className='h-6 w-[5rem]' />
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
          <Skeleton className='aspect-ratio h-full w-full' />
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center font-semibold font text-lg text-neutral-700'>
        <User2 className='h-6 w-6 mr-2' />
        Your boards
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
        {/* Create new board */}
        <FormPopover
          sideOffset={10}
          orgId={organization?.id}
        >
          <div
            role='button'
            className='aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75'
          >
            <BadgePlus className='stroke-muted-foreground mb-2' />
            <p className='text-[.75rem]'>Create new board</p>
          </div>
        </FormPopover>

        {/* Boards */}
        {boards?.map((board) => {
          return (
            <Link
              to={`/board/${board.id}`}
              key={board.id}
              style={{ backgroundImage: `url(${board.imageUrl})` }}
              className='group relative aspect-video bg-no-repeat bg-center bg-cover bg-gray-100 rounded-sm h-full w-full p-2 overflow-hidden'
            >
              <div className='absolute inset-0 bg-black/30 group-hover:hb-black/40 transition'>
                <p className='relative font-semibold text-white px-2'>
                  {board.board}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
