// ============================================
// ASYNC ITERATION
// ============================================
console.log("=== 1. Async Iterable Basics ===");

// Creating an async iterable object
const asyncIterable = {
    data: ['First', 'Second', 'Third'],
    
    // Symbol.asyncIterator makes object async iterable
    [Symbol.asyncIterator]() {
        let index = 0;
        const data = this.data;
        
        return {
            async next() {
                // Simulate async delay
                await new Promise(resolve => setTimeout(resolve, 500));
                
                if (index < data.length) {
                    return { value: data[index++], done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }
};

async function demonstrateAsyncIterable() {
    console.log("Starting async iteration...");
    for await (let value of asyncIterable) {
        console.log("Received:", value);
    }
    console.log("Async iteration completed!");
}

demonstrateAsyncIterable().then(() => {
    console.log("\n=== 2. Async Range Iterator ===");
    
    class AsyncRange {
        constructor(start, end, delay = 300) {
            this.start = start;
            this.end = end;
            this.delay = delay;
        }
        
        [Symbol.asyncIterator]() {
            let current = this.start;
            const end = this.end;
            const delay = this.delay;
            
            return {
                async next() {
                    await new Promise(resolve => setTimeout(resolve, delay));
                    
                    if (current <= end) {
                        return { value: current++, done: false };
                    }
                    return { done: true };
                }
            };
        }
    }
    
    async function useAsyncRange() {
        const range = new AsyncRange(1, 5);
        console.log("Async range from 1 to 5:");
        for await (let num of range) {
            console.log(num);
        }
    }
    
    return useAsyncRange();
}).then(() => {
    console.log("\n=== 3. Async Data Fetcher ===");
    
    class AsyncDataFetcher {
        constructor(urls) {
            this.urls = urls;
        }
        
        [Symbol.asyncIterator]() {
            let index = 0;
            const urls = this.urls;
            
            return {
                async next() {
                    if (index < urls.length) {
                        // Simulate fetching data
                        await new Promise(resolve => setTimeout(resolve, 400));
                        const data = {
                            url: urls[index],
                            data: `Data from ${urls[index]}`,
                            timestamp: Date.now()
                        };
                        index++;
                        return { value: data, done: false };
                    }
                    return { done: true };
                }
            };
        }
    }
    
    async function fetchData() {
        const fetcher = new AsyncDataFetcher([
            'api/users',
            'api/posts',
            'api/comments'
        ]);
        
        console.log("Fetching data from multiple endpoints:");
        for await (let result of fetcher) {
            console.log(`✓ ${result.url}: ${result.data}`);
        }
    }
    
    return fetchData();
}).then(() => {
    console.log("\n=== 4. Reading Stream Simulation ===");
    
    async function* readStream(data, chunkSize = 2) {
        let index = 0;
        while (index < data.length) {
            await new Promise(resolve => setTimeout(resolve, 300));
            yield data.slice(index, index + chunkSize);
            index += chunkSize;
        }
    }
    
    async function processStream() {
        const data = [1, 2, 3, 4, 5, 6, 7, 8];
        console.log("Processing stream in chunks:");
        
        for await (let chunk of readStream(data)) {
            console.log("Chunk received:", chunk);
        }
    }
    
    return processStream();
}).then(() => {
    console.log("\n=== 5. Async Iterator with Error Handling ===");
    
    class AsyncDataSource {
        constructor(items, errorAt = -1) {
            this.items = items;
            this.errorAt = errorAt;
        }
        
        [Symbol.asyncIterator]() {
            let index = 0;
            const items = this.items;
            const errorAt = this.errorAt;
            
            return {
                async next() {
                    await new Promise(resolve => setTimeout(resolve, 300));
                    
                    if (index === errorAt) {
                        throw new Error(`Error at index ${index}`);
                    }
                    
                    if (index < items.length) {
                        return { value: items[index++], done: false };
                    }
                    return { done: true };
                }
            };
        }
    }
    
    async function handleErrors() {
        const source = new AsyncDataSource(['A', 'B', 'C', 'D'], 2);
        
        console.log("Processing with error handling:");
        try {
            for await (let item of source) {
                console.log("Item:", item);
            }
        } catch (error) {
            console.log("Caught error:", error.message);
        }
    }
    
    return handleErrors();
}).then(() => {
    console.log("\n=== 6. Practical Example: Polling API ===");
    
    async function* pollAPI(endpoint, maxAttempts = 5) {
        let attempt = 0;
        
        while (attempt < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 500));
            attempt++;
            
            // Simulate API response
            const response = {
                status: attempt < 4 ? 'pending' : 'complete',
                attempt: attempt,
                data: attempt < 4 ? null : { result: 'Success!' }
            };
            
            yield response;
            
            if (response.status === 'complete') {
                break;
            }
        }
    }
    
    async function checkStatus() {
        console.log("Polling API status:");
        
        for await (let response of pollAPI('api/task/123')) {
            console.log(`Attempt ${response.attempt}: ${response.status}`);
            
            if (response.status === 'complete') {
                console.log("Task completed:", response.data);
                break;
            }
        }
    }
    
    return checkStatus();
}).then(() => {
    console.log("\n=== 7. Combining Multiple Async Iterables ===");
    
    async function* asyncSource1() {
        await new Promise(resolve => setTimeout(resolve, 300));
        yield 'A1';
        await new Promise(resolve => setTimeout(resolve, 300));
        yield 'A2';
    }
    
    async function* asyncSource2() {
        await new Promise(resolve => setTimeout(resolve, 300));
        yield 'B1';
        await new Promise(resolve => setTimeout(resolve, 300));
        yield 'B2';
    }
    
    async function* mergeAsyncIterables(...iterables) {
        for (let iterable of iterables) {
            yield* iterable;
        }
    }
    
    async function mergeSources() {
        console.log("Merging multiple async sources:");
        
        for await (let value of mergeAsyncIterables(asyncSource1(), asyncSource2())) {
            console.log("Value:", value);
        }
    }
    
    return mergeSources();
}).then(() => {
    console.log("\n=== 8. Async Iterator with Pagination ===");
    
    class AsyncPaginator {
        constructor(totalItems, pageSize) {
            this.totalItems = totalItems;
            this.pageSize = pageSize;
        }
        
        async *[Symbol.asyncIterator]() {
            let offset = 0;
            
            while (offset < this.totalItems) {
                await new Promise(resolve => setTimeout(resolve, 400));
                
                const pageItems = [];
                for (let i = 0; i < this.pageSize && offset < this.totalItems; i++) {
                    pageItems.push(`Item ${offset + 1}`);
                    offset++;
                }
                
                yield {
                    page: Math.floor(offset / this.pageSize),
                    items: pageItems
                };
            }
        }
    }
    
    async function paginateData() {
        const paginator = new AsyncPaginator(10, 3);
        
        console.log("Paginating data asynchronously:");
        for await (let page of paginator) {
            console.log(`Page ${page.page}:`, page.items);
        }
    }
    
    return paginateData();
}).then(() => {
    console.log("\n=== All Async Iteration Examples Completed! ===");
}).catch(error => {
    console.error("Error in async iteration examples:", error);
});
