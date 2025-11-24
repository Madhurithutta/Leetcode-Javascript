Array.prototype.groupBy = function(fn) {
    const res = {};
    for (const item of this) {
        const key = fn(item);
        if (!res[key]) res[key] = [];
        res[key].push(item);
    }
    return res;
};
