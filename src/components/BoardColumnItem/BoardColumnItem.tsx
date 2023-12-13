import { cn } from '@/lib/utils';
import { useState } from 'react';

interface BoardColumnItemProps {
  task: {
    title: string;
    description: string;
    status: string;
    due_date: string;
    task_id: string;
  };
}

export const BoardColumnItem = ({ task }: BoardColumnItemProps) => {
  const [expandTask, setExpandTask] = useState(false);

  return (
    <li className='shrink-0  w-full select-none text-[0.75rem] cursor-pointer'>
      <div
        className='w-full rounded-sm bg-white shadow-sm p-3  border-2 border-transparent hover:border-indigo-600/50'
        onClick={() => setExpandTask(!expandTask)}
      >
        <h2 className={cn('font-semibold text-sm', !expandTask && 'truncate')}>
          {task.title}
        </h2>

        <p
          className={cn(
            'text-muted-foreground my-4',
            !expandTask && 'truncate'
          )}
        >
          {task.description}
        </p>

        <div className='flex justify-between items-center'>
          <p className='font-semibold bg-indigo-600/20 p-1 rounded-sm text-indigo-600 text-[0.65rem]'>
            <span className='italic font-normal'>Due </span>
            {new Date(task.due_date).toLocaleDateString('en-CA', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
          <div className='flex items-center gap-x-1'>
            <div
              className={cn(
                'w-4 h-1.5 rounded-full',
                task.status === 'pending' && 'bg-red-500',
                task.status === 'doing' && 'bg-amber-300',
                task.status === 'done' && 'bg-emerald-500'
              )}
            ></div>
          </div>
        </div>
      </div>
    </li>
  );
};
