//利用沙箱模式
(function(w) {
	function Bird(ctx,img,widthFrame,heightFrame,x,y) {
		this.ctx = ctx;
		this.img = img;
		//宽高的帧数
		this.widthFrame = widthFrame;
		this.heightFrame = heightFrame;
		//起始显示的位置
		this.x = x;
		this.y = y;
		//一只鸟的宽高
		this.birdWidth = this.img.width/this.widthFrame;
		this.birdHeight = this.img.height/this.heightFrame;
		//初始的帧
		this.startFrame = 0;
		this.startDirection = 0;

		//定义初始下落速度 下落加速度
		this.speed = 3;
		this.acceleration = 0.2;

		//调用绑定事件函数
		this._bind();

		this.birdCenterX = this.x + this.birdWidth/2;
	}
	Bird.prototype = {
		constructor:Bird,
		_bind: function() {
			var that = this;
			this.ctx.canvas.addEventListener("click",function() {
				that.speed = -3;
			})
		},
		draw: function() {
			//先保存再回滚  这样在里面就不会影响其他的图
			this.ctx.save();
			//基础角度
			var baseRadian = Math.PI/180 * 10;
			//旋转的角度根据速度判断
			var rotateRadian = baseRadian * this.speed;
			//最大角度
			var maxRadian = baseRadian * 4.5;
			if(rotateRadian > maxRadian) {
				rotateRadian = maxRadian;
			}
			this.ctx.translate(this.birdCenterX,this.birdCenterY);
			this.ctx.rotate(rotateRadian);
			this.ctx.drawImage(this.img,this.startFrame*this.birdWidth,this.startDirection*this.birdHeight,this.birdWidth,this.birdHeight,-this.birdWidth/2,-this.birdHeight/2,this.birdWidth,this.birdHeight);
			this.startFrame++;
			if(this.startFrame > this.widthFrame - 1) {
				this.startFrame = 0;
			}
			this.ctx.restore();
		},
		update: function() {
			this.birdCenterY = this.y + this.birdHeight/2;
			this.y += this.speed;
			this.speed += this.acceleration;
		}
	}
	//创建一个变量来存储鸟实例对象
	var bird = null;
	w.getBird = function(ctx,img,widthFrame,heightFrame,x,y) {
		//单利模式 因为整个游戏 只要一个鸟就足够了
		if(!bird) {
			bird = new Bird(ctx,img,widthFrame,heightFrame,x,y)
		}
		return bird;
	}
}(window));

