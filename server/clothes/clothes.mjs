import * as alt from 'alt';
import { isPlayerAdmin } from '../util/functions';

alt.onClient('clothes:isPlayerAdmin', (player) => {
    if (isPlayerAdmin(player)) alt.emitClient(player, 'clothes:isPlayerAdmin:ok');
})
