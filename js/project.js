$(function () {
	var canvas = $('canvas'),
		context = canvas[0].getContext("2d"),
		canvasWidth = canvas.width(),
		canvasHeight = canvas.height(),

		DECAY = 0,
		WAVELENGTH = 0.12
		WAVELENGTH_A = 1.1 * WAVELENGTH,
		WAVELENGTH_B = 1.3 * WAVELENGTH,
		BASE_R = 128,
		BASE_G = 128,
		BASE_B = 128,

		emmitterA = {
			x: canvasWidth * 1 / 3,
			y: canvasHeight / 2,
			r: 128,
			g: 0,
			b: 0
			// r: 96,
			// g: 128,
			// b: 224
		},

		emmitterB = {
			x: canvasWidth * 2 / 3,
			y: canvasHeight / 2,
			r: 0,
			g: 0,
			b: 128
			// r: 224,
			// g: 128,
			// b: 96
		},

		emmitterC = {
			x: canvasWidth / 2,
			y: canvasHeight * 3 / 4,
			r: 0,
			g: 128,
			b: 0
			// r: 224,
			// g: 128,
			// b: 96
		};

	canvas.attr({
		width: canvasWidth,
		height: canvasHeight
	});
	drawInterferencePattern();

	function drawInterferencePattern(){
		var i = canvasWidth,
			j,
			dA, dB, dC,
			cA, cB, cC,
			r, g, b;
		while(i--){
			j = canvasHeight;
			while(j--){
				dA = distance([i,j],emmitterA);
				dB = distance([i,j],emmitterB);
				dC = distance([i,j],emmitterC);
				cA = Math.cos(dA*WAVELENGTH_A);// * Math.pow(dA, DECAY);
				cB = Math.cos(dB*WAVELENGTH_B);// * Math.pow(dB, DECAY);
				cC = Math.cos(dC*WAVELENGTH);// * Math.pow(dC, DECAY);
				r = Math.min(Math.max(cA*emmitterA.r + cB*emmitterB.r + cC*emmitterC.r + BASE_R,0),255);
				g = Math.min(Math.max(cA*emmitterA.g + cB*emmitterB.g + cC*emmitterC.g + BASE_G,0),255);
				b = Math.min(Math.max(cA*emmitterA.b + cB*emmitterB.b + cC*emmitterC.b + BASE_B,0),255);
				context.fillStyle = "rgb(" + r.toFixed() + "," + g.toFixed() + "," + b.toFixed() + ")";
				context.fillRect(i,j,1,1);
			}
		}
	}

	function distance(a, b){
		a.x = a.x || a[0];
		a.y = a.y || a[1];
		b.x = b.x || b[0];
		b.y = b.y || b[1];
		return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
	}
});