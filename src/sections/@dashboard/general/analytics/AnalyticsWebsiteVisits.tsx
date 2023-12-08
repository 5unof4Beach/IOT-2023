import merge from 'lodash/merge';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import ReactApexChart, { BaseOptionChart } from '../../../../components/chart';
import { useSelector } from 'src/redux/store';
import { format, addHours } from 'date-fns';

// ----------------------------------------------------------------------

function getFormattedDate() {
  const today = new Date();

  const day = String(today.getUTCDate()).padStart(2, '0');
  const month = String(today.getUTCMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

const generateDateTimeLabels = () => {
  const labels = [];
  const today = new Date();

  for (let i = 0; i < 24; i++) {
    const formattedDate = format(addHours(today, i), 'HH:mm');
    labels.push(formattedDate);
  }

  return labels;
};

export default function AnalyticsWebsiteVisits() {
  const { stepHeart } = useSelector((state) => state.stepHeart);
  const today = getFormattedDate();

  const filteredData = stepHeart.filter((item: any) => item.createdAt.includes(today));
  console.log(today);
  const hourlyData = Array.from({ length: 24 }, (_, index) => ({
    step_count: 0,
    heart_rate: 0,
    count: 0,
  }));

  filteredData.forEach((item: any) => {
    const hour = new Date(item.createdAt).getHours();
    hourlyData[hour].step_count += item.step_count;
    hourlyData[hour].heart_rate += item.heart_rate;
    hourlyData[hour].count += 1;
  });

  hourlyData.forEach((hourData) => {
    if (hourData.count > 0) {
      hourData.heart_rate /= hourData.count;
    }
  });

  const stepCount: any = [];
  const heartRate: any = [];
  hourlyData.forEach((item) => {
    stepCount.push(item.step_count);
    heartRate.push(item.heart_rate);
  });

  const chartOptions = merge(BaseOptionChart(), {
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
      categories: generateDateTimeLabels().map((date) => new Date(`${today} ${date}:00`).getTime()),
      labels: {
        datetimeUTC: false,
        format: 'HH:mm',
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
      <CardHeader title="Ngày hôm nay" subheader={today} />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
