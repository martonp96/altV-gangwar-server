import * as alt from 'alt';
import { generateVehicleSpawnerHTML, playHealthAndArmourAnimation, isPlayerAdmin } from '../util/functions';

alt.onClient('keyboard:E', handleKeyboardE);

function handleKeyboardE(player) {
    let currentColShape = player.getMeta('currentColshape');
    if (currentColShape !== null) {
        if (currentColShape.nameType === 'vehicleSpawner' && currentColShape.team === player.getMeta('team')) {
            let vehicleSpawnerHTML = generateVehicleSpawnerHTML(player);
            alt.emitClient(player, 'functions:showVehicleSpawner', vehicleSpawnerHTML);
        }
    }
}

alt.onClient('keyboard:Comma', (player) => {
    playHealthAndArmourAnimation(player, 'health');
});

alt.onClient('keyboard:Period', (player) => {
    playHealthAndArmourAnimation(player, 'armour');
});

alt.onClient('keyboard:BracketRight', (player) => {
    if (isPlayerAdmin(player)) {
        player.health = 200;
        player.armour = 100;
    }
});