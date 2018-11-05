window.onload = function(){
	var canv = document.getElementById('canv');
	var ctx  = canv.getContext('2d');
	canv.width = 500;
	canv.height = 500;
	ctx.fillStyle = '#eee';
	ctx.fillRect(0, 0, canv.width, canv.height);

	var player = {
		x: 10,
		y: 10,
		width: 30,
		height: 30,
		angleVelocity: 2,
		angle: 0,
		velocity: 2,
		speed: 0,
		dx: function(){
			return this.x + 22;
		},
		dy: function(){
			return this.y + 45/2;
		},
		rot: function(){
			ctx.save();
			ctx.translate(this.dx(), this.dy());
			ctx.rotate(this.angle * Math.PI / 180);
			ctx.translate(-this.dx(), -this.dy());
		},
		movie: function(){
			this.x += this.speed * Math.cos(this.angle * Math.PI / 180);
			this.y += this.speed * Math.sin(this.angle * Math.PI / 180);
		}

	}

	
	var image = new Image();
	
	
	function animate(){

		var dx = player.x + image.width / 2;
		var dy = player.y + image.height / 2;
		image.src = '../img/sprite.png';

		image.onload = function(){
			ctx.clearRect(0, 0, canv.width, canv.height);
			
			ctx.drawImage(image, player.x, player.y);
		}
	
		document.addEventListener('keydown', function(e){

			//вращение вокруг оси
			if (e.keyCode == 37) {
				player.angle = -player.angleVelocity;
			}

			if (e.keyCode == 39) {
				player.angle = player.angleVelocity;
			}

			//движение объекта
			if (e.keyCode == 38) {
				player.speed = player.velocity;
			}

		});

		document.addEventListener('keyup', function(e){

			//прекратить вращение при не нажатой кнопке
			if (e.keyCode == 37) {
				player.angle = 0;
			}

			if (e.keyCode == 39) {
				player.angle = 0;
			}

			if (e.keyCode == 38) {
				player.speed = 0;
			}
		});

			if (player.angle) {
				player.rot();
			}
			
			if (player.speed) {
				player.movie();
			}



			
			

		requestAnimationFrame(animate);
	}

	requestAnimationFrame(animate);
	
}
			

