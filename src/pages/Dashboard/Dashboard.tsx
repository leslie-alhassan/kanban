import { useState } from 'react';

import { DashboardNav } from '@/components/DashboardNav/DashboardNav';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { OrganizationSettings } from '../../components/OrganizationSettings/OrganizationSettings';
import { WorkspaceInfo } from '@/components/WorkspaceInfo/WorkspaceInfo';
import { Separator } from '@/components/ui/separator';
import { BoardList } from '@/components/BoardList/BoardList';

const Dashboard = () => {
  const [viewBoard, setViewBoard] = useState(true);
  const [viewSettings, setViewSettings] = useState(false);
  const [viewActivity, setViewActivity] = useState(false);

  return (
    <div className='h-full'>
      <DashboardNav />

      <main className='pt-20 md:pt-24 px-6 md:px-20 mx-auto'>
        <div className='flex gap-x-7 items-start md:max-w-screen-2xl mx-auto'>
          <div className='w-64 shrink-0 hidden md:block'>
            <Sidebar
              storageKey='sidebar-default-state'
              onSetViewBoard={setViewBoard}
              onSetViewActivity={setViewActivity}
              onSetViewSettings={setViewSettings}
            />
          </div>

          <div className='flex flex-col gap-y-7 w-full'>
            <WorkspaceInfo
              boards={viewBoard}
              settings={viewSettings}
              activity={viewActivity}
            />

            <Separator className='mb-3' />

            <div className='px=2 md:px-4'>
              {viewBoard && <BoardList />}
              {viewSettings && <OrganizationSettings />}
              {viewActivity && <h1></h1>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
