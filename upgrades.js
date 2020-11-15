class Upgrade {
    constructor (state) {
        this.state = state;
    }

    buy(obj, value) {
        if (obj.value.greaterThanOrEqualTo(this.cost)) {
            this.changeCost(this.nextCost);
            obj.value = CALC.sub(obj.value, this.cost);
        }
    }

    changeCost(newCost) {
        this.cost = newCost;
    }

    get title() {
        return this.state[0];
    }
    set cost(cost) {
        this.state[1] = cost;
    }
    get cost() {
        return this.state[1];
    }
    get nextCost() {
        return CALC.mul(this.cost, this.multi);
    }
    get multi() {
        return this.state[2];
    }
}