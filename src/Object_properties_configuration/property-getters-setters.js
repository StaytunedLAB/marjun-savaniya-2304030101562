// Property Getters and Setters in JavaScript
// Getters and setters are accessor properties that allow you to run code on reading/writing a property

console.log("=== Property Getters & Setters ===\n");

// 1. Basic Getter and Setter
console.log("1. Basic Getter and Setter:");
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

console.log("Full name (using getter):", user.fullName);
user.fullName = "Alice Smith"; // Using setter
console.log("First name:", user.firstName);
console.log("Last name:", user.lastName);
console.log("Full name:", user.fullName);

// 2. Computed Properties with Getters
console.log("\n2. Computed Properties with Getters:");
let circle = {
    radius: 5,

    get diameter() {
        return this.radius * 2;
    },

    get circumference() {
        return 2 * Math.PI * this.radius;
    },

    get area() {
        return Math.PI * this.radius * this.radius;
    }
};

console.log(`Circle with radius ${circle.radius}:`);
console.log(`  Diameter: ${circle.diameter}`);
console.log(`  Circumference: ${circle.circumference.toFixed(2)}`);
console.log(`  Area: ${circle.area.toFixed(2)}`);

// 3. Data Validation with Setters
console.log("\n3. Data Validation with Setters:");
let person = {
    _age: 0,

    get age() {
        return this._age;
    },

    set age(value) {
        if (value < 0) {
            console.log("  Age cannot be negative!");
            return;
        }
        if (value > 150) {
            console.log("  Age seems unrealistic!");
            return;
        }
        this._age = value;
    }
};

person.age = 25;
console.log("Person age:", person.age);
person.age = -5; // Validation will fail
console.log("Person age after invalid attempt:", person.age);
person.age = 200; // Validation will fail
console.log("Person age after invalid attempt:", person.age);

// 4. Using defineProperty for Getters/Setters
console.log("\n4. Using defineProperty for Getters/Setters:");
let account = {
    _balance: 1000
};

Object.defineProperty(account, "balance", {
    get() {
        console.log("  Getting balance...");
        return this._balance;
    },
    set(value) {
        console.log(`  Setting balance to ${value}...`);
        if (value < 0) {
            console.log("  Balance cannot be negative!");
            return;
        }
        this._balance = value;
    }
});

console.log("Balance:", account.balance);
account.balance = 1500;
console.log("New balance:", account.balance);
account.balance = -100;

// 5. Smart Properties (Getters/Setters with Logic)
console.log("\n5. Smart Properties (Getters/Setters with Logic):");
let temperature = {
    _celsius: 0,

    get celsius() {
        return this._celsius;
    },

    set celsius(value) {
        this._celsius = value;
    },

    get fahrenheit() {
        return (this._celsius * 9/5) + 32;
    },

    set fahrenheit(value) {
        this._celsius = (value - 32) * 5/9;
    },

    get kelvin() {
        return this._celsius + 273.15;
    },

    set kelvin(value) {
        this._celsius = value - 273.15;
    }
};

temperature.celsius = 25;
console.log(`${temperature.celsius}°C = ${temperature.fahrenheit}°F = ${temperature.kelvin}K`);

temperature.fahrenheit = 98.6;
console.log(`${temperature.celsius.toFixed(2)}°C = ${temperature.fahrenheit}°F = ${temperature.kelvin.toFixed(2)}K`);

temperature.kelvin = 300;
console.log(`${temperature.celsius.toFixed(2)}°C = ${temperature.fahrenheit.toFixed(2)}°F = ${temperature.kelvin}K`);

// 6. Private Properties Pattern
console.log("\n6. Private Properties Pattern:");
function createUser(name, email) {
    return {
        _name: name,
        _email: email,

        get name() {
            return this._name;
        },

        get email() {
            return this._email;
        },

        set email(value) {
            if (!value.includes('@')) {
                console.log("  Invalid email format!");
                return;
            }
            this._email = value;
        }
    };
}

let newUser = createUser("Bob", "bob@example.com");
console.log("User:", newUser.name, newUser.email);
newUser.email = "bob-new@example.com";
console.log("Updated email:", newUser.email);
newUser.email = "invalid-email"; // Validation fails

// 7. Lazy Evaluation with Getters
console.log("\n7. Lazy Evaluation with Getters:");
let heavyObject = {
    _data: null,

    get data() {
        if (!this._data) {
            console.log("  Computing heavy data...");
            this._data = Array.from({ length: 5 }, (_, i) => i * i);
        }
        return this._data;
    }
};

console.log("First access:");
console.log(heavyObject.data);
console.log("Second access (cached):");
console.log(heavyObject.data);

// 8. Object with Read-only Properties
console.log("\n8. Object with Read-only Properties:");
let config = {
    _version: "1.0.0",

    get version() {
        return this._version;
    }
    // No setter - making it read-only
};

console.log("Config version:", config.version);
config.version = "2.0.0"; // This won't work (no setter)
console.log("Config version after attempt:", config.version);

// 9. Accessor Descriptors
console.log("\n9. Accessor Descriptors:");
let obj = {};

Object.defineProperty(obj, "prop", {
    get() {
        return this._prop || "default value";
    },
    set(value) {
        console.log(`  Setting prop to: ${value}`);
        this._prop = value;
    },
    enumerable: true,
    configurable: true
});

console.log("Initial value:", obj.prop);
obj.prop = "custom value";
console.log("Updated value:", obj.prop);

console.log("\n=== End of Property Getters & Setters ===");
