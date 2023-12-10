import { Plus } from 'lucide-react';
import { Logo } from '../Logo/Logo';
import { Button } from '../ui/button';
import { OrganizationSwitcher, UserButton } from '@clerk/clerk-react';

const DashboardNav = () => {
  return (
    <nav className='fixed z-50 top-0 w-full h-14 border-bottom shadow-sm bg-white flex items-center px-14'>
      <div className='flex items-center gap-x-4'>
        <div className='hidden md:flex'>
          <Logo />
        </div>

        <Button
          variant='primary'
          size='sm'
          className='rounded-sm hidden md:block h-auto py-1.5 px-2'
        >
          Create
        </Button>

        <Button
          variant='primary'
          size='sm'
          className='rounded-sm block md:hidden'
        >
          <Plus className='h-4 w-4' />
        </Button>
      </div>

      <div className='ml-auto flex items-center gap-x-2'>
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl='/organization/:id'
          afterSelectOrganizationUrl='/organization/:id'
          afterLeaveOrganizationUrl='/organizations'
          appearance={{
            elements: {
              rootBox: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
          }}
        />

        <UserButton
          afterSignOutUrl='/'
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
                '-webkit-border-radius': '0.3125rem',
              },
            },
          }}
        />
      </div>
    </nav>
  );
};

export default DashboardNav;
