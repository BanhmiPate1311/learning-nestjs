import { Box } from '@mui/material';
import React from 'react';
import { HeaderMobile } from './header-mobile';
import { HeaderDesktop } from './header-desktop';

export function Header() {
  return (
    <>
      <HeaderMobile />
      <HeaderDesktop />
    </>
  );
}
