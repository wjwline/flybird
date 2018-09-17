(function(w) {
	function Land(ctx,img,speed) {
		this.ctx = ctx;
		this.img = img;
		this.speed = speed || 10;

		//大地的宽高
		this.width = this.img.width;
		this.height = this.img.height;

		//x,y的坐标可以定死 因为是固定的
		this.x = this.width*Land.len;
		this.y = this.ctx.canvas.height - this.img.height;

		Land.len++;
	}

	Land.len = 0;

	extend(Land.prototype,{
		draw: function() {
			this.ctx.drawImage(this.img,this.x,this.y);
		},
		update: function() {
			this.x -= this.speed;
			if(this.x < -this.width) {
				this.x += this.width*Land.len;
			}
		}
	});
	//利用工厂模式  工厂模式 就是在里面直接返回创建出来的对象 不用在外部创建
	w.getLand = function(ctx,img,speed) {
		return new Land(ctx,img,speed);
	}
}(window))
