import { IStatus } from '@renderer/@types/T20 GOTY/IStatus'
import { atualizarStatus } from '@renderer/api/status-service'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useAtualizarStatus = (): UseMutationResult<void, Error, IStatus, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (status) => atualizarStatus(status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}
