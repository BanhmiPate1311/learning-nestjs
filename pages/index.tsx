import { Seo } from '@/components/common';
import { FeatureWorks, HeroSection, RecentPosts } from '@/components/home';
import { MainLayout } from '@/components/layout';
import { NextPageWithLayout } from '@/models';
import { Box } from '@mui/material';
import React from 'react';

// export const Home: NextPageWithLayout = function() {
export const Home: NextPageWithLayout = () => {
  // const router = useRouter();

  // const goToDetailPage = () => {
  //   router.push({
  //     pathname: '/posts/[postId]',
  //     query: {
  //       postId: 123,
  //       ref: 'social',
  //     },
  //   });
  // };
  return (
    <Box>
      <Seo
        data={{
          title: 'Nextjs | Easy frontend',
          description: 'Step by step tutorials to build a full CURD website using Nextjs for beginer',
          url: 'https://learning-nestjs.vercel.app/',
          thumbnailUrl:
            'https://e7.pngegg.com/pngimages/515/775/png-clipart-lovely-cat-waving-cats-paw-cat-thumbnail.png',
        }}
      />
      <HeroSection />
      <RecentPosts />
      <FeatureWorks />
    </Box>
  );
};

Home.Layout = MainLayout;

export default Home;
