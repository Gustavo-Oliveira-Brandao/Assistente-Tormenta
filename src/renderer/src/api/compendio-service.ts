import { ICompendio } from '@renderer/@types/T20 GOTY/ICompendio'

export const exibirCompendio = async (): Promise<ICompendio> => {
  const compendio = await window.api.compendio.getCompendio()
  return compendio
}
