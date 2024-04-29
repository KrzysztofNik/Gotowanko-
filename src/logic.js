const Graph = require('graphlib').Graph;

function calculateCPM(tasks) {
  const graph = new Graph({ directed: true });

  tasks.forEach(task => {
    graph.setNode(task.id);
    Object.entries(task.dependencies).forEach(([dependency, duration]) => {
      graph.setEdge(dependency, task.id, { duration });
    });
  });



  const es = {};
  const ef = {};
  console.log(graph.sources());
  graph.sources().forEach(node => {
    es[node] = 0;
    calculateEF(node);
  });

  function calculateEF(node) {
    const successors = graph.successors(node);
    successors.forEach(successor => {
      const edge = graph.edge(node, successor);
      const duration = edge ? edge.duration : 0;
      ef[successor] = Math.max(ef[successor] || 0, es[node] + duration);
      calculateEF(successor);
    });
  }

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
      const edge = graph.edge(predecessor, node);
      const duration = edge ? edge.duration : 0;
      ls[predecessor] = lf[node] - duration;
      calculateLS(predecessor);
    });
  }

  const slack = {};
  graph.nodes().forEach(node => {
    slack[node] = lf[node] - ef[node];
  });

  const criticalPath = [];
  graph.nodes().forEach(node => {
    if (slack[node] === 0) {
      criticalPath.push(node);
    }
  });

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

module.exports = { calculateCPM };