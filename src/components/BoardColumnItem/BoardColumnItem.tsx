import { cn } from '@/lib/utils';

interface BoardColumnItemProps {
  task: {
    title: string;
    description: string;
    status: string;
    due_date: string;
  };
}

export const BoardColumnItem = ({ task }: BoardColumnItemProps) => {
  return (
    <li className='shrink-0  w-full select-none text-[0.75rem]'>
      <div className='w-full rounded-sm bg-white shadow-sm p-3 truncate border-2 border-transparent hover:border-indigo-600/50'>
        <h2 className='font-semibold text-sm'>{task.title}</h2>

        <p className='text-muted-foreground truncate my-4'>
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
            {/* <p className='text-muted-foreground italic text-[0.6rem]'>
              {task.status}
            </p> */}
          </div>
        </div>
      </div>
    </li>
  );
};
