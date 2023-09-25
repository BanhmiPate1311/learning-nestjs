import { Post } from '@/models';
import { Box, Divider, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';

export interface PostItemProps {
  post: Post;
}

export function PostItem({ post }: PostItemProps) {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold">
        {post.title}
      </Typography>

      <Typography component="div" variant="body1" my={2} sx={{ display: 'flex' }}>
        {moment(post.publishedDate).format('DD MMM yyyy')}
        <Divider orientation="vertical" sx={{ mx: 2 }} flexItem />
        {post.tagList.join(', ')}
      </Typography>

      <Typography variant="body2">{post.description}</Typography>
    </Box>
  );
}
