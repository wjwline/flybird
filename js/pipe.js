(function(w) {
	function PipeDownAndUp(ctx,downPipeImg,upPipeImg,speed,space,startDis,landHeight) {
		this.ctx = ctx;
		this.downPipeImg = downPipeImg;
		this.upPipeImg = upPipeImg;
		this.speed = speed || 10;
		this.space = space;
		this.startDis = startDis;

		//管道的宽高
		this.width = this.downPipeImg.width;
		this.height = this.downPipeImg.height;

		//大地的高
		this.landHeight = landHeight;

		this.x = this.startDis + this.width*3*PipeDownAndUp.len;
		this._init();
		PipeDownAndUp.len++;
	}

	PipeDownAndUp.len = 0;

	extend(PipeDownAndUp.prototype,{
		//这个方法是用来随机产生管道的y坐标的
		_init: function() {
			//定义一个随机产生的高度 但是这个高度要有限制  因为管道有最短最长
			//那么定义minHeight = 100; maxHeight = this.ctx.canvas.height - minHeight - this.space - this.landHeight
			var minHeight = 100;
			var maxHeight = this.ctx.canvas.height - this.space - minHeight - this.landHeight;
			//随机高度
			var randomHeight = Math.random()*maxHeight;
			if(randomHeight < minHeight) {
				randomHeight = minHeight;
			}
			this.downY = randomHeight - this.height;
			this.upY = randomHeight + this.space;
		},
		draw: function() {
			this.ctx.drawImage(this.downPipeImg,this.x,this.downY);
			this.ctx.drawImage(this.upPipeImg,this.x,this.upY);
			this.drawPipePath();
		},
		drawPipePath: function() {
			this.ctx.rect(this.x,this.downY,this.width,this.height);
			this.ctx.rect(this.x,this.upY,this.width,this.height);
		},
		update: function() {
			this.x -= this.speed;
			if(this.x < -this.width*3) {
				this._init();
				this.x += this.width*3*PipeDownAndUp.len;
			}
		}
	});
	w.getPipe = function(ctx,downPipeImg,upPipeImg,speed,space,startDis,landHeight) {
		return new PipeDownAndUp(ctx,downPipeImg,upPipeImg,speed,space,startDis,landHeight);
	}
}(window));
