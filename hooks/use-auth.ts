import { authApi } from '@/api-client';
import { LoginPayLoad, UserProfile } from '@/models';
import useSWR from 'swr';
import { PublicConfiguration, SWRConfiguration } from 'swr/_internal';

// Auth --> Protected Pages
// <Auth>{children}</Auth>
export const useAuth = (options?: Partial<SWRConfiguration>) => {
  // profile
  //
  const {data: profile, error, mutate } = useSWR<UserProfile | null>('/profile', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
    ...options,
  }); // prettier-ignore

  console.log({ profile, error });

  const firstLoading = profile === undefined && error === undefined;

  const login = async (payload: LoginPayLoad) => {
    await authApi.login(payload);

    await mutate();
  };

  async function logout() {
    await authApi.logout();
    mutate({}, false);
  }

  return { profile, error, login, logout, firstLoading };
};
