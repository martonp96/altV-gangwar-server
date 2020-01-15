import * as alt from 'alt';
import * as native from 'natives';

alt.on('consoleCommand', (command, ...args) => {
    if (command === 'reconnect') {
        return;
    }

    switch (command) {
        case 'veh':
            alt.emitServer('commands:spawnVehicle', args[0]);
            break;

        case 'pos':
            alt.emitServer('commands:getPlayerPosition');
            break;

        case 'tp':
            if (args.length !== 3) return alt.log('tp x y z');
            alt.emitServer('commands:teleportPlayer', { x: args[0], y: args[1], z: args[2] });
            break;

        case 'vehrot':
            alt.emitServer('commands:getVehicleRotation');
            break;

        case 'clearveh':
            alt.emitServer('commands:clearVehicles');
            break;

        case 'team':
            native.doScreenFadeOut(0);
            alt.emitServer('commands:selectTeam');
            break;

        case 'setteam':
            if (args.length !== 1) return alt.log('setteam team');
            native.doScreenFadeOut(0);
            alt.emitServer('commands:setTeam', args[0]);
            break;

        case 'setskin':
            if (args.length !== 1) return alt.log('setskin skin');
            alt.emitServer('commands:setSkin', args[0]);
            break;

        case 'heal':
            alt.emitServer('commands:heal');
            break;

        case 'kickme':
            alt.emitServer('commands:kickme');
            break;

        case 'kick':
            if (args.length !== 1) return alt.log('kick socialid');
            alt.emitServer('commands:kick', args[0]);
            break;

        case 'ban':
            if (args.length !== 1) return alt.log('ban socialid');
            alt.emitServer('commands:ban', args[0]);
            break;

        case 'tpto':
            if (args.length !== 1) return alt.log('tpto skin');
            alt.emitServer('commands:tpto', args[0]);
            break;

        case 'msg':
            if (args.length < 1) return alt.log('msg message');
            alt.emitServer('commands:msg', args);
            break;

        case 'model':
            alt.emitServer('commands:model');

        default:
            break;
    }
});

alt.onServer('commands:getPlayerPosition', (playerPosition) => {
	alt.log(`x: ${playerPosition.x}, y: ${playerPosition.y}, z: ${playerPosition.z}`);
});

alt.onServer('commands:getVehicleRotation', (vehicleRot) => {
	alt.log(`x: ${vehicleRot.x}, y: ${vehicleRot.y}, z: ${vehicleRot.z}`);
});
