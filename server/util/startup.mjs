import chat from '../chat/chat';
import { weapons, deathReasons } from '../config';
import { showSelectTeamWebView, jhash } from './functions';

chat.registerCmd('team', (player) => {
    showSelectTeamWebView(player);
});

chat.registerCmd('h', (player) => {
    chat.send(player, ', (Komma): Verbandskasten');
    chat.send(player, '. (Punkt): Schutzweste');
});

weapons.forEach((w) => {
    deathReasons.push({
        name: w,
        hash: jhash(w)
    });
});
