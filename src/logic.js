const Graph = require('graphlib').Graph;

function calculateCPM(tasks) {
  const graph = new Graph({ directed: true });


  tasks.forEach(task => {
    graph.setNode(task.id);
    console.log(task.dependencies);
    task.dependencies.forEach(dependencie=>{
      if (parseInt(dependencie.duration)!='null' || dependencie.id!=null){
        graph.setEdge(dependencie.id,task.id,parseInt(dependencie.duration));
      }
    })
    //Object.entries(task.dependencies).forEach(([dependency, duration]) => {
    //  graph.setEdge(dependency, task.id,  duration );
    //});
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

    let criticalPathValue=es[criticalPath.at(-1)];
    console.log(criticalPathValue);

  return {
    es,
    lf,
    slack,
    criticalPath,
    criticalPathValue,
  };
}

function solveTransportationProblem(supply, demand, costs, sellingPrices,purchaseCosts) {

  const profits = costs.map((row, i) => row.map((cost, j) => sellingPrices[j] - cost - purchaseCosts[i]));
  console.log(profits);

  const numSuppliers = supply.length;
  const numConsumers = demand.length;

  const solution = Array.from({ length: numSuppliers }, () => Array(numConsumers).fill(0));
  
  let remainingSupply = [...supply];
  let remainingDemand = [...demand];
  
  function findMaxProfitCell() {
      let maxProfit = -Infinity;
      let maxCell = [-1, -1];

      for (let i = 0; i < numSuppliers; i++) {
          for (let j = 0; j < numConsumers; j++) {
              const profit = profits[i][j];
              if (remainingSupply[i] > 0 && remainingDemand[j] > 0 && profit > maxProfit) {
                  maxProfit = profit;
                  maxCell = [i, j];
              }
          }
      }

      return maxCell;
  }

  while (true) {
      const [i, j] = findMaxProfitCell();

      if (i === -1 || j === -1) {
          break;  
      }

      const allocation = Math.min(remainingSupply[i], remainingDemand[j]);
      solution[i][j] = allocation;
      remainingSupply[i] -= allocation;
      remainingDemand[j] -= allocation;
  }

  let finalProfit=0;
  for(let i=0;i<solution.length;i++){
    for(let j=0;j<solution[i].length;j++){
      finalProfit+=solution[i][j]*profits[i][j];
    }
  }

  return {solution, finalProfit};
}


 module.exports = { calculateCPM,solveTransportationProblem };