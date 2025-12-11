// ============================================
// DYNAMIC IMPORTS
// Demonstrates: import(), lazy loading, code splitting
// ============================================

console.log("=== DYNAMIC IMPORTS ===\n");

// ============================================
// 1. BASIC DYNAMIC IMPORT
// ============================================
console.log("=== 1. Basic Dynamic Import ===");
console.log("Syntax: import('./module.js').then(module => { ... })");
console.log("Returns a Promise that resolves to the module object\n");

/*
// Example (commented as modules need proper setup):
import('./math.js')
    .then(mathModule => {
        console.log("Module loaded!");
        console.log("Add: 5 + 3 =", mathModule.add(5, 3));
        console.log("PI =", mathModule.PI);
    })
    .catch(err => {
        console.error("Error loading module:", err);
    });
*/

// ============================================
// 2. ASYNC/AWAIT WITH DYNAMIC IMPORT
// ============================================
console.log("=== 2. Using Async/Await ===");

async function loadMathModule() {
    try {
        // Simulating dynamic import
        console.log("Loading math module...");
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // const mathModule = await import('./math.js');
        const mathModule = {
            add: (a, b) => a + b,
            multiply: (a, b) => a * b,
            PI: 3.14159
        };
        
        console.log("✓ Module loaded successfully!");
        console.log("  Add: 10 + 5 =", mathModule.add(10, 5));
        console.log("  Multiply: 3 * 7 =", mathModule.multiply(3, 7));
        console.log("  PI =", mathModule.PI);
        
        return mathModule;
    } catch (error) {
        console.error("Error loading module:", error);
    }
}

loadMathModule().then(() => {
    // ============================================
    // 3. CONDITIONAL LOADING
    // ============================================
    console.log("\n=== 3. Conditional Module Loading ===");
    
    async function loadModuleBasedOnCondition(condition) {
        if (condition === 'math') {
            console.log("Loading math module...");
            await new Promise(resolve => setTimeout(resolve, 300));
            // const module = await import('./math.js');
            return { name: 'math', loaded: true };
        } else if (condition === 'utils') {
            console.log("Loading utils module...");
            await new Promise(resolve => setTimeout(resolve, 300));
            // const module = await import('./utils.js');
            return { name: 'utils', loaded: true };
        }
    }
    
    return Promise.all([
        loadModuleBasedOnCondition('math'),
        loadModuleBasedOnCondition('utils')
    ]).then(results => {
        results.forEach(result => {
            console.log(`✓ ${result.name} module loaded`);
        });
    });
}).then(() => {
    // ============================================
    // 4. LAZY LOADING FOR PERFORMANCE
    // ============================================
    console.log("\n=== 4. Lazy Loading Pattern ===");
    
    class FeatureLoader {
        constructor() {
            this.loadedModules = new Map();
        }
        
        async loadFeature(featureName) {
            // Check if already loaded
            if (this.loadedModules.has(featureName)) {
                console.log(`✓ ${featureName} already loaded (using cache)`);
                return this.loadedModules.get(featureName);
            }
            
            console.log(`Loading ${featureName}...`);
            await new Promise(resolve => setTimeout(resolve, 400));
            
            // Simulate loading different features
            const module = {
                name: featureName,
                initialized: Date.now()
            };
            
            this.loadedModules.set(featureName, module);
            console.log(`✓ ${featureName} loaded and cached`);
            
            return module;
        }
    }
    
    const loader = new FeatureLoader();
    
    return Promise.resolve()
        .then(() => loader.loadFeature('analytics'))
        .then(() => loader.loadFeature('charts'))
        .then(() => loader.loadFeature('analytics')) // Should use cache
        .then(() => {
            console.log(`\nTotal modules in cache: ${loader.loadedModules.size}`);
        });
}).then(() => {
    // ============================================
    // 5. DYNAMIC IMPORT WITH DESTRUCTURING
    // ============================================
    console.log("\n=== 5. Import with Destructuring ===");
    
    async function loadSpecificFunctions() {
        console.log("Loading specific functions...");
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // const { add, multiply, PI } = await import('./math.js');
        const { add, multiply, PI } = {
            add: (a, b) => a + b,
            multiply: (a, b) => a * b,
            PI: 3.14159
        };
        
        console.log("✓ Functions loaded");
        console.log("  add(7, 3) =", add(7, 3));
        console.log("  multiply(4, 5) =", multiply(4, 5));
        console.log("  PI =", PI);
    }
    
    return loadSpecificFunctions();
}).then(() => {
    // ============================================
    // 6. LOADING MULTIPLE MODULES CONCURRENTLY
    // ============================================
    console.log("\n=== 6. Concurrent Module Loading ===");
    
    async function loadMultipleModules() {
        console.log("Loading multiple modules concurrently...");
        
        const [mathResult, utilsResult] = await Promise.all([
            new Promise(resolve => {
                setTimeout(() => resolve({ name: 'math', status: 'loaded' }), 400);
            }),
            new Promise(resolve => {
                setTimeout(() => resolve({ name: 'utils', status: 'loaded' }), 300);
            })
        ]);
        
        console.log(`✓ ${mathResult.name} module: ${mathResult.status}`);
        console.log(`✓ ${utilsResult.name} module: ${utilsResult.status}`);
        console.log("All modules loaded in parallel!");
    }
    
    return loadMultipleModules();
}).then(() => {
    // ============================================
    // 7. PROGRESSIVE LOADING
    // ============================================
    console.log("\n=== 7. Progressive Loading ===");
    
    async function progressiveLoad() {
        const modules = ['core', 'features', 'plugins', 'themes'];
        
        console.log("Loading modules progressively:");
        for (const moduleName of modules) {
            console.log(`  Loading ${moduleName}...`);
            await new Promise(resolve => setTimeout(resolve, 300));
            console.log(`  ✓ ${moduleName} loaded`);
        }
        console.log("All modules loaded progressively!");
    }
    
    return progressiveLoad();
}).then(() => {
    // ============================================
    // 8. DYNAMIC IMPORT WITH ERROR HANDLING
    // ============================================
    console.log("\n=== 8. Error Handling with Dynamic Imports ===");
    
    async function safeModuleLoad(modulePath) {
        try {
            console.log(`Attempting to load: ${modulePath}`);
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // Simulate error for some modules
            if (modulePath === 'invalid-module') {
                throw new Error(`Module not found: ${modulePath}`);
            }
            
            console.log(`✓ Successfully loaded: ${modulePath}`);
            return { success: true, module: modulePath };
        } catch (error) {
            console.error(`✗ Failed to load ${modulePath}:`, error.message);
            return { success: false, error: error.message };
        }
    }
    
    return Promise.all([
        safeModuleLoad('valid-module'),
        safeModuleLoad('invalid-module'),
        safeModuleLoad('another-module')
    ]).then(results => {
        const successful = results.filter(r => r.success).length;
        const failed = results.filter(r => !r.success).length;
        console.log(`\nResults: ${successful} succeeded, ${failed} failed`);
    });
}).then(() => {
    // ============================================
    // 9. FEATURE FLAGS WITH DYNAMIC IMPORTS
    // ============================================
    console.log("\n=== 9. Feature Flags ===");
    
    const featureFlags = {
        enableAnalytics: true,
        enableChat: false,
        enableNotifications: true
    };
    
    async function loadEnabledFeatures() {
        console.log("Loading features based on flags:");
        
        const features = [];
        
        if (featureFlags.enableAnalytics) {
            console.log("  Loading analytics...");
            await new Promise(resolve => setTimeout(resolve, 300));
            features.push('analytics');
        }
        
        if (featureFlags.enableChat) {
            console.log("  Loading chat...");
            await new Promise(resolve => setTimeout(resolve, 300));
            features.push('chat');
        }
        
        if (featureFlags.enableNotifications) {
            console.log("  Loading notifications...");
            await new Promise(resolve => setTimeout(resolve, 300));
            features.push('notifications');
        }
        
        console.log(`✓ Loaded features: ${features.join(', ')}`);
    }
    
    return loadEnabledFeatures();
}).then(() => {
    // ============================================
    // 10. LAZY ROUTE LOADING (SPA Pattern)
    // ============================================
    console.log("\n=== 10. Lazy Route Loading ===");
    
    class Router {
        constructor() {
            this.routes = new Map();
        }
        
        register(path, loader) {
            this.routes.set(path, loader);
        }
        
        async navigate(path) {
            console.log(`\nNavigating to: ${path}`);
            
            if (!this.routes.has(path)) {
                console.log("✗ Route not found!");
                return;
            }
            
            const loader = this.routes.get(path);
            console.log("  Loading route component...");
            
            const component = await loader();
            console.log(`  ✓ Route loaded: ${component.name}`);
            
            return component;
        }
    }
    
    async function setupRouter() {
        const router = new Router();
        
        // Register routes with lazy loaders
        router.register('/', async () => {
            await new Promise(resolve => setTimeout(resolve, 300));
            return { name: 'Home', render: () => '<h1>Home</h1>' };
        });
        
        router.register('/about', async () => {
            await new Promise(resolve => setTimeout(resolve, 300));
            return { name: 'About', render: () => '<h1>About</h1>' };
        });
        
        router.register('/profile', async () => {
            await new Promise(resolve => setTimeout(resolve, 300));
            return { name: 'Profile', render: () => '<h1>Profile</h1>' };
        });
        
        // Navigate to different routes
        await router.navigate('/');
        await router.navigate('/about');
        await router.navigate('/profile');
    }
    
    return setupRouter();
}).then(() => {
    // ============================================
    // SUMMARY
    // ============================================
    console.log("\n=== Dynamic Import Benefits ===");
    console.log("✓ Lazy loading - load code only when needed");
    console.log("✓ Code splitting - smaller initial bundle");
    console.log("✓ Better performance - faster initial load");
    console.log("✓ Conditional loading - load based on conditions");
    console.log("✓ Runtime loading - load modules dynamically");
    console.log("✓ Better user experience - progressive enhancement");
    
    console.log("\n=== Use Cases ===");
    console.log("• Route-based code splitting in SPAs");
    console.log("• Loading heavy features on demand");
    console.log("• A/B testing with different implementations");
    console.log("• Loading polyfills conditionally");
    console.log("• Plugin/extension systems");
    console.log("• Internationalization (i18n) loading");
    
    console.log("\n=== All Dynamic Import Examples Completed! ===");
}).catch(error => {
    console.error("Error in examples:", error);
});
