export const removerPoder = async (id: number): Promise<void> => {
  await window.api.deletePoder(id)
}
