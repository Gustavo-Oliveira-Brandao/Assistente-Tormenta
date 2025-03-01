import { Recurso } from '@renderer/@types/t20/Recurso'

export const atualizarMana = async (mana: Recurso): Promise<void> => {
  await window.api.putMana(mana)
}
