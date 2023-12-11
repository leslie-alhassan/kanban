import { DashboardNav } from '@/components/DashboardNav/DashboardNav';
import { useGetBoards } from '@/hooks/useGetBoards';
import { useParams } from 'react-router-dom';

const BoardPage = () => {
  const boardId = useParams();
  const board = useGetBoards(boardId.id)[0];

  document.title = `Kanban | ${board.board}`;

  return (
    <>
      <DashboardNav />
      <div
        className='relative h-[100vh] bg-no-repeat bg-cover bg-center bg-indigo-600/5'
        style={{ backgroundImage: `url(${board.imageUrl})` }}
      >
        <div className={board.imageUrl ? 'absolute inset-0 bg-black/30' : ''} />
        <main className='relative pt-28 h-full'></main>
      </div>
    </>
  );
};

export default BoardPage;
