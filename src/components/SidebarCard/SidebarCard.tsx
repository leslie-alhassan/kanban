import { cn } from '@/lib/utils';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Activity, Layout, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

export interface Organization {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
}

interface SidebarCardProps {
  isExpanded: boolean;
  isActive: boolean;
  organization: Organization;
  onExpand: (id: string) => void;
  onSetActive: (arg0: { organization: string }) => void;
  onSetViewBoard: (arg0: boolean) => void;
  onSetViewActivity: (arg0: boolean) => void;
  onSetViewSettings: (arg0: boolean) => void;
}

export const SidebarCard = ({
  isActive,
  organization,
  onExpand,
  onSetActive,
  onSetViewBoard,
  onSetViewActivity,
  onSetViewSettings,
}: SidebarCardProps) => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const routes = [
    {
      label: 'Boards',
      icon: <Layout className='h-4 w-4 mr-2' />,
      key: `${organization.id}/boards`,
    },
    {
      label: 'Activity',
      icon: <Activity className='h-4 w04 mr-2' />,
      key: `${organization.id}/activity`,
    },
    {
      label: 'Settings',
      icon: <Settings className='h-4 w04 mr-2' />,
      key: `${organization.id}/settings`,
    },
  ];

  // set active org
  useEffect(() => {
    const setActive = () => {
      onSetActive({
        organization: location.pathname.split('/organization/')[1],
      });
    };

    setActive();
  }, [location.pathname]);

  const [currSelected, setCurrSelected] = useState('');

  const handleSidebarIconClick = (path: string) => {
    path.includes(location.pathname.split('/organization')[1]);

    setCurrSelected(path);

    if (path.includes('boards')) {
      onSetViewBoard(true);
      onSetViewActivity(false);
      onSetViewSettings(false);
    } else if (path.includes('activity')) {
      onSetViewActivity(true);
      onSetViewBoard(false);
      onSetViewSettings(false);
    } else if (path.includes('settings')) {
      onSetViewSettings(true);
      onSetViewBoard(false);
      onSetViewActivity(false);
    }
  };

  return (
    <AccordionItem
      value={organization.id}
      className='border-none'
    >
      <AccordionTrigger
        onClick={() => {
          onExpand(organization.id);
          navigate(`/organization/${organization.id}`);
        }}
        className={cn(
          'flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline',
          isActive && 'bg-indigo-500/10 text-indigo-700'
        )}
      >
        <div className='flex items-center gap-x-2'>
          <div className='w-7 h-7 relative'>
            <img
              src={organization.imageUrl}
              alt='Organization Image'
              className='rounded-sm object-cover'
            />
          </div>
          <p className='text-sm'>{organization.name}</p>
        </div>
      </AccordionTrigger>

      <AccordionContent
        className='pt-1 text-neutral-700'
        onClick={() => navigate(`/organization/${organization.id}`)}
      >
        {routes.map((route) => (
          <Button
            key={route.key}
            variant='ghost'
            size='sm'
            onClick={() => handleSidebarIconClick(route.key)}
            className={cn(
              'w-full font-normal justify-start pl-10 mb-1',
              currSelected === route.key &&
                route.key.includes(
                  location.pathname.split('/organization/')[1]
                ) &&
                'bg-indigo-600/10 text-indigo-700'
            )}
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

SidebarCard.Skeleton = function SkeletonSidebarCard() {
  return (
    <div className='flex items-center gap-x-2'>
      <Skeleton className='h-10 w-full' />
    </div>
  );
};
