function memoize(fn) {
    const cache = new Map();

    return function (...args) {
        let curr = cache;
        for (const arg of args) {
            if (!curr.has(arg)) curr.set(arg, new Map());
            curr = curr.get(arg);
        }
        if ("value" in curr) return curr.value;
        const val = fn.apply(this, args);
        curr.value = val;
        return val;
    };
}

