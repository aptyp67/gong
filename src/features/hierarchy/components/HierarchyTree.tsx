import { HierarchyTreeItem } from './HierarchyTreeItem'
import type { HierarchyNode } from '../../../utils/hierarchy'

type HierarchyTreeProps = {
  nodes: HierarchyNode[]
  collapsedManagers: Set<number>
  onToggle: (managerId: number) => void
}

export function HierarchyTree({
  nodes,
  collapsedManagers,
  onToggle,
}: HierarchyTreeProps) {
  if (nodes.length === 0) {
    return <p className="hierarchy-meta">No users found.</p>
  }

  return (
    <div className="hierarchy-tree">
      {nodes.map((node) => (
        <HierarchyTreeItem
          key={node.user.id}
          node={node}
          depth={0}
          collapsedManagers={collapsedManagers}
          onToggle={onToggle}
        />
      ))}
    </div>
  )
}
