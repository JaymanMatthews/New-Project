class Game {
    constructor() {
        Object.assign(this, this.defaultState());
    }

    defaultState() {
        return {
            currencyInfo: toDecimal([0, 1]),
            miscInfo: toDecimal([0]),
            upgrades: toUpgrade([
                ['rebuyable', 'Upgrade 1', 10, undefined, 1.07, 0, undefined],
                ['one-time', 'Upgrade 2', 20, 1, undefined, undefined, false],
                ['one-time', 'Upgrade 3', 30, 1, undefined, undefined, false]
            ])
        };
    }

    save() {
        localStorage.setItem('savedGame', JSON.stringify(this, tagging));
    }

    load() {
        const SAVED_JSON = localStorage.getItem('savedGame');
        const SAVED_STATE = JSON.parse(SAVED_JSON, untagging);
        Object.assign(this, SAVED_STATE);

        //this.upgrades = upgradeMapping(this.state.upgradeInfo);
        //this.showTab(this.currentTab);
    }

    reset() {
        const IS_CONFIRMED = confirm('Would you like to reset your game?');
        if (IS_CONFIRMED) {
            Object.assign(this, this.defaultState());
            this.save();
            location.reload();
        }
    }

    buyUpgrade(num) {
        return this.upgrades[num].buy(this, toLower(this.upgrades[num].type));
    }

    set coins(coins) {
        this.currencyInfo[0] = coins;
    }
    get coins() {
        return this.currencyInfo[0];
    }
    set coinsPerSec(cps) {
        this.currencyInfo[1] = cps;
    }
    get coinsPerSec() {
        return this.currencyInfo[1];
    }
    set time(ms) {
        this.miscInfo[0] = ms;
    }
    get time() {
        return this.miscInfo[0];
    }
}