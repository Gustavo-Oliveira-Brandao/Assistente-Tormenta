export const deletarPersonagem = async (id: number): Promise<void> => {
  await window.api.deletePersonagem(id)
}
