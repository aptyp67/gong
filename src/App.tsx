import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './app/AppLayout'
import { HierarchyPage } from './pages/hierarchy/HierarchyPage'
import { LoginPage } from './pages/login/LoginPage'

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/hierarchy" element={<HierarchyPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App
