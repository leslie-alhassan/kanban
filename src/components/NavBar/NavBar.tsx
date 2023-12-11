import { Link } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import { Button } from '../ui/button';

export const NavBar = () => {
  return (
    <div className='fixed top-0 w-full h-16 px-6 md:px-20 border-b shadow-sm bg-white flex items-center'>
      <div className='md:max-w-screen-2xl mx-auto flex items-center w-full justify-between'>
        <Logo />

        <div className='space-x-4 md:block md:w-auto flex items-center justify-between w-full'>
          <Button
            size='sm'
            variant='outline'
          >
            <Link to='/login'>Login</Link>
          </Button>
          <Button size='sm'>
            <Link to='/sign-up'>Get Kanban for free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
