import * as alt from 'alt';
import { respawnTime, deathReasons } from '../config';
import { updatePlayerStat, addToKillFeed, timeoutPlayer, notifyPlayer } from '../util/functions';

alt.on('playerDeath', handlePlayerDeath);

function handlePlayerDeath(player, killer, weaponHash) {
    let weaponName = null;
    deathReasons.forEach((w) => {
        if (w.hash === weaponHash) weaponName = w.name;
    });
    if (weaponName === null) weaponName = 'unknown';

    if (!killer) killer = player;

    let action = '';
    if (player === killer) {
        action = 'suicide';
        updatePlayerStat(player, 'deaths', +1);
        addToKillFeed(action, player, '', weaponName);
    } else if (player.getMeta('team') === killer.getMeta('team') && player !== killer && killer instanceof alt.Player) {
        action = 'teamKill';
        addToKillFeed(action, killer, player, weaponName);
        timeoutPlayer(killer, 'Team kill.', 60);
    } else if (weaponName === 'WEAPON_RUN_OVER_BY_CAR' && player !== killer && killer instanceof alt.Player) {
        action = 'vehicleKill';
        addToKillFeed(action, killer, player, weaponName);
        timeoutPlayer(killer, 'Vehicle Deathmatch.', 120);
    } else {
        if (killer instanceof alt.Player) {
            action = 'kill';
            updatePlayerStat(killer, 'kills', +1);
            updatePlayerStat(killer, 'xp', +25);
            updatePlayerStat(player, 'deaths', +1);
            notifyPlayer(killer, `${player.name} getötet. ~g~+25 XP`);
            addToKillFeed(action, killer, player, weaponName);
        }
    }

    alt.emitClient(player, 'functions:doScreenFadeOut', respawnTime / 2);
    setTimeout(() => {
        alt.emitClient(player, 'spawn:respawn', player.getMeta('team'));
    }, respawnTime);
}
