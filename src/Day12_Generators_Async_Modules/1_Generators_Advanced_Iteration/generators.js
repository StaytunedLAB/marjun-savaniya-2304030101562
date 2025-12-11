// ============================================
// 1. GENERATORS - BASIC CONCEPTS
// ============================================
console.log("=== 1. Basic Generator Function ===");

// Simple generator function
function* simpleGenerator() {
    console.log("Generator started");
    yield 1;
    console.log("After first yield");
    yield 2;
    console.log("After second yield");
    yield 3;
    console.log("Generator completed");
}

const gen1 = simpleGenerator();
console.log("Created generator:", gen1);
console.log("First next():", gen1.next());
console.log("Second next():", gen1.next());
console.log("Third next():", gen1.next());
console.log("Fourth next():", gen1.next());

console.log("\n=== 2. Generator with Return Value ===");

function* generatorWithReturn() {
    yield "First";
    yield "Second";
    return "Done!"; // Return value
}

const gen2 = generatorWithReturn();
console.log(gen2.next()); // { value: 'First', done: false }
console.log(gen2.next()); // { value: 'Second', done: false }
console.log(gen2.next()); // { value: 'Done!', done: true }

console.log("\n=== 3. Generator in For...of Loop ===");

function* numberGenerator() {
    yield 10;
    yield 20;
    yield 30;
    return 40; // Return value is ignored in for...of
}

console.log("Using for...of loop:");
for (let num of numberGenerator()) {
    console.log("Value:", num);
}

console.log("\n=== 4. Infinite Generator ===");

function* infiniteSequence() {
    let i = 0;
    while (true) {
        yield i++;
    }
}

const infiniteGen = infiniteSequence();
console.log("First 5 values from infinite generator:");
for (let i = 0; i < 5; i++) {
    console.log(infiniteGen.next().value);
}

console.log("\n=== 5. Generator with Parameters ===");

function* range(start, end, step = 1) {
    for (let i = start; i <= end; i += step) {
        yield i;
    }
}

console.log("Range from 1 to 10 with step 2:");
for (let num of range(1, 10, 2)) {
    console.log(num);
}

console.log("\n=== 6. Passing Values to Generator ===");

function* twoWayGenerator() {
    console.log("Generator started");
    const input1 = yield "What's your name?";
    console.log("Received:", input1);
    const input2 = yield "What's your age?";
    console.log("Received:", input2);
    return `Name: ${input1}, Age: ${input2}`;
}

const gen3 = twoWayGenerator();
console.log(gen3.next().value);           // "What's your name?"
console.log(gen3.next("Alice").value);    // "What's your age?"
console.log(gen3.next(25).value);         // "Name: Alice, Age: 25"

console.log("\n=== 7. Generator Composition (yield*) ===");

function* generator1() {
    yield 'a';
    yield 'b';
}

function* generator2() {
    yield 'x';
    yield* generator1(); // Delegate to another generator
    yield 'y';
}

console.log("Composed generator output:");
for (let value of generator2()) {
    console.log(value);
}

console.log("\n=== 8. Fibonacci Generator ===");

function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

console.log("First 10 Fibonacci numbers:");
const fibGen = fibonacci();
for (let i = 0; i < 10; i++) {
    console.log(fibGen.next().value);
}

console.log("\n=== 9. Generator for ID Generation ===");

function* idGenerator() {
    let id = 1;
    while (true) {
        yield `ID-${id++}`;
    }
}

const idGen = idGenerator();
console.log("Generate 5 unique IDs:");
for (let i = 0; i < 5; i++) {
    console.log(idGen.next().value);
}

console.log("\n=== 10. Generator with Error Handling ===");

function* generatorWithError() {
    try {
        yield 1;
        yield 2;
        yield 3;
    } catch (error) {
        console.log("Caught error:", error.message);
        yield "Error handled";
    }
}

const gen4 = generatorWithError();
console.log(gen4.next());
console.log(gen4.next());
console.log(gen4.throw(new Error("Something went wrong")));
console.log(gen4.next());

console.log("\n=== 11. Practical Example: Paginator ===");

function* paginate(items, pageSize) {
    for (let i = 0; i < items.length; i += pageSize) {
        yield items.slice(i, i + pageSize);
    }
}

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
console.log("Paginating data with page size 3:");
let pageNum = 1;
for (let page of paginate(data, 3)) {
    console.log(`Page ${pageNum++}:`, page);
}

console.log("\n=== 12. Generator Methods: next(), return(), throw() ===");

function* demonstrateAllMethods() {
    try {
        yield 'First';
        yield 'Second';
        yield 'Third';
    } catch (e) {
        console.log('Caught:', e.message);
    } finally {
        console.log('Cleanup in finally block');
    }
}

console.log("\nUsing return() to close generator early:");
const gen5 = demonstrateAllMethods();
console.log(gen5.next());
console.log(gen5.return('Forced return'));
console.log(gen5.next());

console.log("\n=== All Generator Examples Completed! ===");
