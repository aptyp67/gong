import { useCallback, useEffect, useState } from "react";
import { getAllUsers } from "../../../services/users";
import { buildHierarchy, type HierarchyNode } from "../../../utils/hierarchy";

type HierarchyStatus = "idle" | "loading" | "ready" | "error";

export function useHierarchy() {
  const [status, setStatus] = useState<HierarchyStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [nodes, setNodes] = useState<HierarchyNode[]>([]);
  const [collapsedManagers, setCollapsedManagers] = useState<Set<number>>(
    () => new Set()
  );

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus("loading");
      setErrorMessage("");

      try {
        const users = await getAllUsers();

        if (cancelled) {
          return;
        }

        const hierarchy = buildHierarchy(users);
        setNodes(hierarchy);
        setCollapsedManagers(collectManagerIds(hierarchy));
        setStatus("ready");
      } catch {
        if (!cancelled) {
          setStatus("error");
          setErrorMessage("Failed to load hierarchy.");
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const toggleManager = useCallback((managerId: number) => {
    setCollapsedManagers((prev) => {
      const next = new Set(prev);

      if (next.has(managerId)) {
        next.delete(managerId);
      } else {
        next.add(managerId);
      }

      return next;
    });
  }, []);

  return {
    status,
    errorMessage,
    nodes,
    collapsedManagers,
    toggleManager,
  };
}

function collectManagerIds(nodes: HierarchyNode[]) {
  const ids = new Set<number>();

  const walk = (node: HierarchyNode) => {
    if (node.children.length > 0) {
      ids.add(node.user.id);
      node.children.forEach(walk);
    }
  };

  nodes.forEach(walk);
  return ids;
}
