// test.js

const { calculateCPM } = require('./logic'); // Importujemy funkcję calculateCPM z pliku cpmCalculator.js

// Przykładowe dane zadań
const tasks = [
  { id: 'A', dependencies: {} },
  { id: 'B', dependencies: { 'A': 2 } },
  { id: 'C', dependencies: { 'A': 1 } },
  { id: 'D', dependencies: { 'B': 2, 'C': 3 } },
  { id: 'E', dependencies: { 'C': 1 } }
];

// Wywołujemy funkcję calculateCPM
const result = calculateCPM(tasks);

// Wyświetlamy wyniki
console.log("Earliest Start for D:", result.es['D']); // Oczekiwane: 5
console.log("Earliest Finish for D:", result.ef['D']); // Oczekiwane: 7
console.log("Expected Project Duration:", 12);
console.log("Actual Project Duration:", result.projectDuration);
