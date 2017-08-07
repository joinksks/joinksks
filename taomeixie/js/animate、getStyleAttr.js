

//获取样式属性值  ********注意该值包含单位,为非行间样式
function getStyleAttr(obj,attr){
	if(window.getComputedStyle){
		return window.getComputedStyle(obj,null)[attr];  //支持IE9+及非IE
	}else{
		return obj.currentStyle[attr];   //支持IE8-
	}
}

//运动函数封装
//JOSN是个对象包含样式键值对
function animate(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var oStop = true;  //表示所有属性都已运动到目标值
		//遍历JOSN对象  实现多属性运动  遍历对象用for-in
		for(var attr in json){
			
			var iTarget = json[attr]; //找到目标值
			
			//获取当前属性值
			//判断attr是否是透明度
			if(attr == "opacity"){
				var current = Math.round(getStyleAttr(obj,attr)*100);
			}else{
				var current = Math.round(parseFloat(getStyleAttr(obj,attr)));
			}
			
			//运动速度
			if(attr == "opacity"){
				iTarget = iTarget*100;
				var speed = (iTarget-current)/9>0 ? Math.ceil((iTarget-current)/9):Math.floor((iTarget-current)/9);
			}else{
				var speed = (iTarget-current)/9>0 ? Math.ceil((iTarget-current)/9):Math.floor((iTarget-current)/9);
			}			
			
			//判断所有属性是否都到达目标值  表示只要有一个属性没到达目标值 就使oStop = false;
			if(current != iTarget){
				oStop = false;
			}
			
			//运动
			//判断attr是否是透明度
			if(attr == "opacity"){
				obj.style[attr] = (current + speed)/100;
				obj.style.filter = "alpha(opacity="+ (current+speed) +")";
			}else{
				obj.style[attr] = current + speed + "px";
			}
			
		}
		//for-in循环结束后判断oStop值
		if(oStop){
			//进入if说明所有属性都到达目标值 **且current == iTarget
			
			//判断是否有参数函数
			if(fn){
				fn();  //回调函数
			}
		}
		
		
		
	},30)
}


//随机16进制颜色
function randomColor(){
	var arr = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
	var str = "#";
	for(var i=0; i<6; i++){
		str += arr[parseInt(Math.random()*16)];
	}
	return str; 
}




