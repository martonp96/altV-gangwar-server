import * as alt from 'alt';
import * as native from 'natives';

let webView = null;
let webViewOpen = false;

alt.onServer('clothes:set', handleClothesSetClothes);
alt.onServer('clothes:isPlayerAdmin:ok', handleClothesIsPlayerAdmin);

alt.on('keydown', (key) => {
    if (key === 35) alt.emitServer('clothes:isPlayerAdmin');
});

function handleClothesSetClothes(team, teamData) {
    native.setPedDefaultComponentVariation(native.playerPedId());
    for (let [ id, data ] of Object.entries(teamData[team].clothes)) {
        native.setPedComponentVariation(native.playerPedId(), id, data.drawable, data.texture, 0);
    }
}

function handleClothesIsPlayerAdmin() {
    !webViewOpen && !webView ? openWebView() : closeWebView();
}

function openWebView() {
    if (!webView) {
        webView = new alt.WebView('http://resource/client/clothes/html/index.html');
        webView.focus();
        alt.toggleGameControls(false);
        alt.showCursor(true);
        alt.setCamFrozen(true);
        webViewOpen = true;

        webView.on('clothes:change', (componentID, drawableID, textureID) => {
            native.setPedComponentVariation(native.playerPedId(), componentID, drawableID, textureID, 0);
        });
    }
}

function closeWebView() {
    webView.destroy();
    webView = null;
    alt.toggleGameControls(true);
    alt.showCursor(false);
    alt.setCamFrozen(false);
    webViewOpen = false;
}
