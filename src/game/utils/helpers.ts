import type { Province } from '../types/game.types';

// Calculates the total development of a province
export const getProvinceDevelopment = (province: Province): number => {
  return province.development.adm + province.development.dip + province.development.mil;
};

// BFS Pathfinding on adjacency graph
export const findShortestPath = (
  startId: string,
  endId: string,
  graph: Record<string, string[]>
): string[] => {
  if (startId === endId) return [];
  if (!graph[startId] || !graph[endId]) return [];

  const queue: string[][] = [[startId]];
  const visited = new Set<string>([startId]);

  while (queue.length > 0) {
    const path = queue.shift()!;
    const node = path[path.length - 1];

    if (node === endId) {
      return path.slice(1); // Return path excluding the start node
    }

    const neighbors = graph[node] || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([...path, neighbor]);
      }
    }
  }

  return []; // No path found
};
