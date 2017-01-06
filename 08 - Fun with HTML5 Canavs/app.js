	(function(){
		
	const canvas = document.getElementById('draw');
	let socket;
	
	/*controls*/
	const controls = document.querySelector('.controls');
	const pencilColor = document.querySelector('.input__color');
	const pencilSize = document.querySelector('.input__size');
	const clearBtn = document.querySelector('.input__clear');
	
	/*canvas height and width*/
	canvas.height = (window.innerHeight - ( 5 + controls.offsetHeight));
	canvas.width = (window.innerWidth - 5);
		
	const ctx = canvas.getContext('2d');
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';
	ctx.lineWidth = pencilSize.value;
	ctx.strokeStyle = pencilColor.value;
	
	let isDrawing = false;
	let lastX = 0;
	let lastY = 0;
	let hue = 0;
	let direction = true;
	
	
	function draw(e){
		if(!isDrawing) return;
		ctx.beginPath();
		ctx.moveTo(lastX, lastY);
		ctx.lineTo(e.offsetX, e.offsetY);
		ctx.stroke();
		[lastX, lastY] = [e.offsetX, e.offsetY];
	}

	function newDraw(data){	
		ctx.beginPath();
		ctx.moveTo(lastX, lastY);
		ctx.lineTo(data.x, data.y);
		ctx.stroke();
		[lastX, lastY] = [data.x, data.y];
	}
	
	function updateCanvasSettings(){
		ctx.lineWidth = pencilSize.value;
		ctx.strokeStyle = pencilColor.value;
	}
	function isCanvasBlank(canvas) {
		const blank = document.createElement('canvas');
		
		blank.width = canvas.width;
		blank.height = canvas.height;

		return canvas.toDataURL() == blank.toDataURL();
	}
	
	window.onload = function(){
		socket = io.connect(window.location.host);
		canvas.addEventListener('mousemove',draw);		
		canvas.addEventListener('mousedown',(e) => {
			isDrawing = true;
			[lastX, lastY] = [e.offsetX, e.offsetY];
			socket.emit('mousedown',{
				lastX: lastX,
				lastY: lastY
			});
		});
		canvas.addEventListener('mouseup',() => isDrawing = false);
		canvas.addEventListener('mouseout',() => isDrawing = false);
		pencilColor.addEventListener('change', updateCanvasSettings);
		pencilSize.addEventListener('change', updateCanvasSettings);
		
		clearBtn.addEventListener('click', function(){
			if(isCanvasBlank(canvas)) return;
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.clearRect(0,0, canvas.width, canvas.height);
		});
		canvas.addEventListener('mousemove',function(e){
			if(isDrawing){
				socket.emit('mousemove',{
					x: e.offsetX,
					y: e.offsetY,
				});	
			}
		});
		socket.on('mousedown', function(data){
			[lastX, lastY] = [data.lastX, data.lastY];
		});
		socket.on('mousemove', function(data){
			newDraw(data);		
		});
	};	
	}())

	
	
	
		
	/*
	function setFunky(ctx){
		ctx.strokeStyle = `hsl(${hue},100%,50%)`;
	}
	function performFunky(ctx){
		
		hue++;
		
		if(hue >= 360){
			hue = 0;
		}
		if(ctx.lineWidth >=100 || ctx.lineWidth <= 10){
			direction = !direction;
		}
		if(direction){
			ctx.lineWidth = ctx.lineWidth + 5;
			ctx.lineWidth++;
		}else{
			ctx.lineWidth = ctx.lineWidth - 5;
			ctx.lineWidth--;
		}	
	}
	*/