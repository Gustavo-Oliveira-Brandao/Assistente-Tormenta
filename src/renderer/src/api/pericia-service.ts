import { IPericia } from "@renderer/@types/T20 GOTY/IPericia"

export const atualizarPericia = async (id: number, pericia: IPericia): Promise<void> => {
  await window.api.pericias.putPericia(id, pericia)
}
