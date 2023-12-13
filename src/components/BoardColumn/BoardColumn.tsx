import { Column, Task } from '@/types';
import { BoardColumnItem } from '../BoardColumnItem/BoardColumnItem';
import { v4 as uuid } from 'uuid';
import { Button } from '../ui/button';
import { Plus, Trash2 } from 'lucide-react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface BoardColumnProps {
  column: Column;
  tasks: Task[];
  onHandleDeleteColumn: (arg0: string) => void;
  onHandleAddTask: (arg0: string) => void;
  onHandleDeleteTask: (arg0: string) => void;
}

export const BoardColumn = ({
  column,
  tasks,
  onHandleDeleteColumn,
  onHandleAddTask,
  onHandleDeleteTask,
}: BoardColumnProps) => {
  // dnd kit
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.column_id, data: { type: 'Column', column } });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  // background placeholder for dragged columns
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className='w-[20.25rem] h-[30rem] max-h-[70vh] rounded-sm  shadow-md px-[1rem] py-4 overflow-auto border-2 border-[#2E66E5]'
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className='w-[20.25rem] min-w-[20.25rem] h-fit max-h-[70vh] rounded-sm bg-[#f1f2f4] shadow-md px-[1rem] py-4 overflow-auto'
    >
      <div
        className='flex justify-between items-baseline cursor-grab'
        {...attributes}
        {...listeners}
      >
        <div className='flex gap-x-2 items-center'>
          <h1 className='font-semibold text-muted-foreground text-sm italic'>
            {column.column}
          </h1>

          <Trash2
            className='h-4 w-4 stroke-muted-foreground cursor-pointer'
            onClick={() => onHandleDeleteColumn(column.column_id)}
          />
        </div>

        <div className={column.tasks.length > 0 ? 'mb-6' : ''}>
          <Button
            variant='primary'
            size='sm'
            className='text-xs font-semibold px-2 py=1.5 w-full justify-start'
            onClick={() => {
              onHandleAddTask(column.column_id);
            }}
          >
            <Plus className='h-4 w-4 mr-2' />
            New task
          </Button>
        </div>
      </div>

      <ol className='flex gap-y-3 flex-col'>
        {tasks.map((task) => {
          return (
            <BoardColumnItem
              key={uuid()}
              task={task}
              onHandleDeleteTask={onHandleDeleteTask}
            />
          );
        })}
      </ol>
    </div>
  );
};
