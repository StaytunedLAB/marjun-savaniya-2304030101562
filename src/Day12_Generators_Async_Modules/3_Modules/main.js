// ============================================
// MAIN APPLICATION - DEMONSTRATES IMPORTS
// Shows various import patterns and usage
// ============================================

// Note: In Node.js without module support, this won't run directly.
// This demonstrates the syntax and patterns for ES6 modules.

console.log("=== EXPORT & IMPORT EXAMPLES ===\n");

/*
// ============================================
// 1. DEFAULT IMPORT
// ============================================
import MathUtils from './math.js';

console.log("=== 1. Using Default Import ===");
console.log("Add: 5 + 3 =", MathUtils.add(5, 3));
console.log("Multiply: 4 * 7 =", MathUtils.multiply(4, 7));
console.log("PI =", MathUtils.constants.PI);


// ============================================
// 2. NAMED IMPORTS
// ============================================
import { add, subtract, multiply, divide } from './math.js';

console.log("\n=== 2. Using Named Imports ===");
console.log("Add: 10 + 5 =", add(10, 5));
console.log("Subtract: 10 - 5 =", subtract(10, 5));
console.log("Multiply: 10 * 5 =", multiply(10, 5));
console.log("Divide: 10 / 5 =", divide(10, 5));


// ============================================
// 3. IMPORT WITH ALIAS
// ============================================
import { add as sum, multiply as mult } from './math.js';

console.log("\n=== 3. Using Aliased Imports ===");
console.log("Sum (add): 7 + 3 =", sum(7, 3));
console.log("Mult (multiply): 7 * 3 =", mult(7, 3));


// ============================================
// 4. NAMESPACE IMPORT (Import All)
// ============================================
import * as Math from './math.js';

console.log("\n=== 4. Using Namespace Import ===");
console.log("Add: 8 + 2 =", Math.add(8, 2));
console.log("Power: 2^8 =", Math.power(2, 8));
console.log("Factorial: 5! =", Math.factorial(5));
console.log("Average:", Math.average(10, 20, 30, 40, 50));


// ============================================
// 5. MIXED IMPORTS (Default + Named)
// ============================================
import MathUtils, { Calculator, PI } from './math.js';

console.log("\n=== 5. Using Mixed Imports ===");
console.log("PI =", PI);
const calc = new Calculator();
console.log("Calculator: (10 + 5) * 2 =", 
    calc.add(10).add(5).multiply(2).getResult()
);


// ============================================
// 6. IMPORTING FROM UTILS MODULE
// ============================================
import { 
    capitalize, 
    truncate, 
    chunk, 
    unique, 
    Logger,
    StringUtils,
    ArrayUtils 
} from './utils.js';

console.log("\n=== 6. Using Utils Module ===");
console.log("Capitalize:", capitalize("hello world"));
console.log("Truncate:", truncate("This is a long string", 10));
console.log("Chunk:", chunk([1, 2, 3, 4, 5, 6], 2));
console.log("Unique:", unique([1, 2, 2, 3, 3, 4]));

const logger = new Logger("[MyApp] ");
logger.info("Application started");
logger.log("Processing data...");


// ============================================
// 7. MULTIPLE IMPORTS FROM DIFFERENT MODULES
// ============================================
import { add } from './math.js';
import { capitalize } from './utils.js';

console.log("\n=== 7. Multiple Module Imports ===");
console.log("Math add: 15 + 25 =", add(15, 25));
console.log("Capitalize:", capitalize("javascript"));


// ============================================
// 8. RE-EXPORTS (Creating a Barrel File)
// ============================================
// In a file like 'index.js', you can re-export:
// export * from './math.js';
// export * from './utils.js';
// export { default as MathUtils } from './math.js';

// Then import everything from one place:
// import { add, subtract, capitalize, chunk } from './index.js';
*/

// ============================================
// DEMONSTRATING CONCEPTS (Simulated)
// ============================================

console.log("=== Import/Export Patterns Demonstrated ===\n");

console.log("1. Default Import:");
console.log("   import MathUtils from './math.js';\n");

console.log("2. Named Imports:");
console.log("   import { add, subtract } from './math.js';\n");

console.log("3. Aliased Imports:");
console.log("   import { add as sum } from './math.js';\n");

console.log("4. Namespace Import:");
console.log("   import * as Math from './math.js';\n");

console.log("5. Mixed Imports:");
console.log("   import MathUtils, { Calculator } from './math.js';\n");

console.log("6. Multiple Imports:");
console.log("   import { add } from './math.js';");
console.log("   import { capitalize } from './utils.js';\n");

console.log("7. Re-exports (Barrel Pattern):");
console.log("   // In index.js:");
console.log("   export * from './math.js';");
console.log("   export * from './utils.js';\n");

console.log("8. Type-only Imports (TypeScript):");
console.log("   import type { User } from './types';\n");

console.log("9. Side-effect Imports:");
console.log("   import './polyfills.js';\n");

console.log("10. Dynamic Imports (Covered in dynamic-imports.js):\n");

// Simulating actual usage with inline implementations
const simulatedMath = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,
    PI: 3.14159
};

const simulatedUtils = {
    capitalize: str => str.charAt(0).toUpperCase() + str.slice(1),
    chunk: (arr, size) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    }
};

console.log("\n=== Simulated Module Usage ===");
console.log("Math.add(5, 3) =", simulatedMath.add(5, 3));
console.log("Math.multiply(4, 7) =", simulatedMath.multiply(4, 7));
console.log("Math.PI =", simulatedMath.PI);
console.log("\nUtils.capitalize('hello') =", simulatedUtils.capitalize('hello'));
console.log("Utils.chunk([1,2,3,4,5,6], 2) =", 
    JSON.stringify(simulatedUtils.chunk([1, 2, 3, 4, 5, 6], 2))
);

console.log("\n=== Module Benefits ===");
console.log("✓ Code organization and structure");
console.log("✓ Reusability across projects");
console.log("✓ Encapsulation and private data");
console.log("✓ Clear dependencies");
console.log("✓ Easy testing");
console.log("✓ Tree-shaking support");
console.log("✓ Better performance with lazy loading");

console.log("\n=== To Use These Modules Properly ===");
console.log("1. Add 'type': 'module' to package.json");
console.log("2. Use .mjs extension or configure module support");
console.log("3. Run with: node --experimental-modules main.js");
console.log("4. Or use a bundler like Webpack, Rollup, or Vite");

console.log("\n=== Export & Import Examples Completed! ===");
