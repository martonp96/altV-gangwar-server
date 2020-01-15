import * as alt from 'alt';

alt.onServer('enterColshape', (colshape) => {
    alt.emitServer('player:setMeta', 'currentColshape', colshape);
});

alt.onServer('leaveColshape', () => {
    alt.emitServer('player:unsetMeta', 'currentColshape');
});