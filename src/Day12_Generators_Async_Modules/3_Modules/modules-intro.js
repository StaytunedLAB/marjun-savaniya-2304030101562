// ============================================
// JAVASCRIPT MODULES - INTRODUCTION
// ============================================

/*
JavaScript Modules allow you to:
1. Break code into separate files
2. Export functionality from one file
3. Import functionality into another file
4. Create encapsulated, reusable code
5. Manage dependencies better

Module Types:
- ES6 Modules (ESM): Modern standard using import/export
- CommonJS: Used in Node.js with require/module.exports

This file demonstrates concepts, but actual module functionality
requires separate files and proper module configuration.
*/

console.log("=== 1. Module Basics ===");
console.log(`
Modules provide:
- Encapsulation: Each module has its own scope
- Reusability: Code can be shared across projects
- Maintainability: Easier to organize and update
- Namespace Management: Avoid naming conflicts
`);

console.log("\n=== 2. Why Use Modules? ===");
console.log(`
Without modules:
- All code in global scope
- Naming conflicts
- Difficult to maintain
- Hard to test individual parts

With modules:
- Clean separation of concerns
- Easy to test
- Better code organization
- Controlled dependencies
`);

console.log("\n=== 3. Module Scope ===");
console.log(`
Each module has its own scope:
- Variables declared in a module are not global
- Only exported values are accessible outside
- No pollution of global namespace
`);

// Simulating module scope
(function moduleExample() {
    const privateVar = "This is private";
    const publicVar = "This is public";
    
    console.log("\nInside module:");
    console.log("  Private:", privateVar);
    console.log("  Public:", publicVar);
    
    // In real module: export { publicVar };
})();

console.log("\n=== 4. Export Types ===");
console.log(`
Named Exports:
  export const name = "value";
  export function myFunc() { }
  export class MyClass { }

Default Export:
  export default function() { }
  export default class MyClass { }
  
Mixed:
  export { func1, func2 };
  export default mainFunction;
`);

console.log("\n=== 5. Import Types ===");
console.log(`
Named Imports:
  import { name } from './module.js';
  import { name1, name2 } from './module.js';
  import { originalName as newName } from './module.js';

Default Import:
  import myFunction from './module.js';
  import MyClass from './module.js';

All Imports:
  import * as myModule from './module.js';

Mixed:
  import defaultExport, { named1, named2 } from './module.js';
`);

console.log("\n=== 6. Module Best Practices ===");
console.log(`
1. One module per file
2. Use descriptive names
3. Keep modules focused (single responsibility)
4. Export only what's necessary
5. Use default exports for main functionality
6. Use named exports for utilities
7. Avoid circular dependencies
8. Document exported functions/classes
`);

console.log("\n=== 7. Module Loading ===");
console.log(`
Modules are:
- Loaded once (singleton pattern)
- Cached after first load
- Executed in strict mode by default
- Loaded asynchronously by default
- Loaded in order of dependency
`);

console.log("\n=== 8. CommonJS vs ES6 Modules ===");
console.log(`
CommonJS (Node.js):
  const module = require('./module');
  module.exports = { ... };

ES6 Modules (Modern):
  import module from './module.js';
  export { ... };

Key Differences:
- CommonJS: Synchronous, dynamic
- ES6: Asynchronous, static
- ES6 allows tree-shaking (removing unused code)
`);

console.log("\n=== 9. Module Resolution ===");
console.log(`
Relative paths:
  import { func } from './utils.js';
  import { func } from '../helpers/utils.js';

Absolute paths:
  import { func } from '/src/utils.js';

Node modules:
  import express from 'express';
  import { useState } from 'react';
`);

console.log("\n=== 10. Module Features ===");
console.log(`
Benefits:
✓ Code organization
✓ Reusability
✓ Encapsulation
✓ Maintainability
✓ Testing
✓ Dependency management

Browser Support:
- <script type="module" src="main.js"></script>
- Modules are deferred by default
- Modules run in strict mode
- Modules have their own scope
`);

console.log("\n=== Module Introduction Completed! ===");
console.log("See other files in this directory for practical examples:");
console.log("  - math.js: Math utilities module");
console.log("  - utils.js: General utilities module");
console.log("  - main.js: Main application using modules");
console.log("  - dynamic-imports.js: Dynamic import examples");
