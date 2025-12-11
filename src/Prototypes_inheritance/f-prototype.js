// F.prototype in JavaScript
// Constructor functions and their prototype property

console.log("=== F.prototype ===\n");

// 1. Basic Constructor Function with Prototype
console.log("1. Basic Constructor Function with Prototype:");
function Animal(name) {
    this.name = name;
}

Animal.prototype.eat = function() {
    console.log(`  ${this.name} is eating.`);
};

let cat = new Animal("Cat");
let dog = new Animal("Dog");

cat.eat();
dog.eat();

console.log("cat's prototype is Animal.prototype:", Object.getPrototypeOf(cat) === Animal.prototype);

// 2. Default Prototype
console.log("\n2. Default Prototype:");
function Person(name) {
    this.name = name;
}

console.log("Default Person.prototype:", Person.prototype);
console.log("Person.prototype.constructor:", Person.prototype.constructor === Person);

// 3. Adding Methods to Prototype
console.log("\n3. Adding Methods to Prototype:");
function Car(brand, model) {
    this.brand = brand;
    this.model = model;
}

Car.prototype.start = function() {
    console.log(`  ${this.brand} ${this.model} is starting...`);
};

Car.prototype.stop = function() {
    console.log(`  ${this.brand} ${this.model} is stopping...`);
};

Car.prototype.getInfo = function() {
    return `${this.brand} ${this.model}`;
};

let car1 = new Car("Toyota", "Camry");
let car2 = new Car("Honda", "Civic");

car1.start();
car2.start();
console.log("Car 1:", car1.getInfo());
console.log("Car 2:", car2.getInfo());

// 4. Changing F.prototype
console.log("\n4. Changing F.prototype:");
function Robot(name) {
    this.name = name;
}

let robot1 = new Robot("R2D2");

console.log("robot1 name:", robot1.name);
console.log("robot1.sayHi:", robot1.sayHi); // undefined

// Add method to prototype after object creation
Robot.prototype.sayHi = function() {
    console.log(`  Hi, I'm ${this.name}`);
};

robot1.sayHi(); // Works! Existing objects get new methods

// 5. Replacing F.prototype
console.log("\n5. Replacing F.prototype:");
function Bird(name) {
    this.name = name;
}

let bird1 = new Bird("Sparrow");

Bird.prototype = {
    fly() {
        console.log(`  ${this.name} is flying`);
    }
};

let bird2 = new Bird("Eagle");

console.log("bird1 prototype is new prototype:", Object.getPrototypeOf(bird1) === Bird.prototype);
console.log("bird2 prototype is new prototype:", Object.getPrototypeOf(bird2) === Bird.prototype);

try {
    bird1.fly(); // Error: bird1 still has old prototype
} catch(e) {
    console.log("bird1.fly() error:", e.message);
}

bird2.fly(); // Works: bird2 has new prototype

// 6. Constructor Property
console.log("\n6. Constructor Property:");
function Gadget(name) {
    this.name = name;
}

let gadget = new Gadget("Phone");
console.log("gadget.constructor === Gadget:", gadget.constructor === Gadget);

// Can create new objects using constructor property
let gadget2 = new gadget.constructor("Laptop");
console.log("gadget2 name:", gadget2.name);

// 7. Maintaining Constructor Reference
console.log("\n7. Maintaining Constructor Reference:");
function Tool(name) {
    this.name = name;
}

// Wrong way: lose constructor reference
Tool.prototype = {
    use() {
        console.log(`  Using ${this.name}`);
    }
};

let hammer = new Tool("Hammer");
console.log("hammer.constructor === Tool:", hammer.constructor === Tool); // false!

// Right way: maintain constructor reference
function Device(name) {
    this.name = name;
}

Device.prototype = {
    constructor: Device, // Explicitly set constructor
    turnOn() {
        console.log(`  ${this.name} is turning on`);
    }
};

let phone = new Device("Phone");
console.log("phone.constructor === Device:", phone.constructor === Device); // true

// 8. Shared Properties via Prototype
console.log("\n8. Shared Properties via Prototype:");
function User(name) {
    this.name = name;
}

User.prototype.company = "TechCorp";
User.prototype.greet = function() {
    console.log(`  Hello from ${this.name} at ${this.company}`);
};

let user1 = new User("Alice");
let user2 = new User("Bob");

user1.greet();
user2.greet();

// Changing prototype property affects all instances
User.prototype.company = "NewTech";
user1.greet();
user2.greet();

// 9. Own Properties vs Prototype Properties
console.log("\n9. Own Properties vs Prototype Properties:");
function Student(name) {
    this.name = name; // Own property
}

Student.prototype.school = "JavaScript Academy"; // Prototype property

let student1 = new Student("John");
let student2 = new Student("Jane");

console.log("student1 own properties:", Object.keys(student1));
console.log("student1 has 'name' as own property:", student1.hasOwnProperty('name'));
console.log("student1 has 'school' as own property:", student1.hasOwnProperty('school'));
console.log("student1 school:", student1.school); // Can still access

// 10. Practical Example: Prototype-based Class
console.log("\n10. Practical Example: Prototype-based Class:");
function BankAccount(owner, balance) {
    this.owner = owner;
    this.balance = balance || 0;
}

BankAccount.prototype.deposit = function(amount) {
    this.balance += amount;
    console.log(`  ${this.owner} deposited $${amount}. New balance: $${this.balance}`);
};

BankAccount.prototype.withdraw = function(amount) {
    if (amount > this.balance) {
        console.log(`  Insufficient funds for ${this.owner}`);
        return;
    }
    this.balance -= amount;
    console.log(`  ${this.owner} withdrew $${amount}. New balance: $${this.balance}`);
};

BankAccount.prototype.getBalance = function() {
    return this.balance;
};

let account1 = new BankAccount("Alice", 1000);
let account2 = new BankAccount("Bob", 500);

account1.deposit(500);
account1.withdraw(200);
console.log(`  Alice's final balance: $${account1.getBalance()}`);

account2.deposit(300);
account2.withdraw(1000); // Will fail
console.log(`  Bob's final balance: $${account2.getBalance()}`);

// 11. Prototype Chain with Constructors
console.log("\n11. Prototype Chain with Constructors:");
function Shape(color) {
    this.color = color;
}

Shape.prototype.getColor = function() {
    return this.color;
};

function Circle(color, radius) {
    Shape.call(this, color); // Call parent constructor
    this.radius = radius;
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.getArea = function() {
    return Math.PI * this.radius * this.radius;
};

let circle = new Circle("red", 5);
console.log("Circle color:", circle.getColor());
console.log("Circle area:", circle.getArea().toFixed(2));

console.log("\n=== End of F.prototype ===");
