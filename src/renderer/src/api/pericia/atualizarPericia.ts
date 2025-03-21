import { IPericia } from '@renderer/@types/t20/Pericia'

export const atualizarPericia = async (pericia: IPericia): Promise<void> => {
  await window.api.putPericia(pericia)
}
