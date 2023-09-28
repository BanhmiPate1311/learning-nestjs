import { workApi } from '@/api-client';
import axiosClient from '@/api-client/axios-client';
import { QueryKeys } from '@/constants';
import { ListParams, ListResponse, Work } from '@/models';
import qs from 'qs';
import useSWR, { SWRConfiguration } from 'swr';
import useSWRInfinite, { SWRInfiniteConfiguration } from 'swr/infinite';

export interface UseWorkListInfinityProps {
  params: Partial<ListParams>;
  options?: SWRInfiniteConfiguration;
  enabled?: boolean;
}

export function useWorkListInfinity({ params, options, enabled = true }: UseWorkListInfinityProps) {
  const swrResponse = useSWRInfinite<ListResponse<Work>>(
    (index: number, previousPageData: ListResponse<Work>) => {
      if (!enabled) return null;
      // index start at 0
      const page = index + 1;
      const query: Partial<ListParams> = {
        ...params,
        _page: page,
        _limit: 5,
      };

      // return null in case page > totalPages
      if (previousPageData) {
        const { _limit, _totalRows } = previousPageData.pagination || { _limit: 5, _totalRows: 0 };
        const totalPages = Math.ceil(_totalRows / _limit);
        if (page > totalPages) return null;
      }
      return `/works?${qs.stringify(query)}`; // null
    },
    (url: string) => axiosClient.get(url),
    { ...options },
  );
  return swrResponse;
}
