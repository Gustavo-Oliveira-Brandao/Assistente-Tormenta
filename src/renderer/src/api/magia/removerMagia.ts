export const removerMagia = async (id: number): Promise<void> => {
  await window.api.deleteMagia(id)
}
