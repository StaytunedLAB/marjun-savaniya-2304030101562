// Prototype Methods and Objects Without __proto__
// Modern methods for working with prototypes and creating objects without prototypes

console.log("=== Prototype Methods & Objects Without __proto__ ===\n");

// 1. Object.create() - Modern Way
console.log("1. Object.create() - Creating Objects with Prototype:");
let animal = {
    eats: true,
    walk() {
        console.log("  Animal walks");
    }
};

let rabbit = Object.create(animal);
rabbit.jumps = true;

console.log("rabbit.eats:", rabbit.eats);
console.log("rabbit.jumps:", rabbit.jumps);
rabbit.walk();

// 2. Object.getPrototypeOf() and Object.setPrototypeOf()
console.log("\n2. Getting and Setting Prototypes:");
let dog = {
    barks: true
};

let puppy = Object.create(dog);
console.log("puppy's prototype:", Object.getPrototypeOf(puppy) === dog);

let cat = {
    meows: true
};

// Change prototype (not recommended for performance)
Object.setPrototypeOf(puppy, cat);
console.log("After setPrototypeOf:");
console.log("  puppy.meows:", puppy.meows);
console.log("  puppy.barks:", puppy.barks); // undefined now

// 3. Object.create(null) - Objects Without Prototype
console.log("\n3. Objects Without Prototype:");
let pureObject = Object.create(null);
pureObject.name = "Pure";

console.log("pureObject.name:", pureObject.name);
console.log("pureObject.toString:", pureObject.toString); // undefined
console.log("pureObject.__proto__:", pureObject.__proto__); // undefined

// Regular object for comparison
let regularObject = {};
console.log("\nRegular object:");
console.log("  regularObject.toString:", typeof regularObject.toString); // function
console.log("  regularObject.__proto__:", regularObject.__proto__ !== undefined); // true

// 4. Use Case: Dictionary/Map Objects
console.log("\n4. Pure Objects as Dictionaries:");
let dict = Object.create(null);
dict["key1"] = "value1";
dict["key2"] = "value2";
dict["toString"] = "This is a value, not a method!";

console.log("dict:", dict);
console.log("dict.toString:", dict.toString); // Just a string, not a method
console.log("'toString' in dict:", 'toString' in dict); // true, but as a property

// With regular object, this would be problematic
let regularDict = {};
regularDict["toString"] = "value";
console.log("\nRegular dict:");
console.log("  regularDict.toString:", regularDict.toString); // Still a function!
console.log("  regularDict['toString']:", regularDict["toString"]); // "value"

// 5. Object.keys() and for...in with Pure Objects
console.log("\n5. Iterating Pure Objects:");
let pureDict = Object.create(null);
pureDict.a = 1;
pureDict.b = 2;
pureDict.c = 3;

console.log("Object.keys(pureDict):", Object.keys(pureDict));

for (let key in pureDict) {
    console.log(`  ${key}: ${pureDict[key]}`);
}

// 6. Object.create() with Property Descriptors
console.log("\n6. Object.create() with Descriptors:");
let vehicle = {
    wheels: 4
};

let car = Object.create(vehicle, {
    brand: {
        value: "Toyota",
        writable: true,
        enumerable: true,
        configurable: true
    },
    model: {
        value: "Camry",
        writable: true,
        enumerable: true
    }
});

console.log("car.brand:", car.brand);
console.log("car.model:", car.model);
console.log("car.wheels:", car.wheels);

// 7. Checking if Object Has Prototype
console.log("\n7. Checking Object Prototypes:");
let withProto = {};
let withoutProto = Object.create(null);

console.log("Object with prototype:");
console.log("  Prototype:", Object.getPrototypeOf(withProto));
console.log("  Has __proto__:", '__proto__' in withProto);

console.log("\nObject without prototype:");
console.log("  Prototype:", Object.getPrototypeOf(withoutProto));
console.log("  Has __proto__:", '__proto__' in withoutProto);

// 8. Object.hasOwnProperty() Alternative
console.log("\n8. hasOwnProperty() with Pure Objects:");
let pureObj = Object.create(null);
pureObj.name = "Test";

// This won't work - pure object has no hasOwnProperty
// console.log(pureObj.hasOwnProperty('name')); // Error!

// Solution: call from Object.prototype
console.log("Has 'name' property:", Object.prototype.hasOwnProperty.call(pureObj, 'name'));

// Or use Object.hasOwn() (ES2022)
if (Object.hasOwn) {
    console.log("Using Object.hasOwn():", Object.hasOwn(pureObj, 'name'));
}

// 9. Practical Example: Configuration Object
console.log("\n9. Practical Example - Configuration Object:");
function createConfig(defaults) {
    // Create pure object to avoid prototype pollution
    let config = Object.create(null);
    
    if (defaults) {
        for (let key in defaults) {
            config[key] = defaults[key];
        }
    }
    
    return config;
}

let appConfig = createConfig({
    apiUrl: "https://api.example.com",
    timeout: 5000,
    debug: true
});

console.log("Config:", appConfig);
console.log("Config has no prototype pollution:", appConfig.toString === undefined);

// 10. Prototype Chain Manipulation
console.log("\n10. Prototype Chain Manipulation:");
let level1 = { a: 1 };
let level2 = Object.create(level1);
level2.b = 2;
let level3 = Object.create(level2);
level3.c = 3;

console.log("level3.a:", level3.a); // From level1
console.log("level3.b:", level3.b); // From level2
console.log("level3.c:", level3.c); // Own property

// Get entire prototype chain
function getPrototypeChain(obj) {
    let chain = [];
    let current = obj;
    
    while (current !== null) {
        chain.push(current);
        current = Object.getPrototypeOf(current);
    }
    
    return chain;
}

console.log("Prototype chain length:", getPrototypeChain(level3).length);

// 11. Cloning Objects with Prototype
console.log("\n11. Cloning Objects with Prototype:");
let original = {
    name: "Original",
    greet() {
        console.log(`  Hello from ${this.name}`);
    }
};

// Shallow clone with same prototype
let clone1 = Object.create(
    Object.getPrototypeOf(original),
    Object.getOwnPropertyDescriptors(original)
);

console.log("clone1.name:", clone1.name);
clone1.greet();

// 12. Very Pure Objects - No Prototype at All
console.log("\n12. Very Pure Objects:");
let veryPure = Object.create(null);
veryPure.x = 10;
veryPure.y = 20;

console.log("veryPure:", veryPure);
console.log("Can use bracket notation:", veryPure['x']);
console.log("Prototype is null:", Object.getPrototypeOf(veryPure) === null);

// Safe from prototype pollution
veryPure.__proto__ = { injected: true };
console.log("After trying to set __proto__:", veryPure.__proto__); // Just a regular property
console.log("veryPure.injected:", veryPure.injected); // undefined - safe!

// 13. Modern Class Syntax with Prototypes
console.log("\n13. Modern Classes (Under the Hood):");
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        console.log(`  ${this.name} makes a sound`);
    }
}

let dogInstance = new Animal("Dog");
console.log("Dog's prototype is Animal.prototype:", Object.getPrototypeOf(dogInstance) === Animal.prototype);
console.log("Animal.prototype.speak:", typeof Animal.prototype.speak);
dogInstance.speak();

// 14. Object.setPrototypeOf() Performance Warning
console.log("\n14. Performance Considerations:");
console.log("⚠️ Object.setPrototypeOf() is slow!");
console.log("   Better to use Object.create() from the start");

let obj1 = Object.create(animal); // Fast ✓
// let obj2 = {}; Object.setPrototypeOf(obj2, animal); // Slow ✗

// 15. Practical Pattern: Factory Functions
console.log("\n15. Factory Function Pattern:");
function createUser(name, email) {
    let user = Object.create(null);
    
    user.name = name;
    user.email = email;
    user.getInfo = function() {
        return `${this.name} (${this.email})`;
    };
    
    return user;
}

let user1 = createUser("Alice", "alice@example.com");
let user2 = createUser("Bob", "bob@example.com");

console.log("User 1:", user1.getInfo());
console.log("User 2:", user2.getInfo());
console.log("Users have no prototype:", Object.getPrototypeOf(user1) === null);

console.log("\n=== Summary ===");
console.log("✓ Use Object.create() instead of __proto__");
console.log("✓ Use Object.getPrototypeOf() and Object.setPrototypeOf()");
console.log("✓ Use Object.create(null) for pure dictionaries");
console.log("✓ Avoid Object.setPrototypeOf() for performance");
console.log("✓ Be careful with pure objects - they lack built-in methods");

console.log("\n=== End of Prototype Methods & Objects Without __proto__ ===");
