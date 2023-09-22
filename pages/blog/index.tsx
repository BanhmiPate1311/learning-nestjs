import { PostItem } from '@/components/blog';
import { MainLayout } from '@/components/layout';
import { Post } from '@/models';
import { getPostList } from '@/utils/posts';
import { Box, Divider } from '@mui/material';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import * as React from 'react';
// tsdrp

export interface BlogListPageProps {
  posts: Post[];
}

export default function BlogListPage({ posts }: BlogListPageProps) {
  console.log('post: ', posts);
  return (
    <Box>
      <h1>Blog</h1>

      <Box component="ul" sx={{ listStyleType: 'none', p: 0 }}>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>
              <PostItem post={post} />
            </Link>
            <Divider sx={{ my: 3 }} />
          </li>
        ))}
      </Box>
    </Box>
  );
}

BlogListPage.Layout = MainLayout;

export const getStaticProps: GetStaticProps<BlogListPageProps> = async (context: GetStaticPropsContext) => {
  // convert markdown files into list of javascript objects
  const postList = await getPostList();
  return {
    props: {
      posts: postList, // cắt bớt dữ liệu, chỉ lấy id và title
    },
  };
};
