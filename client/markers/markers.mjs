import * as alt from 'alt';
import * as native from 'natives';

let markers = [];

alt.onServer('markers:create', (_markers) => {
    markers = _markers;
});

alt.everyTick(() => {
    if (markers.length) {
        for (let m of markers) {
            if (m.add) {
                native.drawMarker(
                    m.type, m.pos.x, m.pos.y, m.pos.z - 1,
                    0, 0, 0, 0, 0, 0, m.scale, m.scale, m.scale,
                    m.color.r, m.color.g, m.color.b,
                    m.alpha, false, false, 2, false, undefined, undefined, false
                );
            }
        }
    }
});
