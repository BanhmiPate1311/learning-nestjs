import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export interface AuthProps {
  children: any;
  requireLogin?: Boolean;
}

export function Auth({ children, requireLogin = false }: AuthProps) {
  const router = useRouter();
  const { profile, firstLoading } = useAuth();

  useEffect(() => {
    if (!requireLogin) return; // do nothing if not require Login
    if (!firstLoading && !profile?.username) router.replace('/login');
  }, [router, profile, firstLoading, requireLogin]);

  if (requireLogin && !profile?.username) return <p>Loading...</p>;
  return <div>{children}</div>;
}
