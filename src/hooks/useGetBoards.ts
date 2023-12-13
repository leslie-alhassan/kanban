import { Board } from '@/types';

export const useGetBoards = (
  id: string | undefined,
  boardData: Board[]
): Board[] => {
  const boards = boardData.filter((board) => {
    return board.organization_id === id || board.id == id;
  });

  return boards;
};
