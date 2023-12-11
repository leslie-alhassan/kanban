import { useOrganization } from '@clerk/clerk-react';

import { Skeleton } from '../ui/skeleton';
import { Activity, Layout, Settings } from 'lucide-react';

interface WorkspaceInfoProps {
  boards: boolean;
  settings: boolean;
  activity: boolean;
}

export const WorkspaceInfo = ({
  boards,
  settings,
  activity,
}: WorkspaceInfoProps) => {
  const { organization, isLoaded } = useOrganization();

  if (!isLoaded) {
    return <WorkspaceInfo.Skeleton />;
  }

  return (
    <div className='flex items-center gap-x-4'>
      <div className='w-[3.75rem] h-[3.75rem] relative'>
        <img
          src={organization?.imageUrl}
          alt='Workspace Logo'
          className='rounded-md object-cover'
        />
      </div>

      <div className='flex flex-col gap-y-1'>
        <p className='font-semibold text-xl'>{organization?.name}</p>
        {boards && (
          <div className='flex items-center'>
            <Layout className='h-4 w-4 mr-2 stroke-muted-foreground' />
            <p className='text-xs text-muted-foreground'>Boards</p>
          </div>
        )}
        {activity && (
          <div className='flex items-center'>
            <Activity className='h-4 w-4 mr-2 stroke-muted-foreground' />
            <p className='text-xs text-muted-foreground'>Activity</p>
          </div>
        )}
        {settings && (
          <div className='flex items-center'>
            <Settings className='h-4 w-4 mr-2 stroke-muted-foreground' />
            <p className='text-xs text-muted-foreground'>Settings</p>
          </div>
        )}
      </div>
    </div>
  );
};

WorkspaceInfo.Skeleton = function SkeletonWorkspaceInfo() {
  return (
    <div className='flex items-center gap-x-4'>
      <div className='w-[3.75rem] h-[3.75rem] relative'>
        <Skeleton className='w-full h-full absolute' />
      </div>

      <div className='flex flex-col gap-y-1'>
        <Skeleton className='h-10 w-[12.5rem]' />

        <div className='flex items-center'>
          <Skeleton className='h-4 w-4 mr-2' />
          <Skeleton className='h-4 w-[6.25rem]' />
        </div>
      </div>
    </div>
  );
};
