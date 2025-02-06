import { PersonagemT20 } from '@renderer/@types/t20/Personagem'
import { carregarPersonagem } from '@renderer/utils/carregarPersonagem'
import axios from 'axios'

export const exibirPersonagemTeste = async (): Promise<PersonagemT20> => {
  const response = await axios.get<PersonagemT20>('./data/t20/personagemVercel.json')
  response.data = await carregarPersonagem(response.data)
  console.log(response.data)
  return response.data
}

const baseURL = 'http://localhost:8080/t20/personagens'

export const exibirPersonagemPorId = async (id: number): Promise<PersonagemT20> => {
  const response = await axios.get<PersonagemT20>(`${baseURL}/${id}`)
  response.data = await carregarPersonagem(response.data)
  return response.data
}
