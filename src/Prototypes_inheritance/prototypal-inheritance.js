// Prototypal Inheritance in JavaScript
// Objects can inherit properties and methods from other objects through their prototype

console.log("=== Prototypal Inheritance ===\n");

// 1. Basic Prototype Chain
console.log("1. Basic Prototype Chain:");
let animal = {
    eats: true,
    walk() {
        console.log("  Animal walks");
    }
};

let rabbit = {
    jumps: true
};

// Set animal as prototype of rabbit
rabbit.__proto__ = animal;

console.log("Rabbit jumps:", rabbit.jumps); // Own property
console.log("Rabbit eats:", rabbit.eats);   // Inherited from animal
rabbit.walk(); // Inherited method

// 2. Prototype Chain with Multiple Levels
console.log("\n2. Prototype Chain with Multiple Levels:");
let mammal = {
    warmBlooded: true,
    breathe() {
        console.log("  Breathing...");
    }
};

let dog = {
    bark() {
        console.log("  Woof! Woof!");
    }
};

let puppy = {
    playful: true
};

// Create chain: puppy -> dog -> mammal
dog.__proto__ = mammal;
puppy.__proto__ = dog;

console.log("Puppy is playful:", puppy.playful);
console.log("Puppy is warm-blooded:", puppy.warmBlooded);
puppy.bark();
puppy.breathe();

// 3. Object.create() Method
console.log("\n3. Object.create() Method:");
let vehicle = {
    wheels: 4,
    drive() {
        console.log("  Driving...");
    }
};

let car = Object.create(vehicle);
car.brand = "Toyota";

console.log("Car brand:", car.brand);
console.log("Car wheels:", car.wheels); // Inherited
car.drive(); // Inherited method

// 4. Inheriting and Overriding
console.log("\n4. Inheriting and Overriding:");
let bird = {
    canFly: true,
    fly() {
        console.log("  Bird is flying!");
    }
};

let penguin = Object.create(bird);
penguin.canFly = false; // Override property
penguin.fly = function() { // Override method
    console.log("  Penguins can't fly, but they can swim!");
};

console.log("Penguin can fly:", penguin.canFly);
penguin.fly();

let eagle = Object.create(bird);
console.log("Eagle can fly:", eagle.canFly);
eagle.fly();

// 5. this in Inherited Methods
console.log("\n5. 'this' in Inherited Methods:");
let user = {
    name: "Default User",
    greet() {
        console.log(`  Hello, I'm ${this.name}`);
    }
};

let admin = Object.create(user);
admin.name = "Admin";

let guest = Object.create(user);
guest.name = "Guest";

admin.greet(); // 'this' refers to admin
guest.greet(); // 'this' refers to guest

// 6. for...in Loop with Inheritance
console.log("\n6. for...in Loop with Inheritance:");
let shape = {
    type: "Shape",
    draw() {
        console.log("  Drawing shape");
    }
};

let rectangle = Object.create(shape);
rectangle.width = 100;
rectangle.height = 50;

console.log("All properties (including inherited):");
for (let key in rectangle) {
    console.log(`  ${key}: ${rectangle[key]}`);
}

console.log("\nOwn properties only:");
for (let key in rectangle) {
    if (rectangle.hasOwnProperty(key)) {
        console.log(`  ${key}: ${rectangle[key]}`);
    }
}

// 7. Checking Prototype Relationship
console.log("\n7. Checking Prototype Relationship:");
let food = {
    edible: true
};

let fruit = Object.create(food);
fruit.sweet = true;

let apple = Object.create(fruit);
apple.color = "red";

console.log("Is food prototype of apple?", food.isPrototypeOf(apple));
console.log("Is fruit prototype of apple?", fruit.isPrototypeOf(apple));

console.log("apple's prototype is fruit:", Object.getPrototypeOf(apple) === fruit);
console.log("fruit's prototype is food:", Object.getPrototypeOf(fruit) === food);

// 8. Writing to Prototype Properties
console.log("\n8. Writing to Prototype Properties:");
let device = {
    power: 100
};

let phone = Object.create(device);
let laptop = Object.create(device);

console.log("Phone power:", phone.power);
console.log("Laptop power:", laptop.power);

// Writing creates own property, doesn't modify prototype
phone.power = 50;
console.log("\nAfter phone.power = 50:");
console.log("Phone power:", phone.power);
console.log("Laptop power:", laptop.power); // Still 100
console.log("Device power:", device.power); // Still 100

// 9. Prototype Methods vs Own Methods
console.log("\n9. Prototype Methods vs Own Methods:");
let calculator = {
    add(a, b) {
        return a + b;
    }
};

let scientificCalc = Object.create(calculator);
scientificCalc.square = function(x) {
    return x * x;
};

console.log("5 + 3 =", scientificCalc.add(5, 3)); // Inherited
console.log("5² =", scientificCalc.square(5));     // Own method

console.log("\nOwn properties:", Object.keys(scientificCalc));
console.log("Has 'add' as own property:", scientificCalc.hasOwnProperty('add'));
console.log("Has 'square' as own property:", scientificCalc.hasOwnProperty('square'));

// 10. Practical Example: Simple Inheritance
console.log("\n10. Practical Example: Simple Inheritance:");
let person = {
    init(name, age) {
        this.name = name;
        this.age = age;
        return this;
    },
    introduce() {
        console.log(`  Hi, I'm ${this.name} and I'm ${this.age} years old.`);
    }
};

let employee = Object.create(person);
employee.initEmployee = function(name, age, position) {
    this.init(name, age);
    this.position = position;
    return this;
};
employee.work = function() {
    console.log(`  ${this.name} is working as a ${this.position}.`);
};

let john = Object.create(employee).initEmployee("John", 30, "Developer");
john.introduce();
john.work();

console.log("\n=== End of Prototypal Inheritance ===");
