type HierarchyHeaderProps = {
  name: string
  onLogout: () => void
}

export function HierarchyHeader({ name, onLogout }: HierarchyHeaderProps) {
  return (
    <div className="hierarchy-header">
      <h1 className="hierarchy-title">Hierarchy Tree</h1>
      <div className="hierarchy-session">
        <span className="hierarchy-username">{name}</span>
        <button
          className="hierarchy-logout"
          type="button"
          onClick={onLogout}
          aria-label="Logout"
        >
          (logout)
        </button>
      </div>
    </div>
  )
}
