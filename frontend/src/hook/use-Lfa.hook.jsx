import useFetch from './use-fetch.hook';
import useMutate from './use-mutate.hook';
import { useQueryClient } from '@tanstack/react-query';


export const useGetAllLFAs = (filters = {}) => {
    const params = new URLSearchParams(filters).toString();

  return useFetch({
    queryKey: ['all-LFAs', filters],
    api: `lfa?${params}`,
    auth: true,
    backend: true,
  });
};






export const useGetLFAs = (lfaId) => {
  return useFetch({
    queryKey: ['lfa-by-id'],
    api: `lfa/${lfaId}`,
    auth: true,
    backend: true,
  });
};




export const useGetAssignedLFAs = (filters = {}) => {
      const params = new URLSearchParams(filters).toString();

  return useFetch({
    queryKey: ['assign-lfa-list',filters],
    api: `lfa/assigned-lfa-list?${params}`,
    auth: true,
    backend: true,
  });
};



export const useAssignTo = (lfaId) =>
  useMutate({
    mutationKey: ['assign-to-lfa'],
    api: `/lfa/${lfaId}`,
    method: 'PATCH',
    notify: true,
    pendingMessage: 'Assigning...',
    successMessage: 'User assigned successfully!',
    errorMessage: 'Failed to assign user.',
    auth: true,
    config: { headers: { 'Content-Type': 'application/json' } },
  });




export const useUpdateLfaStatus = () => {
  const queryClient = useQueryClient();
  return useMutate({

    mutationKey: ['update-lfa-status'],
    api: ({ id }) => `/lfa/update-lfa-status/${id}`, 
    method: 'PATCH',
    notify: true,
    pendingMessage: 'Updating...',
    successMessage: 'LFA status updated successfully!',
    errorMessage: 'Failed to update LFA status.',
    auth: true,
    config: { headers: { 'Content-Type': 'application/json' } },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-LFAs'] });
      queryClient.invalidateQueries({ queryKey: ['assign-lfa-list'] });
    },
  });
};






export const useUpdateLFA = () =>
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