import { useAuth } from '@/hooks';
import { Container, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ROUTE_LIST } from './routes';

export interface HeaderDesktopProps {}

export function HeaderDesktop(props: HeaderDesktopProps) {
  const router = useRouter();
  const { profile, logout } = useAuth();
  const isLoggedIn = Boolean(profile?.username);

  const routeList = ROUTE_LIST.filter((route) => !route.requireLogin || isLoggedIn);
  // const [routeList, setRouteList] = useState(() => ROUTE_LIST.filter((route) => !route.requireLogin));

  // server render menu not required Login (A)
  // client - first render menu not required login (B)
  // client - useEffect render second time menu required login

  // useEffect(() => {
  // after the first render
  // calc routeList and setRoute
  //   setRouteList(ROUTE_LIST.filter((route) => !route.requireLogin || isLoggedIn));
  // }, [isLoggedIn]);

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
