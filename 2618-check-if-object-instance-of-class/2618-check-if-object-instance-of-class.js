var checkIfInstanceOf = function(obj, classFunction) {
    if (obj == null || typeof classFunction !== 'function') return false;
    if (typeof obj === 'object') return obj instanceof classFunction;
    return Object(obj) instanceof classFunction;
};
