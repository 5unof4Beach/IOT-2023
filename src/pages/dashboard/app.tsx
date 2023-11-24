// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections
import {
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  AppWidget,
} from '../../sections/@dashboard/general/app';
import { useState } from 'react';

// ----------------------------------------------------------------------

GeneralApp.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { user } = useAuth();
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const [bmi, setBmi] = useState(user?.weight / Math.pow(user?.height / 100, 2));

  const evaluate = () => {
    if (bmi < 18.5) {
      return { status: 'Thiếu cân', color: '#26ABE3' };
    }
    if (bmi > 18.5 && bmi < 24.9) {
      return { status: 'Khỏe mạnh', color: '#6B7F37' };
    }
    if (bmi > 25 && bmi < 29.9) {
      return { status: 'Thừa cân', color: '#F0A91D' };
    }
    if (bmi > 18.5 && bmi < 24.9) {
      return { status: 'Béo phì', color: '#E9752C' };
    }
  };

  const eveluation = evaluate();

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="BMI"
              percent={0.2}
              total={bmi}
              chartColor={theme.palette.chart.blue[0]}
              chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidget
              title="Tình trạng sức khỏe của bạn"
              text={eveluation?.status as string}
              color={eveluation?.color as string}
              icon="solar:health-bold-duotone"
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
