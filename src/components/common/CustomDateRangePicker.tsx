import * as React from 'react';
import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';

interface CustomDateRangePickerProps {
  label?: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  onChange: (range: { startDate: Dayjs | null; endDate: Dayjs | null }) => void;
}

const CustomDateRangePicker: React.FC<CustomDateRangePickerProps> = ({
  label = 'Date Range',
  startDate,
  endDate,
  onChange,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" flexDirection="column" gap={2}>
        {/* <Typography fontWeight="bold">{label}</Typography> */}
        <Box display="flex" gap={2}>
          <DatePicker
            // label="Start Date"
            value={startDate}
            onChange={(date) => onChange({ startDate: date, endDate })}
            views={['year', 'month', 'day']}
            openTo="day"
            // renderInput={(params) => <TextField {...params} fullWidth />}
          />
          <div className="border-l-[1px] border-l-secondary2" />
          <DatePicker
            // label="End Date"
            value={endDate}
            onChange={(date) => onChange({ startDate, endDate: date })}
            views={['year', 'month', 'day']}
            openTo="day"
            // renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default CustomDateRangePicker;
