// test.js

const { calculateCPM } = require('./logic'); // Importujemy funkcję calculateCPM z pliku cpmCalculator.js

// Przykładowe dane zadań
const tasks = [
  { id: 'A', dependencies: {} },
  { id: 'B', dependencies: { 'A': 29 } },
  { id: 'C', dependencies: { 'A': 60 } },
  { id: 'D', dependencies: { 'B': 41, 'C': 29 } },
  { id: 'E', dependencies: { 'B': 39 } },
  { id: 'F', dependencies: { 'C': 52 } },
  { id: 'G', dependencies: { 'D': 68, 'E': 85, 'F':21 } }
];

// Wywołujemy funkcję calculateCPM
const result = calculateCPM(tasks);

// Wyświetlamy wyniki
console.log("Earliest Start for D:", result.es['D']); // Oczekiwane: 5
console.log("Earliest Finish for D:", result.lf['D']); // Oczekiwane: 7
console.log("Expected Project Duration:", 12);
console.log("Actual Project Duration:", result.criticalPath);
