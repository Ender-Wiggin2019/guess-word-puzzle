import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMe, login, register, logout } from '@/services/auth';
import type { LoginInput, RegisterInput } from 'common';

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: getMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginInput) => login(data),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterInput) => register(data),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      queryClient.clear();
    },
  });
}
