import { Box, Skeleton, Stack, Typography } from '@mui/material';

export function WorkSkeleton() {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
      <Box width={{ xs: '100%', md: '246px' }} flexShrink={0}>
        <Skeleton variant="rectangular" width={246} height={180} />
      </Box>

      <Box flexGrow={1}>
        <Typography variant="h4" fontWeight="bold">
          <Skeleton />
        </Typography>
        <Stack direction="row" alignItems="center" my={2}>
          <Skeleton variant="rectangular" width={50} height={20} />

          <Typography ml={3} color="GrayText">
            <Skeleton width={50} />
          </Typography>
        </Stack>

        <Typography>
          <Skeleton />
          <Skeleton />
        </Typography>
      </Box>
    </Stack>
  );
}
