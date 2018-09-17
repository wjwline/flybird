function draw(ctx) {
	var img = new Image();
	img.onload = function() {
		ctx.drawImage(img,100,100);
	}
	//这样是画不出来的
	//因为你最终还是在html中调用的
	// img.src = "../img/bird.png";
	img.src="img/bird.png";
}