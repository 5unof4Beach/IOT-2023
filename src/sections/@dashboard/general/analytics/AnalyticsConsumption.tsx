// @mui
import { Card, CardHeader, Grid, IconButton, Skeleton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { log } from 'console';
import { useEffect } from 'react';
import Iconify from 'src/components/Iconify';
import useAuth from 'src/hooks/useAuth';
import { saveGPTResponse } from 'src/redux/slices/step-heart';
import { useSelector, useDispatch } from 'src/redux/store';

// components
export default function AnalyticsConsumption() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { isLoading, userData } = useSelector((state) => state.stepHeart);
  const { user, refetchUser } = useAuth();

  function Title() {
    return (
      <Grid container alignItems="center" justifyContent="space-between">
        <Typography variant="h5">Hoạt động của bạn</Typography>
        <IconButton
          onClick={() => {
            handleGetData();
          }}
        >
          <Iconify icon={'mdi:reload'} width={24} height={24} />
        </IconButton>
      </Grid>
    );
  }

  function handleGetData() {
    const prompt =
      'I\'ve walked 1780 steps today, my bmi is 22, how much calories have I burned today. give response in vietnamese with the following format like: "Congrats, you\'ve burned {n} calories" or "Great, {n} calories were burned today" while n is the amount of calories you calculated';
    dispatch(saveGPTResponse(user?.email, prompt, 'consumption_analytics'));
  }

  return (
    <Card>
      <CardHeader title={<Title />} />
      <Grid container padding={theme.spacing(3)}>
        {isLoading ? (
          <>
            <Skeleton variant="text" sx={{ width: '100%', height: 30 }} />
            <Skeleton variant="text" sx={{ width: '100%', height: 30 }} />
            <Skeleton variant="text" sx={{ width: '100%', height: 30 }} />
            <Skeleton variant="text" sx={{ width: '100%', height: 30 }} />
            <Skeleton variant="text" sx={{ width: '100%', height: 30 }} />
          </>
        ) : (
          <Typography fontWeight={500}>
            {userData ? userData.consumption_analytics : user?.consumption_analytics}
          </Typography>
        )}
      </Grid>
    </Card>
  );
}
