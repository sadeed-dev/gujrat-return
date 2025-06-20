import useFetch from "./use-fetch.hook";


export const useGetLfaStatistics = () => {
  return useFetch({
    queryKey: ['get-lfa-statistics'],
    api: 'dashboard/statistics',
    auth: true,
    backend: true
  });
};
