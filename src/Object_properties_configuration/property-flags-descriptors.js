// Property Flags and Descriptors in JavaScript
// Object properties have special attributes (flags) that control their behavior

console.log("=== Property Flags & Descriptors ===\n");

// 1. Understanding Property Descriptors
console.log("1. Getting Property Descriptors:");
let user = {
    name: "John",
    age: 30
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');
console.log("Descriptor for 'name' property:");
console.log(JSON.stringify(descriptor, null, 2));
// Output shows: value, writable, enumerable, configurable flags

// 2. Defining Properties with Custom Descriptors
console.log("\n2. Defining Properties with Custom Descriptors:");
let person = {};

Object.defineProperty(person, "name", {
    value: "Alice",
    writable: false,      // Cannot be changed
    enumerable: true,     // Shows up in for...in loops
    configurable: false   // Cannot be deleted or reconfigured
});

console.log("Person name:", person.name);
person.name = "Bob"; // This won't work because writable is false
console.log("After trying to change (writable: false):", person.name);

// 3. Non-enumerable Properties
console.log("\n3. Non-enumerable Properties:");
let student = {};

Object.defineProperty(student, "id", {
    value: 12345,
    enumerable: false // Won't show in for...in
});

Object.defineProperty(student, "name", {
    value: "John Doe",
    enumerable: true
});

console.log("Student object:");
for (let key in student) {
    console.log(`  ${key}: ${student[key]}`); // Only 'name' will be shown
}
console.log("Direct access to id:", student.id); // But we can still access it

// 4. Non-configurable Properties
console.log("\n4. Non-configurable Properties:");
let product = {};

Object.defineProperty(product, "price", {
    value: 100,
    configurable: false
});

try {
    delete product.price; // This won't work
    console.log("Price after delete attempt:", product.price);
} catch (e) {
    console.log("Error:", e.message);
}

// 5. Defining Multiple Properties
console.log("\n5. Defining Multiple Properties:");
let book = {};

Object.defineProperties(book, {
    title: {
        value: "JavaScript: The Good Parts",
        writable: true,
        enumerable: true
    },
    author: {
        value: "Douglas Crockford",
        writable: true,
        enumerable: true
    },
    isbn: {
        value: "978-0596517748",
        writable: false,
        enumerable: false
    }
});

console.log("Book:", book);
console.log("Keys:", Object.keys(book)); // ISBN won't be shown

// 6. Getting All Descriptors
console.log("\n6. Getting All Property Descriptors:");
let allDescriptors = Object.getOwnPropertyDescriptors(book);
console.log("All descriptors:");
console.log(JSON.stringify(allDescriptors, null, 2));

// 7. Read-only Object
console.log("\n7. Making Object Read-only:");
let config = {
    apiKey: "secret-key",
    timeout: 5000
};

// Make all properties read-only
for (let key in config) {
    Object.defineProperty(config, key, {
        writable: false
    });
}

config.apiKey = "new-key"; // Won't work
console.log("Config after modification attempt:", config);

// 8. Sealing and Freezing Objects
console.log("\n8. Sealing and Freezing Objects:");

// Seal: prevents adding/removing properties, but allows modifying existing
let sealedObj = { x: 10 };
Object.seal(sealedObj);
sealedObj.x = 20; // Works
sealedObj.y = 30; // Doesn't work
console.log("Sealed object:", sealedObj);

// Freeze: prevents any modifications
let frozenObj = { a: 1 };
Object.freeze(frozenObj);
frozenObj.a = 2; // Doesn't work
frozenObj.b = 3; // Doesn't work
console.log("Frozen object:", frozenObj);

console.log("\n=== End of Property Flags & Descriptors ===");
