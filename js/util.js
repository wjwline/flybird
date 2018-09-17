(function(w) {
	function loadImg(imgObj,callBack) {
		//定义一个存放图片的对象
		var img = {};
		//定义一个存放图片数量的变量
		var imgNum = 0;
		//定义一个存放已加载的图片数量的变量
		var haveLoadNum = 0;
		//使用for in 循环遍历imgObj对象
		for(var key in imgObj) {
			//统计图片的数量
			imgNum++;
			//定义一个临时图片
			var tempImg = new Image();
			tempImg.onload = function() {
				//统计已加载图片的数量
				haveLoadNum++;
				//判断当已加载图片的数量大于等于图片数量时就可以调用回调函数
				//表示图片已经全部加载完 并把加载完的所有图片传出去
				if(haveLoadNum >= imgNum) {
					callBack(img)
				}
			}
			tempImg.src = imgObj[key];
			img[key] = tempImg;
		}
	}

	function extend(o1,o2) {
		for(var key in o2) {
			if(o2.hasOwnProperty(key)) {
				o1[key] = o2[key];
			}
		}
	}

	w.loadImg = loadImg;
	w.extend = extend;
}(window));
