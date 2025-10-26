import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './app/AppLayout'
import { RequireAuth } from './app/auth/RequireAuth'
import { HierarchyPage } from './pages/hierarchy/HierarchyPage'
import { LoginPage } from './pages/login/LoginPage'

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/hierarchy"
            element={
              <RequireAuth>
                <HierarchyPage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App
