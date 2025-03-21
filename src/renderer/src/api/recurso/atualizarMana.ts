import { IRecurso } from '@renderer/@types/t20/Recurso'

export const atualizarMana = async (mana: IRecurso): Promise<void> => {
  await window.api.putMana(mana)
}
