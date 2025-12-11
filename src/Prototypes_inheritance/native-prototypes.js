// Native Prototypes in JavaScript
// Built-in objects like Array, String, Object etc. have their own prototypes

console.log("=== Native Prototypes ===\n");

// 1. Object.prototype
console.log("1. Object.prototype - Base of All Objects:");
let obj = {};
console.log("obj's prototype is Object.prototype:", Object.getPrototypeOf(obj) === Object.prototype);
console.log("Object.prototype's prototype:", Object.getPrototypeOf(Object.prototype)); // null

// Methods available from Object.prototype
console.log("obj.toString():", obj.toString());
console.log("obj.hasOwnProperty('x'):", obj.hasOwnProperty('x'));

// 2. Array.prototype
console.log("\n2. Array.prototype:");
let arr = [1, 2, 3];
console.log("arr's prototype is Array.prototype:", Object.getPrototypeOf(arr) === Array.prototype);
console.log("Array.prototype's prototype is Object.prototype:", Object.getPrototypeOf(Array.prototype) === Object.prototype);

// Methods from Array.prototype
console.log("Array methods:", arr.push(4), arr);
console.log("arr.join('-'):", arr.join('-'));
console.log("arr.map(x => x * 2):", arr.map(x => x * 2));

// 3. Function.prototype
console.log("\n3. Function.prototype:");
function myFunc() {
    return "Hello";
}

console.log("myFunc's prototype chain:");
console.log("  myFunc -> Function.prototype:", Object.getPrototypeOf(myFunc) === Function.prototype);
console.log("  Function.prototype -> Object.prototype:", Object.getPrototypeOf(Function.prototype) === Object.prototype);

// Methods from Function.prototype
console.log("myFunc.call():", myFunc.call());
console.log("myFunc.name:", myFunc.name);

// 4. String.prototype
console.log("\n4. String.prototype:");
let str = "hello";
console.log("Primitive string's prototype:", Object.getPrototypeOf(Object(str)) === String.prototype);

// String methods (auto-boxing happens)
console.log("str.toUpperCase():", str.toUpperCase());
console.log("str.charAt(1):", str.charAt(1));
console.log("str.split(''):", str.split(''));

// 5. Number.prototype
console.log("\n5. Number.prototype:");
let num = 123.456;
console.log("Number's prototype:", Object.getPrototypeOf(Object(num)) === Number.prototype);

// Number methods
console.log("num.toFixed(2):", num.toFixed(2));
console.log("num.toString():", num.toString());

// 6. Boolean.prototype
console.log("\n6. Boolean.prototype:");
let bool = true;
console.log("Boolean's prototype:", Object.getPrototypeOf(Object(bool)) === Boolean.prototype);
console.log("bool.toString():", bool.toString());

// 7. Complete Prototype Chain Example
console.log("\n7. Complete Prototype Chain Example:");
let myArray = [1, 2, 3];
console.log("Prototype chain for array:");
console.log("  myArray -> Array.prototype");
console.log("  Array.prototype -> Object.prototype");
console.log("  Object.prototype -> null");

function showProtoChain(obj, name) {
    console.log(`\nPrototype chain for ${name}:`);
    let current = obj;
    let level = 0;
    while (current !== null) {
        if (level === 0) {
            console.log(`  Level ${level}: [object itself]`);
        } else {
            console.log(`  Level ${level}: ${current.constructor ? current.constructor.name : 'Object'}.prototype`);
        }
        current = Object.getPrototypeOf(current);
        level++;
        if (level > 5) break; // Prevent infinite loop
    }
}

showProtoChain([], "[]");
showProtoChain("text", "string");
showProtoChain(42, "number");

// 8. Adding Methods to Native Prototypes (Not Recommended)
console.log("\n8. Adding Methods to Native Prototypes:");
// This is generally NOT recommended, but shown for educational purposes
String.prototype.repeat3 = function() {
    return this + this + this;
};

console.log("'hi'.repeat3():", "hi".repeat3());

// Better approach: use modern methods like String.prototype.repeat
console.log("'hi'.repeat(3):", "hi".repeat(3));

// 9. Checking Native Prototype Methods
console.log("\n9. Native Prototype Methods:");
console.log("Array.prototype methods (sample):");
console.log("  - push, pop, shift, unshift");
console.log("  - map, filter, reduce, forEach");
console.log("  - find, findIndex, includes");
console.log("  - slice, splice, concat, join");

console.log("\nObject.prototype methods:");
console.log("  - toString, valueOf");
console.log("  - hasOwnProperty, isPrototypeOf");
console.log("  - propertyIsEnumerable");

// 10. instanceof and Prototype Chain
console.log("\n10. instanceof and Prototype Chain:");
let myArr = [1, 2, 3];
console.log("myArr instanceof Array:", myArr instanceof Array);
console.log("myArr instanceof Object:", myArr instanceof Object);

let myObj = {};
console.log("myObj instanceof Object:", myObj instanceof Object);
console.log("myObj instanceof Array:", myObj instanceof Array);

function MyClass() {}
let myInstance = new MyClass();
console.log("myInstance instanceof MyClass:", myInstance instanceof MyClass);
console.log("myInstance instanceof Object:", myInstance instanceof Object);

// 11. Primitive vs Object Wrapper
console.log("\n11. Primitive vs Object Wrapper:");
let primitiveStr = "hello";
let objectStr = new String("hello");

console.log("typeof primitiveStr:", typeof primitiveStr);
console.log("typeof objectStr:", typeof objectStr);
console.log("primitiveStr === objectStr:", primitiveStr == objectStr); // true (coercion)
console.log("primitiveStr === objectStr:", primitiveStr === objectStr); // false (different types)

// Primitives can still use prototype methods through auto-boxing
console.log("primitiveStr.toUpperCase():", primitiveStr.toUpperCase());

// 12. Native Constructors
console.log("\n12. Native Constructors:");
console.log("Array constructor:", Array);
console.log("Object constructor:", Object);
console.log("String constructor:", String);
console.log("Number constructor:", Number);
console.log("Boolean constructor:", Boolean);
console.log("Function constructor:", Function);

// Creating objects with constructors
let arr2 = new Array(1, 2, 3);
let obj2 = new Object();
let str2 = new String("test");

console.log("arr2:", arr2);
console.log("obj2:", obj2);
console.log("str2:", str2);

// 13. Checking Prototype
console.log("\n13. Checking Prototype Methods:");
console.log("'toString' in []:", 'toString' in []);
console.log("[].hasOwnProperty('toString'):", [].hasOwnProperty('toString'));
console.log("Array.prototype.hasOwnProperty('toString'):", Array.prototype.hasOwnProperty('toString'));
console.log("Object.prototype.hasOwnProperty('toString'):", Object.prototype.hasOwnProperty('toString'));

// 14. Practical Example: Understanding Method Resolution
console.log("\n14. Method Resolution Order:");
let customArray = [1, 2, 3];
customArray.customMethod = function() {
    return "Custom method on instance";
};

Array.prototype.protoMethod = function() {
    return "Method on Array.prototype";
};

console.log("customArray.customMethod():", customArray.customMethod());
console.log("customArray.protoMethod():", customArray.protoMethod());
console.log("[].protoMethod():", [].protoMethod()); // All arrays get this method

// 15. Performance Considerations
console.log("\n15. Performance Considerations:");
console.log("Native prototype methods are highly optimized");
console.log("Avoid modifying native prototypes in production");
console.log("Use utility libraries or modern language features instead");

// Clean up (remove custom additions)
delete String.prototype.repeat3;
delete Array.prototype.protoMethod;

console.log("\n=== End of Native Prototypes ===");
