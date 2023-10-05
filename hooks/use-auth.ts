import { authApi } from '@/api-client';
import { StorageKeys } from '@/constants';
import { LoginPayLoad, UserProfile } from '@/models';
import useSWR, { SWRConfiguration } from 'swr';

function getUserInfo(): UserProfile | null {
  try {
    return JSON.parse(localStorage.getItem(StorageKeys.USER_INFO) || '');
  } catch (error) {
    // console.log('failed to parse user info from local storage: ', error);
    return null;
  }
}

// Auth --> Protected Pages
// <Auth>{children}</Auth>
export const useAuth = (options?: Partial<SWRConfiguration>) => {
  // profile
  //
  const {data: profile, error, mutate } = useSWR<UserProfile | null>('/profile', {
    dedupingInterval: 60 * 60 * 1000,  // 1hr
    revalidateOnFocus: false,
    ...options,
    fallbackData:getUserInfo(),
    onSuccess(data){
      // save user info to local storage
      localStorage.setItem(StorageKeys.USER_INFO,JSON.stringify(data))
    },
    onError(err ){
      // failed to get profile --> logout
      console.log("err: ", err); // send error log to server if any
      logout()
    }
  }); // prettier-ignore

  // console.log({ profile, error });

  const firstLoading = profile === undefined && error === undefined;

  const login = async (payload: LoginPayLoad) => {
    await authApi.login(payload);

    await mutate();
  };

  async function logout() {
    await authApi.logout();
    mutate(null, false);
    localStorage.removeItem(StorageKeys.USER_INFO);
  }

  return { profile, error, login, logout, firstLoading, isLoggedIn: Boolean(profile) };
};
