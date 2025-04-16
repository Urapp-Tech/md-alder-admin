import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import { faker } from '@faker-js/faker';
import { Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      stacked: false,
      grid: {
        display: false,
        drawTicks: false,
      },
      border: {
        display: false,
      },
      ticks: {
        display: true,
        padding: 20,
        color: '#A9A9A9',
      },
    },
    y: {
      grid: {
        drawTicks: false,
      },
      stacked: false,
      ticks: {
        stepSize: 3,
        padding: 20,
        color: '#A9A9A9',
      },
      border: {
        display: false,
      },
      max: 12,
    },
  },
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 10,
      },
    },
    title: {
      display: true,
      align: 'start',
      text: '',
      fullSize: false,
      position: 'top',
    },
    tooltip: {
      backgroundColor: '#FBFBFB',
      titleColor: '#A9A9A9',
      cornerRadius: 11,
      padding: 20,
      bodyColor: '#1E1C24',
      bodyAlign: 'center',
      caretPadding: 20,
      boxPadding: 20,
    },
  },
};

const DashboardChartLine = ({ data }: any) => {
  const monthLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const maleData = new Array(12).fill(0);
  const femaleData = new Array(12).fill(0);

  data?.forEach(({ month, gender, total }: any) => {
    const index = monthLabels.indexOf(month);
    if (index !== -1) {
      if (gender === 'male') maleData[index] = Number(total);
      else if (gender === 'female') femaleData[index] = Number(total);
    }
  });

  const chartData: ChartData<'line', number[], string> = {
    labels: monthLabels,
    datasets: [
      {
        label: 'Male',
        data: maleData,
        // borderColor: 'rgb(56, 0, 241,0.3)',
        borderColor: '#3800F1',
        backgroundColor: '#3800F1',
        tension: 1,
        cubicInterpolationMode: 'monotone',
        borderWidth: 5,
        hoverBorderColor: 'rgb(56, 0, 241)',
      },
      {
        label: 'Female',
        data: femaleData,
        backgroundColor: '#E126FF',
        borderColor: 'rgb(225, 38, 255,0.3)',
        tension: 1,
        cubicInterpolationMode: 'monotone',
        borderWidth: 5,
      },
    ],
  };

  return (
    <div className=" p-5">
      <div className="flex w-full items-center justify-between">
        <div>
          <h1 className=" p-2 font-an-gurmukhi text-lg font-medium">
            Patient Overview
          </h1>
        </div>
        <div className="alder-chart-legends self-center">
          <div className="alder-legend-male">
            <span className="text-xs text-[#676767]">
              <span className="mx-2 inline-block h-[10px] w-[10px] rounded-full  bg-[#3800F1]" />{' '}
              Male
            </span>
            <span className="text-xs text-[#676767]">
              <span className="mx-2 inline-block h-[10px] w-[10px] rounded-full  bg-[#E126FF]" />{' '}
              Female
            </span>
          </div>
        </div>
        {/* <div className="self-center">
          <Button
            variant="outlined"
            endIcon={<ExpandMoreIcon />}
            className="alder-card-border p-3 text-[#676767]"
          >
            Monthly
          </Button>
        </div> */}
      </div>
      <div className="h-[360px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default DashboardChartLine;
