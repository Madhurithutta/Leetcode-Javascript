var flat = function (arr, n) {
    const res = [];
    const helper = (current, depth) => {
        for (const el of current) {
            if (Array.isArray(el) && depth < n) {
                helper(el, depth + 1);
            } else {
                res.push(el);
            }
        }
    };
    helper(arr, 0);
    return res;
};
