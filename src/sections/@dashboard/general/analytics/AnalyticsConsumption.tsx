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
export default function AnalyticsConsumption() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { isLoading, userData } = useSelector((state) => state.stepHeart);
  const { user, refetchUser } = useAuth();
  const [bmi, setBmi] = useState(user?.weight / Math.pow(user?.height / 100, 2));

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
    const prompt = `Hôm nay tôi đã đi 1200 bước, bmi của tôi là ${bmi}, tôi là ${user?.gender}, cao ${user?.height} cm, nặng {${user?.weight}} kg, ${user?.age} tuổi. Tính sô lượng calo tôi đã đốt. Đưa ra câu trả lời không quá 50 từ, không cần đưa ra công thức tính, luôn phải có số calo tính được.`;
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
