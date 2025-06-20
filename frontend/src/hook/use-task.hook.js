import useFetch from './use-fetch.hook';
import useMutate from './use-mutate.hook';

export const useGetReviewLfaTask = (lfaId, options = {}) => {
  return useFetch({
    queryKey: ['review-lfa-task', lfaId],
    api: `task/view/${lfaId}`,
    auth: true,
    backend: true,
  options: {
      enabled: !!lfaId && (options.enabled ?? true),
      ...options,
    },
  });
};




export const useGetAllLfaTasks = () => {
  return useFetch({
    queryKey: ['get-lfa-tasks'],
    api: 'task/view',
    auth: true,
    backend: true
  });
};






export const useUpdateAssignTask = () =>
  useMutate({
    mutationKey: ['assign-to-lfa'],
   api: ({ id }) => `task/update/${id}`, 
    method: 'PATCH',
    notify: true,
    pendingMessage: 'updating...',
    successMessage: 'Task update successfully!',
    errorMessage: 'Failed  to update task.',
        mutationFnProvided: true,
    auth: true,
        config: {}, // leave headers empty

    // config: { headers: { 'Content-Type': 'application/json' } },
  });
