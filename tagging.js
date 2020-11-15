let tagged_classes = new Map();

const register_tag = function(clazz) {
    tagged_classes.set(clazz.name, clazz);
}

register_tag(Decimal);

function tagging(k, v) {
    if (k == 'v' && this.hasOwnProperty('#tag')) {
        return v;
    }
    let cName = this[k]?.constructor?.name;
    if (tagged_classes.has(cName)) {
        return {'#tag': cName, v};
    } else {
        return v;
    }
}

function untagging(_, v) {
    if (v.hasOwnProperty('#tag')) {
        return new (tagged_classes.get(v['#tag']))(v.v);
    } else {
        return v;
    }
}