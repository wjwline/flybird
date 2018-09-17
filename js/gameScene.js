(function(w) {
	function GameScene(ctx,img) {
		this.ctx = ctx;
		this.img = img;

		//定义一个听众列表
		this.listeners = [];
		this._initRoles();
	}
	GameScene.prototype = {
		constructor: GameScene,

		//添加听众
		addListener: function(fn) {
			this.listeners.push(fn);
		},

		//当监听到某一事件时 遍历听众
		triggerBirdDeath: function() {
			this.listeners.forEach(function(listener) {
				listener();
			})
		},	

		//把创建对象和画图分成两个方法
		_initRoles: function() {
			//定义一个数组存储所有创建的游戏对象 然后循环这个数组 让每个对象都调用draw和update方法
			this.roles = [];

			//背景两个
			this.roles.push(getSky(this.ctx,this.img.sky,3));
			this.roles.push(getSky(this.ctx,this.img.sky,3));

			//管道7个
			for(var i=0;i<7;i++) {
				this.roles.push(getPipe(this.ctx,this.img.pipeDown,this.img.pipeUp,3,150,300,112));
			}
			
			//大地4个
			this.land = getLand(this.ctx,this.img.land,3);
			this.roles.push(this.land);
			for(var i=0;i<3;i++) {
				this.roles.push(getLand(this.ctx,this.img.land,3));
			}
		
			//鸟1个
			this.bird = getBird(this.ctx,this.img.bird,3,1,50,50);
			this.roles.push(this.bird);

		},
		draw: function() {
			//在每次绘制之前要判断小鸟 是否死亡
			//ctx.isPointInPath(x,y) 用来判断某一点是否在路劲内
			//判断游戏结束条件
			if(this.ctx.isPointInPath(this.bird.birdCenterX,this.bird.birdCenterY) 
				|| (this.bird.birdCenterY < 0) 
				|| (this.bird.birdCenterY > this.ctx.canvas.height-this.land.height)) {
				this.triggerBirdDeath();
			}

			//在画之前要先清除管道的路劲
			else {
				this.ctx.beginPath();
				this.roles.forEach(function(role) {
					role.draw();
					role.update();
				})
			}
		}
	};
	w.getGameScene = function(ctx,img) {
		return new GameScene(ctx,img);
	}
}(window))