import { MainLayout } from '@/components/layout';
import { WorkList } from '@/components/work';
import { WorkFilters } from '@/components/work/work-filters';
import { useWorkDetails, useWorkList } from '@/hooks';
import { ListParams, WorkFiltersPayload } from '@/models';
import { Box, Pagination, Skeleton, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

export interface AddEditWorkPageProps {}

export default function AddEditWorkPage(props: AddEditWorkPageProps) {
  const router = useRouter();
  const { workId } = router.query;
  const isAddMode = workId === 'add';

  const { data, isLoading } = useWorkDetails({
    workId: (workId as string) || '',
    enabled: router.isReady && !isAddMode,
  });

  console.log({ workId, isAddMode, ready: router.isReady, data });
  return (
    <Box>
      <Box mb={4} mt={8}>
        <Typography component="h1" variant="h3" fontWeight="bold">
          {isAddMode ? 'Add new work' : `Edit work #${workId}`}
        </Typography>
      </Box>
      <Box>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem illum voluptatem, qui illo ex, iure officiis
        officia quibusdam, deleniti impedit tempore ea. Necessitatibus nostrum cum, suscipit atque vero inventore
        dolorum.
      </Box>
    </Box>
  );
}

AddEditWorkPage.Layout = MainLayout;

// export async function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: false,
//   };
// }

// export async function getStaticProps() {
//   return {
//     props: {},
//   };
// }

// browser: http://localhost:3000/api/works
// Next server: /api/works --> proxy to https://js-post-api.herokuapp.com/api/works
// API server: https://js-post-api.herokuapp.com/api/works
