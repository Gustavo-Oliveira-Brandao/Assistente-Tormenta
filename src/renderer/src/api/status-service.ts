import { IStatus } from '@renderer/@types/T20 GOTY/IStatus'

export const atualizarStatus = async (id: number, status: IStatus): Promise<void> => {
  await window.api.status.putStatus(id, status)
}
