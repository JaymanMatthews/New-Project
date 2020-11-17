class Upgrade {
    constructor (type, title_or_save, cost, multi, costMulti, amt, bought) {
        if (isType(title_or_save) != 'und') {
            this.type = type;
            this.title = title_or_save;
            switch (toLower(type)) {
                case 'rebuyable':
                    this.cost = newDec(cost);
                    this.costMulti = newDec(costMulti);
                    this.amtBought = newDec(amt);
                    break;
                case 'one-time':
                    this.cost = newDec(cost);
                    this.multi = newDec(multi);
                    this.isBought = bought;
                    break;
            }
        } else {
            Object.assign(this, type);
        }
    }

    buy(obj, useCase) {
        if (this.isBuyable(obj.coins, this.cost, this.isBought)) {
            switch (useCase) {
                case 'rebuyable':
                    obj.coins = CALC.sub(obj.coins, this.cost);
                    this.cost = this.nextCost;
                    this.amtBought = CALC.add(this.amtBought, 1);
                    break;
                case 'one-time':
                    obj.coins = CALC.sub(obj.coins, this.cost);
                    this.isBought = true;
                    break;
            }
        }
    }

    giveEffect(effect, effect2) {
        if (this.isBought) {
            effect;
        } else {
            effect2;
        }
    }

    isBuyable(obj, cost, boughtStatus) {
        return obj.greaterThanOrEqualTo(cost) && !boughtStatus;
    }

    get nextCost() {
        return CALC.mul(this.cost, this.costMulti);
    }
}

register_tag(Upgrade);