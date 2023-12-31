import { Plus } from 'lucide-react';
import { Logo } from '../Logo/Logo';
import { Button } from '../ui/button';
import { OrganizationSwitcher, UserButton } from '@clerk/clerk-react';
import { MobileSidebar } from '../MobileSidebar/MobileSidebar';
import { useLocation } from 'react-router-dom';

export const DashboardNav = () => {
  const location = useLocation();

  return (
    <nav className='fixed z-50 top-0 w-full h-16 border-bottom shadow-sm bg-white flex items-center px-6 md:px-20 mx-auto'>
      {/* Mobile Sidebar */}
      <MobileSidebar />

      <div className='flex justify-between w-full md:max-w-screen-2xl mx-auto'>
        <div className='flex items-center gap-x-4'>
          <div className='hidden md:flex'>
            <Logo />
          </div>
          {(location.pathname.includes('organization') ||
            location.pathname === '/') && (
            <Button
              variant='primary'
              size='sm'
              className='rounded-sm hidden md:block h-auto py-1.5 px-2'
            >
              Create
            </Button>
          )}
          <Button
            variant='primary'
            size='sm'
            className='rounded-sm block md:hidden'
          >
            <Plus className='h-4 w-4' />
          </Button>
        </div>

        <div className='ml-auto flex items-center gap-x-4'>
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
                  background: 'black',
                },
              },
            }}
          />
        </div>
      </div>
    </nav>
  );
};
