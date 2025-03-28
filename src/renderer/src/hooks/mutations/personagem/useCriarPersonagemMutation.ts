import { ICriatura } from '@renderer/@types/t20/Criatura'
import { criarPersonagem } from '@renderer/api/personagem/criarPersonagem'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { DeepPartial } from 'react-hook-form'

export const useCriarPersonagemMutation = (): UseMutationResult<
  void,
  Error,
  DeepPartial<ICriatura>,
  unknown
> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (personagem: DeepPartial<ICriatura>) => criarPersonagem(personagem),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagens'] })
  })
}
