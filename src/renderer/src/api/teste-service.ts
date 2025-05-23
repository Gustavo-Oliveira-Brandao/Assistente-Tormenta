import axios from 'axios'
import { criarPersonagem } from './personagem-service'

export const criarPersonagemDemo = async (): Promise<void> => {
  const personagem = (await axios.get('./personagemDemo.json')).data
  await criarPersonagem(personagem)
}
