import { cn } from '@/lib/utils';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Activity, Layout, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { useEffect } from 'react';

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
}

export const SidebarCard = ({
  isExpanded,
  isActive,
  organization,
  onExpand,
  onSetActive,
}: SidebarCardProps) => {
  const location = useLocation();

  const routes = [
    {
      label: 'Boards',
      icon: <Layout className='h-4 w04 mr-2' />,
      href: `/organization/${organization.id}`,
    },
    {
      label: 'Activity',
      icon: <Activity className='h-4 w04 mr-2' />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: 'Settings',
      icon: <Settings className='h-4 w04 mr-2' />,
      href: `/organization/${organization.id}/settings`,
    },
  ];

  const navigate = useNavigate();

  // set active org
  useEffect(() => {
    const setActive = () => {
      onSetActive({
        organization: location.pathname.split('/organization/')[1],
      });
    };

    setActive();
  }, [location.pathname]);

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
          isActive && !isExpanded && 'bg-indigo-500/10 text-indigo-700'
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

      <AccordionContent className='pt-1 text-neutral-700'>
        {routes.map((route) => (
          <Button
            key={route.href}
            variant='ghost'
            size='sm'
            onClick={() => {
              navigate(route.href);
            }}
            className={cn(
              'w-full font-normal justify-start pl-10 mb-1',
              location.pathname === route.href &&
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
