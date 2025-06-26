import { useQueryClient } from "@tanstack/react-query";
import useFetch from "./use-fetch.hook";
import useMutate from './use-mutate.hook';


export const useGetChats = (chatRoomId) => {
  return useFetch({
    queryKey: ['lfa-chat-hook'],
   api: `chat/messages/${chatRoomId}`,
    auth: true,
    backend: true
  });
};


export const useGetAllRooms = () => {
  return useFetch({
    queryKey: ['all-rooms'],
   api: `chat/all-rooms`,
    auth: true,
    backend: true
  });
};


export const useCreateChatRoom = () => {
  const queryClient = useQueryClient();
  return useMutate({
    mutationKey: ['create-chat-room'],
    api: '/chat/room-with-offer',
    method: 'POST',
    notify: true,
    pendingMessage: 'Sending offer...',
    successMessage: 'Chat room created successfully!',
    errorMessage: 'Failed to create chat room.',
    auth: true,
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['all-rooms'] });
      },
    },
  });
};




export const useDiscloseChatRoom = () => {
  const queryClient = useQueryClient();

  return useMutate({
    mutationKey: ['disclose-chat-room'],
    api:({ id })=> `/chat/delete/${id}`, // dynamic path
    method: 'PATCH',
    notify: true,
    pendingMessage: 'Disclosing offer...',
    successMessage: 'Offer disclosed successfully!',
    errorMessage: 'Failed to disclose the offer.',
    auth: true,
     options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['all-rooms'] });
      },
    },
  });
};

export const useReactivateChatroom = () => {
  const queryClient = useQueryClient();

  return useMutate({
    mutationKey: ['disclose-chat-room'],
    api:({ lfaId })=> `/chat/reactive-chat-room/${lfaId}`, // dynamic path
    method: 'PATCH',
    notify: true,
    pendingMessage: 'Reactivate offer...',
    successMessage: 'Offer Reactivate successfully!',
    errorMessage: 'Failed to Reactivate the offer.',
    auth: true,
     options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['all-rooms'] });

      },
    },
  });
};