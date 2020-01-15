import * as alt from 'alt';
import { teamData, weapons, feed, playerStatsTemplate, firstSpawn, serverStats, levelBasedVehicles, customMapPoints, vehicleTuning } from '../config';
import { getPlayerProperty, setPlayerProperty } from './player';
import path from 'path';
import fs from 'fs';

alt.onClient('functions:kickPlayer', handleFunctionsKickPlayer);
alt.onClient('functions:welcomeReady', handleFunctionsWelcomeReady);
alt.onClient('functions:startLoadPlayerStats', handleFunctionsStartLoadPlayerStats);
alt.onClient('functions:spawnFromSpawner', handleFunctionsSpawnFromSpawner);

function convertToUnsigned(value) {
    return (value >>> 0);
}

function playersLoadModel(player) {
	alt.Player.all.forEach((p) => {
		alt.emitClient(p, 'functions:loadModel', player.model);
	});
}

function handleFunctionsKickPlayer(player) {
    if (player) {
        setTimeout(() => { alt.emitClient(player, 'functions:doScreenFadeOut', 0); }, 0);
        alt.log(`<!> Kicked player ${player.name} / ${player.socialId}`);
        player.kick();
    }
}

function handleFunctionsWelcomeReady(player) {
    alt.emitClient(player, 'functions:changelogReady', getChangelog());
}

function handleFunctionsStartLoadPlayerStats(player) {
    player.setMeta('loadPlayerStats', true);
}

function handleFunctionsSpawnFromSpawner(player, vehicleToSpawn) {
    let currentColShape = player.getMeta('currentColshape');
    if (currentColShape !== null) {
        if (currentColShape.nameType === 'vehicleSpawner' && currentColShape.team === player.getMeta('team')) {
            let currentTeam = teamData[currentColShape.team];
            spawnVehicle(
                vehicleToSpawn,
                currentTeam.coordinates.vehicleSpawn,
                currentTeam.coordinates.vehicleSpawnRot,
                currentColShape.team.toUpperCase(),
                currentTeam.colors.rgb,
                false,
                player
            );
        }
    }
}

export function getWebViewLoginTeams() {
    let returnArray = [];
    for (const [team, data] of Object.entries(teamData)) {
        if (team !== 'admin') {
            returnArray.push({
                team: team,
                name: data.name,
                color: data.colors.hex,
                icon: data.icon
            });
        }
    }
    return returnArray;
}

export function giveWeaponsToPlayer(player) {
    player.removeAllWeapons();
    weapons.forEach((w) => {
        player.giveWeapon(jhash(w), 9999, false);
    });
}

export function getPlayerTeam(player) {
    return player.getMeta('team');
}

export function isPlayerAdmin(player) {
    let isAdmin = false;
    if (player.getMeta('isAdmin') === true) isAdmin = true;
    return isAdmin;
}

export function spawnVehicle(name, pos, rot, text, color, isAdminVehicle, player) {
    let newVehicle = undefined;
    try {
        newVehicle = new alt.Vehicle(name, pos.x, pos.y, pos.z, rot.x, rot.y, rot.z);
    } catch (error) {
        addErrorText(error);
    }

    if (newVehicle !== undefined) {
        newVehicle.numberPlateText = text;
        newVehicle.numberPlateIndex = 1;
        newVehicle.customPrimaryColor = { r: color.r, g: color.g, b: color.b };
        newVehicle.customSecondaryColor = { r: color.r, g: color.g, b: color.b };
        newVehicle.engineOn = 1;
    }
    
    if (!isAdminVehicle) {
        destroyPlayerVehicleIfNoDriver(player);
        player.setMeta('playerVehicle', newVehicle);
    } else {
        let adminVehicle = player.getMeta('adminVehicle');
        try {
            if (adminVehicle !== null) adminVehicle.destroy();
        } catch (error) {
            addErrorText(error)
        }
        player.setMeta('adminVehicle', newVehicle);
    }

    alt.emitClient(player, 'functions:setPlayerIntoVehicle', newVehicle, isAdminVehicle);
}

export function jhash(key) {
    var keyLowered = key.toLowerCase();
    var length = keyLowered.length;
    var hash, i;
    for (hash = i = 0; i < length; i++) {
        hash += keyLowered.charCodeAt(i);
        hash += (hash << 10);
        hash ^= (hash >>> 6);
    }
    hash += (hash << 3);
    hash ^= (hash >>> 11);
    hash += (hash << 15);
    return convertToUnsigned(hash);
}

export function getVehicleDriver(player) {
    let driver = undefined;
    try {
        driver = player.vehicle.driver;
    } catch (error) {
        addErrorText(error);
    }
    return driver;
}

export function showNotification(player, hintMessage) {
    alt.emitClient(player, 'functions:showNotification', hintMessage);
}

export function showSelectTeamWebView(player) {
    const webViewData = getWebViewLoginTeams();
    alt.emitClient(player, 'spawn:showSelectTeam', webViewData);
}

export function setModelForPlayer(player, model) {
    try {
        player.model = model;
        playersLoadModel(model);
        giveWeaponsToPlayer(player);
    } catch (error) {
        addErrorText(error);
    }
}

export function freezePlayer(player, state) {
    alt.emitClient(player, 'functions:freezePlayer', state);
}

export function isPlayerBanned(player) {
    return getPlayerProperty(player, 'isBanned');
}

export function kickPlayer(player, reason = '') {
    alt.emitClient(player, 'functions:kickPlayer', reason);
    addToKillFeed('kicked', '', player);
}

export function banPlayer(player) {
    setPlayerProperty(player, 'isBanned', true);
    alt.Player.all.forEach((p) => {
        if (p.socialId.toString() === player.socialId.toString()) kickPlayer(p, 'Banned by admin.');
        alt.log(`<!> Banned player ${p.name} / ${p.socialId}`);
    });
}

export function updatePlayerStat(player, stat, value) {
    setPlayerProperty(player, stat, value);
}

export function addToKillFeed(action, player1 = '', player2 = '', weapon = '') {
    let feedObj = feed[action];

    let message = feedObj.message;
    if (message.includes('{player1}') && player1) {
        let player1TeamColor = player1.getMeta('team') !== null ? teamData[player1.getMeta('team')].colors.hex : '#FFF';
        message = message.replace('{player1}', `<span style="opacity:.8;color:#000;background-color:${player1TeamColor}">${player1.name}</span>`);
    }
    if (message.includes('{player2}') && player2) {
        let player2TeamColor = player2.getMeta('team') !== null ? teamData[player2.getMeta('team')].colors.hex : '#FFF';
        message = message.replace('{player2}', `<span style="opacity:.8;color:#000;background-color:${player2TeamColor}">${player2.name}</span>`);
    }
        
    let textToSend = `<tr style="color:${feedObj.color}"><td><i class="fas fa-${feedObj.icon}"></td><td></i>${message}</td></tr>`;
    alt.Player.all.forEach((p) => {
        alt.emitClient(p, 'functions:addToKillFeed', textToSend);
    });
}

export function loadKillFeed(player) {
    alt.emitClient(player, 'functions:loadKillFeed');
}

export function loadWelcome(player) {
    alt.emitClient(player, 'functions:loadWelcome');
}

export function getChangelog() {
    let changelog = '';
    const changelogFile = path.resolve('resources','altv-gangwar','changelog.html');
    try {
        if (fs.existsSync) changelog = fs.readFileSync(changelogFile, 'utf-8');
    } catch (error) {
        addErrorText(error);
    }
    return changelog;
}

export function refreshPlayerStats(player) {
    if (player) {
        const row = getPlayerProperty(player);
        let levelData = getLevelData(row.xp)
        let textToSend = playerStatsTemplate
            .replace('{username}', player.name)
            .replace('{level}', `${levelData.level} (${levelData.percent}%)`)
            .replace('{kills}', row.kills)
            .replace('{deaths}', row.deaths)
            .replace('{hoursPlayed}', (row.minutesOnline / 60).toFixed(2))
        alt.emitClient(player, 'functions:refreshPlayerStats', textToSend);
    }
}

export function loadPlayerStats(player) {
    alt.emitClient(player, 'functions:loadPlayerStats');
}

export function destroyPlayerVehicleIfNoDriver(player) {
    let playerVehicle = player.getMeta('playerVehicle');
    if (playerVehicle !== null) {
        try {
            if (playerVehicle.driver === null) playerVehicle.destroy();
        } catch (error) {
            addErrorText(error);
        }
    }
    let adminVehicle = player.getMeta('adminVehicle');
    if (adminVehicle !== null) {
        try {
            if (adminVehicle.driver === null) adminVehicle.destroy();
        } catch (error) {
            addErrorText(error);
        }
    }
}

export function getLevelData(xp) {
    let level = 1;
    let xpLevelUp = 100;
    while (xp >= xpLevelUp) {
        xp -= xpLevelUp;
        level++;
        xpLevelUp = xpLevelUp * 1.1;
    }
    let percent = (xp / xpLevelUp * 100).toFixed(0);
    return { level, percent };
}

export function addErrorText(error) {
    try {
        const logFile = path.resolve('resources','altv-gangwar','error.txt');
        const currentDate = new Date();
        const logtext = `[${currentDate}]: ${error.stack}\n\n\n`;
        fs.appendFileSync(logFile, logtext);
        alt.log(logtext);
    } catch (error) {
        alt.log(error);
    }
}

export function timeoutPlayer(player, reason = '', time = 10) {
    addToKillFeed('timeout', '', player);
    player.pos = firstSpawn;
    alt.log(`<!> Timeout player ${player.name} / ${player.socialId} / reason: ${reason} / time: ${time}`);
    alt.emitClient(player, 'functions:timeoutPlayer', reason, time);
}

export function updateServerStatsOnline() {
    let outputHTML = `<span style="color:#FFF;"><i class="fas fa-users"></i> ${serverStats.online.all}</span>`;
    for (const [team, count] of Object.entries(serverStats.online)) {
        if (team !== 'all' && team !== 'admin') {
            outputHTML += `<span style="color:${teamData[team].colors.hex};"><i class="fas fa-${teamData[team].icon}"></i> ${count}</span>`;
        }
    }
    alt.emitClient(null, 'functions:updateServerStatsOnline', outputHTML);
}

export function generatePlayersTable() {
    let table = `
    <table cellpadding=0 cellspacing=0>
    <tr>
        <th>socialId</th>
        <th>username</th>
        <th>&nbsp;</th>
    </tr>
    `;
    alt.Player.all.forEach((p) => {
        table += `
        <tr data-social="${p.socialId}" data-search="${p.socialId}${p.name}">
            <td>${p.socialId}</td>
            <td>${p.name}</td>
            <td>
                <div class="buttonSmall buttonKick">Kick</div>
                <div class="buttonSmall buttonBan">Ban</div>
                <div class="buttonSmall buttonTPto">TPto</div>
            </td>
        </tr>
        `;
    });
    table += `</table>`;
    return table;
}

export function getPlayerLevel(player) {
    let currentLevel = 1;
    let levelData = null;
    try {
        const xp = getPlayerProperty(player, 'xp');
        let playerXP = xp >= 0 ? xp : 0;
        levelData = getLevelData(playerXP);
    } catch (error) {
        addErrorText(error);
    }
    if (levelData) currentLevel = levelData.level;
    return currentLevel;
}

export function getVehiclesByPlayerLevel(player) {
    const returnArray = [];
    const playerLevel = getPlayerLevel(player);
    levelBasedVehicles.forEach((lbv) => {
        let access = false;
        if (playerLevel >= lbv.level) access = true;
        returnArray.push({
            level: lbv.level,
            vehicle: lbv.vehicle,
            name: lbv.name,
            access
        });
    });
    return returnArray;
}

export function generateVehicleSpawnerHTML(player) {
    const vehiclesByPlayerLevel = getVehiclesByPlayerLevel(player);
    let html = '';
    vehiclesByPlayerLevel.forEach((vbl) => {
        html += `
        <tr data-vehicle="${vbl.vehicle}" data-access="${vbl.access}">
            <td><span><i class="fas fa-star"></i> ${vbl.level}</span></td>
            <td class="spawnThisVehicle">${vbl.name}</td>
        </tr>
        `;
    });
    return html;
}

export function repairCar(player) {
    let currentVehicle = player.vehicle.scriptID;
    if (currentVehicle) {
        currentVehicle.dirtLevel = 0;
        currentVehicle.engineHealth = 1000;
        currentVehicle.petrolTankHealth = 1000;
    }
}

export function playAnimationSync(player, dict, name) {
	alt.Player.all.forEach((target) => {
		alt.emitClient(target, 'functions:playAnimationSync', player, dict, name);
	});
}

export function stopAnimationSync(player, dict, name) {
	alt.Player.all.forEach((target) => {
		alt.emitClient(target, 'functions:stopAnimationSync', player, dict, name);
	});
}

export function playHealthAndArmourAnimation(player, type) {
    playAnimationSync(player, 'amb@medic@standing@tendtodead@enter', 'enter');
    setTimeout(() => {
        playAnimationSync(player, 'amb@medic@standing@tendtodead@idle_a', 'idle_a');
    }, 1500);
    setTimeout(() => {
        playAnimationSync(player, 'amb@medic@standing@tendtodead@exit', 'exit');
    }, 2500);
    setTimeout(() => {
        stopAnimationSync(player, 'amb@medic@standing@tendtodead@exit', 'exit');
        switch (type) {
            case 'health':
                player.health = 200;
                notifyPlayer(player, 'Benutzt: ~g~Verbandskasten');
                break;
            case 'armour':
                player.armour = 100;
                notifyPlayer(player, 'Benutzt: ~g~Schutzweste');
                break;
            default:
                player.health = 200;
                break;
        }
    }, 3500);
}

export function randomNearPosition(pos, range) {
    return {
		x: pos.x + (Math.random() * (range * 2)) - range,
		y: pos.y + (Math.random() * (range * 2)) - range,
		z: pos.z
	};
}

export function getBlipData() {
    let returnArray = [];

    for (const [team, data] of Object.entries(teamData)) {
        if (team !== 'admin') {
            returnArray.push({
                type: 'blipForCoord',
                pos: data.coordinates.spawn,
                sprite: data.blip.sprite,
                color: data.blip.color,
                scale: data.blip.scale,
                shortRange: data.blip.shortRange,
                name: data.name
            });
        }
    }

    for (const [key, data] of Object.entries(customMapPoints)) {
        returnArray.push({
            type: 'blipForCoord',
            pos: data.coordinates,
            sprite: data.blip.sprite,
            color: data.blip.color,
            scale: data.blip.scale,
            shortRange: data.blip.shortRange,
            name: data.name
        });
    }

    const warzoneBlipData = customMapPoints.warzone1;
    returnArray.push({
        type: 'radiusBlip',
        pos: warzoneBlipData.coordinates,
        radius: warzoneBlipData.blip.radius,
        color: warzoneBlipData.blip.color,
        alpha: warzoneBlipData.blip.alpha,
        saveAs: warzoneBlipData.blip.saveAs
    });

    return returnArray;
}

export function changeWarzoneBlipColor(player, color) {
    alt.emitClient(player, 'blips:changeWarzoneColor', color);
}

export function getMarkerData() {
    let returnArray = [];

    for (const [key, data] of Object.entries(customMapPoints)) {
        returnArray.push({
            add: data.marker.add,
            type: data.marker.type,
            pos: data.coordinates,
            scale: data.scale,
            color: data.color,
            alpha: data.marker.alpha
        });
    }

    for (const [team, data] of Object.entries(teamData)) {
        if (team !== 'admin') {
            returnArray.push({
                add: data.marker.add,
                type: data.marker.type,
                pos: data.coordinates.vehicle,
                scale: data.scale,
                color: data.colors.rgb,
                alpha: data.marker.alpha
            });
        }
    }

    return returnArray;
}

export function getShapeDate() {
    let returnArray = [];

    for (const [team, data] of Object.entries(teamData)) {
        if (team !== 'admin') {
            returnArray.push({
                pos: data.coordinates.vehicle,
                nameType: data.shape.nameType,
                scale: data.scale,
                team: team
            });
        }
    }

    for (const [key, data] of Object.entries(customMapPoints)) {
        returnArray.push({
            pos: data.coordinates,
            nameType: data.nameType,
            scale: data.scale
        });
    }

    return returnArray;
}

export function notifyPlayer(player, text) {
    alt.emitClient(player, 'functions:notify', text);
}

export function setVehicleHandling(player) {
    alt.emitClient(player, 'functions:setVehicleHandling', vehicleTuning);
}
