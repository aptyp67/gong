import { HierarchyAvatar } from './HierarchyAvatar'
import type { HierarchyNode } from '../../../utils/hierarchy'
import { formatFullName } from '../../../utils/user'

const INDENT_STEP = 32

type HierarchyTreeItemProps = {
  node: HierarchyNode
  depth: number
  collapsedManagers: Set<number>
  onToggle: (managerId: number) => void
}

export function HierarchyTreeItem({
  node,
  depth,
  collapsedManagers,
  onToggle,
}: HierarchyTreeItemProps) {
  const isManager = node.children.length > 0
  const isCollapsed = isManager && collapsedManagers.has(node.user.id)
  const paddingLeft = depth * INDENT_STEP

  return (
    <>
      <div className="hierarchy-row" style={{ paddingLeft }}>
        {isManager ? (
          <button
            type="button"
            className="hierarchy-toggle"
            onClick={() => onToggle(node.user.id)}
            aria-label={
              isCollapsed
                ? `Expand ${formatFullName(node.user)}`
                : `Collapse ${formatFullName(node.user)}`
            }
          >
            {isCollapsed ? '+' : '-'}
          </button>
        ) : (
          <span className="hierarchy-toggle hierarchy-toggle--leaf">-</span>
        )}

        <HierarchyAvatar user={node.user} />

        <div className="hierarchy-info">
          <span className="hierarchy-name">{formatFullName(node.user)}</span>
          <span className="hierarchy-email">{node.user.email}</span>
        </div>
      </div>

      {isManager && !isCollapsed
        ? node.children.map((child) => (
            <HierarchyTreeItem
              key={child.user.id}
              node={child}
              depth={depth + 1}
              collapsedManagers={collapsedManagers}
              onToggle={onToggle}
            />
          ))
        : null}
    </>
  )
}
