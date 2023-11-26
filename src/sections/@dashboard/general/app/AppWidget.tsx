// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, Typography, Box } from '@mui/material';
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  alignItems: 'flex-start',
  padding: theme.spacing(3),
  height: '100%',
}));

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 120,
  height: 120,
  opacity: 0.12,
  position: 'absolute',
  right: theme.spacing(-3),
  color: theme.palette.common.white,
}));

// ----------------------------------------------------------------------

type Props = {
  icon: string;
  title: string;
  text: string;
  color?: string;
};

export default function AppWidget({ title, text, icon, color = 'primary' }: Props) {
  const theme = useTheme();

  return (
    <RootStyle
      sx={{
        backgroundColor: color,
      }}
    >
      <Box sx={{ ml: 3, color: 'common.white' }}>
        <Typography variant="h5" sx={{ opacity: 0.72 }}>
          {title}
        </Typography>
        <Typography variant="body1" fontWeight={500}> {text}</Typography>
      </Box>
      <IconStyle icon={icon} />
    </RootStyle>
  );
}
