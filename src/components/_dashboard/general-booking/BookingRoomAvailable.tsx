import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme } from '@mui/material/styles';
import { Card, CardHeader, Stack, Box, Typography } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_DATA = [75];
const SOLD_OUT = 120;
const AVAILABLE = 66;

type LegendProps = {
  label: string;
  number: number;
};

function Legend({ label, number }: LegendProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box
          sx={{
            width: 16,
            height: 16,
            bgcolor: 'grey.50016',
            borderRadius: 0.75,
            ...(label === 'Sold out' && {
              bgcolor: 'primary.main'
            })
          }}
        />
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {label}
        </Typography>
      </Stack>
      <Typography variant="subtitle1">{number}m</Typography>
    </Stack>
  );
}

export default function BookingRoomAvailable() {
  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    legend: { show: false },
    grid: {
      padding: { top: -32, bottom: -32 }
    },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          [
            { offset: 0, color: theme.palette.primary.light },
            { offset: 100, color: theme.palette.primary.main }
          ]
        ]
      }
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '64%' },
        dataLabels: {
          name: { offsetY: -16 },
          value: { offsetY: 8 },
          total: {
            label: 'Đã gop',
            formatter: () => fNumber(186)
          }
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Dự án hiện tại" sx={{ mb: 8 }} />
      <ReactApexChart type="radialBar" series={CHART_DATA} options={chartOptions} height={310} />

      <Stack spacing={2} sx={{ p: 5 }}>
        <Legend label="Đã góp" number={SOLD_OUT} />
        <Legend label="Còn" number={AVAILABLE} />
      </Stack>
    </Card>
  );
}