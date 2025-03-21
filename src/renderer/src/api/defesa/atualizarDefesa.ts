import { IDefesa } from '@renderer/@types/t20/Defesa'

export const atualizarDefesa = async (_defesa: IDefesa): Promise<void> => {
  await window.api.putDefesa(_defesa)
}
