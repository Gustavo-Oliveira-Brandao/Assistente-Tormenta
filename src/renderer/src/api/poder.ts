import axios, { AxiosResponse } from 'axios'
import { Poder } from '../@types/t20/Poder'

const baseURLDefaultData = './data/t20/poderes/poderes.json'
const baseURL = 'http://localhost:8080/t20/personagens/poderes'

export const listarPoderesDefault = async (): Promise<Poder[]> => {
  const response = await axios.get(baseURLDefaultData)
  return response.data
}

export const adicionarPoder = async (
  _idPersonagem: number,
  poder: Poder
): Promise<AxiosResponse<Poder, Error>> => {
  return await axios.post<Poder>(`${baseURL}`, poder, {
    params: {
      idPersonagem: _idPersonagem
    }
  })
}

export const deletarPoder = async (id: number): Promise<AxiosResponse> => {
  return await axios.delete(`${baseURL}/${id}`)
}
