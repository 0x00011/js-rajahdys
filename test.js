const testConf = {
	palaCount: 100,
	sizeMinMax: [1, 2],
	colors: [
		'#ec3513',
		'#3db530',
		'#ecab02',
		'#ba77fb',
		'#fc71cd'
	],
	angle: 90,
	spread: 65,
	startVelocity: 35,
	decay: 0.91,
	drift: 0,
	gravity: 1,
	ticks: 25,
	x: 0.5,
	y: 0.5,
}

var canvas = document.getElementsByTagName('canvas')[0] || initializeCanvas();
var context = getCanvasContext(canvas);
var animateInterval;

function clickFunction() {	
	context.clearRect(0, 0, canvas.width, canvas.height);
	clearInterval(animateInterval);
	
	var palaArray = [];
	for (var i = 0; i < testConf.palaCount; i++) {
		palaArray.push(createPala(testConf));
	}

	animateInterval = setInterval(() => {
		for(var i = 0; i < palaArray.length; i++) {
			if(animatePala(context, palaArray[i]) == true) {
				palaArray.splice(i, 1);
			}
		}
	}, 15);
}