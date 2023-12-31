import { forwardRef } from 'react';
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<any, Props>(({ disabledLink = false, sx }, ref) => {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  const logo = (
    <Box ref={ref} sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 897.000000 1280.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <metadata>Created by potrace 1.15, written by Peter Selinger 2001-2017</metadata>
        <g
          transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
          fill={PRIMARY_MAIN}
          stroke="none"
        >
          <path
            d="M4378 12497 c-1367 -1367 -2446 -2760 -3232 -4172 -139 -250 -374
-721 -481 -965 -662 -1505 -828 -2868 -504 -4120 196 -760 573 -1415 1144
-1986 473 -473 978 -792 1587 -1002 521 -180 1085 -263 1693 -249 1162 27
2085 355 2890 1026 136 113 438 419 558 564 527 639 818 1336 914 2187 22 191
24 744 5 945 -64 648 -198 1156 -437 1653 -345 716 -868 1308 -1465 1660 -350
205 -744 350 -1150 421 -273 48 -353 55 -687 55 -212 1 -319 4 -314 11 56 73
316 396 415 515 353 424 625 720 1050 1146 486 486 773 743 1341 1199 149 120
271 220 273 224 1 3 -103 45 -230 93 -227 85 -617 230 -1045 389 -117 43 -309
115 -425 158 -428 159 -653 243 -860 320 -117 44 -305 113 -417 155 -168 63
-214 76 -262 76 l-59 0 -302 -303z m292 -6707 c365 -42 664 -235 892 -574 110
-165 178 -324 220 -519 19 -88 22 -132 22 -317 0 -186 -3 -229 -22 -320 -46
-211 -119 -384 -234 -551 -314 -460 -737 -641 -1288 -552 -269 43 -470 148
-670 352 -216 218 -346 455 -407 741 -25 119 -25 476 0 602 25 127 61 244 105
345 107 248 334 499 577 638 230 131 523 187 805 155z"
          />
        </g>
      </svg>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <NextLink href="/dashboard/app/">{logo}</NextLink>;
});

export default Logo;
