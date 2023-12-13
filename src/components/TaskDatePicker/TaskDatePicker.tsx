import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState, useEffect } from 'react';

interface TaskDatePickerProps {
  onSetDueDate: (arg0?: string) => void;
}

export const TaskDatePicker = ({ onSetDueDate }: TaskDatePickerProps) => {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    onSetDueDate(
      date?.toLocaleDateString('en-CA', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    );

    console.log(
      date?.toLocaleDateString('en-CA', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    );
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'date'}
          className={cn(
            'w-[8rem] justify-start text-left font-normal',
            !date && 'text-indigo-600'
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? (
            <span className='text-[0.75rem] font-semibold'>
              {date.toLocaleDateString('en-CA', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          ) : (
            <span className='text-[0.75rem] font-semibold'>Due date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
          onDayClick={() =>
            onSetDueDate(
              date?.toLocaleDateString('en-CA', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            )
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
