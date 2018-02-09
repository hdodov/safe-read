module.exports = function (obj, path) {
    if (
        typeof obj != 'object' || obj === null ||
        typeof path != 'string'
    ) {
        return undefined;
    }

    var props = path.split('.');

    for (var i = 0; i < props.length; i++) {
        if (Object.prototype.hasOwnProperty.call(obj, props[i])) {
            obj = obj[props[i]];
        } else {
            return undefined;
        }
    }

    return obj;
};