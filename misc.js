const CALC = {
    add: function(value, value2) {
        return value.add(value2);
    },
    sub: function(value, value2) {
        return value.sub(value2);
    },
    mul: function(value, value2) {
        return value.times(value2);
    },
    div: function(value, value2) {
        return value.div(value2);
    }
}

const newDec = function(value) {
    return new Decimal(value);
}

function type(value) {
    if (value == null) return 'nul';
    if (typeof value == 'string') return 'str'; 
    if (Array.isArray(value)) return 'arr';
    if (typeof value == 'object') return 'obj'; 
    if (typeof value == 'number') return 'num'; 
    if (typeof value == 'boolean') return 'boo'; 
    if (typeof value == undefined) return 'und'; 
}

const toLower = function(v) {
    return v.toLowerCase();
}

const toUpgrade = function(struct) {
    return struct.map(state => new Upgrade(...state));
}

const toDecimal = function(struct) {
    return struct.map(newDec);
}