(function(w) {
	function OverScene(ctx) {
		this.ctx = ctx;
	}
	OverScene.prototype.draw = function() {
		//为了防止对全局状态产生影响 save restore
		this.ctx.save();
		this.ctx.fillStyle = "rgba(100,100,100,0.7)";
		this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
		this.ctx.font = "40px 微软雅黑";
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.ctx.fillStyle = "red";
		this.ctx.fillText("GAME OVER",this.ctx.canvas.width/2,this.ctx.canvas.height/2)
		this.ctx.restore();
	}
	w.getOverScene = function(ctx) {
		return new OverScene(ctx);
	}
}(window))