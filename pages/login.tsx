import { LoginForm } from '@/components/auth';
import { useAuth } from '@/hooks';
import { LoginPayLoad } from '@/models';
import { Box, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

export default function LoginPage() {
  const router = useRouter();
  const { profile, login, logout } = useAuth({
    revalidateOnMount: false,
  });

  async function handleLoginSubmit(payload: LoginPayLoad) {
    try {
      await login(payload);
      // console.log('redirect to dashboard');
      router.push('/');
    } catch (error) {
      console.log('failed to login', error);
    }
  }

  return (
    <Box>
      <Paper
        elevation={4}
        sx={{
          m: 'auto',
          my: 8,
          p: 4,
          maxWidth: '480px',
          textAlign: 'center',
        }}
      >
        <Typography component="h1" variant="h5" mb={3}>
          Login Page
        </Typography>

        <LoginForm onSubmit={handleLoginSubmit} />
      </Paper>
    </Box>
  );
}
