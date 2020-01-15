import * as alt from 'alt';

alt.onServer('spawn:showSelectTeam', (webViewData) => {
    let webViewSelectTeam = null;
    if (!webViewSelectTeam) {
        webViewSelectTeam = new alt.WebView('http://resource/client/_html/selectTeam.html');
        webViewSelectTeam.on('selectTeam:closeWebView', () => {
            webViewSelectTeam.destroy();
            webViewSelectTeam = null;
            alt.setCamFrozen(false);
            alt.toggleGameControls(true);
            alt.showCursor(false);
        });
        webViewSelectTeam.on('selectTeam:teamSelected', (team) => {
            alt.emitServer('spawn:spawn', team);
        });
        webViewSelectTeam.on('selectTeam:ready', () => {
            webViewSelectTeam.emit('selectTeam:webViewData', webViewData);
        });
    }
    webViewSelectTeam.focus();
    alt.setCamFrozen(true);
    alt.toggleGameControls(false);
    alt.showCursor(true);
});

alt.onServer('spawn:respawn', (team) => {
    alt.emitServer('spawn:spawn', team);
});