import * as alt from 'alt';
import { generatePlayersTable, isPlayerAdmin } from '../util/functions';

alt.onClient('admin:getPlayers', (player) => {
    alt.emitClient(player, 'admin:getPlayers', generatePlayersTable());
});

alt.onClient('admin:checkAdmin', (player) => {
    let isAdmin = isPlayerAdmin(player);
    alt.emitClient(player, 'admin:checkAdmin', isAdmin);
});
