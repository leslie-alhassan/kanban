import boardData from '../data/data.json';

export interface Board {
  board: string;
  id: string;
  organization_id: string;
  isActive: boolean;
  imageUrl?: string;
  columns: Column[];
}

export interface Column {
  column: string;
  column_id: string;
  tasks: Task[];
}

export interface Task {
  title: string;
  description: string;
  status: string;
  due_date: string;
  task_id: string;
}

export const useGetBoards = (id: string | undefined): Board[] => {
  const boards = boardData.filter((board) => {
    return board.organization_id === id || board.id == id;
  });

  return boards;
};
