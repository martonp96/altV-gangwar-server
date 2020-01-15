import alt from 'alt';
import { teamData } from '../config';

let cmdHandlers = {};

function invokeCmd(player, cmd, args) {
    const callback = cmdHandlers[cmd];
    if (callback) {
        callback(player, args);
    } else {
        send(player, `{FF0000} Befehl nicht bekannt /${cmd}`);
    }
}

alt.onClient('chatmessage', (player, msg) => {
    if (msg[0] === '/') {
        msg = msg.trim().slice(1);
        if (msg.length > 0) {
            let args = msg.split(' ');
            let cmd = args.shift();
            invokeCmd(player, cmd, args);
        }
    } else {
        msg = msg.trim();
        if (msg.length > 0) {
            let playerName = player.name;
            let playerTeam = player.getMeta('team');
            if (playerTeam) {
                let textColor = teamData[playerTeam].colors.hex;
                playerName = `<span style='color:${textColor};font-weight:bold;'>${player.name}</span>`;
            }
            alt.emitClient(null, 'chatmessage', playerName, msg.replace(/</g, '&lt;').replace(/'/g, '&#39').replace(/"/g, '&#34'));
        }
    }
});

export function send(player, msg) {
    alt.emitClient(player, 'chatmessage', null, msg);
}

export function broadcast(msg) {
    send(null, msg);
}

export function registerCmd(cmd, callback) {
    if (cmdHandlers[cmd] === undefined) {
        cmdHandlers[cmd] = callback;
    }
}

export default { send, broadcast, registerCmd };