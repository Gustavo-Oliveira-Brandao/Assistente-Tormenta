import { IPericia } from '@renderer/@types/T20 GOTY/IPericia'

export const atualizarPericia = async (pericia: IPericia): Promise<void> => {
  await window.api.pericia.putPericia(pericia)
}
