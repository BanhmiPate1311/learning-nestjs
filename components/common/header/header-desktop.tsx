import { Container, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ROUTE_LIST } from './routes';

export interface HeaderDesktopProps {}

export function HeaderDesktop(props: HeaderDesktopProps) {
  const router = useRouter();
  return (
    <Box display={{ xs: 'none', md: 'block' }} py={2}>
      <Container>
        <Stack direction="row" justifyContent="flex-end">
          {ROUTE_LIST.map((route) => (
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
        </Stack>
      </Container>
    </Box>
  );
}
