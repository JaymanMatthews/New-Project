class Game {
    constructor() {
        Object.assign(this, this.defaultState());
    }

    defaultState() {
        return {
            currencyInfo: ['0', '1'],
            miscInfo: ['0'],
            upgrades: [
                ['Upgrade 1', '10', '1.07'],
                ['Upgrade 2', '20', '1.12'],
                ['Upgrade 3', '30', '1.15']
            ].map(state => new Upgrade(...state))
        };
    }

    save() {
        localStorage.setItem('savedGame', JSON.stringify(this));
    }

    load() {
        const SAVED_JSON = localStorage.getItem('savedGame');
        const SAVED_STATE = JSON.parse(SAVED_JSON, /*new method*/);
        Object.assign(this, SAVED_STATE);

        //toDecimal(this.state, 'Array');
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