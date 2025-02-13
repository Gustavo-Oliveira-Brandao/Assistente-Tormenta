import { HashRouter, Route, Routes } from 'react-router-dom'
import FichaPersonagem from './pages/ficha-personagem/ficha-personagem'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TelaSelecaoPersonagem from './pages/tela-selecao-personagem/tela-selecao-personagem'
import { useState } from 'react'

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const queryClient = new QueryClient()
  const [personagemSelecionado, setPersonagemSelecionado] = useState<number>(0)

  //TODO: Criar uma homepage
  //TODO: Criar uma tela de criação de personagem
  //TODO: Buscar lib de validação de forms
  //TODO: Fazer um formulario guiado por etapas
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={<TelaSelecaoPersonagem setPersonagemSelecionado={setPersonagemSelecionado} />}
          />
          {personagemSelecionado && (
            <Route
              path="/personagem"
              element={<FichaPersonagem idPersonagem={personagemSelecionado} />}
            />
          )}
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  )
}

export default App
