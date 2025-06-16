import { IClasse } from '@renderer/@types/T20 GOTY/IClasse'

export const exibirClassesDefault = async (): Promise<IClasse[]> => {
  const classes = await window.api.classes.getClassesDefault()
  return classes
}
