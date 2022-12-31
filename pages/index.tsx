import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Calendar } from 'react-calendar';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { Box, TextField, Typography } from '@mui/material';
import '@fontsource/roboto/500.css';

const Index: NextPage = () => {
  const router = useRouter();
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [width, setWidth] = useState<number | null>(null);

  // Window is undefined initially
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const onDatePicked = (datePicked: Dayjs | null) => {
    const MMDDYYYY = dayjs(datePicked).format('MMDDYYYY');
    router.push(`/images/${MMDDYYYY}`);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h6">
        Every day at 8 AM, screenshots of CNN and FOX headlines will be taken.
      </Typography>
      <Typography variant="h6">
        Select a day below to see what the news looked like on that day.
      </Typography>
      <Box mt="25px">
        {width! <= 815 ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Let's go back in time"
              value={date}
              onChange={(date) => setDate(date)}
              onAccept={(date) => onDatePicked(date)}
              renderInput={(params) => <TextField {...params} />}
              minDate={dayjs('12/14/2022')}
            />
          </LocalizationProvider>
        ) : (
          <Calendar
            minDate={new Date('12/14/2022')}
            value={date?.toDate()}
            onChange={(date: Date) => setDate(dayjs(date))}
            onClickDay={(date: Date) => onDatePicked(dayjs(date))}
            calendarType="US"
          />
        )}
      </Box>
    </Box>
  );
};

export default Index;
