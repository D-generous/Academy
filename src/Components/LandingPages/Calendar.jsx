import { Stack } from '@mui/material';
import React from 'react';

const Calendar = ({ date, description, name }) => {
  return (
    <Stack className="Stackst-group-item flex flex-col gap-3 p-3 my-2 shadow-md bg-slate-100 hover:bg-slate-200">
        <p className='flex justify-content-between align-items-center'>
          <span className="text-xl font-bold">{date}</span>
          <span className="text-end ms-auto">{name}</span>
        </p>
        <p>{description}</p>
    </Stack>
  );
};

export default Calendar;
