import { IClasse } from '@renderer/@types/T20 GOTY/IClasse'

export const exibirClassesDefault = async (): Promise<IClasse[]> => {
  const classes = await window.api.classe.getClassesDefault()
  return classes
}
