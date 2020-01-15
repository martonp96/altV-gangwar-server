import * as alt from 'alt';
import * as native from 'natives';

let webViewKillFeed = null;
let webViewWelcome = null;
let webViewPlayerStats = null;
let webViewTimeOut = null;
let webViewVehicleSpawner = null;

alt.onServer('functions:showNotification', handleFunctionsShowNotification);
alt.onServer('functions:setPlayerIntoVehicle', handleFunctionsSetPlayerIntoVehicle);
alt.onServer('functions:kickPlayer', handleFunctionsKickPlayer);
alt.onServer('functions:loadWelcome', handleFunctionsLoadWelcome);
alt.onServer('functions:loadPlayerStats', handleFunctionsLoadPlayersStats);
alt.onServer('functions:timeoutPlayer', handleFunctionsTimeoutPlayer);
alt.onServer('functions:showVehicleSpawner', handleFunctionsShowVehicleSpawner);
alt.onServer('functions:setStats', handleFunctionsSetStats);
alt.onServer('functions:notify', handleFunctionsNotify);
alt.onServer('functions:setVehicleHandling', handleFunctionsSetVehicleHandling);

function handleFunctionsShowNotification(hintMessage) {
    native.beginTextCommandThefeedPost('STRING');
    native.addTextComponentSubstringPlayerName(hintMessage.message);
    native.endTextCommandThefeedPostMessagetextWithCrewTag(hintMessage.image, hintMessage.image, hintMessage.flash, hintMessage.iconType, hintMessage.header, hintMessage.details, hintMessage.duration, hintMessage.clantag);
	native.endTextCommandThefeedPostTicker(false, false);
}

function handleFunctionsSetPlayerIntoVehicle(newVehicle, isAdminVehicle) {
    alt.setTimeout(() => {
        if (newVehicle && alt.Player.local) {
            try {
                native.setPedIntoVehicle(alt.Player.local.scriptID, newVehicle.scriptID, -1);
                if (isAdminVehicle) native.setVehicleDoorsLocked(newVehicle.scriptID, 2);   
            } catch (error) {
                alt.log(error);
            }
        }
	}, 250);
}

function handleFunctionsKickPlayer(reason) {
    native.freezeEntityPosition(alt.Player.local.scriptID, true);
    native.doScreenFadeOut(0);
    alt.setCamFrozen(true);
    alt.toggleGameControls(false);
    let webViewKickPlayer = null;
    if (!webViewKickPlayer) {
        webViewKickPlayer = new alt.WebView('http://resource/client/_html/kickMessage.html');
        webViewKickPlayer.on('kickMessage:ready', () => {
            webViewKickPlayer.emit('kickMessage:message', reason);
        });
    }
    alt.setTimeout(() => {
        alt.emitServer('functions:kickPlayer');
    }, 5000);
    webViewKickPlayer.focus();
}

function handleFunctionsLoadWelcome() {
    if (!webViewWelcome) {
        webViewWelcome = new alt.WebView('http://resource/client/_html/welcome.html');
        webViewWelcome.on('welcome:ready', () => {
            alt.emitServer('functions:welcomeReady');
        });
        webViewWelcome.on('welcome:close', () => {
            webViewWelcome.destroy();
            webViewWelcome = null;
            alt.setCamFrozen(false);
            alt.toggleGameControls(true);
            alt.showCursor(false);
            alt.emitServer('welcome:spawn');
        });
    }
    webViewWelcome.focus();
    alt.setCamFrozen(true);
    alt.toggleGameControls(false);
    alt.showCursor(true);
}

function handleFunctionsLoadPlayersStats() {
    if (webViewPlayerStats === null) {
        webViewPlayerStats = new alt.WebView('http://resource/client/_html/playerStats.html');
        webViewPlayerStats.on('playerStats:ready', () => {
            alt.emitServer('functions:startLoadPlayerStats');
        });
    }
    webViewPlayerStats.focus();
}

function handleFunctionsTimeoutPlayer(reason, time) {
    native.freezeEntityPosition(alt.Player.local.scriptID, true);
    native.doScreenFadeOut(0);
    alt.setCamFrozen(true);
    alt.toggleGameControls(false);
    if (!webViewTimeOut) {
        webViewTimeOut = new alt.WebView('http://resource/client/_html/timeout.html');
        webViewTimeOut.on('timeout:ready', () => {
            webViewTimeOut.emit('timeout:message', reason, time);
        });
        webViewTimeOut.on('timeout:close', () => {
            webViewTimeOut.destroy();
            webViewTimeOut = null;
            alt.setCamFrozen(false);
            alt.toggleGameControls(true);
            alt.emitServer('welcome:spawn');
        });
    }
    webViewTimeOut.focus();
}

function handleFunctionsShowVehicleSpawner(vehicleSpawnerHTML) {
    if (!webViewVehicleSpawner) {
        webViewVehicleSpawner = new alt.WebView('http://resource/client/_html/vehicleSpawner.html');
        webViewVehicleSpawner.focus();
        alt.toggleGameControls(false);
        alt.showCursor(true);

        webViewVehicleSpawner.on('vehicleSpawner:ready', () => {
            alt.setTimeout(() => {
                webViewVehicleSpawner.emit('vehicleSpawner:data', vehicleSpawnerHTML);
            }, 250);
        });

        webViewVehicleSpawner.on('vehicleSpawner:close', () => {
            webViewVehicleSpawner.destroy();
            webViewVehicleSpawner = null;
            alt.toggleGameControls(true);
            alt.showCursor(false);
        });
        
        webViewVehicleSpawner.on('vehicleSpawner:spawn', (vehicle) => {
            alt.emitServer('functions:spawnFromSpawner', vehicle);
        });
    }   
}

function handleFunctionsSetStats() {
    alt.setStat('stamina', 100);
    alt.setStat('strength', 100);
    alt.setStat('lung_capacity', 100);
    alt.setStat('wheelie_ability', 100);
    alt.setStat('flying_ability', 100);
    alt.setStat('shooting_ability', 100);
    alt.setStat('stealth_ability', 100);
}

function handleFunctionsNotify(text) {
    native.beginTextCommandThefeedPost('STRING');
    native.addTextComponentSubstringPlayerName(text);
    native.endTextCommandThefeedPostTicker(false, true);
}

function handleFunctionsSetVehicleHandling(vehicleTuning) {
    for (const [model, data] of Object.entries(vehicleTuning)) {
        let handling = alt.HandlingData.getForModel(parseInt(model));
        for (const [key, val] of Object.entries(data)) {
            handling[key] = val;
        }
    }
}

alt.onServer('functions:loadModel', (model) => {
    try {
        native.requestModel(model);
    } catch (error) {
        alt.log(error);
    }
});

alt.onServer('functions:freezePlayer', (state) => {
    native.freezeEntityPosition(alt.Player.local.scriptID, state);
});

alt.onServer('functions:doScreenFadeOut', (duration) => {
    native.doScreenFadeOut(duration);
});

alt.onServer('functions:doScreenFadeIn', (duration) => {
    native.doScreenFadeIn(duration);
});

alt.onServer('functions:loadKillFeed', () => {
    if (!webViewKillFeed) webViewKillFeed = new alt.WebView('http://resource/client/_html/killFeed.html');
    webViewKillFeed.focus();
});

alt.onServer('functions:addToKillFeed', (textToAdd) => {
    if (webViewKillFeed) webViewKillFeed.emit('killFeed:message', textToAdd);
});

alt.onServer('functions:updateServerStatsOnline', (outputHTML) => {
    if (webViewKillFeed) webViewKillFeed.emit('killFeed:serverStatsOnline', outputHTML);
});

alt.onServer('functions:changelogReady', (changelog) => {
    if (webViewWelcome) webViewWelcome.emit('welcome:changelog', changelog);
});

alt.onServer('welcome:skip', () => {
    alt.emitServer('welcome:spawn');
});

alt.onServer('functions:refreshPlayerStats', (text) => {
    if (webViewPlayerStats !== null) webViewPlayerStats.emit('playerStats:text', text);
});

alt.onServer('functions:repairCar', () => {
    if (alt.Player.local.vehicle.scriptID) native.setVehicleFixed(alt.Player.local.vehicle.scriptID);
});

alt.onServer('functions:playAnimationSync', (player, dict, anim) => {
    if (!native.hasAnimDictLoaded(dict)) native.requestAnimDict(dict);
    native.taskPlayAnim(player.scriptID, dict, anim, 8.0, 1.0, -1, 2, 0, 0, 0, 0);
});

alt.onServer('functions:stopAnimationSync', (player, dict, anim) => {
    native.stopEntityAnim(player.scriptID, anim, dict, 1.0);
});