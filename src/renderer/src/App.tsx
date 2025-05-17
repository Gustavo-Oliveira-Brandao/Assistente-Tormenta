import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { MenuPrincipal } from './pages/menu-principal/menu-principal'
function App(): React.JSX.Element {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MenuPrincipal />} />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  )
}

export default App
