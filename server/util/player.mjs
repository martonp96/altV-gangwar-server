import * as alt from 'alt';
import fs from 'fs';
import path from 'path';
import { addErrorText } from './functions';

const encoding = 'utf-8';
const dataPath = path.resolve('resources', 'altv-gangwar', 'server', 'data');
const standardValues = {
    isBanned: false,
    xp: 0,
    kills: 0,
    deaths: 0,
    minutesOnline: 0
};

try {
    if (!fs.existsSync(dataPath)) {
        fs.mkdirSync(dataPath);
    }
} catch (error) {
    addErrorText(error);
}

const playersFile = path.resolve(dataPath, 'players.json');
try {
    if (!fs.existsSync(playersFile)) {
        fs.writeFileSync(playersFile, JSON.stringify([]), encoding);
    }
} catch (error) {
    addErrorText(error);
}

export function createPlayer(p) {
    let players = loadPlayers(playersFile);
    let playerExists = false;
    if (players.length) {
        let playerInFile = players.find(o => o.socialId === p.socialId);
        if (playerInFile !== undefined) {
            playerExists = true;
            setPlayerProperty(playerInFile, 'username', p.name);
        }
    }
    
    if (!playerExists) {
        let pNew = { socialId: p.socialId, username: p.name };
        for (const [key, val] of Object.entries(standardValues)) pNew[key] = val;
        players.push(pNew);
        savePlayers(players);
    }
}

export function setPlayerProperty(p, key, val) {
    let players = loadPlayers(playersFile);
    let playerInFile = players.find(o => o.socialId === p.socialId);
    if (playerInFile !== undefined) {
        players.splice(players.indexOf(playerInFile), 1);
        if ((typeof val) === 'number') {
            playerInFile[key] += val;
        } else {
            playerInFile[key] = val;
        }
        players.push(playerInFile);
    }
    savePlayers(players);
}

export function getPlayerProperty(p, key = null) {
    let propertyValue = undefined;
    let players = loadPlayers(playersFile);
    let playerInFile = players.find(o => o.socialId === p.socialId);
    if (playerInFile !== undefined) {
        propertyValue = key ? playerInFile[key] : playerInFile;
    }
    return propertyValue;
}

function savePlayers(players) {
    try {
        fs.writeFileSync(playersFile, JSON.stringify(players), encoding);
    } catch (error) {
        addErrorText(error);
    }
}

function loadPlayers() {
    try {
        let content = fs.readFileSync(playersFile, encoding);
        if (content !== '') {
            return JSON.parse(content);
        } else {
            return [];
        }
    } catch (error) {
        addErrorText(error);
    }
}