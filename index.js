module.exports = function (obj, path, options) {
    if (
        typeof obj != 'object' || obj === null ||
        typeof path != 'string'
    ) {
        return undefined;
    }

    var props = path.split('.')
    ,   traversed = '';

    for (var i = 0; i < props.length; i++) {
        if (Object.prototype.hasOwnProperty.call(obj, props[i])) {
            obj = obj[props[i]];
            traversed += '.' + props[i];
        } else {
            if (options && options.debug) {
                console.warn('safe-read: Undefined property "' + props[i] + '" in Object' + traversed);
            }

            return undefined;
        }
    }

    return obj;
};