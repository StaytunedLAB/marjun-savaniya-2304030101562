# Prototypes & Inheritance

This directory contains comprehensive examples of JavaScript's prototypal inheritance system.

## Topics Covered

### 1. Prototypal Inheritance (`prototypal-inheritance.js`)

JavaScript uses prototypal inheritance where objects inherit properties and methods from other objects through the prototype chain.

#### Key Concepts:
- `__proto__` - internal property linking to prototype (deprecated, use for learning only)
- `Object.create()` - modern way to create objects with specific prototype
- Prototype chain - how JavaScript looks up properties
- `this` in inherited methods
- Property overriding in inheritance
- Checking prototype relationships with `isPrototypeOf()`

#### Example:
```javascript
let animal = {
    eats: true,
    walk() {
        console.log("Animal walks");
    }
};

let rabbit = Object.create(animal);
rabbit.jumps = true;

console.log(rabbit.eats);  // true (inherited)
console.log(rabbit.jumps); // true (own property)
rabbit.walk();             // "Animal walks" (inherited)
```

### 2. F.prototype (`f-prototype.js`)

Constructor functions use the `prototype` property to set up inheritance. When creating objects with `new`, the object's prototype is set to the constructor's `prototype` property.

#### Key Concepts:
- Constructor functions and `new` operator
- `F.prototype` property
- Default `prototype.constructor` property
- Adding methods to `prototype`
- Shared properties vs instance properties
- Maintaining constructor reference

#### Example:
```javascript
function Animal(name) {
    this.name = name;
}

Animal.prototype.eat = function() {
    console.log(`${this.name} is eating`);
};

let cat = new Animal("Cat");
cat.eat(); // "Cat is eating"
```

### 3. Native Prototypes (`native-prototypes.js`)

Built-in JavaScript objects like Array, String, Object have their own prototypes with useful methods.

#### Key Concepts:
- `Object.prototype` - root of prototype chain
- `Array.prototype` - methods like push, map, filter
- `String.prototype` - methods like toUpperCase, split
- `Number.prototype`, `Boolean.prototype`, `Function.prototype`
- Prototype chain: Array → Array.prototype → Object.prototype → null
- Auto-boxing for primitives
- Why not to modify native prototypes

#### Example:
```javascript
let arr = [1, 2, 3];
// arr → Array.prototype → Object.prototype → null

arr.push(4);        // From Array.prototype
arr.toString();     // From Object.prototype

console.log(arr instanceof Array);  // true
console.log(arr instanceof Object); // true
```

### 4. Prototype Methods & Objects Without `__proto__` (`prototype-methods-objects.js`)

Modern JavaScript provides better ways to work with prototypes and create objects without prototypes.

#### Key Concepts:
- `Object.create()` - create objects with specific prototype
- `Object.getPrototypeOf()` - get object's prototype
- `Object.setPrototypeOf()` - change prototype (slow, avoid)
- `Object.create(null)` - create pure objects without prototype
- Use cases for prototype-less objects (dictionaries, maps)
- Avoiding prototype pollution
- Performance considerations

#### Example:
```javascript
// Object with prototype
let animal = { eats: true };
let rabbit = Object.create(animal);

// Pure object without prototype
let dict = Object.create(null);
dict["toString"] = "This is safe!"; // No conflict with Object.prototype.toString

// Get prototype
console.log(Object.getPrototypeOf(rabbit) === animal); // true
```

## Running the Examples

Run each file individually with Node.js:

```bash
node src/Prototypes_inheritance/prototypal-inheritance.js
node src/Prototypes_inheritance/f-prototype.js
node src/Prototypes_inheritance/native-prototypes.js
node src/Prototypes_inheritance/prototype-methods-objects.js
```

## Prototype Chain Visualization

```
Object instance
    ↓ [[Prototype]]
Constructor.prototype
    ↓ [[Prototype]]
Object.prototype
    ↓ [[Prototype]]
null
```

## Learning Resources

- [MDN - Inheritance and the Prototype Chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [MDN - Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
- [JavaScript.info - Prototypal Inheritance](https://javascript.info/prototype-inheritance)
- [JavaScript.info - F.prototype](https://javascript.info/function-prototype)
- [JavaScript.info - Native Prototypes](https://javascript.info/native-prototypes)

## Key Takeaways

1. JavaScript uses prototypal inheritance, not classical inheritance
2. Objects inherit from other objects through the prototype chain
3. Constructor functions use `F.prototype` to set up inheritance
4. All objects ultimately inherit from `Object.prototype` (unless created with `Object.create(null)`)
5. Use `Object.create()` for modern prototype manipulation
6. Avoid `Object.setPrototypeOf()` for performance reasons
7. Pure objects (`Object.create(null)`) are useful for dictionaries to avoid prototype pollution
8. Understanding prototypes is fundamental to mastering JavaScript
