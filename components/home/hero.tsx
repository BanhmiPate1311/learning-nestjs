import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import avatar from '@/images/avatar.png';

export function HeroSection() {
  return (
    <Box component="section" pt={{ xs: 4, md: 18 }} pb={{ xs: 7, md: 9 }}>
      <Container>
        <Stack
          spacing={8}
          direction={{ xs: 'column-reverse', md: 'row' }}
          alignItems={{ xs: 'center', md: 'flex-start' }}
          textAlign={{ xs: 'center', md: 'left' }}
        >
          <Box>
            <Typography component="h1" variant="h3" fontWeight="bold">
              Hi, I am John,
              <br /> Creative Technologist
            </Typography>
            <Typography my={{ xs: 2.5, md: 5 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, libero corrupti necessitatibus distinctio
              incidunt fugiat consequuntur ad dolores architecto magni.
            </Typography>
            <Button variant="contained" size="large">
              Download Resume
            </Button>
          </Box>
          <Box sx={{ minWidth: '240px', boxShadow: '-5px 13px', color: 'secondary.light', borderRadius: '50%' }}>
            <Image src={avatar} layout="responsive" alt="avatar" style={{ display: 'block' }} />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
