import { IClasse } from '@renderer/@types/T20 GOTY/IClasse'

export const criarClasse = async (
  classe: Partial<IClasse>,
  idPersonagem: number
): Promise<void> => {
  await window.api.classe.postClasse(classe, idPersonagem)
}

export const atualizarClasse = async (classe: IClasse): Promise<void> => {
  await window.api.classe.putClasse(classe)
}

export const deletarClasse = async (id: number): Promise<void> => {
  await window.api.classe.deleteClasse(id)
}

export const exibirClasses = async (): Promise<Partial<IClasse[]>> => {
  const classes = await window.api.classe.getClassesDefault()
  return classes
}
