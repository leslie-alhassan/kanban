import { Logo } from '../Logo/Logo';
import { Button } from '../ui/button';

export const Footer = () => {
  return (
    <div className='fixed bottom-0 w-full px-6 md:px-20 py-4 border-t bg-slate-100'>
      <div className='md:max-w-screen-2xl mx-auto flex items-center w-full justify-between'>
        <Logo />

        <Button
          size='sm'
          variant='ghost'
        >
          <a
            href='https://github.com/leslie-alhasssan'
            target='_blank'
            className='text-xs'
          >
            Made with 🩷 in Toronto
          </a>
        </Button>
      </div>
    </div>
  );
};
