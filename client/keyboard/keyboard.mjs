import * as alt from 'alt';

alt.on('keydown', (key) => {
	let pressedKey = '';
	switch (key) {
		case 69:
			pressedKey = 'E';
			break;

		case 188:
			pressedKey = 'Comma';
			break;

		case 190:
			pressedKey = 'Period';
			break;

		case 187:
			pressedKey = 'BracketRight';
			break;
			
		default:
			break;
	}
	if (pressedKey !== '') alt.emitServer('keyboard:' + pressedKey);
});
