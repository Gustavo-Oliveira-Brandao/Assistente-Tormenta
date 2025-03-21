import { IDeslocamento } from '@renderer/@types/t20/Deslocamento'

export const atualizarDeslocamento = async (_deslocamento: IDeslocamento): Promise<void> => {
  await window.api.putDeslocamento(_deslocamento)
}
