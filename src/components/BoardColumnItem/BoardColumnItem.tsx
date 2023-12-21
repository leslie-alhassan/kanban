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
  onHandleEditTask: (
    arg0: string,
    arg1: {
      title: string;
      description: string;
      due_date: string;
      status: string;
    }
  ) => void;
}

export const BoardColumnItem = ({
  task,
  onHandleDeleteTask,
  onHandleEditTask,
}: BoardColumnItemProps) => {
  const [expandTask, setExpandTask] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('');

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
            onHandleEditTask(task.task_id, {
              title,
              description,
              due_date: dueDate,
              status: status,
            });
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
            value={title}
            name='desc'
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            autoFocus
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
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />

          <div className='flex items-center justify-between'>
            {/* @ts-ignore */}
            <TaskDatePicker onSetDueDate={setDueDate} />

            {/* @ts-ignore */}
            <TaskStatusPopover onSetStatus={setStatus} />
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
        className=' w-full rounded-sm bg-white shadow-sm p-3  border-2 border-transparent hover:border-indigo-600/50'
        onClick={() => {
          setExpandTask(!expandTask);
        }}
      >
        <div className='flex items-start justify-between'>
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
                task.status === 'pending' && 'bg-[#E54F46]',
                task.status === 'todo' && 'bg-[#DCE546]',
                task.status === 'doing' && 'bg-indigo-500',
                task.status === 'done' && 'bg-emerald-500'
              )}
            ></div>

            <p className='text-[.65rem] italic font-[500] text-neutral-500'>
              {task.status}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};
