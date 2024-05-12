const Graph = require('graphlib').Graph;

export function calculateCPM(tasks) {
  const graph = new Graph({ directed: true });

  tasks.forEach(task => {
    graph.setNode(task.id);
    Object.entries(task.dependencies).forEach(([dependency, duration]) => {
      graph.setEdge(dependency, task.id,  duration );
    });
  });

  const es = {};
  const first = graph.sources();
  es[first] = 0;
  first.forEach(successor=>{
    calculateEF(successor)
  })
  console.log(es);

  function calculateEF(node) {
    const successors = graph.successors(node);
    const predecessors = graph.predecessors(node);
    let highest=0;
    es[node] = 0;
    predecessors.forEach(predecessor => {
      const edge = graph.edge(predecessor, node);
      if(edge+es[predecessor]>highest){
        highest=edge+es[predecessor];
      }
    });
    es[node]=highest;
    successors.forEach(successor=>{
      calculateEF(successor);
    });
  }

  const lf = {};
  const last = graph.sinks();
  lf[last] = es[last];
  calculateLS(last);
  console.log(lf);

  function calculateLS(node) {
    const predecessors = graph.predecessors(node);
    predecessors.forEach(predecessor => {
      const edge = graph.edge(predecessor, node);
      if(lf[predecessor]==null){
        lf[predecessor]=lf[node]-edge;
      }
      else if(lf[predecessor]>lf[node]-edge){
        lf[predecessor]=lf[node]-edge;
      }
      calculateLS(predecessor);
    });
  }

  const slack = {};
  graph.nodes().forEach(node => {
    slack[node] = lf[node] - es[node];
  });
  console.log(slack);

  const criticalPath = [];
  graph.nodes().forEach(node => {
    if (slack[node] === 0) {
      criticalPath.push(node);
    }
  });
  console.log(criticalPath);

  return {
    es,
    lf,
    slack,
    criticalPath,
  };
}

// module.exports = { calculateCPM };