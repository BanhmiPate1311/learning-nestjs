import { MainLayout } from '@/components/layout';
import { WorkList } from '@/components/work';
import { WorkFilters } from '@/components/work/work-filters';
import { useAuth, useWorkList } from '@/hooks';
import { ListParams, WorkFiltersPayload } from '@/models';
import { Box, Button, Pagination, Skeleton, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

export interface WorksPageProps {}

export default function WorksPage(props: WorksPageProps) {
  const router = useRouter();
  const { isLoggedIn, profile } = useAuth();
  console.log('profile: ', profile);
  console.log('isLoggedIn: ', isLoggedIn);
  const filters: Partial<ListParams> = { _page: 1, _limit: 3, ...router.query };

  const initFiltersPayload: WorkFiltersPayload = {
    search: filters.title_like || '',
    selectedTagList: filters.tagList_like !== '' ? filters.tagList_like?.split('|') : [],
  };
  console.log('page render', { search: filters.title_like, isReady: router.isReady });
  const { data, isLoading } = useWorkList({ params: filters, enabled: router.isReady });

  const { _limit, _totalRows, _page } = data?.pagination || {};
  const totalPages = Boolean(_totalRows) ? Math.ceil(_totalRows / _limit) : 0;

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...filters,
          _page: value,
        },
      },
      undefined,
      { shallow: true }, // không chạy lại getstaticProp nữa, chỉ chạy trên phía client
    );
  };

  const handleFilterChange = (newFilter: WorkFiltersPayload) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...filters,
          _page: 1,
          title_like: newFilter.search,
          tagList_like: newFilter.tagList_like,
        },
      },
      undefined,
      { shallow: true }, // không chạy lại getstaticProp nữa, chỉ chạy trên phía client
    );
  };

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4} mt={8}>
        <Typography component="h1" variant="h3" fontWeight="bold">
          Work
        </Typography>

        {isLoggedIn && (
          <Button variant="contained" onClick={() => router.push('/works/add')}>
            Add new work
          </Button>
        )}
      </Stack>

      {/* router.isReady : chỉ render sau khi router đã được cập nhật */}
      {router.isReady ? (
        <WorkFilters initialValues={initFiltersPayload} onSubmit={handleFilterChange} />
      ) : (
        <Skeleton variant="rectangular" height={40} sx={{ display: 'inline-block', width: '100%', mt: 2, mb: 1 }} />
      )}

      <WorkList workList={data?.data || []} loading={!router.isReady || isLoading} />

      {totalPages > 0 && (
        <Stack alignItems="center">
          <Pagination count={totalPages} page={_page} onChange={handlePageChange}></Pagination>
        </Stack>
      )}
    </Box>
  );
}

WorksPage.Layout = MainLayout;

export async function getStaticProps() {
  return {
    props: {},
  };
}

// browser: http://localhost:3000/api/works
// Next server: /api/works --> proxy to https://js-post-api.herokuapp.com/api/works
// API server: https://js-post-api.herokuapp.com/api/works
