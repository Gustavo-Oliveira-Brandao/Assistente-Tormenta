import { Pericia } from '@renderer/@types/t20/Pericia'

export const atualizarPericia = async (pericia: Pericia): Promise<void> => {
  await window.api.putPericia(pericia)
}
