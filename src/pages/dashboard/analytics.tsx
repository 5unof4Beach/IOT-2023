// @mui
import { Grid, Container } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections
import {
  AnalyticsWebsiteVisits,
  AnalyticsConversionRates,
} from '../../sections/@dashboard/general/analytics';
import { useDispatch } from 'src/redux/store';
import { getStepHeart } from 'src/redux/slices/step-heart';
import { useEffect } from 'react';
import AnalyticsRecommandation from 'src/sections/@dashboard/general/analytics/AnalyticsRecommandation';
import AnalyticsConsumption from 'src/sections/@dashboard/general/analytics/AnalyticsConsumption';
import useAuth from 'src/hooks/useAuth';
import useInterval from 'src/hooks/useInterval';

// ----------------------------------------------------------------------

GeneralAnalytics.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralAnalytics() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { user } = useAuth();

  useInterval(() => {
    dispatch(getStepHeart(user?.email));
  }, 10000);

  return (
    <Page title="General: Analytics">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsWebsiteVisits />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsConsumption />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsRecommandation />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
