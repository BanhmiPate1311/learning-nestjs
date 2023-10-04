import { MainLayout } from '@/components/layout';
import { WorkForm, WorkList } from '@/components/work';
import { WorkFilters } from '@/components/work/work-filters';
import { useAddWork, useWorkDetails, useWorkList } from '@/hooks';
import { ListParams, WorkFiltersPayload } from '@/models';
import { Box, Container, Pagination, Skeleton, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useState } from 'react';
import { toast } from 'react-toastify';

export interface AddEditWorkPageProps {}

export default function AddEditWorkPage(props: AddEditWorkPageProps) {
  const router = useRouter();
  const { workId } = router.query;
  const isAddMode = workId === 'add';

  const {
    data: workDetails,
    isLoading,
    updateWork,
  } = useWorkDetails({
    workId: (workId as string) || '',
    enabled: router.isReady && !isAddMode,
  });

  const addNewWork = useAddWork();

  console.log({ workDetails, isLoading });

  async function handleSubmit(payload: FormData) {
    try {
      let newWork = null;
      if (isAddMode) {
        newWork = await addNewWork(payload);
        toast.success(`add work successfully, ${newWork?.id}`);
      } else {
        newWork = await updateWork(payload);
        toast.success('update work successfully');
      }
      // navigate to details page - required ID - newWork.id
      router.push('/works');
    } catch (error) {
      console.log('error: ', error);
    }
  }
  return (
    <Box>
      <Container>
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
        {(isAddMode || workDetails) && (
          <Box>
            <WorkForm initialValues={workDetails} onSubmit={handleSubmit} />
          </Box>
        )}
      </Container>
      <Script src="https://widget.cloudinary.com/v2.0/global/all.js" strategy="afterInteractive" />
    </Box>
  );
}

AddEditWorkPage.Layout = MainLayout;
AddEditWorkPage.requireLogin = true;

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
