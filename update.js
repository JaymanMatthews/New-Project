const UPDATE = {
    game: function(ms) {
        game.time = CALC.add(game.time, ms);
        while (game.time > MAX_TIME) {
        game.time = CALC.sub(game.time, MAX_TIME);
        game.coins = CALC.add(game.coins, CALC.mul(game.coinsPerSec, (MAX_TIME / SECOND)));
        upgradeEffects2();
    }
    },
    display: function() {
        currencyText[0].textContent = NOTATION.scientific(game.coins);
        currencyText[1].textContent = NOTATION.scientific(game.coinsPerSec);

        Object.keys(game.upgrades).forEach(i => {
            upgradeCosts[i].textContent = 'Cost: ' + NOTATION.scientific(game.upgrades[i].cost);
        });
    }
}