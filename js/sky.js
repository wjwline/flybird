(function(w) {
	function Sky(ctx,img,speed) {
		this.ctx = ctx;
		this.img = img;
		this.speed = speed || 10;

		//让第二张图片紧接在第一张图片后面 以实现无缝连接
		this.x = this.img.width*Sky.len;
		this.y = 0;

		//创建一个对象就让Sky.len++
		Sky.len++;
	}

	//为Sky绑定一个静态成员 供所有创建出来的对象使用
	Sky.len = 0;

	Sky.prototype = {
		constructor: Sky,
		draw: function() {
			this.ctx.drawImage(this.img,this.x,this.y);
		},
		update: function() {
			this.x -= this.speed;
			if(this.x <= -this.img.width) {
				this.x += this.img.width*(Sky.len);
			}
		}
	};
	w.getSky = function(ctx,img,speed) {
		return new Sky(ctx,img,speed);
	};
}(window))