import { useCallback, useEffect, useMemo, useState } from 'react'
import { useGetUsersQuery } from '../api/hierarchyApi'
import { buildHierarchy, type HierarchyNode } from '../../../utils/hierarchy'

type HierarchyStatus = 'idle' | 'loading' | 'ready' | 'error'

export function useHierarchy() {
  const { data: users, isLoading, isError } = useGetUsersQuery()
  const [collapsedManagers, setCollapsedManagers] = useState<Set<number>>(
    () => new Set(),
  )

  const nodes = useMemo<HierarchyNode[]>(
    () => (users ? buildHierarchy(users) : []),
    [users],
  )

  useEffect(() => {
    if (!nodes.length) {
      setCollapsedManagers(new Set())
      return
    }

    setCollapsedManagers((prev) => {
      if (prev.size > 0) {
        return prev
      }

      return collectManagerIds(nodes)
    })
  }, [nodes])

  const hasData = users !== undefined

  const status: HierarchyStatus = isLoading
    ? 'loading'
    : isError
      ? 'error'
      : hasData
        ? 'ready'
        : 'idle'

  const toggleManager = useCallback((managerId: number) => {
    setCollapsedManagers((prev) => {
      const next = new Set(prev)

      if (next.has(managerId)) {
        next.delete(managerId)
      } else {
        next.add(managerId)
      }

      return next
    })
  }, [])

  return {
    status,
    errorMessage: status === 'error' ? 'Failed to load hierarchy.' : '',
    nodes,
    collapsedManagers,
    toggleManager,
  }
}

function collectManagerIds(nodes: HierarchyNode[]) {
  const ids = new Set<number>()

  const walk = (node: HierarchyNode) => {
    if (node.children.length > 0) {
      ids.add(node.user.id)
      node.children.forEach(walk)
    }
  }

  nodes.forEach(walk)
  return ids
}
