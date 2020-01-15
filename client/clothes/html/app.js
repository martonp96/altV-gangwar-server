$(() => {

    const clothes = [
        { id: 11, name: 'Tops', maxDrawable: 331 },
        { id: 3, name: 'Torsos', maxDrawable: 168 },
        { id: 4, name: 'Legs', maxDrawable: 126 },
        { id: 6, name: 'Shoes', maxDrawable: 95 },
        { id: 2, name: 'Hair Styles', maxDrawable: 74 },
        { id: 1, name: 'Masks', maxDrawable: 179 },
        { id: 5, name: 'Bags', maxDrawable: 84 },
        { id: 7, name: 'Accessories', maxDrawable: 135 },
        { id: 8, name: 'Undershirts', maxDrawable: 164 },
        { id: 9, name: 'Body Armors', maxDrawable: 55 },
        { id: 10, name: 'Decals', maxDrawable: 77 }
    ];

    const order = [ 11, 3, 4, 6, 2, 1, 5, 7, 8, 9, 10 ];

    if ($("#clothes").length) {
        for (const [key, val] of Object.entries(clothes)) {
            $("#data").append(`
            <div class="component" data-componentid="${val.id}">
                <div><span id="c${val.id}">${val.name} (#${val.id})</span></div>
                <div>drawableID: <span id="c${val.id}d">0</span></div>
                <div>textureID: <span id="c${val.id}t">0</span></div>
            </div>
            `);
        }

        let tempComponentID = 0;

        let activeComponentID = order[tempComponentID];
        let activeDrawableID = 0;
        let activeTextureID = 0;

        activeComponentID = order[tempComponentID];
        activateNewClothes(activeComponentID, activeDrawableID,activeTextureID);

        $("body").keydown((e) => {
            switch (e.keyCode) {
                case 98:// NUM 2
                    tempComponentID++;
                    activeDrawableID = 0;
                    activeTextureID = 0;
                    break;
                case 100:// NUM 4
                    activeDrawableID--;
                    activeTextureID = 0;
                    break;
                case 102:// NUM 6
                    activeDrawableID++;
                    activeTextureID = 0;
                    break;
                case 104:// NUM 8
                    tempComponentID--;
                    activeDrawableID = 0;
                    activeTextureID = 0;
                    break;
                case 97:// NUM 1
                    activeTextureID--;
                    break;
                case 99:// NUM 3
                    activeTextureID++;
                    break;
                default:
                    break;
            }

            let minComponentID = 0;
            let maxComponentID = Object.keys(clothes).length;
            if (tempComponentID < minComponentID) tempComponentID = minComponentID;
            if (tempComponentID > maxComponentID) tempComponentID = maxComponentID;

            let minDrawableID = 0;
            let maxDrawableID = clothes[tempComponentID].maxDrawable;
            if (activeDrawableID < minDrawableID) activeDrawableID = minDrawableID;
            if (activeDrawableID > maxDrawableID) activeDrawableID = maxDrawableID;

            let minTextureID = 0;
            let maxTextureID = 240;
            if (activeTextureID < minTextureID) activeTextureID = minTextureID;
            if (activeTextureID > maxTextureID) activeTextureID = maxTextureID;

            activeComponentID = order[tempComponentID];

            activateNewClothes(activeComponentID, activeDrawableID,activeTextureID);
        });

        function activateNewClothes(activeComponentID, activeDrawableID, activeTextureID) {
            console.log(`activeComponentID: ${activeComponentID} / activeDrawableID: ${activeDrawableID} / activeTextureID: ${activeTextureID}`);
            $("span").removeClass("active");
            $("#c" + activeComponentID).addClass("active");
            $("#c" + activeComponentID + "d").text(activeDrawableID).addClass("active");
            $("#c" + activeComponentID + "t").text(activeTextureID).addClass("active");
            if ('alt' in window) alt.emit('clothes:change', activeComponentID, activeDrawableID, activeTextureID);
        }
    }
});