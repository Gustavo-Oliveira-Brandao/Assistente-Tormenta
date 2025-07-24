import { IStatus } from '@renderer/@types/T20 GOTY/IStatus'
import { atualizarStatus } from '@renderer/api/status-service'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

type atualizarStatusMutation = {
  id: number
  status: IStatus
}

export const useAtualizarStatus = (): UseMutationResult<void, Error, atualizarStatusMutation, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }) => atualizarStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}
