let game = new Game();
let tagged_classes = new Map();
tag_class(Decimal);

const init = function() {
    game.load();

    document.title = 'Idle Project';
    ELEMENTS[0] = currencyText = document.getElementsByClassName('currency-info');
    ELEMENTS[1] = upgradeButtons = document.getElementsByClassName('upgrade-buttons');
    ELEMENTS[2] = upgradeTitles = document.getElementsByClassName('upgrade-titles');
    ELEMENTS[3] = upgradeCosts = document.getElementsByClassName('upgrade-costs');
    ELEMENTS[4] = upgradeEffects = document.getElementsByClassName('upgrade-effects');
    /*Object.keys(game.upgrades).forEach(i => {
        upgradeButtons[i].onclick = function() { game.upgrades[i].buy(game) };
        upgradeTitles[i].textContent = game.upgrades[i].title;
        upgradeCosts[i].textContent = 'Cost: ' + game.upgrades[i].cost;
        upgradeEffects[i].textContent = 'Effect: ' + game.upgrades[i].multi;
    });*/

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

const start = window.onload = function() {
    init();
    console.log(new Game());    
}