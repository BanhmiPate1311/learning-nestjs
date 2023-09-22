import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material';
import { Box, Icon, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

export interface FooterProps {}

export function Footer(props: FooterProps) {
  const socialLinks = [
    { icon: Facebook, url: 'https://google.com' },
    { icon: Instagram, url: 'https://google.com' },
    { icon: Twitter, url: 'https://google.com' },
    { icon: LinkedIn, url: 'https://google.com' },
  ];
  return (
    <Box component="footer" py={2} textAlign="center">
      <Stack direction="row" justifyContent="center" py={2} spacing={2}>
        {socialLinks.map((item, index) => (
          <Link key={index} href={item.url} target="_blank" rel="noopener noreferrer">
            <Icon component={item.icon} fontSize="large" sx={{ fontSize: 48 }} />
          </Link> // luôn luôn có rel khi target="_blank"
        ))}
      </Stack>

      <Typography>Copyright ©{new Date().getFullYear()} All rights reserved</Typography>
    </Box>
  );
}
