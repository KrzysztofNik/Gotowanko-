// cpmCalculator.js

import { Graph } from 'graphlib';

// Funkcja do obliczania CPM
export function calculateCPM(tasks) {
  // Tworzymy graf
  const graph = new Graph({ directed: true });

  // Dodajemy zadania do grafu
  tasks.forEach(task => {
    graph.setNode(task.id, { duration: task.duration });
    task.dependencies.forEach(dep => {
      graph.setEdge(dep, task.id);
    });
  });

  // Obliczamy najwcześniejszy czas rozpoczęcia (ES) i najwcześniejszy czas zakończenia (EF)
  const es = {};
  const ef = {};
  graph.sources().forEach(node => {
    es[node] = 0;
    calculateEF(node);
  });

  function calculateEF(node) {
    const successors = graph.successors(node);
    successors.forEach(successor => {
      const duration = graph.node(successor).duration;
      ef[successor] = Math.max(ef[successor] || 0, es[node] + duration);
      calculateEF(successor);
    });
  }

  // Obliczamy najpóźniejszy czas zakończenia (LF) i najpóźniejszy czas rozpoczęcia (LS)
  const lf = {};
  const ls = {};
  const endNodes = graph.sinks();
  endNodes.forEach(node => {
    lf[node] = ef[node];
    calculateLS(node);
  });

  function calculateLS(node) {
    const predecessors = graph.predecessors(node);
    predecessors.forEach(predecessor => {
      const duration = graph.node(node).duration;
      ls[predecessor] = lf[node] - duration;
      calculateLS(predecessor);
    });
  }

  // Obliczamy margines rezerwy (slack)
  const slack = {};
  graph.nodes().forEach(node => {
    slack[node] = lf[node] - ef[node];
  });

  // Znajdujemy ścieżkę krytyczną
  const criticalPath = [];
  graph.nodes().forEach(node => {
    if (slack[node] === 0) {
      criticalPath.push(node);
    }
  });

  // Obliczamy długość projektu
  const projectDuration = Math.max(...Object.values(ef));

  return {
    es,
    ef,
    ls,
    lf,
    slack,
    criticalPath,
    projectDuration
  };
}
