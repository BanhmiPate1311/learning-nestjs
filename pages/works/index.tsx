import { MainLayout } from '@/components/layout';
import { WorkList } from '@/components/work';
import { WorkFilters } from '@/components/work/work-filters';
import { useWorkList } from '@/hooks';
import { ListParams, WorkFiltersPayload } from '@/models';
import { Box, Pagination, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

export interface WorksPageProps {}

export default function WorksPage(props: WorksPageProps) {
  const router = useRouter();
  const filters: Partial<ListParams> = { _page: 1, _limit: 3, ...router.query };
  // const [filters, setFilters] = useState<Partial<ListParams>>({ _page: 1, _limit: 3 });

  const { data, isLoading } = useWorkList({ params: filters });

  const { _limit, _totalRows, _page } = data?.pagination || {};
  const totalPages = Boolean(_totalRows) ? Math.ceil(_totalRows / _limit) : 0;

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   _page: value,
    // }));

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
    console.log('PAGE-LEVEL recieve form data: ', newFilter);
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   _page: 1,
    //   title_like: newFilter.search,
    // }));
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...filters,
          _page: 1,
          title_like: newFilter.search,
        },
      },
      undefined,
      { shallow: true }, // không chạy lại getstaticProp nữa, chỉ chạy trên phía client
    );
  };

  return (
    <Box>
      <Box mb={4} mt={8}>
        <Typography component="h1" variant="h3" fontWeight="bold">
          Work
        </Typography>
      </Box>

      <WorkFilters onSubmit={handleFilterChange} />
      <WorkList workList={data?.data || []} loading={isLoading} />

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
