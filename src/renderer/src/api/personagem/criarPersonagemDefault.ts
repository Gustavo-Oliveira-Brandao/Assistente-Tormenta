import axios from 'axios'

export const criarPersonagemDefault = async (): Promise<void> => {
  const personagemDemo = (await axios.get('./data/t20/personagemVercel.json')).data
  await window.api.postPersonagem(personagemDemo)
}
