$(() => {
    if ($("#admin").length) {
        $(".actionButton").click(function(){
            var view = $(this).data('view');
            var action = $(this).data('action');
            if (view !== undefined) {// open view
                if ($("#" + view).length) {
                    var focus = $(this).data('focus');
                    $(".view").hide();
                    $("#" + view).show();
                    if (focus) $("#" + focus).focus();
                    if (view === 'players') {
                        if ('alt' in window) alt.emit('admin:getPlayers', action);
                    }
                }
            } else if (action !== undefined) {// send action
                if ('alt' in window) alt.emit('admin:action', action);
            } else {// do nothing
                
            }
        });

        $(document).on("click", ".buttonKick", function(){
            let socialId = $(this).parent().parent().data('social');
            if (socialId) {
                if ('alt' in window) alt.emit('admin:kick', socialId);
            }
        });
        $(document).on("click", ".buttonBan", function(){
            let socialId = $(this).parent().parent().data('social');
            if (socialId) {
                if ('alt' in window) alt.emit('admin:ban', socialId);
            }
        });
        $(document).on("click", ".buttonTPto", function(){
            let socialId = $(this).parent().parent().data('social');
            if (socialId) {
                if ('alt' in window) alt.emit('admin:tpto', socialId);
            }
        });

        $("#spawnVehicleButton").click(() => { spawnVehicle(); });
        $("#spawnVehicleText").keyup((e) => { if (e.keyCode === 13) spawnVehicle(); });
        function spawnVehicle() {
            var vehicleToSpawn = $("#spawnVehicleText").val();
            if ('alt' in window) alt.emit('admin:spawnVehicle', vehicleToSpawn);
        }

        $("#sendServerMessageButton").click(() => { sendServerMessage(); });
        $("#sendServerMessageText").keyup((e) => { if (e.keyCode === 13) sendServerMessage(); });
        function sendServerMessage() {
            var serverMessage = $("#sendServerMessageText").val();
            if ('alt' in window) alt.emit('admin:sendServerMessage', serverMessage);
        }

        if ('alt' in window) {
            alt.on('admin:getPlayers', (playersTable) => {
                $("#players").html(playersTable);
            });
        }
        
    }
});