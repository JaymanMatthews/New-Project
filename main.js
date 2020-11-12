class Game {
    constructor(state) {
        this.state = state || this.defaultState();
    }

    defaultState() {
        return {
            currencyInfo: [0, 1],
            miscInfo: [0]
        };
    }

    save(){
        localStorage.setItem('savedGame', JSON.stringify(this.state));
    }

    load(){
        const GAME_STATE = JSON.parse(localStorage.getItem('savedGame'));
        this.state = {...this.state, ...GAME_STATE};
        for (let i in this.state) {
            for (let j in this.state[i]) {
                this.state[i][j] = nd(this.state[i][j]);
            } 
        }
        //this.upgrades = this.state.upgrades.map(upgradeState => new Upgrade(upgradeState));
        //this.showTab(this.currentTab);
    }

    reset(){
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

let game = new Game();

const nd = function(value) {
    return new Decimal(value);
}

const calc = {
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

const MAX_TIME = 50;
const SECOND = 1000;
const UPDATE_INTERVAL = game.time;
const SAVE_INTERVAL = 15000;
const ELEMENTS = new Array();

const init = function() {
    game.load();

    ELEMENTS[0] = currencyInfo = document.getElementsByClassName('currency-info');

    let currentTime = Date.now();
    setInterval(function() {
        const DELTA_TIME = Date.now() - currentTime;
        currentTime = Date.now();
        update(DELTA_TIME);
    }, UPDATE_INTERVAL);

    setInterval(function() {
        game.save();
    }, SAVE_INTERVAL);
}

const update = function(ms) {
    game.time = calc.add(game.time, ms);
    while (game.time > MAX_TIME) {
        game.time = calc.sub(game.time, MAX_TIME);
        game.coins = calc.add(game.coins, calc.mul(game.coinsPerSec, (MAX_TIME / SECOND)));
    }
    currencyInfo[0].textContent = game.coins.toFixed(2);
    currencyInfo[1].textContent = game.coinsPerSec.toFixed(2);
}

const start = window.onload = function() {
    init();    
}