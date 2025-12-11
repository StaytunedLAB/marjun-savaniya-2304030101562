// ============================================
// GENERAL UTILITIES MODULE
// Demonstrates: Various export patterns
// ============================================

// String utilities
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function truncate(str, maxLength) {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength - 3) + '...';
}

export function reverse(str) {
    return str.split('').reverse().join('');
}

export function slugify(str) {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// Array utilities
export function chunk(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

export function unique(array) {
    return [...new Set(array)];
}

export function shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Object utilities
export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function merge(target, ...sources) {
    return Object.assign({}, target, ...sources);
}

export function pick(obj, keys) {
    return keys.reduce((result, key) => {
        if (key in obj) {
            result[key] = obj[key];
        }
        return result;
    }, {});
}

export function omit(obj, keys) {
    const result = { ...obj };
    keys.forEach(key => delete result[key]);
    return result;
}

// Date utilities
export function formatDate(date, format = 'YYYY-MM-DD') {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    
    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day);
}

export function isDateValid(date) {
    return date instanceof Date && !isNaN(date);
}

export function daysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((date1 - date2) / oneDay));
}

// Validation utilities
export function isEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function isURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

export function isEmpty(value) {
    if (value == null) return true;
    if (Array.isArray(value) || typeof value === 'string') {
        return value.length === 0;
    }
    if (typeof value === 'object') {
        return Object.keys(value).length === 0;
    }
    return false;
}

// Utility class
export class Logger {
    constructor(prefix = '') {
        this.prefix = prefix;
    }
    
    log(message) {
        console.log(`${this.prefix}[LOG] ${message}`);
    }
    
    error(message) {
        console.error(`${this.prefix}[ERROR] ${message}`);
    }
    
    warn(message) {
        console.warn(`${this.prefix}[WARN] ${message}`);
    }
    
    info(message) {
        console.info(`${this.prefix}[INFO] ${message}`);
    }
}

// Debounce and throttle utilities
export function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

export function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

// Export all as a namespace object
export const StringUtils = {
    capitalize,
    truncate,
    reverse,
    slugify
};

export const ArrayUtils = {
    chunk,
    unique,
    shuffle
};

export const ObjectUtils = {
    deepClone,
    merge,
    pick,
    omit
};

export const DateUtils = {
    formatDate,
    isDateValid,
    daysBetween
};

export const ValidationUtils = {
    isEmail,
    isURL,
    isEmpty
};
