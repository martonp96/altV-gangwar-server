import * as alt from 'alt';
import { showNotification, repairCar, giveWeaponsToPlayer, getShapeDate } from '../util/functions';
import { hintMessages } from '../config';

const shapeData = getShapeDate();

alt.on('entityEnterColshape', handleEntityEnterColshape);
alt.on('entityLeaveColshape', handleEntityLeaveColshape);

for (let s of shapeData) {
    let newShape = new alt.ColshapeCylinder(s.pos.x, s.pos.y, s.pos.z - 1, s.scale, s.scale);
    newShape.nameType = s.nameType;
    if (s.team) newShape.team = s.team;
}

function handleEntityEnterColshape(colshape, entitiy) {
    if (entitiy instanceof alt.Player) {
        if (colshape.nameType === 'vehicleSpawner') {
            let colshapeInfo = {
                nameType: colshape.nameType,
                team: colshape.team
            };
            alt.emitClient(entitiy, 'enterColshape', colshapeInfo);
            entitiy.setMeta('currentColShape', colshape);
            showNotification(entitiy, hintMessages.spawnVehicle);
        } else if (colshape.nameType === 'weapon') {
            giveWeaponsToPlayer(entitiy);
            showNotification(entitiy, hintMessages.weapon);
        } else if (colshape.nameType === 'warzone') {
            entitiy.setMeta('inWarzone', true);
        }
    }

    if (entitiy instanceof alt.Vehicle) {
        if (colshape.nameType === 'workshop' && entitiy.driver) {
            alt.emitClient(entitiy.driver, 'functions:repairCar');
            repairCar(entitiy.driver);
            showNotification(entitiy.driver, hintMessages.repairVehicle);
        }
    }
}

function handleEntityLeaveColshape(colshape, entitiy) {
    if (entitiy instanceof alt.Player) {
        alt.emitClient(entitiy, 'leaveColshape');
        entitiy.setMeta('currentColShape', undefined);
        if (colshape.nameType === 'warzone') entitiy.setMeta('inWarzone', false);
    }
}
