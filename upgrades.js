class Upgrade {
    constructor (title_or_save, cost, multi) {
        if (cost != undefined) {
            this.title = title_or_save;
            this.cost = cost;
            this.multi = multi;
        } else {
            Object.assign(this, title_or_save);
        }
    }

    buy(obj) {
        if (obj.coins.greaterThanOrEqualTo(this.cost)) {
            obj.coins = CALC.sub(obj.coins, this.cost);
            this.cost = this.changeCost(this.nextCost);
        }
    }

    changeCost(newCost) {
        return this.cost = newCost;
    }

    get nextCost() {
        return CALC.mul(this.cost, this.multi);
    }
}

register_tag(Upgrade);