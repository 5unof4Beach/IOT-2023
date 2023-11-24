import merge from 'lodash/merge';
// @mui
import { Box, Card, CardHeader } from '@mui/material';
import { useTheme} from '@mui/material/styles';

import { useSelector } from 'src/redux/store';
// components
import ReactApexChart, { BaseOptionChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

function getFormatDateFollowMonth() {
  const today = new Date();

  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  const formattedDate = `${month}-${year}`;
  return formattedDate;
}

function generateDateLabelsFor30Days() {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const dateLabels = [];

  for (let i = 1; i <= 30; i++) {
    const date = new Date(currentYear, currentMonth, i);
    dateLabels.push(date.getTime());
  }

  return dateLabels;
}


export default function AnalyticsConversionRates() {
  const theme = useTheme();
  const { stepHeart } = useSelector((state) => state.stepHeart);
const today = new Date();

const filteredData = stepHeart.filter((item: any) => {
  const itemDate = new Date(item.createdAt);
  return itemDate.getMonth() === today.getMonth() && itemDate.getDate() >= 1 && itemDate.getDate() <= 30;
});

const hourlyData = Array.from({ length: 30 }, () => ({
  step_count: 0,
  heart_rate: 0,
  count: 0,
}));

filteredData.forEach((item: any) => {
  const dayOfMonth = new Date(item.createdAt).getDate() - 1;
  hourlyData[dayOfMonth].step_count += item.step_count;
  hourlyData[dayOfMonth].heart_rate += item.heart_rate;
  hourlyData[dayOfMonth].count += 1;
});

hourlyData.forEach((dayData) => {
  if (dayData.count > 0) {
    dayData.heart_rate /= dayData.count;
  }
});

const stepCount: any = [];
const heartRate: any = [];
hourlyData.forEach((dayData) => {
  stepCount.push(dayData.step_count);
  heartRate.push(dayData.heart_rate);
});


  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.chart.violet[0],
      theme.palette.chart.red[0],
    ],
    stroke: { width: [0, 3] },
    plotOptions: { bar: { columnWidth: '14%' } },
    fill: { type: ['solid', 'gradient'] },
    yaxis: {
        labels: {
            formatter: function (value: number) {
                return value;
            },
        },
    },
    xaxis: {
        type: 'datetime',
        categories: generateDateLabelsFor30Days(),
        labels: {
            datetimeUTC: false,
            format: 'dd', 
        },
    },
    tooltip: {
        shared: true,
        intersect: false,
        y: {
            formatter: (y: number) => {
                if (typeof y !== 'undefined') {
                    return `${y.toFixed(0)}`;
                }
                return y;
            },
        },
    },
});

  const CHART_DATA = [
    {
      name: 'Bước chân',
      type: 'column',
      data: stepCount,
    },
    {
      name: 'Nhịp tim',
      type: 'area',
      data: heartRate,
    },
  ];

  return (
    <Card>
      <CardHeader title="30 ngày qua" subheader={getFormatDateFollowMonth()} />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
