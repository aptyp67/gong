import { useAuth } from '../../app/auth/useAuth'
import './HierarchyPage.css'

export function HierarchyPage() {
  const { user, logout } = useAuth()

  return (
    <section className="hierarchy-page">
      <div className="hierarchy-header">
        <h1 className="hierarchy-title">Hierarchy Tree</h1>
        <div className="hierarchy-session">
          <span className="hierarchy-username">
            {user ? `${user.firstName} ${user.lastName}` : ''}
          </span>
          <button className="hierarchy-logout" type="button" onClick={logout}>
            (logout)
          </button>
        </div>
      </div>

      <p>Hierarchy tree goes here.</p>
    </section>
  )
}
