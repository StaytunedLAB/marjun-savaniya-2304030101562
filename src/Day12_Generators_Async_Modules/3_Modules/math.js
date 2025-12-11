// ============================================
// MATH UTILITIES MODULE
// Demonstrates: Named exports, default export
// ============================================

// Named exports - individual functions
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export function multiply(a, b) {
    return a * b;
}

export function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}

// Named export - constant
export const PI = 3.14159;
export const E = 2.71828;

// Named export - class
export class Calculator {
    constructor() {
        this.memory = 0;
    }
    
    add(value) {
        this.memory += value;
        return this;
    }
    
    subtract(value) {
        this.memory -= value;
        return this;
    }
    
    multiply(value) {
        this.memory *= value;
        return this;
    }
    
    divide(value) {
        if (value === 0) {
            throw new Error("Cannot divide by zero");
        }
        this.memory /= value;
        return this;
    }
    
    clear() {
        this.memory = 0;
        return this;
    }
    
    getResult() {
        return this.memory;
    }
}

// Named exports - advanced functions
export function power(base, exponent) {
    return Math.pow(base, exponent);
}

export function sqrt(number) {
    if (number < 0) {
        throw new Error("Cannot calculate square root of negative number");
    }
    return Math.sqrt(number);
}

export function factorial(n) {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

// Group export
export function sum(...numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
}

export function average(...numbers) {
    if (numbers.length === 0) return 0;
    return sum(...numbers) / numbers.length;
}

// Default export - main math utility object
const MathUtils = {
    add,
    subtract,
    multiply,
    divide,
    power,
    sqrt,
    factorial,
    sum,
    average,
    constants: { PI, E },
    Calculator
};

export default MathUtils;
