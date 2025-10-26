import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../features/auth/useAuth'
import { HierarchyHeader } from '../../features/hierarchy/components/HierarchyHeader'
import { HierarchyTree } from '../../features/hierarchy/components/HierarchyTree'
import { useHierarchy } from '../../features/hierarchy/hooks/useHierarchy'
import './HierarchyPage.css'

export function HierarchyPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { status, nodes, errorMessage, collapsedManagers, toggleManager } =
    useHierarchy()

  const sessionName = useMemo(() => {
    if (!user) {
      return ''
    }

    return `${user.firstName} ${user.lastName}`.toLowerCase()
  }, [user])

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <section className="hierarchy-page">
      <HierarchyHeader name={sessionName} onLogout={handleLogout} />

      <div className="hierarchy-body">
        {status === 'loading' ? (
          <p className="hierarchy-meta">Loading users...</p>
        ) : null}

        {status === 'error' ? (
          <p className="hierarchy-meta">{errorMessage}</p>
        ) : null}

        {status === 'ready' ? (
          <HierarchyTree
            nodes={nodes}
            collapsedManagers={collapsedManagers}
            onToggle={toggleManager}
          />
        ) : null}
      </div>
    </section>
  )
}
