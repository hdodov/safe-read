'use strict';

var debug = require('debug')('safe-read');

module.exports = function (obj, path) {
    if (!obj || typeof obj != 'object') {
        debug('Target is not an object');
        return;
    }

    if (typeof path != 'string') {
        return;
    }

    var props = path.split('.')
    ,   traversed = '';

    for (var i = 0; i < props.length; i++) {
        if (obj && Object.prototype.hasOwnProperty.call(obj, props[i])) {
            obj = obj[props[i]];
            traversed += '.' + props[i];
        } else {
            debug('Undefined property "%s" in Object%s', props[i], traversed);
            return;
        }
    }

    return obj;
};