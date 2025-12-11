# Object Properties Configuration

This directory contains examples and demonstrations of advanced object property features in JavaScript.

## Topics Covered

### 1. Property Flags & Descriptors (`property-flags-descriptors.js`)

Property descriptors are objects that describe the configuration of a property. Each property has three flags:

- **writable** - if `true`, the value can be changed, otherwise it's read-only
- **enumerable** - if `true`, the property shows up in loops like `for...in`
- **configurable** - if `true`, the property can be deleted and these attributes can be modified

#### Key Concepts:
- `Object.getOwnPropertyDescriptor()` - get descriptor for a single property
- `Object.getOwnPropertyDescriptors()` - get all property descriptors
- `Object.defineProperty()` - define a single property with custom descriptor
- `Object.defineProperties()` - define multiple properties at once
- `Object.seal()` - prevent adding/removing properties
- `Object.freeze()` - make object completely immutable

#### Example:
```javascript
let user = {};
Object.defineProperty(user, "name", {
    value: "John",
    writable: false,      // read-only
    enumerable: true,     // visible in loops
    configurable: false   // cannot be deleted
});
```

### 2. Property Getters & Setters (`property-getters-setters.js`)

Accessor properties allow you to run functions when reading or writing a property value. They're defined using `get` and `set` keywords.

#### Key Concepts:
- **Getters** - functions that execute when a property is read
- **Setters** - functions that execute when a property is written
- Data validation using setters
- Computed properties using getters
- Private property patterns with `_` prefix
- Lazy evaluation with getters

#### Example:
```javascript
let user = {
    firstName: "John",
    lastName: "Doe",
    
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    
    set fullName(value) {
        [this.firstName, this.lastName] = value.split(" ");
    }
};

console.log(user.fullName); // "John Doe"
user.fullName = "Alice Smith";
console.log(user.firstName); // "Alice"
```

## Running the Examples

You can run each file individually using Node.js:

```bash
node src/Object_properties_configuration/property-flags-descriptors.js
node src/Object_properties_configuration/property-getters-setters.js
```

## Learning Resources

- [MDN - Object.defineProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
- [MDN - Getters and Setters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#defining_getters_and_setters)
- [JavaScript.info - Property Flags](https://javascript.info/property-descriptors)
- [JavaScript.info - Property Getters and Setters](https://javascript.info/property-accessors)

## Key Takeaways

1. Property descriptors give fine-grained control over object properties
2. Getters and setters enable computed properties and data validation
3. Use `Object.seal()` and `Object.freeze()` for immutability
4. Accessor properties (getters/setters) are great for encapsulation
5. Understanding property flags is essential for advanced JavaScript programming
