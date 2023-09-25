import { useAuth } from '@/hooks';
import { Container, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { ROUTE_LIST } from './routes';

export interface HeaderDesktopProps {}

export function HeaderDesktop(props: HeaderDesktopProps) {
  const router = useRouter();
  const { profile, logout } = useAuth();
  const isLoggedIn = Boolean(profile?.username);

  const routeList = ROUTE_LIST.filter((route) => !route.requireLogin || isLoggedIn);

  return (
    <Box display={{ xs: 'none', md: 'block' }} py={2}>
      <Container>
        <Stack direction="row" justifyContent="flex-end">
          {routeList.map((route) => (
            <Link key={route.path} href={route.path}>
              <Typography
                component="span"
                className={`mui-link ${clsx({ active: router.pathname === route.path })}`}
                sx={{ ml: 2, fontWeight: 'medium' }}
              >
                {route.label}
              </Typography>
            </Link>
          ))}

          {!isLoggedIn ? (
            <Link href="/login">
              <Typography component="span" sx={{ ml: 2, fontWeight: 'medium', cursor: 'pointer' }}>
                Login
              </Typography>
            </Link>
          ) : (
            <Link href="/login">
              <Typography component="span" sx={{ ml: 2, fontWeight: 'medium' }} onClick={logout}>
                Logout
              </Typography>
            </Link>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
