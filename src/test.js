
const { calculateCPM,solveTransportationProblem } = require('./logic'); 


const tasks = [
  { id: 'A', dependencies: {} },
  { id: 'B', dependencies: { 'A': 29 } },
  { id: 'C', dependencies: { 'A': 60 } },
  { id: 'D', dependencies: { 'B': 41, 'C': 29 } },
  { id: 'E', dependencies: { 'B': 39 } },
  { id: 'F', dependencies: { 'C': 52 } },
  { id: 'G', dependencies: { 'D': 68, 'E': 85, 'F':21 } }
];

//const result = calculateCPM(tasks);

const supply = [20, 30];
const demand = [10, 28, 27];
const costs = [
    [8, 14, 17],
    [12, 9, 19]
];
const sellingPrices = [30, 25, 30];
const purchaseCosts = [10, 12];

const solution = solveTransportationProblem(supply, demand, costs, sellingPrices,purchaseCosts);
solution.forEach(solutio=>{
  console.log(solutio);
})

// Wyświetlamy wyniki
//console.log("Earliest Start for D:", result.es['D']);
//console.log("Earliest Finish for D:", result.lf['D']);
//console.log("Actual Project Duration:", result.criticalPath);