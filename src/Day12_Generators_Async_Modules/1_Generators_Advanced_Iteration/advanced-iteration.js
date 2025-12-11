// ============================================
// ADVANCED ITERATION PATTERNS
// ============================================
console.log("=== 1. Custom Iterators ===");

// Creating a custom iterable object
const customIterable = {
    data: [10, 20, 30, 40, 50],
    
    // Symbol.iterator method makes object iterable
    [Symbol.iterator]() {
        let index = 0;
        const data = this.data;
        
        return {
            next() {
                if (index < data.length) {
                    return { value: data[index++], done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }
};

console.log("Iterating custom iterable:");
for (let value of customIterable) {
    console.log("Value:", value);
}

console.log("\n=== 2. Range Iterator ===");

class Range {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    
    [Symbol.iterator]() {
        let current = this.start;
        const end = this.end;
        
        return {
            next() {
                if (current <= end) {
                    return { value: current++, done: false };
                }
                return { done: true };
            }
        };
    }
}

const range = new Range(1, 5);
console.log("Range from 1 to 5:");
for (let num of range) {
    console.log(num);
}

console.log("\n=== 3. Reverse Iteration ===");

class ReverseArray {
    constructor(array) {
        this.array = array;
    }
    
    [Symbol.iterator]() {
        let index = this.array.length - 1;
        const array = this.array;
        
        return {
            next() {
                if (index >= 0) {
                    return { value: array[index--], done: false };
                }
                return { done: true };
            }
        };
    }
}

const reverseArr = new ReverseArray([1, 2, 3, 4, 5]);
console.log("Reverse iteration:");
for (let value of reverseArr) {
    console.log(value);
}

console.log("\n=== 4. Iterator with Generator ===");

class IterableWithGenerator {
    constructor(data) {
        this.data = data;
    }
    
    // Using generator for cleaner iterator implementation
    *[Symbol.iterator]() {
        for (let item of this.data) {
            yield item.toUpperCase();
        }
    }
}

const iterGen = new IterableWithGenerator(['apple', 'banana', 'cherry']);
console.log("Iterator using generator:");
for (let fruit of iterGen) {
    console.log(fruit);
}

console.log("\n=== 5. Matrix Iterator ===");

class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = [];
        
        // Initialize matrix with sequential values
        let value = 1;
        for (let i = 0; i < rows; i++) {
            this.data[i] = [];
            for (let j = 0; j < cols; j++) {
                this.data[i][j] = value++;
            }
        }
    }
    
    // Iterate row by row
    *[Symbol.iterator]() {
        for (let row of this.data) {
            for (let value of row) {
                yield value;
            }
        }
    }
    
    // Custom iterator for columns
    *columns() {
        for (let col = 0; col < this.cols; col++) {
            for (let row = 0; row < this.rows; row++) {
                yield this.data[row][col];
            }
        }
    }
    
    // Custom iterator for diagonals
    *diagonal() {
        const min = Math.min(this.rows, this.cols);
        for (let i = 0; i < min; i++) {
            yield this.data[i][i];
        }
    }
}

const matrix = new Matrix(3, 3);
console.log("Matrix row-by-row:");
for (let value of matrix) {
    process.stdout.write(value + " ");
}
console.log("\n\nMatrix column-by-column:");
for (let value of matrix.columns()) {
    process.stdout.write(value + " ");
}
console.log("\n\nMatrix diagonal:");
for (let value of matrix.diagonal()) {
    process.stdout.write(value + " ");
}
console.log();

console.log("\n=== 6. Fibonacci Iterator ===");

class FibonacciIterator {
    constructor(limit) {
        this.limit = limit;
    }
    
    *[Symbol.iterator]() {
        let [prev, curr] = [0, 1];
        let count = 0;
        
        while (count < this.limit) {
            yield curr;
            [prev, curr] = [curr, prev + curr];
            count++;
        }
    }
}

const fib = new FibonacciIterator(10);
console.log("First 10 Fibonacci numbers:");
console.log([...fib].join(", "));

console.log("\n=== 7. Chaining Iterators ===");

class ChainableIterator {
    constructor(data) {
        this.data = data;
    }
    
    *[Symbol.iterator]() {
        yield* this.data;
    }
    
    *filter(predicate) {
        for (let item of this.data) {
            if (predicate(item)) {
                yield item;
            }
        }
    }
    
    *map(transform) {
        for (let item of this.data) {
            yield transform(item);
        }
    }
    
    *take(n) {
        let count = 0;
        for (let item of this.data) {
            if (count >= n) break;
            yield item;
            count++;
        }
    }
}

const chainable = new ChainableIterator([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
console.log("Original data:");
console.log([...chainable]);

console.log("\nFiltered (even numbers):");
console.log([...chainable.filter(x => x % 2 === 0)]);

console.log("\nMapped (squared):");
console.log([...chainable.map(x => x * x)]);

console.log("\nTake first 3:");
console.log([...chainable.take(3)]);

console.log("\n=== 8. Infinite Iterator with Take ===");

function* infiniteCounter(start = 0, step = 1) {
    let current = start;
    while (true) {
        yield current;
        current += step;
    }
}

function* take(iterable, n) {
    let count = 0;
    for (let item of iterable) {
        if (count >= n) break;
        yield item;
        count++;
    }
}

console.log("First 7 even numbers:");
const evenNumbers = infiniteCounter(0, 2);
console.log([...take(evenNumbers, 7)]);

console.log("\n=== 9. Lazy Evaluation with Iterators ===");

function* lazyMap(iterable, fn) {
    for (let item of iterable) {
        console.log(`  Mapping ${item}...`);
        yield fn(item);
    }
}

function* lazyFilter(iterable, predicate) {
    for (let item of iterable) {
        console.log(`  Filtering ${item}...`);
        if (predicate(item)) {
            yield item;
        }
    }
}

const numbers = [1, 2, 3, 4, 5, 6];
console.log("Lazy evaluation (operations only run when consumed):");
const doubled = lazyMap(numbers, x => x * 2);
const filtered = lazyFilter(doubled, x => x > 5);

console.log("\nConsuming first 2 items:");
const iterator = filtered[Symbol.iterator]();
console.log("Result 1:", iterator.next().value);
console.log("Result 2:", iterator.next().value);

console.log("\n=== 10. Iterator for Tree Traversal ===");

class TreeNode {
    constructor(value) {
        this.value = value;
        this.children = [];
    }
    
    addChild(child) {
        this.children.push(child);
        return child;
    }
    
    // Depth-first traversal
    *[Symbol.iterator]() {
        yield this.value;
        for (let child of this.children) {
            yield* child;
        }
    }
    
    // Breadth-first traversal
    *breadthFirst() {
        const queue = [this];
        while (queue.length > 0) {
            const node = queue.shift();
            yield node.value;
            queue.push(...node.children);
        }
    }
}

const root = new TreeNode('Root');
const child1 = root.addChild(new TreeNode('Child 1'));
const child2 = root.addChild(new TreeNode('Child 2'));
child1.addChild(new TreeNode('Grandchild 1.1'));
child1.addChild(new TreeNode('Grandchild 1.2'));
child2.addChild(new TreeNode('Grandchild 2.1'));

console.log("Depth-first traversal:");
for (let value of root) {
    console.log(value);
}

console.log("\nBreadth-first traversal:");
for (let value of root.breadthFirst()) {
    console.log(value);
}

console.log("\n=== All Advanced Iteration Examples Completed! ===");
