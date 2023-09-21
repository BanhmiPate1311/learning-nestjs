import { HeroSection, RecentPosts } from '@/components/home';
import { MainLayout } from '@/components/layout';
import { NextPageWithLayout } from '@/models';
import { Box } from '@mui/material';

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
      <HeroSection />
      <RecentPosts />
    </Box>
  );
};

Home.Layout = MainLayout;

export default Home;
