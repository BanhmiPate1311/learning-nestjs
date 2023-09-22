import { Work } from '@/models';
import { Box, Chip, Stack, Typography } from '@mui/material';
import moment from 'moment';
import Image from 'next/image';

export interface WorkCardProps {
  work: Work;
}

export function WorkCard({ work }: WorkCardProps) {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
      <Box width={{ xs: '100%', md: '246px' }} flexShrink={0}>
        <Image
          src={work.thumbnailUrl}
          layout="responsive"
          width={246}
          height={180}
          alt="work thumbnail"
          priority={true}
        />
      </Box>

      <Box>
        <Typography variant="h4" fontWeight="bold">
          {work.title}
        </Typography>
        <Stack direction="row" my={2}>
          <Chip color="default" label={moment(Number(work.createdAt)).format('yyyy')} size="small" />
          <Typography ml={3} color="GrayText">
            {work.tagList.join(', ')}
          </Typography>
        </Stack>

        <Typography>{work.shortDescription}</Typography>
      </Box>
    </Stack>
  );
}
