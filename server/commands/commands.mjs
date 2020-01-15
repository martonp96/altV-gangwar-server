import * as alt from 'alt';
import { teamData, hintMessages, adminVehicle } from '../config';
import { isPlayerAdmin, spawnVehicle, showSelectTeamWebView, setModelForPlayer, banPlayer, kickPlayer, addErrorText, showNotification } from '../util/functions';

alt.onClient('commands:spawnVehicle', handleCommandsSpawnVehicle);
alt.onClient('commands:getPlayerPosition', handleCommandsGetPlayerPosition);
alt.onClient('commands:getVehicleRotation', handleCommandsGetVehicleRotation);

function handleCommandsSpawnVehicle(player, vehicleToSpawn) {
    if (!isPlayerAdmin(player)) return;
    if (!vehicleToSpawn) vehicleToSpawn = adminVehicle;
    try {
        spawnVehicle(
            vehicleToSpawn,
            { x: player.pos.x + 3, y: player.pos.y, z: player.pos.z },
            { x: 0, y: 0, z: 0 },
            'BOSS',
            teamData.admin.colors.rgb,
            true,
            player
        );
    } catch (error) {
        addErrorText(error);
    }
}

function handleCommandsGetPlayerPosition(player) {
    if (!isPlayerAdmin(player)) return;
    alt.emitClient(player, 'commands:getPlayerPosition', {
        x: player.pos.x.toFixed(4),
        y: player.pos.y.toFixed(4),
        z: player.pos.z.toFixed(4)
    });
}

function handleCommandsGetVehicleRotation(player) {
    if (!isPlayerAdmin(player)) return;
    let vehicleRot = undefined;
    if (player.vehicle) {
        try {
            vehicleRot = player.vehicle.rot;
        } catch (error) {
            addErrorText(error);
        }
    }
    if (vehicleRot !== undefined) alt.emitClient(player, 'commands:getVehicleRotation',  {
        x: vehicleRot.x.toFixed(4),
        y: vehicleRot.y.toFixed(4),
        z: vehicleRot.z.toFixed(4)
    });
}

alt.onClient('commands:model', (player) => {
    if (!isPlayerAdmin(player)) return;
    let playerVehicle = player.vehicle;
    if (playerVehicle) alt.log(playerVehicle.model);
});

alt.onClient('commands:teleportPlayer', (player, newPosition) => {
    if (!isPlayerAdmin(player)) return;
    player.pos = newPosition;
});

alt.onClient('commands:clearVehicles', (player) => {
    if (!isPlayerAdmin(player)) return;
    alt.Vehicle.all.forEach((v) => {
        if (!v.driver) v.destroy();
    });
});

alt.onClient('commands:selectTeam', (player) => {
    showSelectTeamWebView(player);
});

alt.onClient('commands:setTeam', (player, team) => {
    if (!isPlayerAdmin(player)) return;
    alt.emitClient(player, 'spawn:respawn', team);
});

alt.onClient('player:setMeta', (player, name, item) => {
    player.setMeta(name, item);
});

alt.onClient('player:unsetMeta', (player, name) => {
    player.setMeta(name, null);
});

alt.onClient('commands:setSkin', (player, model) => {
    if (!isPlayerAdmin(player)) return;
    setModelForPlayer(player, model);
});

alt.onClient('commands:heal', (player) => {
    if (!isPlayerAdmin(player)) return;
    player.health = 200;
    player.armour = 100;
});

alt.onClient('commands:kickme', (player) => {
    if (!isPlayerAdmin(player)) return;
    kickPlayer(player, 'Kicked by admin.');
});

alt.onClient('commands:kick', (player, socialId) => {
    if (!isPlayerAdmin(player)) return;
    alt.Player.all.forEach((p) => {
        if (p.socialId.toString() === socialId.toString()) kickPlayer(p, 'Kick von Admin.');
    });
});

alt.onClient('commands:ban', (player, socialId) => {
    if (!isPlayerAdmin(player)) return;
    alt.Player.all.forEach((p) => {
        if (p.socialId.toString() === socialId.toString()) banPlayer(player);
    });
});

alt.onClient('commands:tpto', (player, socialId) => {
    if (!isPlayerAdmin(player)) return;
    alt.Player.all.forEach((p) => {
        if (p.socialId.toString() === socialId.toString()) player.pos = p.pos;
    });
});

alt.onClient('commands:msg', (player, arg) => {
    if (!isPlayerAdmin(player)) return;
    if (!arg !== '') {
        let hintMessageNew = hintMessages.adminMessage;
        hintMessageNew.message = arg.join(' ');
        showNotification(null, hintMessageNew);
    }
});
