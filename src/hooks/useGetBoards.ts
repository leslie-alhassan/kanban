import boardData from '../data/data.json';

export interface Board {
  board: string;
  id: string;
  organization_id: string;
  isActive: boolean;
  imageUrl?: string;
  columns: {
    column: string;
    tasks: {
      title: string;
      description: string;
      status: string;
      due_date: string;
    }[];
  }[];
}

export const useGetBoards = (org_id: string | undefined): Board[] => {
  const boards = boardData.filter((board) => {
    return board.organization_id === org_id;
  });

  return boards;
};