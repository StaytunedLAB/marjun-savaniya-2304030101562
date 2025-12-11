// ============================================
// ASYNC GENERATORS
// ============================================
console.log("=== 1. Basic Async Generator ===");

async function* basicAsyncGenerator() {
    console.log("Generator started");
    
    await new Promise(resolve => setTimeout(resolve, 500));
    yield "First value";
    
    await new Promise(resolve => setTimeout(resolve, 500));
    yield "Second value";
    
    await new Promise(resolve => setTimeout(resolve, 500));
    yield "Third value";
    
    console.log("Generator completed");
}

async function demonstrateBasicAsyncGen() {
    console.log("Using basic async generator:");
    for await (let value of basicAsyncGenerator()) {
        console.log("Received:", value);
    }
}

demonstrateBasicAsyncGen().then(() => {
    console.log("\n=== 2. Async Generator with Parameters ===");
    
    async function* asyncRange(start, end, delay = 300) {
        for (let i = start; i <= end; i++) {
            await new Promise(resolve => setTimeout(resolve, delay));
            yield i;
        }
    }
    
    async function useAsyncRange() {
        console.log("Async range from 1 to 5:");
        for await (let num of asyncRange(1, 5)) {
            console.log(num);
        }
    }
    
    return useAsyncRange();
}).then(() => {
    console.log("\n=== 3. Async Generator for Data Fetching ===");
    
    async function* fetchUsers(userIds) {
        for (let id of userIds) {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 400));
            
            const user = {
                id: id,
                name: `User ${id}`,
                email: `user${id}@example.com`
            };
            
            yield user;
        }
    }
    
    async function processUsers() {
        console.log("Fetching users asynchronously:");
        
        const userIds = [1, 2, 3, 4];
        for await (let user of fetchUsers(userIds)) {
            console.log(`✓ Fetched: ${user.name} (${user.email})`);
        }
    }
    
    return processUsers();
}).then(() => {
    console.log("\n=== 4. Async Generator with Two-way Communication ===");
    
    async function* twoWayAsyncGenerator() {
        let received;
        
        received = yield "What's your name?";
        console.log("Received name:", received);
        await new Promise(resolve => setTimeout(resolve, 300));
        
        received = yield "What's your favorite color?";
        console.log("Received color:", received);
        await new Promise(resolve => setTimeout(resolve, 300));
        
        return "Thank you for the information!";
    }
    
    async function communicateWithGenerator() {
        console.log("Two-way communication with async generator:");
        
        const gen = twoWayAsyncGenerator();
        
        console.log((await gen.next()).value);
        console.log((await gen.next("Alice")).value);
        console.log((await gen.next("Blue")).value);
    }
    
    return communicateWithGenerator();
}).then(() => {
    console.log("\n=== 5. Async Generator for File Processing ===");
    
    async function* processLargeFile(lines) {
        let lineNumber = 0;
        
        for (let line of lines) {
            lineNumber++;
            
            // Simulate processing delay
            await new Promise(resolve => setTimeout(resolve, 200));
            
            // Process line (example: convert to uppercase)
            const processed = {
                lineNumber: lineNumber,
                original: line,
                processed: line.toUpperCase()
            };
            
            yield processed;
        }
    }
    
    async function readFile() {
        const fileLines = [
            "hello world",
            "async generators",
            "are powerful",
            "for stream processing"
        ];
        
        console.log("Processing file lines:");
        for await (let result of processLargeFile(fileLines)) {
            console.log(`Line ${result.lineNumber}: ${result.processed}`);
        }
    }
    
    return readFile();
}).then(() => {
    console.log("\n=== 6. Async Generator with Error Handling ===");
    
    async function* asyncGenWithErrors() {
        try {
            yield "First";
            await new Promise(resolve => setTimeout(resolve, 300));
            
            yield "Second";
            await new Promise(resolve => setTimeout(resolve, 300));
            
            throw new Error("Simulated error");
        } catch (error) {
            console.log("Error caught in generator:", error.message);
            yield "Recovered";
        } finally {
            console.log("Cleanup in finally block");
        }
    }
    
    async function handleAsyncGenErrors() {
        console.log("Async generator with error handling:");
        
        try {
            for await (let value of asyncGenWithErrors()) {
                console.log("Value:", value);
            }
        } catch (error) {
            console.log("Error caught outside:", error.message);
        }
    }
    
    return handleAsyncGenErrors();
}).then(() => {
    console.log("\n=== 7. Async Generator for Rate Limiting ===");
    
    async function* rateLimitedRequests(requests, requestsPerSecond) {
        const delay = 1000 / requestsPerSecond;
        
        for (let request of requests) {
            await new Promise(resolve => setTimeout(resolve, delay));
            
            // Simulate API request
            const response = {
                request: request,
                status: 200,
                timestamp: new Date().toISOString()
            };
            
            yield response;
        }
    }
    
    async function makeRateLimitedRequests() {
        const requests = ['GET /users', 'GET /posts', 'GET /comments', 'GET /likes'];
        
        console.log("Making rate-limited requests (2 per second):");
        for await (let response of rateLimitedRequests(requests, 2)) {
            console.log(`✓ ${response.request} - Status: ${response.status}`);
        }
    }
    
    return makeRateLimitedRequests();
}).then(() => {
    console.log("\n=== 8. Async Generator for Real-time Data Stream ===");
    
    async function* realTimeDataStream(duration, interval) {
        const endTime = Date.now() + duration;
        let count = 0;
        
        while (Date.now() < endTime) {
            await new Promise(resolve => setTimeout(resolve, interval));
            
            const data = {
                id: ++count,
                value: Math.random() * 100,
                timestamp: Date.now()
            };
            
            yield data;
        }
    }
    
    async function monitorStream() {
        console.log("Monitoring real-time data stream for 2 seconds:");
        
        for await (let data of realTimeDataStream(2000, 400)) {
            console.log(`Data #${data.id}: ${data.value.toFixed(2)}`);
        }
        
        console.log("Stream ended");
    }
    
    return monitorStream();
}).then(() => {
    console.log("\n=== 9. Composing Async Generators ===");
    
    async function* fetchFromSource1() {
        await new Promise(resolve => setTimeout(resolve, 300));
        yield { source: 'Source 1', data: 'Data A' };
        await new Promise(resolve => setTimeout(resolve, 300));
        yield { source: 'Source 1', data: 'Data B' };
    }
    
    async function* fetchFromSource2() {
        await new Promise(resolve => setTimeout(resolve, 300));
        yield { source: 'Source 2', data: 'Data X' };
        await new Promise(resolve => setTimeout(resolve, 300));
        yield { source: 'Source 2', data: 'Data Y' };
    }
    
    async function* combineSources() {
        yield* fetchFromSource1();
        yield* fetchFromSource2();
    }
    
    async function processCombinedSources() {
        console.log("Processing combined sources:");
        
        for await (let item of combineSources()) {
            console.log(`${item.source}: ${item.data}`);
        }
    }
    
    return processCombinedSources();
}).then(() => {
    console.log("\n=== 10. Async Generator for Batch Processing ===");
    
    async function* batchProcessor(items, batchSize) {
        for (let i = 0; i < items.length; i += batchSize) {
            const batch = items.slice(i, i + batchSize);
            
            // Simulate batch processing
            await new Promise(resolve => setTimeout(resolve, 400));
            
            const results = batch.map(item => ({
                input: item,
                output: item * 2
            }));
            
            yield {
                batchNumber: Math.floor(i / batchSize) + 1,
                results: results
            };
        }
    }
    
    async function processBatches() {
        const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        
        console.log("Processing data in batches of 3:");
        for await (let batch of batchProcessor(data, 3)) {
            console.log(`Batch ${batch.batchNumber}:`, batch.results);
        }
    }
    
    return processBatches();
}).then(() => {
    console.log("\n=== 11. Async Generator with Filtering ===");
    
    async function* asyncFilter(iterable, predicate) {
        for await (let item of iterable) {
            if (await predicate(item)) {
                yield item;
            }
        }
    }
    
    async function* numberStream() {
        for (let i = 1; i <= 10; i++) {
            await new Promise(resolve => setTimeout(resolve, 200));
            yield i;
        }
    }
    
    async function filterNumbers() {
        console.log("Filtering async stream for even numbers:");
        
        const evenNumbers = asyncFilter(numberStream(), async (n) => n % 2 === 0);
        
        for await (let num of evenNumbers) {
            console.log("Even number:", num);
        }
    }
    
    return filterNumbers();
}).then(() => {
    console.log("\n=== 12. Async Generator Pipeline ===");
    
    async function* dataSource() {
        const data = [1, 2, 3, 4, 5];
        for (let item of data) {
            await new Promise(resolve => setTimeout(resolve, 200));
            yield item;
        }
    }
    
    async function* transform(source, fn) {
        for await (let item of source) {
            yield fn(item);
        }
    }
    
    async function* filter(source, predicate) {
        for await (let item of source) {
            if (predicate(item)) {
                yield item;
            }
        }
    }
    
    async function pipeline() {
        console.log("Async generator pipeline:");
        
        const source = dataSource();
        const doubled = transform(source, x => x * 2);
        const filtered = filter(doubled, x => x > 5);
        
        for await (let result of filtered) {
            console.log("Final result:", result);
        }
    }
    
    return pipeline();
}).then(() => {
    console.log("\n=== All Async Generator Examples Completed! ===");
}).catch(error => {
    console.error("Error in async generator examples:", error);
});
