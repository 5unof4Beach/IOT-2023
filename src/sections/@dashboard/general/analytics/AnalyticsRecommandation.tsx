// @mui
import { Card, CardHeader, Grid, IconButton, Skeleton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { log } from 'console';
import { useEffect, useState } from 'react';
import Iconify from 'src/components/Iconify';
import useAuth from 'src/hooks/useAuth';
import { saveGPTResponse } from 'src/redux/slices/step-heart';
import { useSelector, useDispatch } from 'src/redux/store';

// components
export default function AnalyticsRecommandation() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { isLoading, userData } = useSelector((state) => state.stepHeart);
  const { user, refetchUser } = useAuth();
  const [bmi, setBmi] = useState(user?.weight / Math.pow(user?.height / 100, 2));

  function Title() {
    return (
      <Grid container alignItems="center" justifyContent="space-between">
        <Typography variant="h5">Đề xuất cho bạn</Typography>
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
      `My bmi is ${bmi}, give me an walking excercise roadmap like how many calories to burn daily in order to bring my have healthy level bmi. Give me answer in vietnamese and limit your answer to 100 words`;
    dispatch(saveGPTResponse(user?.email, prompt, 'recommandation_analytics'));
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
            {userData ? userData.recommandation_analytics : user?.recommandation_analytics}
          </Typography>
        )}
      </Grid>
    </Card>
  );
}
