import * as alt from 'alt';

alt.onServer('blips:create', handleBlipsCreate);
alt.onServer('blips:changeWarzoneColor', handleBlipsChangeWarzoneColor);

function handleBlipsCreate(blipData) {
	for (let b of blipData) {
		let blip = null;
		switch (b.type) {
			case 'blipForCoord':
				blip = new alt.PointBlip(b.pos.x, b.pos.y, b.pos.z);
				blip.sprite = b.sprite;
				blip.scale = b.scale;
				blip.shortRange = b.shortRange;
				blip.name = b.name;
				break;
			
			case 'radiusBlip':
				blip = new alt.RadiusBlip(b.pos.x, b.pos.y, b.pos.z, b.radius);
				blip.color = b.color;
				blip.alpha = b.alpha;
				break;

			default:
				break;
		}
		if (blip) blip.color = b.color;
		if (b.saveAs) alt.Player.local.setMeta(b.saveAs, blip);
	}
}

function handleBlipsChangeWarzoneColor(color) {
	let warzoneBlip = alt.Player.local.getMeta('warzoneBlip');
	if (warzoneBlip) warzoneBlip.color = color;
}