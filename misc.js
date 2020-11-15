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

const toLower = function(value) {
    return value.toLowerCase();
}

const newDec = function(value) {
    return new Decimal(value);
}

function type(value) {
    if (value == null) { return 'nul'; }
    if (typeof value == 'string') { return 'str'; }
    if (Array.isArray(value)) { return 'arr'; }
    if (typeof value == 'object') { return 'obj'; }
    if (typeof value == 'number') { return 'num'; }
    if (typeof value == 'boolean') { return 'boo'; }
}

const runArray = function(data, i) {
    data = data[i];
    if (type(data) == 'arr') {
        Object.keys(data).forEach(j => {
            data[j] = runArray(data, j);
        });
    }
    return ((!isNaN(Number(data)))) ? newDec(data) : data;
}

const upgradeMapping = function(obj) {
    return obj.map(state => new Upgrade(state));
}

const toDecimal = function(obj, useCase) {
    switch (toLower(useCase)) {
        case 'array':
            for (name of Object.keys(obj)) {
                if (type(obj[name]) == 'arr') {
                    for (i of Object.keys(obj[name])) {
                        obj[name][i] = runArray(obj[name], i);
                    }
                } else { obj[name] = newDec(obj[name]); }
            }
            /*Object.keys(obj).forEach(name => {
                if (type(obj[name]) == 'arr') {
                    Object.keys(obj[name]).forEach(i => {
                        obj[name][i] = runArray(obj[name], i);
                    });
                } else { obj[name] = newDec(obj[name]); }
            });*/
            break; 
    }
}