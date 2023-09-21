import { Box } from '@mui/material';
import React from 'react';

export interface FooterProps {}

export function Footer(props: FooterProps) {
  console.log('render Footer');

  return (
    <Box component="footer" py={2} textAlign="center">
      Footer
    </Box>
  );
}
