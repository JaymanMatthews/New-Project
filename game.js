class Game {
    constructor() {
        this.state = this.defaultState();
    }

    defaultState() {
        return {
            currencyInfo: ['0', '1'],
            miscInfo: ['0'],
            upgradeInfo: [
                ['Upgrade 1', '10', '1.07'],
                ['Upgrade 2', '20', '1.12'],
                ['Upgrade 3', '30', '1.15']
            ]
        };
    }

    save() {
        localStorage.setItem('savedGame', JSON.stringify(this.state));
    }

    load() {
        const GAME_STATE = JSON.parse(localStorage.getItem('savedGame'));
        this.state = [GAME_STATE];
        toDecimal(this.state, 'Array');
        this.upgrades = upgradeMapping(this.state.upgradeInfo);
        //this.showTab(this.currentTab);
    }

    reset() {
        const IS_CONFIRMED = confirm('Would you like to reset your game?');
        if (IS_CONFIRMED) {
            this.state = this.defaultState();
            this.save();
            location.reload();
        }
    }

    set coins(coins) {
        this.state.currencyInfo[0] = coins;
    }
    get coins() {
        return this.state.currencyInfo[0];
    }
    set coinsPerSec(cps) {
        this.state.currencyInfo[1] = cps;
    }
    get coinsPerSec() {
        return this.state.currencyInfo[1];
    }
    set time(ms) {
        this.state.miscInfo[0] = ms;
    }
    get time() {
        return this.state.miscInfo[0];
    }
}