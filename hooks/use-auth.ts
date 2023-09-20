import { authApi } from '@/api-client';
import useSWR from 'swr';
import { PublicConfiguration } from 'swr/_internal';

// Auth --> Protected Pages
// <Auth>{children}</Auth>
export const useAuth = (options?: Partial<PublicConfiguration>) => {
  // profile
  //
  const {data: profile, error, mutate } = useSWR('/profile', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
    ...options,
  }); // prettier-ignore

  console.log({ profile, error });

  const firstLoading = profile === undefined && error === undefined;

  const login = async () => {
    await authApi.login({
      username: 'test',
      password: '123123',
    });

    await mutate();
  };

  async function logout() {
    await authApi.logout();
    mutate({}, false);
  }

  return { profile, error, login, logout, firstLoading };
};
