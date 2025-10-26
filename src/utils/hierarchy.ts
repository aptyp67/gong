import type { User } from "../types/user";

export type HierarchyNode = {
  user: User;
  children: HierarchyNode[];
};

export function buildHierarchy(users: User[]) {
  const nodesById = new Map<number, HierarchyNode>();
  const roots: HierarchyNode[] = [];

  users.forEach((user) => {
    nodesById.set(user.id, { user, children: [] });
  });

  users.forEach((user) => {
    const node = nodesById.get(user.id);

    if (!node) {
      return;
    }

    if (user.managerId) {
      const managerNode = nodesById.get(user.managerId);

      if (managerNode) {
        managerNode.children.push(node);
        return;
      }
    }

    roots.push(node);
  });

  return roots;
}
