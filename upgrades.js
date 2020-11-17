class Upgrade {
    constructor (title_or_save, cost, multi, type) {
        if (type(cost) != 'und') {
            this.title = title_or_save;
            this.cost = newDec(cost);
            this.multi = newDec(multi);
            this.type = type;
        } else {
            Object.assign(this, title_or_save);
        }
    }

    buy(obj, useCase) {
        if (this.isBuyable(obj.coins, this.cost)) {
            switch (useCase) {
                case 'rebuyable':
                    obj.coins = CALC.sub(obj.coins, this.cost);
                    this.cost = this.nextCost;
                    break;
                case 'one-time':
                    obj.coins = CALC.sub(obj.coins, this.cost);
                    break;
            }
        }
    }

    isBuyable(obj, cost) {
        return obj.greaterThanOrEqualTo(cost);
    }

    get nextCost() {
        return CALC.mul(this.cost, this.multi);
    }
}

register_tag(Upgrade);