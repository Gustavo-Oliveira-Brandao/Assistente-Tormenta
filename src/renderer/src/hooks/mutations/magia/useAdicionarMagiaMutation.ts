import { IMagia } from '@renderer/@types/t20/Magia'
import { adicionarMagia } from '@renderer/api/magia/adicionarMagia'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useAdicionarMagiaMutation = (): UseMutationResult<
  void,
  Error,
  { magia: IMagia; idPersonagem: number },
  unknown
> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ magia, idPersonagem }: { magia: IMagia; idPersonagem: number }) =>
      adicionarMagia(magia, idPersonagem),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['magias'] })
  })
}
