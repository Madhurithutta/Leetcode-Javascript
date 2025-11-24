var TimeLimitedCache = function() {
    this.map = new Map();
};

TimeLimitedCache.prototype.set = function(key, value, duration) {
    const now = Date.now();
    const entry = this.map.get(key);
    const existed = entry && entry.expire > now;
    this.map.set(key, { value, expire: now + duration });
    return !!existed;
};

TimeLimitedCache.prototype.get = function(key) {
    const now = Date.now();
    const entry = this.map.get(key);
    if (!entry || entry.expire <= now) {
        this.map.delete(key);
        return -1;
    }
    return entry.value;
};

TimeLimitedCache.prototype.count = function() {
    const now = Date.now();
    let cnt = 0;
    for (const [key, entry] of this.map.entries()) {
        if (entry.expire > now) cnt++;
        else this.map.delete(key);
    }
    return cnt;
};
