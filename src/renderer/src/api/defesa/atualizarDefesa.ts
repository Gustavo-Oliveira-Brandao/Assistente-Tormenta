import { Defesa } from '@renderer/@types/t20/Defesa'

export const atualizarDefesa = async (_defesa: Defesa): Promise<void> => {
  await window.api.putDefesa(_defesa)
}
