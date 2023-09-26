import { Work } from '@/models';
import { Box, Divider, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { WorkCard } from './work-card';
import Image from 'next/image';
import { WorkSkeleton } from '.';

export interface WorkListProps {
  workList: Work[];
  loading?: boolean;
}

export function WorkList({ workList, loading }: WorkListProps) {
  if (loading)
    return (
      <Box>
        {Array.from({ length: 3 }).map((_, index) => (
          <Fragment key={index}>
            <WorkSkeleton />
            <Divider sx={{ my: 3 }} />
          </Fragment>
        ))}
      </Box>
    );

  if (workList.length === 0)
    return (
      <Box textAlign="center" mt={8}>
        <Image
          src={'https://cdn.iconscout.com/icon/premium/png-256-thumb/no-data-4372359-3627043.png?f=webp&w=256'}
          width={150}
          height={150}
          layout="fixed"
          alt="no data"
        />

        <Typography>No data</Typography>
      </Box>
    );
  return (
    <Box>
      {workList.map((work) => (
        <Fragment key={work.id}>
          <WorkCard work={work} />
          <Divider sx={{ my: 3 }} />
        </Fragment>
      ))}
    </Box>
  );
}
