// ============================================================================
// DAY-8: JavaScript Data Types & Primitives (Unit-5)
// ============================================================================
// This file covers all 15 topics from the JavaScript Data Types learning module
// ============================================================================

console.log("=".repeat(80));
console.log("DAY-8: JavaScript Data Types & Primitives (Unit-5)");
console.log("=".repeat(80));

// ============================================================================
// TOPIC 1: Core Data Types Overview
// ============================================================================
console.log("\n📌 TOPIC 1: Core Data Types Overview");
console.log("-".repeat(40));

/**
 * JavaScript has 8 fundamental data types:
 * 
 * PRIMITIVE TYPES (7):
 * 1. string   - Represents textual data
 * 2. number   - Represents numeric values (integers and floats)
 * 3. bigint   - Represents integers of arbitrary length
 * 4. boolean  - Represents true/false values
 * 5. undefined - Represents an uninitialized variable
 * 6. symbol   - Represents a unique identifier
 * 7. null     - Represents intentional absence of value
 * 
 * NON-PRIMITIVE TYPE (1):
 * 8. object   - Represents collections of key-value pairs
 */

// String - textual data
const myString = "Hello, JavaScript!";
console.log("1. string:", myString, "| typeof:", typeof myString);

// Number - numeric values (both integers and floating-point)
const myNumber = 42.5;
console.log("2. number:", myNumber, "| typeof:", typeof myNumber);

// BigInt - arbitrary precision integers (suffix with 'n')
const myBigInt = 9007199254740991n;
console.log("3. bigint:", myBigInt, "| typeof:", typeof myBigInt);

// Boolean - true/false values
const myBoolean = true;
console.log("4. boolean:", myBoolean, "| typeof:", typeof myBoolean);

// Undefined - uninitialized variable
let myUndefined;
console.log("5. undefined:", myUndefined, "| typeof:", typeof myUndefined);

// Symbol - unique identifier
const mySymbol = Symbol("uniqueKey");
console.log("6. symbol:", mySymbol.toString(), "| typeof:", typeof mySymbol);

// Null - intentional absence of value (note: typeof null is 'object' - this is a known quirk)
const myNull = null;
console.log("7. null:", myNull, "| typeof:", typeof myNull, "(known JavaScript quirk)");

// Object - collections of key-value pairs
const myObject = { name: "John", age: 30 };
console.log("8. object:", myObject, "| typeof:", typeof myObject);

// ============================================================================
// TOPIC 2: Methods of Primitives
// ============================================================================
console.log("\n📌 TOPIC 2: Methods of Primitives (Wrapper Objects)");
console.log("-".repeat(40));

/**
 * Wrapper Objects enable methods on primitive types:
 * - String wrapper for strings
 * - Number wrapper for numbers
 * - Boolean wrapper for booleans
 * - Symbol wrapper for symbols
 * - BigInt wrapper for bigints
 * 
 * When you call a method on a primitive, JavaScript:
 * 1. Creates a temporary wrapper object
 * 2. Calls the method on that object
 * 3. Returns the result
 * 4. Destroys the wrapper object
 * 
 * The primitive itself is NEVER modified (immutable)
 */

// String method example
const primitiveStr = "hello world";
const upperStr = primitiveStr.toUpperCase();
console.log("Original string:", primitiveStr, "(unchanged)");
console.log("After toUpperCase():", upperStr);

// Number method example
const primitiveNum = 123.456789;
const fixedNum = primitiveNum.toFixed(2);
console.log("Original number:", primitiveNum, "(unchanged)");
console.log("After toFixed(2):", fixedNum);

// Demonstrating wrapper object creation (not recommended for actual use)
const strWrapper = new String("wrapped");
console.log("Wrapper object:", strWrapper, "| typeof:", typeof strWrapper);
console.log("Primitive value:", strWrapper.valueOf(), "| typeof:", typeof strWrapper.valueOf());

// ============================================================================
// TOPIC 3: Number Methods & Precision
// ============================================================================
console.log("\n📌 TOPIC 3: Number Methods & Precision");
console.log("-".repeat(40));

/**
 * Key Number Methods:
 * - toFixed(digits): Formats number with fixed decimal places
 * - toPrecision(precision): Formats number to specified precision
 * - parseInt(string, radix): Parses string to integer
 * - parseFloat(string): Parses string to floating-point number
 */

// toFixed() - returns string with fixed decimal places
const price = 19.99999;
console.log("toFixed(2):", price.toFixed(2)); // "20.00"
console.log("toFixed(0):", price.toFixed(0)); // "20"

// toPrecision() - returns string with specified significant digits
const bigNum = 12345.6789;
console.log("toPrecision(4):", bigNum.toPrecision(4)); // "1.235e+4"
console.log("toPrecision(6):", bigNum.toPrecision(6)); // "12345.7"

// parseInt() - parses string to integer
console.log("parseInt('42'):", parseInt("42"));        // 42
console.log("parseInt('42.9'):", parseInt("42.9"));    // 42
console.log("parseInt('42px'):", parseInt("42px"));    // 42
console.log("parseInt('1010', 2):", parseInt("1010", 2)); // 10 (binary)

// parseFloat() - parses string to float
console.log("parseFloat('3.14'):", parseFloat("3.14"));      // 3.14
console.log("parseFloat('3.14.15'):", parseFloat("3.14.15")); // 3.14

// ⚠️ Floating-point precision issues
console.log("\n⚠️ Floating-Point Precision Issue:");
const sum = 0.1 + 0.2;
console.log("0.1 + 0.2 =", sum);           // 0.30000000000000004
console.log("0.1 + 0.2 === 0.3:", sum === 0.3); // false!

// Solution: Use epsilon comparison or fixed precision
const epsilon = Number.EPSILON;
console.log("Epsilon comparison:", Math.abs(sum - 0.3) < epsilon); // true
console.log("Fixed precision:", (0.1 + 0.2).toFixed(1) === "0.3"); // true

// ============================================================================
// TOPIC 4: Date and Time Manipulation
// ============================================================================
console.log("\n📌 TOPIC 4: Date and Time Manipulation");
console.log("-".repeat(40));

/**
 * Date Object Methods:
 * - new Date(): Create date object
 * - getFullYear(): Get 4-digit year
 * - getMonth(): Get month (0-11)
 * - getDate(): Get day of month (1-31)
 * - getTime(): Get milliseconds since epoch
 * - getHours(), getMinutes(), getSeconds()
 */

// Creating Date objects
const now = new Date();
const specificDate = new Date(2024, 11, 25, 10, 30, 0); // Dec 25, 2024, 10:30:00
const fromString = new Date("2024-01-15T08:00:00");

console.log("Current date:", now.toISOString());
console.log("Specific date:", specificDate.toLocaleString());
console.log("From string:", fromString.toLocaleString());

// Common Date methods
console.log("\nDate methods on specificDate:");
console.log("getFullYear():", specificDate.getFullYear());  // 2024
console.log("getMonth():", specificDate.getMonth());        // 11 (December, 0-indexed)
console.log("getDate():", specificDate.getDate());          // 25
console.log("getTime():", specificDate.getTime());          // milliseconds since epoch

/**
 * Function to calculate time difference between two Date objects
 * @param {Date} startDate - The starting date
 * @param {Date} endDate - The ending date
 * @returns {Object} - Object containing difference in various units
 */
function calculateTimeDifference(startDate, endDate) {
    const diffMs = Math.abs(endDate.getTime() - startDate.getTime());
    
    return {
        milliseconds: diffMs,
        seconds: Math.floor(diffMs / 1000),
        minutes: Math.floor(diffMs / (1000 * 60)),
        hours: Math.floor(diffMs / (1000 * 60 * 60)),
        days: Math.floor(diffMs / (1000 * 60 * 60 * 24))
    };
}

// Example usage
const date1 = new Date("2024-01-01");
const date2 = new Date("2024-12-31");
const diff = calculateTimeDifference(date1, date2);
console.log("\nTime difference between 2024-01-01 and 2024-12-31:");
console.log("Days:", diff.days);
console.log("Hours:", diff.hours);

// ============================================================================
// TOPIC 5: Essential String Methods
// ============================================================================
console.log("\n📌 TOPIC 5: Essential String Methods");
console.log("-".repeat(40));

/**
 * Five Essential String Methods:
 * 1. substring(start, end) - Extracts characters between two indices
 * 2. slice(start, end) - Similar to substring, but supports negative indices
 * 3. split(separator) - Splits string into array
 * 4. trim() - Removes whitespace from both ends
 * 5. indexOf(searchValue) - Returns first index of value, or -1
 */

const sampleString = "  Hello, World! Welcome to JavaScript!  ";

// 1. substring(start, end)
console.log("Original:", `"${sampleString.trim()}"`);
console.log("substring(0, 5):", `"${sampleString.trim().substring(0, 5)}"`); // "Hello"
console.log("substring(7, 12):", `"${sampleString.trim().substring(7, 12)}"`); // "World"

// 2. slice(start, end) - supports negative indices
const text = "JavaScript";
console.log("\nslice examples on 'JavaScript':");
console.log("slice(0, 4):", text.slice(0, 4));   // "Java"
console.log("slice(-6):", text.slice(-6));       // "Script"
console.log("slice(4, -1):", text.slice(4, -1)); // "Scrip"

// 3. split(separator)
const csvData = "apple,banana,cherry,date";
const fruits = csvData.split(",");
console.log("\nsplit(',') on CSV:", fruits);

// 4. trim(), trimStart(), trimEnd()
const paddedStr = "   spaces around   ";
console.log("\ntrim() example:");
console.log("Original:", `"${paddedStr}"`);
console.log("Trimmed:", `"${paddedStr.trim()}"`);

// 5. indexOf(searchValue)
const sentence = "The quick brown fox jumps over the lazy dog";
console.log("\nindexOf() examples on:", `"${sentence}"`);
console.log("indexOf('fox'):", sentence.indexOf("fox"));     // 16
console.log("indexOf('cat'):", sentence.indexOf("cat"));     // -1 (not found)
console.log("indexOf('the'):", sentence.indexOf("the"));     // 31 (case-sensitive)

// ============================================================================
// TOPIC 6: JSON Serialization
// ============================================================================
console.log("\n📌 TOPIC 6: JSON Serialization");
console.log("-".repeat(40));

/**
 * JSON Methods:
 * - JSON.stringify(value, replacer, space) - Convert to JSON string
 * - JSON.parse(text, reviver) - Parse JSON string to object
 * 
 * Optional parameters:
 * - replacer: Function or array to filter properties
 * - space: Number or string for indentation
 * - reviver: Function to transform parsed values
 */

const user = {
    name: "Alice",
    age: 28,
    email: "alice@example.com",
    password: "secret123", // Should be excluded
    joinDate: new Date("2023-06-15")
};

// Basic stringify
console.log("Basic stringify:");
console.log(JSON.stringify(user));

// Stringify with indentation
console.log("\nFormatted stringify (2 spaces):");
console.log(JSON.stringify(user, null, 2));

// Stringify with replacer (array - include only specified keys)
console.log("\nReplacer (array) - only name and email:");
console.log(JSON.stringify(user, ["name", "email"], 2));

// Stringify with replacer function (exclude password)
const replacerFn = (key, value) => {
    if (key === "password") return undefined; // Exclude password
    return value;
};
console.log("\nReplacer (function) - exclude password:");
console.log(JSON.stringify(user, replacerFn, 2));

// Parse with reviver (convert date strings back to Date objects)
const jsonString = '{"name":"Bob","birthDate":"1995-03-20T00:00:00.000Z"}';
const reviverFn = (key, value) => {
    if (key === "birthDate") return new Date(value);
    return value;
};
const parsedUser = JSON.parse(jsonString, reviverFn);
console.log("\nParse with reviver:");
console.log("Parsed object:", parsedUser);
console.log("birthDate is Date:", parsedUser.birthDate instanceof Date);

// ============================================================================
// TOPIC 7: Custom toJSON Method
// ============================================================================
console.log("\n📌 TOPIC 7: Custom toJSON Method");
console.log("-".repeat(40));

/**
 * Objects can define a toJSON() method to control serialization.
 * When JSON.stringify() is called, it checks for toJSON() first.
 */

const product = {
    name: "Laptop",
    price: 999.99,
    internalCode: "LAP-2024-001", // Don't expose this
    stock: 50,
    
    // Custom toJSON method
    toJSON() {
        return {
            name: this.name,
            price: `$${this.price.toFixed(2)}`,
            available: this.stock > 0,
            // internalCode is excluded
        };
    }
};

console.log("Object with custom toJSON():");
console.log("Original object:", product);
console.log("JSON.stringify result:", JSON.stringify(product, null, 2));

// Another example with nested toJSON
const order = {
    orderId: "ORD-001",
    product: product,
    quantity: 2,
    toJSON() {
        return {
            orderId: this.orderId,
            item: this.product, // Will use product's toJSON
            qty: this.quantity
        };
    }
};

console.log("\nNested toJSON example:");
console.log(JSON.stringify(order, null, 2));

// ============================================================================
// TOPIC 8: Array Initialization and Access
// ============================================================================
console.log("\n📌 TOPIC 8: Array Initialization and Access");
console.log("-".repeat(40));

/**
 * Array Creation Methods:
 * 1. Array literal [] - Preferred, most common
 * 2. new Array() - Constructor, has quirks
 * 3. Array.of() - Creates array from arguments
 * 4. Array.from() - Creates array from iterable
 */

// Array literal (preferred)
const literal = [1, 2, 3, 4, 5];
console.log("Array literal [1,2,3,4,5]:", literal);

// new Array() - different behaviors!
const newArray1 = new Array(3);        // Creates sparse array with 3 empty slots
const newArray2 = new Array(1, 2, 3);  // Creates [1, 2, 3]
console.log("new Array(3):", newArray1, "| length:", newArray1.length);
console.log("new Array(1,2,3):", newArray2);

// Array.of() - consistent behavior
const ofArray = Array.of(3);           // Creates [3], not empty array
console.log("Array.of(3):", ofArray);

// Array.from() - from iterable
const arrayFromString = Array.from("hello");
const arrayFromSet = Array.from(new Set([1, 2, 2, 3]));
console.log("Array.from('hello'):", arrayFromString);
console.log("Array.from(Set):", arrayFromSet);

// Index-based access
const colors = ["red", "green", "blue"];
console.log("\nIndex-based access on", colors);
console.log("colors[0]:", colors[0]);           // "red"
console.log("colors[2]:", colors[2]);           // "blue"
console.log("colors[-1]:", colors[-1]);         // undefined (use at(-1) instead)
console.log("colors.at(-1):", colors.at(-1));   // "blue" (ES2022)

// ============================================================================
// TOPIC 9: Core Array Methods
// ============================================================================
console.log("\n📌 TOPIC 9: Core Array Methods");
console.log("-".repeat(40));

/**
 * Core Array Manipulation Methods:
 * - push(): Add to end
 * - pop(): Remove from end
 * - shift(): Remove from beginning
 * - unshift(): Add to beginning
 * - splice(): Add/remove at any position
 * - slice(): Extract portion (non-mutating)
 */

let numbers = [1, 2, 3, 4, 5];
console.log("Starting array:", numbers);

// push() - add to end, returns new length
const newLength = numbers.push(6, 7);
console.log("After push(6, 7):", numbers, "| new length:", newLength);

// pop() - remove from end, returns removed element
const popped = numbers.pop();
console.log("After pop():", numbers, "| removed:", popped);

// unshift() - add to beginning
numbers.unshift(0);
console.log("After unshift(0):", numbers);

// shift() - remove from beginning
const shifted = numbers.shift();
console.log("After shift():", numbers, "| removed:", shifted);

// splice(start, deleteCount, ...items) - modify in place
console.log("\nSplice examples:");
let spliceDemo = [1, 2, 3, 4, 5];
console.log("Original:", spliceDemo);

// Remove 2 elements starting at index 1
let removed = spliceDemo.splice(1, 2);
console.log("splice(1, 2):", spliceDemo, "| removed:", removed);

// Insert at index 1 without removing
spliceDemo.splice(1, 0, "a", "b");
console.log("splice(1, 0, 'a', 'b'):", spliceDemo);

// Replace: remove 1 and insert
spliceDemo.splice(3, 1, "X");
console.log("splice(3, 1, 'X'):", spliceDemo);

// slice(start, end) - non-mutating, returns new array
console.log("\nSlice examples:");
const original = [1, 2, 3, 4, 5];
console.log("Original:", original);
console.log("slice(1, 4):", original.slice(1, 4));  // [2, 3, 4]
console.log("slice(-2):", original.slice(-2));      // [4, 5]
console.log("Original unchanged:", original);

// ============================================================================
// TOPIC 10: High-Order Array Methods (Iteration)
// ============================================================================
console.log("\n📌 TOPIC 10: High-Order Array Methods");
console.log("-".repeat(40));

/**
 * High-Order Array Methods:
 * - map(): Transform each element, returns new array
 * - filter(): Select elements that pass test, returns new array
 * - reduce(): Aggregate to single value
 */

const products = [
    { name: "Apple", price: 1.5, quantity: 10 },
    { name: "Banana", price: 0.75, quantity: 15 },
    { name: "Orange", price: 2.0, quantity: 8 },
    { name: "Mango", price: 3.0, quantity: 5 }
];

// map() - Transform each element
console.log("map() - Get product names:");
const names = products.map(p => p.name);
console.log(names);

console.log("\nmap() - Calculate total value per product:");
const totals = products.map(p => ({
    name: p.name,
    total: p.price * p.quantity
}));
console.log(totals);

// filter() - Select elements matching condition
console.log("\nfilter() - Products under $2:");
const affordable = products.filter(p => p.price < 2);
console.log(affordable);

console.log("\nfilter() - Products with quantity >= 10:");
const inStock = products.filter(p => p.quantity >= 10);
console.log(inStock.map(p => p.name));

// reduce() - Aggregate to single value
console.log("\nreduce() - Total inventory value:");
const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
console.log("$" + totalValue.toFixed(2));

console.log("\nreduce() - Group by price range:");
const grouped = products.reduce((acc, p) => {
    const range = p.price < 2 ? "budget" : "premium";
    if (!acc[range]) acc[range] = [];
    acc[range].push(p.name);
    return acc;
}, {});
console.log(grouped);

// Chaining methods
console.log("\nChaining: Filter expensive, get names, join:");
const result = products
    .filter(p => p.price >= 2)
    .map(p => p.name)
    .join(", ");
console.log(result);

// ============================================================================
// TOPIC 11: Understanding Iterables
// ============================================================================
console.log("\n📌 TOPIC 11: Understanding Iterables");
console.log("-".repeat(40));

/**
 * Iterable Protocol:
 * An object is iterable if it implements Symbol.iterator method
 * that returns an iterator with a next() method.
 * 
 * Built-in iterables: Array, String, Map, Set, arguments, NodeList
 * 
 * for...of loop works with any iterable
 */

// for...of with arrays
console.log("for...of with Array:");
const arr = ["a", "b", "c"];
for (const item of arr) {
    console.log("  ", item);
}

// for...of with strings
console.log("\nfor...of with String:");
for (const char of "Hi!") {
    console.log("  ", char);
}

// for...of with Map
console.log("\nfor...of with Map:");
const map = new Map([["x", 1], ["y", 2]]);
for (const [key, value] of map) {
    console.log(`   ${key}: ${value}`);
}

// Custom Iterable Object
console.log("\nCustom Iterable Object:");
const range = {
    from: 1,
    to: 5,
    
    // Implement Symbol.iterator
    [Symbol.iterator]() {
        let current = this.from;
        const last = this.to;
        
        return {
            next() {
                if (current <= last) {
                    return { done: false, value: current++ };
                } else {
                    return { done: true };
                }
            }
        };
    }
};

console.log("Custom range from 1 to 5:");
for (const num of range) {
    console.log("  ", num);
}

// Spread operator works with iterables
console.log("\nSpread on custom iterable:", [...range]);

// ============================================================================
// TOPIC 12: Map and Set Usage
// ============================================================================
console.log("\n📌 TOPIC 12: Map and Set Usage");
console.log("-".repeat(40));

/**
 * Map: Key-value pairs with ANY key type (not just strings)
 * Set: Collection of unique values
 */

// Map examples
console.log("Map - Key-value storage with any key type:");
const userMap = new Map();

// Keys can be any type
userMap.set("name", "John");
userMap.set(1, "one");
userMap.set(true, "boolean key");
const objKey = { id: 1 };
userMap.set(objKey, "object as key!");

console.log("Map size:", userMap.size);
console.log("get('name'):", userMap.get("name"));
console.log("get(1):", userMap.get(1));
console.log("get(objKey):", userMap.get(objKey));
console.log("has('name'):", userMap.has("name"));

// Map iteration
console.log("\nMap iteration:");
for (const [key, value] of userMap) {
    console.log(`  ${typeof key} key:`, key, "=>", value);
}

// Set examples
console.log("\nSet - Unique values collection:");
const uniqueSet = new Set([1, 2, 2, 3, 3, 3, 4]);
console.log("Set from [1,2,2,3,3,3,4]:", [...uniqueSet]);
console.log("Set size:", uniqueSet.size);

uniqueSet.add(5);
uniqueSet.add(1); // Already exists, won't be added
console.log("After add(5) and add(1):", [...uniqueSet]);

/**
 * Function to find unique elements in an array using Set
 * @param {Array} arr - Input array
 * @returns {Array} - Array with unique elements
 */
function findUnique(arr) {
    return [...new Set(arr)];
}

const duplicateArray = [1, "a", 2, "a", 3, 1, 2, "b"];
console.log("\nFind unique elements:");
console.log("Input:", duplicateArray);
console.log("Unique:", findUnique(duplicateArray));

// ============================================================================
// TOPIC 13: WeakMap and WeakSet
// ============================================================================
console.log("\n📌 TOPIC 13: WeakMap and WeakSet");
console.log("-".repeat(40));

/**
 * WeakMap and WeakSet:
 * - Keys must be objects (not primitives)
 * - Hold "weak" references - don't prevent garbage collection
 * - Not iterable (no size property, no forEach, etc.)
 * - Useful for caching, metadata, private data
 */

// WeakMap example - caching computed data
console.log("WeakMap - Metadata caching example:");
const cache = new WeakMap();

function processData(obj) {
    if (cache.has(obj)) {
        console.log("  Cache hit!");
        return cache.get(obj);
    }
    
    // Expensive computation
    const result = { processed: true, timestamp: Date.now() };
    cache.set(obj, result);
    console.log("  Cache miss, computed and stored");
    return result;
}

let dataObj = { value: 42 };
processData(dataObj); // Cache miss
processData(dataObj); // Cache hit

// WeakSet example - tracking visited objects
console.log("\nWeakSet - Tracking visited nodes:");
const visitedNodes = new WeakSet();

function visitNode(node) {
    if (visitedNodes.has(node)) {
        console.log(`  Node "${node.name}" already visited`);
        return;
    }
    visitedNodes.add(node);
    console.log(`  Visiting node "${node.name}"`);
}

const nodeA = { name: "A" };
const nodeB = { name: "B" };

visitNode(nodeA);
visitNode(nodeB);
visitNode(nodeA); // Already visited

console.log("\nWeakMap/WeakSet characteristics:");
console.log("- Keys must be objects");
console.log("- Allow garbage collection of keys");
console.log("- Not iterable (no for...of)");
console.log("- No size property");
console.log("- Use cases: caching, metadata, DOM data");

// ============================================================================
// TOPIC 14: Object Property Iteration
// ============================================================================
console.log("\n📌 TOPIC 14: Object Property Iteration");
console.log("-".repeat(40));

/**
 * Object Iteration Methods:
 * - Object.keys(obj): Returns array of property names
 * - Object.values(obj): Returns array of property values
 * - Object.entries(obj): Returns array of [key, value] pairs
 */

const person = {
    name: "Alice",
    age: 30,
    city: "New York",
    occupation: "Engineer"
};

console.log("Object:", person);

// Object.keys()
console.log("\nObject.keys() - Property names:");
const keys = Object.keys(person);
console.log(keys);

// Object.values()
console.log("\nObject.values() - Property values:");
const values = Object.values(person);
console.log(values);

// Object.entries()
console.log("\nObject.entries() - [key, value] pairs:");
const entries = Object.entries(person);
console.log(entries);

// Practical use: Iterate with for...of
console.log("\nIterating with for...of over entries:");
for (const [key, value] of Object.entries(person)) {
    console.log(`  ${key}: ${value}`);
}

// Converting back: Object.fromEntries()
console.log("\nObject.fromEntries() - Convert back to object:");
const modified = Object.fromEntries(
    Object.entries(person).map(([k, v]) => [k.toUpperCase(), v])
);
console.log(modified);

// ============================================================================
// TOPIC 15: Destructuring Assignment
// ============================================================================
console.log("\n📌 TOPIC 15: Destructuring Assignment");
console.log("-".repeat(40));

/**
 * Destructuring allows extracting values from arrays/objects
 * into distinct variables.
 */

// Array Destructuring
console.log("Array Destructuring:");
const rgb = [255, 128, 64];

// Basic destructuring
const [red, green, blue] = rgb;
console.log(`RGB: R=${red}, G=${green}, B=${blue}`);

// Skip elements
const [first, , third] = [1, 2, 3, 4, 5];
console.log(`Skip: first=${first}, third=${third}`);

// Rest syntax
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log(`Rest: head=${head}, tail=[${tail}]`);

// Default values
const [a, b, c = 10] = [1, 2];
console.log(`Defaults: a=${a}, b=${b}, c=${c}`);

// Swapping variables
let x = 1, y = 2;
[x, y] = [y, x];
console.log(`Swapped: x=${x}, y=${y}`);

// Object Destructuring
console.log("\nObject Destructuring:");
const employee = {
    empName: "Bob",
    empAge: 35,
    department: "Engineering",
    salary: 75000
};

// Basic destructuring
const { empName, department } = employee;
console.log(`Basic: name=${empName}, dept=${department}`);

// Renaming variables
const { empName: fullName, empAge: yearsOld } = employee;
console.log(`Renamed: fullName=${fullName}, yearsOld=${yearsOld}`);

// Default values
const { empName: name2, title = "Employee" } = employee;
console.log(`Default: name=${name2}, title=${title}`);

// Nested destructuring
const company = {
    companyName: "TechCorp",
    address: {
        street: "123 Main St",
        city: "Boston"
    },
    employees: ["Alice", "Bob", "Charlie"]
};

const { 
    companyName, 
    address: { street, city },
    employees: [ceo, ...others]
} = company;
console.log(`\nNested: ${companyName} at ${street}, ${city}`);
console.log(`CEO: ${ceo}, Others: [${others}]`);

// Function parameter destructuring
console.log("\nFunction Parameter Destructuring:");
function displayUser({ name, age, role = "User" }) {
    console.log(`  ${name} (${age}) - ${role}`);
}

displayUser({ name: "Eve", age: 28, role: "Admin" });
displayUser({ name: "Frank", age: 32 });

// ============================================================================
// SUMMARY
// ============================================================================
console.log("\n" + "=".repeat(80));
console.log("✅ DAY-8 Complete: JavaScript Data Types & Primitives");
console.log("=".repeat(80));
console.log("Topics Covered:");
console.log("  1. Core Data Types (8 types)");
console.log("  2. Methods of Primitives (wrapper objects)");
console.log("  3. Number Methods & Precision");
console.log("  4. Date and Time Manipulation");
console.log("  5. Essential String Methods");
console.log("  6. JSON Serialization");
console.log("  7. Custom toJSON Method");
console.log("  8. Array Initialization and Access");
console.log("  9. Core Array Methods");
console.log("  10. High-Order Array Methods");
console.log("  11. Understanding Iterables");
console.log("  12. Map and Set Usage");
console.log("  13. WeakMap and WeakSet");
console.log("  14. Object Property Iteration");
console.log("  15. Destructuring Assignment");
console.log("=".repeat(80));
