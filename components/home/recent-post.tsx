import { Box, Container, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { PostCard } from './post-card';
import { Post } from '@/models';

export function RecentPosts() {
  // call API to get recent posts
  const postList: Post[] = [
    {
      id: '1',
      slug: '',
      title: 'Lorem ipsum dolor sit amet consectetur.',
      publishedDate: '2023-09-22T10:00:00Z',
      tagList: ['Design', 'Pattern'],
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam optio, error, necessitatibus voluptatem delectus ratione, adipisci ducimus alias aspernatur enim consequatur?',
    },
    {
      id: '2',
      slug: '',
      title: 'Lorem ipsum dolor sit amet consectetur.',
      publishedDate: '2023-09-22T10:00:00Z',
      tagList: ['Figma', 'Icon Design'],
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam optio, error, necessitatibus voluptatem delectus ratione, adipisci ducimus alias aspernatur enim consequatur?',
    },
  ];
  return (
    <Box component="section" bgcolor="secondary.light" pt={2} pb={4}>
      <Container>
        <Stack direction="row" mb={2} justifyContent={{ xs: 'center', md: 'space-between' }} alignItems="center">
          <Typography variant="h5">Recent Posts</Typography>
          <Link href="/blog">
            <Typography component="span" className="mui-link" sx={{ display: { xs: 'none', md: 'inline-block' } }}>
              View all
            </Typography>
          </Link>
        </Stack>
        <Stack
          direction={{
            xs: 'column',
            md: 'row',
          }}
          spacing={3}
          sx={{
            '& > div': {
              width: {
                xs: '100%',
                md: '50%',
              },
            },
          }}
        >
          {postList.map((post) => (
            <Box key={post.id}>
              <PostCard post={post} />
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
