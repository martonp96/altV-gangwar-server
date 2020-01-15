export const admins = [ '387283399' ];

export const adminModel = 's_m_y_devinsec_01';

export const adminVehicle = 'zentorno';

export const firstSpawn = { x: -1615.6219, y: -1089.8505, z: 32 };

export const playerModel = 'mp_m_freemode_01';

export const spawnTimeout = 500;

export const respawnTime = 5000;

export const refreshPlayerStatsTime = 5000;

export const warzoneRadius = 150;

export const weapons = [
    'WEAPON_BATTLEAXE',
    'WEAPON_HEAVYPISTOL',
    'WEAPON_PISTOL50',
    'WEAPON_PUMPSHOTGUN',
    'WEAPON_ASSAULTRIFLE',
    'WEAPON_CARBINERIFLE',
    'WEAPON_BULLPUPRIFLE',
    'WEAPON_COMBATPDW',
    'WEAPON_GUSENBERG',
    'WEAPON_MICROSMG',
    'WEAPON_REVOLVER_MK2'
];

export let deathReasons = [
    { name: 'WEAPON_RUN_OVER_BY_CAR', hash: 2741846334 },
    { name: 'WEAPON_FALL', hash: 3452007600 },
    { name: 'WEAPON_DROWNING', hash: 4284007675 },
    { name: 'WEAPON_DROWNING_IN_VEHICLE', hash: 1936677264 },
    { name: 'WEAPON_EXPLOSION', hash: 539292904 },
    { name: 'WEAPON_FIRE', hash: 3750660587 },
    { name: 'WEAPON_BLEEDING', hash: 2339582971 },
    { name: 'WEAPON_EXHAUSTION', hash: 910830060 }
];

export const hintMessages = {
    spawnVehicle: {
        image: 'CHAR_CARSITE',
        header: '   Fahrzeug   ',
        details: '',
        message: 'Benutze E, um ein Fahrzeug zu spawnen.',
        flash: false,
        iconType: 4,
        duration: 0.25,
        clantag: '___INFO'
    },
    adminMessage: {
        image: 'CHAR_AMMUNATION',
        header: '   Nachricht   ',
        details: '',
        message: '',
        flash: false,
        iconType: 4,
        duration: 1,
        clantag: '___ADMIN'
    },
    repairVehicle: {
        image: 'CHAR_CARSITE',
        header: '   Fahrzeug   ',
        details: '',
        message: 'Dein Fahrzeug wurde repariert.',
        flash: false,
        iconType: 4,
        duration: 0.25,
        clantag: '___INFO'
    },
    weapon: {
        image: 'CHAR_AMMUNATION',
        header: '   Waffen   ',
        details: '',
        message: 'Deine Munition wurde aufgefüllt.',
        flash: false,
        iconType: 4,
        duration: 0.25,
        clantag: '___INFO'
    }
};

export const teamData = {
    aztecas: {
        name: 'Aztecas',
        colors: {
            rgb: { r: 66, g: 135, b: 245 },
            hex: '#4287f5'
        },
        blip: {
            color: 3,
            sprite: 40,
            scale: 1,
            shortRange: false
        },
        scale: 3,
        marker: {
            add: true,
            type: 1,
            alpha: 100
        },
        shape: {
            nameType: 'vehicleSpawner'
        },
        icon: 'khanda',
        vehicle: 'schafter5',
        coordinates: {
            spawn: { x: -63.6527, y: -1452.2241, z: 32.1106 },
            vehicle: { x: -68.6769, y: -1459.1472, z: 32.1106 },
            vehicleSpawn: { x: -73.1341, y: -1462.2594, z: 31.4366 },
            vehicleSpawnRot: { x: -0.0156, y: 0.0000, z: -2.5781 }
        },
        clothes: {
            11: { drawable: 7, texture: 3 },
            3: { drawable: 14, texture: 0 },
            4: { drawable: 3, texture: 3 },
            6: { drawable: 1, texture: 5 },
            2: { drawable: 1, texture: 4 },
            1: { drawable: 14, texture: 0 },
            5: { drawable: 0, texture: 0 },
            7: { drawable: 0, texture: 0 },
            8: { drawable: 0, texture: 200 },
            9: { drawable: 0, texture: 0 },
            10: { drawable: 0, texture: 0 }
        }
    },
    ballas: {
        name: 'Ballas',
        colors: {
            rgb: { r: 68, g: 26, b: 115 },
            hex: '#441a73'
        },
        blip: {
            color: 50,
            sprite: 40,
            scale: 1,
            shortRange: false
        },
        scale: 3,
        marker: {
            add: true,
            type: 1,
            alpha: 100
        },
        shape: {
            nameType: 'vehicleSpawner'
        },
        icon: 'meteor',
        vehicle: 'schafter5',
        coordinates: {
            spawn: { x: -209.4857, y: -1599.7715, z: 34.8572 },
            vehicle: { x: -205.4769, y: -1604.3737, z: 34.8235 },
            vehicleSpawn: { x: -191.5517, y: -1605.8506, z: 33.4586 },
            vehicleSpawnRot: { x: 0.0156, y: 0.0156, z: -1.7656 }
        },
        clothes: {
            11: { drawable: 17, texture: 3 },
            3: { drawable: 5, texture: 0 },
            4: { drawable: 16, texture: 5 },
            6: { drawable: 1, texture: 3 },
            2: { drawable: 8, texture: 4 },
            1: { drawable: 51, texture: 6 },
            5: { drawable: 0, texture: 0 },
            7: { drawable: 0, texture: 0 },
            8: { drawable: 0, texture: 200 },
            9: { drawable: 0, texture: 0 },
            10: { drawable: 0, texture: 0 }
        }
    },
    families: {
        name: 'Families',
        colors: {
            rgb: { r: 0, g: 110, b: 15 },
            hex: '#29731c'
        },
        blip: {
            color: 52,
            sprite: 40,
            scale: 1,
            shortRange: false
        },
        scale: 3,
        marker: {
            add: true,
            type: 1,
            alpha: 100
        },
        shape: {
            nameType: 'vehicleSpawner'
        },
        icon: 'fire-alt',
        vehicle: 'schafter5',
        coordinates: {
            spawn: { x: 112.0088, y: -1958.9670, z: 20.8550 },
            vehicle: { x: 117.2044, y: -1950.4352, z: 20.7371 },
            vehicleSpawn: { x: 104.2681, y: -1949.9868, z: 20.1304 },
            vehicleSpawnRot: { x: 0.0469, y: 0.0000, z: 0.0313 }
        },
        clothes: {
            11: { drawable: 1, texture: 7 },
            3: { drawable: 0, texture: 0 },
            4: { drawable: 3, texture: 6 },
            6: { drawable: 1, texture: 14 },
            2: { drawable: 14, texture: 4 },
            1: { drawable: 16, texture: 1 },
            5: { drawable: 0, texture: 0 },
            7: { drawable: 0, texture: 0 },
            8: { drawable: 0, texture: 200 },
            9: { drawable: 0, texture: 0 },
            10: { drawable: 0, texture: 0 }
            
        }
    },
    vagos: {
        name: 'Vagos',
        colors: {
            rgb: { r: 219, g: 219, b: 26 },
            hex: '#dbdb1a'
        },
        blip: {
            color: 71,
            sprite: 40,
            scale: 1,
            shortRange: false
        },
        scale: 3,
        marker: {
            add: true,
            type: 1,
            alpha: 100
        },
        shape: {
            nameType: 'vehicleSpawner'
        },
        icon: 'fist-raised',
        vehicle: 'schafter5',
        coordinates: {
            spawn: { x: 243.3890, y: -1689.6263, z: 29.2631 },
            vehicle: { x: 241.4901, y: -1698.5670, z: 29.1787 },
            vehicleSpawn: { x: 243.9692, y: -1701.2572, z: 28.4711 },
            vehicleSpawnRot: { x: 0.0000, y: 0.0000, z: -2.2500 }
        },
        clothes: {
            1: { drawable: 14, texture: 8 },
            2: { drawable: 7, texture: 4 },
            3: { drawable: 8, texture: 0 },
            4: { drawable: 5, texture: 8 },
            5: { drawable: 0, texture: 0 },
            6: { drawable: 8, texture: 6 },
            7: { drawable: 0, texture: 0 },
            8: { drawable: 0, texture: 200 },
            9: { drawable: 0, texture: 0 },
            10: { drawable: 0, texture: 0 },
            11: { drawable: 38, texture: 1 }
        }
    },
    admin: {
        name: 'admin',
        colors: {
            rgb: { r: 0, g: 0, b: 0 },
            hex: '#000'
        },
        icon: 'user-secret',
        coordinates: {
            spawn: { x: 63.8901, y: -1571.3539, z: 29.5831 }
        },
        clothes: {
            11: { drawable: 31, texture: 0 },
            3: { drawable: 4, texture: 0 },
            4: { drawable: 4, texture: 2 },
            6: { drawable: 1, texture: 0 },
            2: { drawable: 11, texture: 4 },
            1: { drawable: 95, texture: 0 },
            5: { drawable: 0, texture: 0 },
            7: { drawable: 0, texture: 0 },
            8: { drawable: 31, texture: 2 },
            9: { drawable: 0, texture: 0 },
            10: { drawable: 0, texture: 0 }
        }
    }
};

export const feed = {
    connect: {
        icon: 'check-circle',
        color: '#299e21',
        message: '{player1} eingeloggt'
    },
    disconnect: {
        icon: 'times-circle',
        color: '#d43535',
        message: '{player1} ausgeloggt'
    },
    suicide: {
        icon: 'briefcase-medical',
        color: '#edbd11',
        message: '{player1} Suizid'
    },
    kill: {
        icon: 'dizzy',
        color: '#5778ef',
        message: '{player1} hat {player2} getötet'
    },
    teamKill: {
        icon: 'skull-crossbones',
        color: '#d43535',
        message: '{player1} hat Gangmitglied {player2} getötet'
    },
    vehicleKill: {
        icon: 'car-crash',
        color: '#d43535',
        message: '{player1} hat {player2} überfahren'
    },
    kicked: {
        icon: 'user-slash',
        color: '#d43535',
        message: '{player2} kicked'
    },
    timeout: {
        icon: 'user-clock',
        color: '#d43535',
        message: '{player2} timeout'
    }
};

export const playerStatsTemplate = `
<div><i class="fas fa-user"></i> {username}</div>
<div><i class="fas fa-star"></i> Level: {level}</div>
<div><i class="fas fa-plus-square"></i> Kills: {kills}</div>
<div><i class="fas fa-minus-square"></i> Tode: {deaths}</div>
<div><i class="fas fa-clock"></i> {hoursPlayed} Stunden</div>`;

export let serverStats = {
    online: {}
};

export const levelBasedVehicles = [
    { level: 1, vehicle: 'chino2', name: 'Chino' },
    { level: 3, vehicle: 'ellie', name: 'Ellie' },
    { level: 7, vehicle: 'dominator3', name: 'Dominator' },
    { level: 12, vehicle: 'schafter5', name: 'Schafter' },
    { level: 20, vehicle: 'toros', name: 'Toros' },
    { level: 25, vehicle: 't20', name: 'T20' },
    { level: 30, vehicle: 'neon', name: 'Neon' },
    { level: 40, vehicle: 'zentorno', name: 'Zentorno' },
    { level: 50, vehicle: 'formula2', name: 'Formula' }
];

export const customMapPoints = {
    workshop1: {
        name: 'Werkstatt',
        color: { r: 255, g: 255, b: 255 },
        coordinates: { x: -128.0571, y: -1775.0110, z: 29.2292 },
        nameType: 'workshop',
        addShape: true,
        scale: 5,
        blip: {
            color: 4,
            sprite: 402,
            scale: 1,
            shortRange: false
        },
        marker: {
            add: true,
            type: 1,
            alpha: 100
        }
    },
    weapon1: {
        name: 'Waffen',
        color: { r: 255, g: 255, b: 255 },
        coordinates: { x: 46.5494, y: -1593.4418, z: 29.5831 },
        nameType: 'weapon',
        addShape: true,
        scale: 3,
        blip: {
            color: 4,
            sprite: 110,
            scale: 1,
            shortRange: false
        },
        marker: {
            add: true,
            type: 1,
            alpha: 100
        }
    },
    warzone1: {
        name: 'Warzone',
        color: { r: 255, g: 255, b: 255 },
        coordinates: { x: 22.0352, y: -1713.6395, z: 29.2968 },
        nameType: 'warzone',
        addShape: false,
        scale: warzoneRadius,
        blip: {
            color: 4,
            sprite: 84,
            scale: 1.5,
            shortRange: false,
            radius: warzoneRadius,
            alpha: 100,
            saveAs: 'warzoneBlip'
        },
        marker: {
            add: false,
            type: 1,
            alpha: 100
        }
    }
};

export const vehicleTuning = {
    2891838741: {// zentorno
        initialDriveForce: 0.7,
        breakForce: 1.5
    },
    2445973230: {// neon
        initialDriveForce: 0.35,
        breakForce: 1.2
    },
    2334210311: {// formula2
        initialDriveForce: 3.0,
        breakForce: 2.0
    }
};
