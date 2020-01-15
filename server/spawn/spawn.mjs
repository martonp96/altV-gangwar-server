import * as alt from 'alt';
import { playerModel, teamData, spawnTimeout, firstSpawn, admins, adminModel } from '../config';
import { giveWeaponsToPlayer, isPlayerAdmin,
        showSelectTeamWebView, setModelForPlayer, freezePlayer, isPlayerBanned, kickPlayer, loadKillFeed,
        addToKillFeed, destroyPlayerVehicleIfNoDriver, loadPlayerStats, refreshPlayerStats, loadWelcome,
        getBlipData, getMarkerData, setVehicleHandling } from '../util/functions';
import { createPlayer } from '../util/player';

alt.on('playerConnect', handlePlayerConnect);
alt.onClient('welcome:spawn', handleWelcomeSpawn);
alt.on('playerDisconnect', handlePlayerDisconnect);
alt.onClient('spawn:spawn', handleSpawnSpawn);

function handlePlayerConnect(player) {
    createPlayer(player);

    if (isPlayerBanned(player)) return kickPlayer(player, 'Du bist gesperrt.');

    if (admins.includes(player.socialId.toString())) player.setMeta('isAdmin', true);
    setTimeout(() => { alt.emitClient(player, 'functions:doScreenFadeOut', 0); }, 0);
    
    addToKillFeed('connect', player);

    if (!isPlayerAdmin(player)) return loadWelcome(player);
    alt.emitClient(player, 'welcome:skip');
}

function handleWelcomeSpawn(player) {
    alt.log(`==> ${player.name} / ${player.socialId} connected.`);
    showSelectTeamWebView(player);
}

function handlePlayerDisconnect(player, reason) {
    player.setMeta('loadPlayerStats', false);
    destroyPlayerVehicleIfNoDriver(player);
    alt.log(`==> ${player.name} / ${player.socialId} disconnected (${reason}).`);
    addToKillFeed('disconnect', player);
}

function handleSpawnSpawn(player, teamSelected) {
    setTimeout(() => { alt.emitClient(player, 'functions:doScreenFadeOut', 0); }, 0);

    freezePlayer(player, true);
    player.dimension = 0;
    player.pos = firstSpawn;

    let teamToSet = teamSelected in teamData ? teamSelected : Object.keys(teamData)[0];
    if (teamToSet === 'admin') if (!isPlayerAdmin(player)) teamToSet = Object.keys(teamData)[0];
    player.setMeta('team', teamToSet);

    player.model = playerModel;
    if (teamToSet === 'admin') setModelForPlayer(player, adminModel);

    alt.emitClient(player, 'blips:create', getBlipData());
    alt.emitClient(player, 'markers:create', getMarkerData());
    alt.emitClient(player, 'clothes:set', player.getMeta('team'), teamData);
    
    setTimeout(() => {
        const teamSpawn = teamData[player.getMeta('team')].coordinates.spawn;
        player.spawn(teamSpawn.x, teamSpawn.y, teamSpawn.z, 0);
        giveWeaponsToPlayer(player);
        player.health = 200;
        player.armour = 100;
        freezePlayer(player, false);
    }, spawnTimeout);

    loadKillFeed(player);
    loadPlayerStats(player);
    refreshPlayerStats(player);
    
    setTimeout(() => { alt.emitClient(player, 'functions:doScreenFadeIn', 500); }, spawnTimeout);

    player.setMeta('lastPosition', player.pos);
    player.setMeta('inWarzone', false);

    alt.emitClient(player, 'functions:setStats');

    setVehicleHandling(player);
}
