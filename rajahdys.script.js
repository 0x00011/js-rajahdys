/*
 *	js-rajahdys, canvas räjähdysanimaatioiden ja painovoimafysiikan testailua
 *	Saku (0x00011), 12.9.2022
 * Todella WIP
*/



/**
 * Initialize canvas
 * @returns 
 */
 function initializeCanvas() {
	var canvas = document.createElement('canvas');
	canvas.style.position = 'fixed';
	canvas.style.top = '0px';
	canvas.style.left = '0px';
	canvas.style.pointerEvents = 'none';
	canvas.style.zIndex = 10;
	canvas.style.overflow = 'hidden';

	document.body.appendChild(canvas);
	return canvas;
}

/**
 * Get initialized canvas context
 * @param {*} canvas 
 * @returns 
 */
function getCanvasContext(canvas) {
	var ctx = canvas.getContext('2d');
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;

	return ctx;
}

/**
 * Create new pala
 * @param {*} conf configuration 
 * @returns 
 */
function createPala(conf) {
	var rAngle = conf.angle * (Math.PI / 180);
	var rSpread = conf.spread * (Math.PI / 180);
	var startPos = [window.innerWidth /2, window.innerHeight / 2 + 300];

	return {
		x: startPos[0],
		y: startPos[1],
		tick: 1,
		totalTicks: conf.ticks,
		velocity: (conf.startVelocity * (Math.random() * 0.4 + 0.5)) + (Math.random() * conf.startVelocity),
		color: conf.colors[Math.floor(Math.random() * conf.colors.length)],
		gravity: conf.gravity * 3,
		wobble: Math.random() * 10,
		wobbleSpeed: Math.min(0.11, Math.random() * 0.1 + 0.05),
		angle: -rAngle + ((0.5 * rSpread) - (Math.random() * rSpread)),
		size: (conf.sizeMinMax[0] * 0.5) + (Math.random() * conf.sizeMinMax[1]),
		decay: conf.decay,
		drift: conf.drift,
	}
}

/**
 * Draw pala to canvas
 * @param {*} ctx Canvas context
 * @param {*} pala Single pala in canvas
 */
function drawPala(ctx, pala) {
	ctx.save();
	ctx.translate(pala.x, pala.y);
	ctx.rotate(pala.rotation * Math.PI / 180);
	ctx.scale(pala.size, pala.size);

	// Draw pala shape
	ctx.beginPath();
	ctx.arc(0, 0, 1, 0, 2 * Math.PI);
	ctx.fillStyle = pala.color;
	ctx.fill();
	ctx.restore();
}


/**
 * Update pala position and, velocity and opacity
 * @param {*} ctx Canvas context 
 * @param {*} pala Single pala in canvas
 */
function updatePala(ctx, pala) {
	// x = cos(k) × v + drift, jossa k = kulma ja v = nopeus, drift = mahd. ajelehtimisnopeus
	pala.x += Math.cos(pala.angle) * pala.velocity + pala.drift;
	// y = sin(k) × v + N, jossa; k = kulma, v = nopeus, N = painovoima
	pala.y += Math.sin(pala.angle) * pala.velocity + pala.gravity;
	pala.wobble += pala.wobbleSpeed;
	pala.velocity *= pala.decay;

	// Update opacity depending on how long our pala has been alive
	pala.progress = (pala.tick++) / pala.totalTicks;
	pala.opacity = 1 - pala.progress;
	ctx.beginPath();
}


/**
 * Animate pala
 * @param {*} ctx Canvas context
 * @param {*} pala Single pala in canvas
 * @returns 
 */
function animatePala(ctx, pala) {
	updatePala(ctx, pala);
	drawPala(ctx, pala);

	// Return true if pala is dead
	if(pala.tick > pala.totalTicks) return true;
}