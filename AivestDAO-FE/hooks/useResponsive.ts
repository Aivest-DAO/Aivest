import { useEffect, useMemo } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

export const useResponsive = () => {
  const isDesktopOrLaptop = useMediaQuery('(min-width:600px)', {
    defaultMatches: true,
  })
  const isTabletOrMobile = useMemo(() => {
    return !isDesktopOrLaptop;
  }, [isDesktopOrLaptop]);

  return {
    isDesktopOrLaptop,
    isTabletOrMobile,
  };
};
