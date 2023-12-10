import { DashboardNav } from '@/components/DashboardNav/DashboardNav';
import { Sidebar } from '@/components/Sidebar/Sidebar';

const Dashboard = () => {
  return (
    <div className='h-full'>
      <DashboardNav />

      <main className='pt-20 md:pt-24 px-20 mx-auto'>
        <div className='flex gap-x-7 items-center md:max-w-screen-2xl mx-auto'>
          <div className='w-64 shrink-0 hidden md:block'>
            <Sidebar storageKey='side' />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
