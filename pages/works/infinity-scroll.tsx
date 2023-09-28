import { MainLayout } from '@/components/layout';
import { WorkList } from '@/components/work';
import { WorkFilters } from '@/components/work/work-filters';
import { useWorkListInfinity } from '@/hooks';
import { ListParams, ListResponse, Work, WorkFiltersPayload } from '@/models';
import { Box, Button, CircularProgress, Skeleton, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';

export interface WorksPageProps {}

export default function WorksPage(props: WorksPageProps) {
  const router = useRouter();
  const filters: Partial<ListParams> = { ...router.query };

  const initFiltersPayload: WorkFiltersPayload = {
    search: filters.title_like || '',
    selectedTagList: filters.tagList_like !== '' ? filters.tagList_like?.split('|') : [],
  };
  // console.log('page render', { search: filters.title_like, isReady: router.isReady });
  const { data, isLoading, isValidating, size, setSize } = useWorkListInfinity({
    params: filters,
    enabled: router.isReady,
  });
  // data: [ responsePage1, responsePage2 ]
  // responsePage1: { data, pagination }
  // workList = [ ...data1, ...data2, ...dataN ]
  const workList: Array<Work> =
    data?.reduce((result: Array<Work>, currentPage: ListResponse<Work>) => {
      result.push(...currentPage.data);
      return result;
    }, []) || [];

  const totalRows = data?.[0]?.pagination?._totalRows || 0;
  const showLoadMore = totalRows > workList.length;
  const loadingMore = isValidating && workList.length > 0;

  const { ref } = useInView({
    onChange(inView, entry) {
      if (inView) setSize((x) => x + 1);
    },
  });

  const handleFilterChange = (newFilter: WorkFiltersPayload) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...filters,
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
      <Box mb={4} mt={8}>
        <Typography component="h1" variant="h3" fontWeight="bold">
          Work
        </Typography>
      </Box>

      {/* router.isReady : chỉ render sau khi router đã được cập nhật */}
      {router.isReady ? (
        <WorkFilters initialValues={initFiltersPayload} onSubmit={handleFilterChange} />
      ) : (
        <Skeleton variant="rectangular" height={40} sx={{ display: 'inline-block', width: '100%', mt: 2, mb: 1 }} />
      )}

      <WorkList workList={workList} loading={!router.isReady || isLoading} />

      {showLoadMore && (
        <Button ref={ref} variant="contained" onClick={() => setSize((x) => x + 1)} disabled={loadingMore}>
          Load more {loadingMore && <CircularProgress size={24} />}
        </Button>
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
