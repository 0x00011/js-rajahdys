const testConf = {
	sizeMinMax: [1, 2],
	palaCount: 50,
	startPos: [
		window.innerWidth / 2,
		window.innerHeight / 2 + 300
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
	testConf.emojiColor = Math.floor(Math.random() * 14);
	context.clearRect(0, 0, canvas.width, canvas.height);
	clearInterval(animateInterval);
	
	var palaArray = [];
	for (var i = 0; i < testConf.palaCount; i++) {
		palaArray.push(createPala(testConf));
	}

	animateInterval = setInterval(() => {
		for(var i = 0; i < palaArray.length; i++) {
			const animatedResponse = animatePala(context, palaArray[i]);
			if(animatedResponse != false) palaArray.splice(i, 1);
		}
	}, 15);
}