import DashboardNav from '@/components/DashboardNav/DashboardNav';
import Sidebar from '@/components/Sidebar/Sidebar';

const Dashboard = () => {
  return (
    <div className='h-full'>
      <DashboardNav />

      <main className='pt-20 md:pt-24 px-14 max-w-6xl 2xl:max-w-screen-xl mx-auto'>
        <div className='flex gap-x-7'>
          <div className='w-64 shrink-0 hidden md:block'>
            <Sidebar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
