import { LanguageProvider } from './context/LanguageContext'
import HomePage from './pages/HomePage'
import OpwarmadviesPage from './pages/OpwarmadviesPage'
import ReceptenPage from './pages/ReceptenPage'

function Router() {
  const path = window.location.pathname
  if (path === '/opwarmadvies') return <OpwarmadviesPage />
  if (path === '/recepten') return <ReceptenPage />
  return <HomePage />
}

function App() {
  return (
    <LanguageProvider>
      <Router />
    </LanguageProvider>
  )
}

export default App
