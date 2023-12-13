import { cn } from '@/lib/utils';
import { Edit, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { TaskStatusPopover } from '../TaskStatusPopover/TaskStatusPopover';
import { TaskDatePicker } from '../TaskDatePicker/TaskDatePicker';
import { Button } from '../ui/button';

interface BoardColumnItemProps {
  task: {
    title: string;
    description: string;
    status: string;
    due_date: string;
    task_id: string;
  };
  onHandleDeleteTask: (arg0: string) => void;
  onHandleEditTask: (arg0: string, arg1: string) => void;
}

export const BoardColumnItem = ({
  task,
  onHandleDeleteTask,
  onHandleEditTask,
}: BoardColumnItemProps) => {
  const [expandTask, setExpandTask] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState('');

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  if (editMode) {
    return (
      <div className='w-full rounded-sm bg-white shadow-sm p-3  border-2 border-transparent'>
        <div className='flex items-center justify-end'>
          <X
            className='h-5 w-5 cursor-pointer bg-neutral-300/50 hover:bg-neutral-300/70 rounded-sm p-1'
            onClick={() => toggleEditMode()}
          />
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onHandleEditTask(task.task_id, content);
          }}
        >
          <label
            htmlFor='title'
            className='text-[.75rem] font-semibold text-indigo-600'
          >
            Task
          </label>
          <input
            type='text'
            className='w-full bg-indigo-600/10 rounded-sm h-[2rem] outline-none focus:border-2 focus:border-indigo-600 p-2 text-[.75rem] mb-3 mt-1'
            id='title'
            placeholder='Title'
            name='desc'
          />

          <label
            htmlFor='description'
            className='text-[.75rem] font-semibold text-indigo-600'
          >
            Details
          </label>
          <textarea
            className='w-full bg-indigo-600/10 rounded-sm outline-none h-[8rem] resize-none text-[.75rem] p-2 focus:border-2 focus:border-indigo-600 mb-3 mt-1'
            id='description'
            placeholder='Description'
            onChange={(e) => {
              setContent(e.target.value);
            }}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                toggleEditMode();
              }
            }}
          />

          <div className='flex items-center justify-between'>
            <TaskDatePicker />
            <TaskStatusPopover />
          </div>

          <Button
            variant='cancel'
            size='sm'
            className='mt-4 mb-2 w-full text-[.75rem]'
          >
            Save
          </Button>
        </form>
      </div>
    );
  }

  return (
    <li className='shrink-0  w-full select-none text-[0.75rem] cursor-pointer'>
      <div
        className='w-full rounded-sm bg-white shadow-sm p-3  border-2 border-transparent hover:border-indigo-600/50'
        onClick={() => {
          setExpandTask(!expandTask);
        }}
      >
        <div className='flex items-center justify-between'>
          <h2
            className={cn('font-semibold text-sm', !expandTask && 'truncate')}
          >
            {task.title}
          </h2>
          <div className='flex items-center gap-x-2'>
            <Edit
              className='h-4 w-4 stroke-muted-foreground'
              onClick={() => toggleEditMode()}
            />
            <Trash2
              className='h-4 w-4 stroke-muted-foreground'
              onClick={() => onHandleDeleteTask(task.task_id)}
            />
          </div>
        </div>

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
