import { useLocation } from 'react-router-dom';

import { useMobileSidebar } from '@/hooks/useMobileSidebar';

import { useEffect } from 'react';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
import { Sidebar } from '../Sidebar/Sidebar';
import { Sheet, SheetContent } from '../ui/sheet';

export const MobileSidebar = () => {
  const path = useLocation().pathname;

  const isOpen = useMobileSidebar((state) => state.isOpen);
  const onOpen = useMobileSidebar((state) => state.onOpen);
  const onClose = useMobileSidebar((state) => state.onClose);

  // Close sidebar when url changes
  useEffect(() => {
    onClose();
  }, [path, onClose]);

  return (
    <>
      <Button
        onClick={onOpen}
        className='block md:hidden mr-2'
        variant='ghost'
        size='sm'
      >
        <Menu className='h-4 w-4' />
      </Button>

      <Sheet
        open={isOpen}
        onOpenChange={onClose}
      >
        <SheetContent
          side='left'
          className='p-2 pt-10'
        >
          <Sidebar storageKey='sidebar-mobile-state' />
        </SheetContent>
      </Sheet>
    </>
  );
};
