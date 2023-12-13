import { BoardColumn } from '@/components/BoardColumn/BoardColumn';
import { DashboardNav } from '@/components/DashboardNav/DashboardNav';
import { useGetBoards } from '@/hooks/useGetBoards';
import { Column, Task } from '@/types';
import { Plus } from 'lucide-react';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { v4 as uuid } from 'uuid';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';

import boardData from '../../data/data.json';

const BoardPage = () => {
  const boardId = useParams();
  const board = useGetBoards(boardId.id, boardData)[0];

  const [columns, setColumns] = useState<Column[]>(board.columns);
  const [columnIds, setColumnIds] = useState<string[]>([]);

  const allTasks: Task[] = [];
  columns.forEach((col) => {
    allTasks.push(...col.tasks);
  });
  const [tasks, setTasks] = useState<Task[]>(allTasks);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  // activation sensor for drag over event to prevent disabling of deletion of columns
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 3 } })
  );

  useEffect(() => {
    const ids = columns.map((column) => {
      return column.column_id;
    });

    setColumnIds(ids);
  }, [columns]);

  document.title = `Kanban | ${board.board}`;

  const handleAddColumn = () => {
    const newColumn: Column = {
      column: `Column ${columns.length + 1}`,
      column_id: uuid(),
      tasks: [],
    };

    setColumns([newColumn, ...columns]);
    toast.success(`Column ${columns.length + 1} added`);
  };

  const handleDeleteColumn = (columnId: string) => {
    const filteredColumns = columns.filter((column) => {
      return column.column_id !== columnId;
    });
    setColumns(filteredColumns);
    toast.success('Column deleted');
  };

  const handleAddTask = (columnId: string) => {
    const newTask: Task = {
      title: 'New task',
      description: '',
      status: 'pending',
      due_date: new Date(Date.now()).toLocaleString('en-CA', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      task_id: uuid(),
      column_id: columnId,
    };

    toast.success('Task added');
    setTasks([newTask, ...tasks]);
  };

  const handleEditTask = (taskId: string, content: string) => {
    const newTasks = tasks.map((task) => {
      if (task.task_id !== taskId) {
        return task;
      }

      const newTask = {
        title: task.title,
        description: content || task.description,
        status: 'pending',
        due_date: task.due_date,
        task_id: task.task_id,
        column_id: task.column_id,
      };
      console.log({ ...task, ...newTask });
      return { ...task, ...newTask };
    });

    // console.log(newTasks);
    setTasks(newTasks);
  };

  const handleDeleteTask = (taskId: string) => {
    const newTasks = tasks.filter((task) => {
      return task.task_id !== taskId;
    });
    setTasks(newTasks);
  };

  // dnd drag handlers
  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((column) => {
        return column.column_id === activeColumnId;
      });
      const overColumnIndex = columns.findIndex((column) => {
        return column.column_id === overColumnId;
      });

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };

  return (
    <>
      <DashboardNav />
      <div
        className='relative h-[100vh] w-full bg-no-repeat bg-cover bg-center bg-indigo-600/5'
        style={{ backgroundImage: `url(${board.imageUrl})` }}
      >
        {/* Board header */}
        <div className='w-full h-20 z-[40] bg-black/50 top-14 flex  items-center gap-x-6 text-white absolute'>
          <h1 className='font-semibold text-2xl px-6 md:px-20'>
            {board.board}
          </h1>
        </div>

        {/* Background overlay */}
        <div className={board.imageUrl ? 'absolute inset-0 bg-black/30' : ''} />

        {/* Main content */}
        <main className='relative pt-28 h-full px-6 md:px-20 mx-auto top-[3rem]'>
          <DndContext
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            sensors={sensors}
          >
            <button
              onClick={handleAddColumn}
              className='w-fit rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm mb-4'
            >
              <Plus className='h-4 w-4 mr-2' />
              New Column
            </button>

            {/* Columns */}
            <div className='flex gap-4 overflow-scroll'>
              <SortableContext items={columnIds}>
                {columns.map((column) => {
                  return (
                    <BoardColumn
                      key={column.column_id}
                      column={column}
                      tasks={tasks.filter((task) => {
                        return task.column_id === column.column_id;
                      })}
                      onHandleDeleteColumn={handleDeleteColumn}
                      onHandleAddTask={handleAddTask}
                      onHandleEditTask={handleEditTask}
                      onHandleDeleteTask={handleDeleteTask}
                    />
                  );
                })}
              </SortableContext>
            </div>

            {createPortal(
              <DragOverlay>
                {activeColumn && (
                  <BoardColumn
                    column={activeColumn}
                    tasks={tasks.filter((task) => {
                      return task.column_id === activeColumn.column_id;
                    })}
                    onHandleDeleteColumn={handleDeleteColumn}
                    onHandleAddTask={handleAddTask}
                    onHandleEditTask={handleEditTask}
                    onHandleDeleteTask={handleDeleteTask}
                  />
                )}
              </DragOverlay>,
              document.body
            )}
          </DndContext>
        </main>
      </div>
    </>
  );
};

export default BoardPage;
