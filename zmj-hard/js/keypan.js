var jiyiinputtxt;
console.log(1)
$('html').append('<div class="jianpanchapan">'+
        	'<div class="jpcpbox">'+        		    	
	        	'<ul class="cp_jpcpul1">'+
	        		'<li>1</li>'+
	        		'<li>2</li>'+
	        		'<li>3</li>'+
	        		'<li>4</li>'+
	        		'<li>5</li>'+
	        		'<li>6</li>'+
	        		'<li>7</li>'+
	        		'<li>8</li>'+
	        		'<li>9</li>'+
	        		'<li>0</li>'+
	        	'</ul>'+
	        	'<ul class="cp_jpcpul1" id="cp_qhone">'+
	        		'<li>q</li>'+
	        		'<li>w</li>'+
	        		'<li>e</li>'+
	        		'<li>r</li>'+
	        		'<li>t</li>'+
	        		'<li>y</li>'+
	        		'<li>u</li>'+
	        		'<li>i</li>'+
	        		'<li>o</li>'+
	        		'<li>p</li>'+
	        	'</ul>'+
	        	'<ul class="cp_jpcpul1" id="cp_qhtwo">'+
	        		'<li style="margin-left: 40px;">a</li>'+
	        		'<li>s</li>'+
	        		'<li>d</li>'+
	        		'<li>f</li>'+
	        		'<li>g</li>'+
	        		'<li>h</li>'+
	        		'<li>j</li>'+
	        		'<li>k</li>'+
	        		'<li>l</li>'+
	        	'</ul>'+
	        	'<ul class="cp_jpcpul1" id="cp_qhthree">'+
	        		'<li class="cp_ysone">锁定大小写</li>'+
	        		'<li>z</li>'+
	        		'<li>x</li>'+
	        		'<li>c</li>'+
	        		'<li>v</li>'+
	        		'<li>b</li>'+
	        		'<li>n</li>'+
	        		'<li>m</li>'+
	        	'</ul>'+
	        	'<ul class="cp_jpcpul1">'+
	        		'<li>_</li>'+
	        		'<li>+</li>'+
	        		'<li>-</li>'+
	        		'<li>=</li>'+
	        		'<li>/</li>'+
	        		'<li>,</li>'+
	        		'<li>.</li>'+
	        		'<li class="cp_kongge">空格</li>'+
	        		'<li class="cp_cexiao">del</li>'+
	        	'</ul>'+
        	'</div>'+
        '</div>'+
			'<style type="text/css">'+
			'*{margin: 0;padding: 0;list-style: none;}'+
			'.jianpanchapan{position: fixed;z-index: 99;bottom: 0;width: 100%;background: rgb(230,230,230);height: 340px;display: none;}'+
			'.jpcpbox{width: 960px;margin: 0 auto;padding-top: 15px;}'+
			'.jpcpbox ul li{list-style: none;}'+
			'.jpcpbox ul{overflow: hidden;}'+
			'.cp_jpcpul1 li{float: left;width: 80px;margin-right: 16px;text-align: center;border-radius: 5px;height: 48px;background: #fff;font-size: 18px;line-height: 48px;font-weight: bold;margin-bottom: 15px;}'+
			'.cp_cwone{margin-left: 40px;}'+
			'.cp_ysone{width: 120px!important;background: rgb(52,73,94)!important;color: #fff;}'+
			'.cp_kongge{width: 172px!important;}'+
			'.cp_cexiao{background: rgb(52,73,94)!important;color: #fff;}'+
		'</style>')

$(document).on('click', 'li', function() {
	if($(this)[0].className == ""){
		if(jiyiinputtxt.val()){
	   		jiyiinputtxt[0].value += $(this).text();
	   	}else{
	   		jiyiinputtxt[0].value = $(this).text();
	   	}
	}else{
		//大小写切换
		console.log($(this)[0].className)
		if($(this)[0].className == "cp_ysone"){
			console.log(1)
			var item = $(this);
				if($("#cp_qhone li")[0].innerText == "q"){
					$("#cp_qhone li").remove();
					$("#cp_qhone").append('<li>Q</li>'+
			        		'<li>W</li>'+
			        		'<li>E</li>'+
			        		'<li>R</li>'+
			        		'<li>T</li>'+
			        		'<li>Y</li>'+
			        		'<li>U</li>'+
			        		'<li>I</li>'+
			        		'<li>O</li>'+
			        		'<li>P</li>')
					$("#cp_qhtwo li").remove();
					$("#cp_qhone").append('<li style="margin-left: 40px;">A</li>'+
			        		'<li>S</li>'+
			        		'<li>D</li>'+
			        		'<li>F</li>'+
			        		'<li>G</li>'+
			        		'<li>H</li>'+
			        		'<li>J</li>'+
			        		'<li>K</li>'+
			        		'<li>L</li>')
					$("#cp_qhthree li").remove();
					$("#cp_qhone").append('<li class="cp_ysone">锁定大小写</li>'+
			        		'<li>Z</li>'+
			        		'<li>X</li>'+
			        		'<li>C</li>'+
			        		'<li>V</li>'+
			        		'<li>B</li>'+
			        		'<li>N</li>'+
			        		'<li>M</li>');	
				}else{
					$("#cp_qhone li").remove();
					$("#cp_qhone").append('<li>q</li>'+
		        		'<li>w</li>'+
		        		'<li>e</li>'+
		        		'<li>r</li>'+
		        		'<li>t</li>'+
		        		'<li>y</li>'+
		        		'<li>u</li>'+
		        		'<li>i</li>'+
		        		'<li>o</li>'+
						'<li>p</li>')
					$("#cp_qhtwo li").remove();
					$("#cp_qhone").append('<li style="margin-left: 40px;">a</li>'+
		        		'<li>s</li>'+
		        		'<li>d</li>'+
		        		'<li>f</li>'+
		        		'<li>g</li>'+
		        		'<li>h</li>'+
		        		'<li>j</li>'+
		        		'<li>k</li>'+
		        		'<li>l</li>')
					$("#cp_qhthree li").remove();
					$("#cp_qhone").append('<li class="cp_ysone">锁定大小写</li>'+
		        		'<li>z</li>'+
		        		'<li>x</li>'+
		        		'<li>c</li>'+
		        		'<li>v</li>'+
		        		'<li>b</li>'+
		        		'<li>n</li>'+
		        		'<li>m</li>')
				}																
		}
			
		//空格
		if($(this)[0].className == "cp_kongge"){
			if(jiyiinputtxt.val()){
		   		jiyiinputtxt[0].value += " ";
		   	}else{
		   		jiyiinputtxt[0].value += " ";
		   	}
		}
		//del
		if($(this)[0].className == "cp_cexiao"){
			jiyiinputtxt[0].value = jiyiinputtxt[0].value.substring(0,jiyiinputtxt[0].value.length-1)
		}
	} 	
});
$(document).on('focus', 'input', function() {
   	console.log(1)
	$(".jianpanchapan").show();
	jiyiinputtxt = $(this);
});

$(document).on('click', function(e) {
	console.log(e)
	if(e.target.localName == "html" || e.target.localName == "body"){
		$(".jianpanchapan").hide();
		return
	}
	if(!(e.target.className == "jianpanchapan" 
	|| $(e.target).parent().parent().parent()[0].className == "jianpanchapan"
	|| e.target.localName == "input" 
	||e.target.className == "cp_jpcpul1"
	|| e.target.className == "jpcpbox")){
		$(".jianpanchapan").hide();
	}
})