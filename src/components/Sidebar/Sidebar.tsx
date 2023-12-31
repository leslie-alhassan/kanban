import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useLocalStorage } from 'usehooks-ts';
import { useOrganization, useOrganizationList } from '@clerk/clerk-react';

import { Button } from '../ui/button';
import { Accordion } from '../ui/accordion';
import { SidebarCard, Organization } from '../SidebarCard/SidebarCard';

interface SidebarProps {
  storageKey: string;
  onSetViewBoard: (arg0: boolean) => void;
  onSetViewActivity: (arg0: boolean) => void;
  onSetViewSettings: (arg0: boolean) => void;
}

export const Sidebar = ({
  storageKey = 'sidebar-default-state',
  onSetViewBoard,
  onSetViewActivity,
  onSetViewSettings,
}: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );

  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();

  const {
    userMemberships,
    isLoaded: isLoadedOrgList,
    setActive,
  } = useOrganizationList({
    userMemberships: { infinite: true },
  });

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }

      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
        <div className='font-medium text-xs flex items-center mb-1'>
          <h1 className='font-semibold uppercase'>Workspaces</h1>
          <Button
            size='icon'
            variant='ghost'
            className='ml-auto'
          >
            <Link to='/organizations'>
              <Plus className='h-4 w-4' />
            </Link>
          </Button>
        </div>

        <div className='space-y-2'>
          <SidebarCard.Skeleton />
          <SidebarCard.Skeleton />
          <SidebarCard.Skeleton />
        </div>
      </>
    );
  }

  return (
    <>
      <div className='font-medium text-xs flex items-center mb-1'>
        <h1 className='font-semibold uppercase'>Workspaces</h1>
        <Button
          size='icon'
          variant='ghost'
          className='ml-auto'
        >
          <Link to='/organizations'>
            <Plus className='h-4 w-4' />
          </Link>
        </Button>
      </div>

      <Accordion
        type='multiple'
        defaultValue={defaultAccordionValue}
        className='space-y-2'
      >
        {userMemberships.data.map(({ organization }) => (
          <SidebarCard
            key={organization.id}
            isActive={activeOrganization?.id === organization.id}
            onSetActive={setActive}
            isExpanded={expanded[organization.id]}
            organization={organization as Organization}
            onExpand={onExpand}
            onSetViewBoard={onSetViewBoard}
            onSetViewActivity={onSetViewActivity}
            onSetViewSettings={onSetViewSettings}
          />
        ))}
      </Accordion>
    </>
  );
};
