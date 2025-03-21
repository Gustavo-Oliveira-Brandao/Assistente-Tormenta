import { ICriatura } from '@renderer/@types/t20/Criatura'

export const exibirTodosPersonagens = async (): Promise<ICriatura[]> => {
  return await window.api.getTodosPersonagens()
}
