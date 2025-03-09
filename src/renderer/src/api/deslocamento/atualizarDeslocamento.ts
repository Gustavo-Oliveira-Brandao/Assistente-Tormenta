import { Deslocamento } from '@renderer/@types/t20/Deslocamento'

export const atualizarDeslocamento = async (_deslocamento: Deslocamento): Promise<void> => {
  await window.api.putDeslocamento(_deslocamento)
}
