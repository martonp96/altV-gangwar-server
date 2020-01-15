$(() => {
    // selectTeam
    if ($("#selectTeam").length) {
        alt.emit('selectTeam:ready');

        alt.on('selectTeam:webViewData', (webViewData) => {
            webViewData.forEach((w) => {
                $("#selectTeam").append(`<div class="selectTeamButton" data-team="${w.team}" style="background-color:${w.color}"><i class="fas fa-${w.icon}"></i> ${w.name}</div>`);
            });
        });

        $(document).on("click", ".selectTeamButton", function() {
            alt.emit('selectTeam:teamSelected', $(this).data("team"));
            alt.emit('selectTeam:closeWebView');
        });
    }

    // kickMessage
    if ($("#kickMessage").length) {
        alt.emit('kickMessage:ready');
        alt.on('kickMessage:message', (reason) => {
            let message = reason !== '' ? reason : 'unknown';
            $("#kickReason").text(message);
        });
    }

    // killFeed
    if ($("#killFeed").length) {
        alt.emit('killFeed:ready');
        let messages = [];
        alt.on('killFeed:message', (textToAdd) => {
            messages.push(textToAdd);
            if (messages.length > 10) messages.shift();
        });
        setInterval(() => {
            $("#killFeedTable").html('');
            messages.forEach((m) => {
                $("#killFeedTable").append(m);
            });
        }, 1000);

        if ($("#serverStatsOnline").length) {
            alt.on('killFeed:serverStatsOnline', (outputHTML) => {
                $("#serverStatsOnline").show().html(outputHTML);
            });
        }
    }

    // playerStats
    if ($("#playerStats".length)) {
        alt.emit('playerStats:ready');
        alt.on('playerStats:text', (text) => {
            $("#playerStats").show().html(text);
        });
    }

    // welcome
    if ($("#welcome".length)) {
        alt.emit('welcome:ready');
        alt.on('welcome:changelog', (changelog) => {
            $("#changelog").html(changelog);
        });
        $("#closeWelcome").click(() => {
            alt.emit('welcome:close');
        });
    }

    // timeoutMessage
    if ($("#timeoutMessage").length) {
        alt.emit('timeout:ready');
        alt.on('timeout:message', (reason, time) => {
            let message = reason !== '' ? reason : 'unknown';
            $("#timeoutReason").text(message);
            $("#timeoutTime").text(time + ' sec');
            let timer = setInterval(() => {
                time--;
                $("#timeoutTime").text(time + ' sec');
                if (time <= 0) {
                    clearInterval(timer);
                    alt.emit('timeout:close');
                }
            }, 1000);
        });
    }

    // vehicleSpawner
    if ($("#vehicleSpawner").length) {
        alt.emit('vehicleSpawner:ready');
        alt.on('vehicleSpawner:data', (vehicleSpawnerHTML) => {
            $("#vehiclesToSpawn").html(vehicleSpawnerHTML);
        });
        $("#closeVehicleSpawner").click(() => {
            alt.emit('vehicleSpawner:close');
        });
        $(document).on("click", ".spawnThisVehicle", function(){
            let access = $(this).parent().data("access");
            let vehicle = $(this).parent().data("vehicle");
            if (access) alt.emit('vehicleSpawner:spawn', vehicle);
            alt.emit('vehicleSpawner:close');
        });
    }

    // speedometer
    if ($("#speedometer").length) {
        alt.on('speedometer:data', (data) => {
            let speed = data.speed;
            let gear = data.gear;
            let rpm = data.rpm;
            let isElectric = data.isElectric;

            let gearCurrent = gear;
            let gearNext = 0;
            let gearBefore = 0;

            let gearOrder = ['R', 'P', 1, 2, 3, 4, 5, 6];
            if (isElectric) gearOrder = ['R', 'P', 1];
            let gearIndex = 0;

            if (speed === 0) {// parking
                gearIndex = 1;
            } else if (gearCurrent === 0 && speed > 0) {// backwards
                gearIndex = 0;
            } else if (gearCurrent === 1) {// first gear
                gearIndex = 2;
            } else if (gearCurrent === 6) {// last gear
                gearIndex = 7;
            } else {
                gearNext = gear + 1;
                gearBefore = gear - 1;
                gearIndex = gear + 1;
            }

            gearCurrent = gearOrder[gearIndex];
            gearNext = gearOrder[gearIndex + 1] !== undefined ? gearOrder[gearIndex + 1] : '';
            gearBefore = gearOrder[gearIndex - 1] !== undefined ? gearOrder[gearIndex - 1] : '';
            
            let rpmPercent = (rpm / 10000 * 100).toFixed(0);
            let rpmColor = rpmPercent < 90 ? 'green' : 'orange';

            let displayShiftUp = rpmPercent < 90 ? 'none' : 'block';
            if (gearCurrent === 'R' || gearCurrent === 'P' || gearCurrent === 6) displayShiftUp = 'none';
            if (isElectric) if (gearCurrent > 0) displayShiftUp = 'none';

            $("#gearNext").text(gearNext);
            $("#gearCurrent").text(gearCurrent);
            $("#gearBefore").text(gearBefore);
            $("#rpm").children("div").css({ "width": rpmPercent + "%", "background-color": rpmColor });
            $("#shift").css("display", displayShiftUp);
            $("#speed").text(speed);
        });
    }
});