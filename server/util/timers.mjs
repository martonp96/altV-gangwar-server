import * as alt from 'alt';
import { refreshPlayerStats, updateServerStatsOnline } from './functions';
import { refreshPlayerStatsTime, serverStats, teamData } from '../config';
import { setPlayerProperty } from './player';

setInterval(() => {
    alt.Vehicle.all.forEach((v) => {
        if (!v.driver) v.destroy();
    });
}, 600000);

setInterval(() => {
    alt.Player.all.forEach((p) => {
        if (p.getMeta('loadPlayerStats')) refreshPlayerStats(p);
    });
}, refreshPlayerStatsTime);

setInterval(() => {
    for (const [team, data] of Object.entries(teamData)) {
        serverStats.online[team] = 0;
    }
    serverStats.online.all = 0;
    alt.Player.all.forEach((p) => {
        const playerTeam = p.getMeta('team');
        if (playerTeam) {
            serverStats.online[playerTeam]++;
            serverStats.online.all++;
        }
    });
    updateServerStatsOnline();
}, 2500);

setInterval(() => {
    alt.Player.all.forEach((p) => {
        setPlayerProperty(p, 'minutesOnline', +1);
        setPlayerProperty(p, 'xp', +25);
    });
}, 60000);

