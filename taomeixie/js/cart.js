

$(function(){
	$(".spe5,.tList3").mouseenter(function(){
		$(".spe5").css("background","white");  
		$(".spe3").css({"transition":"all 0.5s ease","transform":"rotate(180deg)"}); 
		$(".tList3").css("display","block");
	})
	$(".spe5,.tList3").mouseleave(function(){
		$(".spe5").css("background","#f6f6f6");  
		$(".spe3").css({"transition":"all 0.5s ease","transform":"rotate(0deg)"}); 
		$(".tList3").css("display","none");
	}) 
	$(".tList3 a").mouseenter(function(){
		$(this).css("background","#e5e5e5");  
	})
	$(".tList3 a").mouseleave(function(){
		$(this).css("background","white");  
	})
	//顶部吸顶
	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop();
		if(scrollTop>0){
			$("#top1_wrap").css({"position":"fixed","top":0}); 
		}
		else{
			$("#top1_wrap").css({"position":"static"});  
		}
	}) 
	
	
	//全部商品分类
	$(".top_all").mouseenter(function(){
		$(".t_nav>ul").stop().show(300);
	})
	$(".top_all").mouseleave(function(){
		$(".t_nav>ul").stop().hide(300); 
	})
	$(".t_nav>ul>li").mouseenter(function(){
		$(".dis").hide();
		$(".dis").eq($(this).index()).stop().show(300);
	})
	$(".t_nav>ul>li").mouseleave(function(){
		$(".dis").hide(); 
	})
	$(".dis").mouseenter(function(){
		$(this).show();
	})
	$(".dis").mouseleave(function(){
		$(this).hide();
	})  
	
	//top_b tList5
	$(".tList5 li").mouseenter(function(){
		$(this).addClass("active").siblings().removeClass("active");
	})
	
	//gift
	$(".gift li").mouseenter(function(){
		$(this).css("background","#F0F0F0").siblings().css("background","white"); 
	})
	$(".gift li").mouseleave(function(){
		$(this).css("background","white");  
	})
	
	//回到顶部
	$("#toTop").click(function(){
		//console.log($(window).scrollTop());
		if($(window).scrollTop()>0){
			$("html,body").stop().animate({scrollTop:0},500);    
		} 
	})
	
	
	//加入商品
	refresh();
	function refresh(){
		if($.cookie("cart")){
			$(".none").hide();
			$(".cart_t").show();
			//$("table").empty();
			$("table").show(); 
			$(".cart_b").show();
			var arr = JSON.parse($.cookie("cart"));
			console.log(arr); 
			//有多少件商品
			var many = 0;
			for(var i=0; i<arr.length; i++){
				many += parseInt(arr[i].nums); 
			} 
			console.log(many);
			$(".many").html(many); 
			
			var sum = 0;
			for(var i=0; i<arr.length; i++){
				var obj = arr[i];
				if (obj.checked) {
					$("<tr class='shangpin'><td><input class='checked' type='checkbox' checked='checked' /></td><td class='text_left'><img src=../"+obj.img+"/><span>货号："+obj.num+"<a href='javascript:;'>"+obj.name+"</a></span></td><td class='font-fm'>¥ "+obj.price+"</td><td class='count'><span class='minus active'>-</span><input type='text' value="+obj.nums+" /><span class='add'>+</span></td><td class='price'>¥"+obj.price*obj.nums+"</td><td><a href='javascript:;' class='dele'>删除</a></td> </tr>").appendTo("table");
				}else {
					$("<tr class='shangpin'><td><input class='checked' type='checkbox' /></td><td class='text_left'><img src=../"+obj.img+"/><span>货号："+obj.num+"<a href='javascript:;'>"+obj.name+"</a></span></td><td class='font-fm'>¥ "+obj.price+"</td><td class='count'><span class='minus active'>-</span><input type='text' value="+obj.nums+" /><span class='add'>+</span></td><td class='price'>¥"+obj.price*obj.nums+"</td><td><a href='javascript:;' class='dele'>删除</a></td> </tr>").appendTo("table");
				} 
				if (obj.checked) {
					sum += obj.price * obj.nums;
				}
			} 
			$(".sum").html(sum);
		}
		else{
			$(".none").show();
			$(".cart_t").hide();
			$("table").hide();
			$(".cart_b").hide();
		} 
	}   
	
	//删除
	$("table").on("click", ".dele", function(){
		var index = $(this).index(".dele");
		console.log(index);
		
		//获取cookie，删掉第index个商品
		var arr3 = JSON.parse($.cookie("cart"));
		arr3.splice(index, 1); //删除数组arr的第index个元素
		console.log(arr3);
		if(arr3.length!=0){	
			//console.log(11);
			$.cookie("cart", JSON.stringify(arr3), {expires:30, path:"/"});
		}else{
			//console.log(22);
			$.cookie("cart", JSON.stringify(arr3), {expires:-1, path:"/"}); 
		}
		//isAllChecked(); //判断是否全部选择了商品
		$(".shangpin").empty(); 
		refresh(); //刷新页面     
	})
	
	//加减按钮
	//+
	$("table").on("click",".add",function(){
		var index = $(this).index(".add");
		var arr3 = JSON.parse($.cookie("cart"));
		arr3[index].nums++;
		$.cookie("cart", JSON.stringify(arr3), {expires:30, path:"/"});
		$(".shangpin").empty();  
		refresh();
	})
	//- 
	$("table").on("click",".minus",function(){
		var index = $(this).index(".minus");
		console.log(index); 
		var arr3 = JSON.parse($.cookie("cart"));
		if(parseInt(arr3[index].nums)>1){
			arr3[index].nums--;  
		}
		else{
			arr3[index].nums = 1; 
		}
		$.cookie("cart", JSON.stringify(arr3), {expires:30, path:"/"});
		$(".shangpin").empty();  
		refresh();
	})
	
	//勾选
	$("table").on("click",".checked",function(){
		var index = $(this).index(".checked");
		//console.log(index); 
		var arr3 = JSON.parse($.cookie("cart"));
		arr3[index].checked = !arr3[index].checked;
		$.cookie("cart", JSON.stringify(arr3), {expires:30, path:"/"});
		isAllChecked();
		$(".shangpin").empty();  
		refresh(); 
	})
	//判断是否全选了
	isAllChecked();
	function isAllChecked(){
		//console.log(33);
		var arr = JSON.parse($.cookie("cart"));
		
		var sum = 0;
		for (var i=0; i<arr.length; i++) {
			sum += arr[i].checked;
		}
		
		//如果商品全部选中了
		if (sum == arr.length) {
			$(".allCheck").prop("checked", true); //全选
			$(".firstCheck").prop("checked",true);
		}
		else {
			$(".allCheck").prop("checked", false); //不全选
			$(".firstCheck").prop("checked",false); 
		}
		
	}  
	
	//全选
	$(".allCheck").click(function(){
		var arr = JSON.parse($.cookie("cart"));
		console.log($(".allCheck").prop("checked")); 
		
		for (var i=0; i<arr.length; i++) {
			if ( $(".allCheck").prop("checked") ){ 
				arr[i].checked = true;
				$(".firstCheck").prop("checked",true);
			}
			else {
				arr[i].checked = false;
				$(".firstCheck").prop("checked",false); 
			}
		}
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
		$(".shangpin").empty();
		refresh();   
	}) 
	//table第一行的选择框的勾选
	$(".firstCheck").click(function(){
		var arr = JSON.parse($.cookie("cart"));
		console.log($(".allCheck").prop("checked")); 
		
		for (var i=0; i<arr.length; i++) {
			if ( $(".firstCheck").prop("checked") ){ 
				arr[i].checked = true;
				$(".allCheck").prop("checked",true);
			}
			else {
				arr[i].checked = false;
				$(".allCheck").prop("checked",false); 
			}
		}
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
		$(".shangpin").empty();  
		refresh();   
	}) 
	
	//删除选中
	$("#delSelect").click(function(){
		var arr = JSON.parse($.cookie("cart"));
		
		/*
		for (var i=0; i<arr.length; i++) {
			if (arr[i].checked) {
				arr.splice(i, 1);
				i--;
			}
		}
		*/
		
		var newArr = [];
		for (var i=0; i<arr.length; i++) {
			if (!arr[i].checked) {
				newArr.push(arr[i]);
			}
		}
		if(newArr.length != 0){
			$.cookie("cart", JSON.stringify(newArr), {expires:30, path:"/"});
		}
		else{
			$.cookie("cart", JSON.stringify(newArr), {expires:-1, path:"/"}); 
		}
		$(".shangpin").empty(); 
		refresh();
	})
	
	$(".toIndex").click(function(){
		location.href = "../index.html"; 
	})
})
				