import * as alt from 'alt';

let webView = null;
let webViewOpen = false;

alt.on('keydown', (key) => {
    if (key === 46) !webViewOpen ? alt.emitServer('admin:checkAdmin') : closeWebView();
});

alt.onServer('admin:checkAdmin', (isAdmin) => {
    if (isAdmin) openWebView();
});

function openWebView() {
    if (!webView) {
        webView = new alt.WebView('http://resource/client/admin/html/index.html');
        webView.focus();
        alt.toggleGameControls(false);
        alt.showCursor(true);
        webViewOpen = true;

        webView.on('admin:close', () => {
            closeWebView();
        });

        webView.on('admin:action', (action) => {
            closeWebView();
            alt.emitServer(action);
        });

        webView.on('admin:spawnVehicle', (vehicleToSpawn) => {
            closeWebView();
            alt.emitServer('commands:spawnVehicle', vehicleToSpawn);
        });

        webView.on('admin:sendServerMessage', (serverMessage) => {
            closeWebView();
            alt.emitServer('commands:msg', serverMessage.split(' '));
        });

        webView.on('admin:getPlayers', () => {
            alt.emitServer('admin:getPlayers');
        });

        webView.on('admin:kick', (socialId) => {
            alt.emitServer('commands:kick', socialId);
        });

        webView.on('admin:ban', (socialId) => {
            alt.emitServer('commands:ban', socialId);
        });
        
        webView.on('admin:tpto', (socialId) => {
            alt.emitServer('commands:tpto', socialId);
        });
    }
}

alt.onServer('admin:getPlayers', (playersTable) => {
    if (webView) webView.emit('admin:getPlayers', playersTable);
});

function closeWebView() {
    if (webView) {
        webView.destroy();
        webView = null;
        alt.toggleGameControls(true);
        alt.showCursor(false);
        webViewOpen = false;
    }
}
