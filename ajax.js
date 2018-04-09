
ajax({
	method:'get',
	data:{
		"name":"lee",
		"age":18
	},
	async:true,
	success:function(data){
		console.log(data);
	},
	url:'readme.txt'
})
function parse(data){
	var result=[];
	for(var i in data){
		result.push(encodeURIComponent(i)+'='+encodeURIComponent(data[i]));
	}
	return result.join('&');
}
function ajax(obj){
	var xhr=new XMLHttpRequest();
	obj.url=obj.url+'?rand='+Math.random();
	obj.data=parse(obj.data);
	if(obj.method=='get'){
		obj.url+=obj.url.indexOf('?')==-1?'?'+obj.data:'&'+obj.data;
	}
	if(obj.async){
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4){
				callback();
			}
		}
	}
	xhr.open(obj.method,obj.url,obj.async);
	if(obj.method=='post'){
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xhr.send(obj.data);
	}else{
		xhr.send(null);
	}
	if(obj.async==false){
		callback()
	}
	function callback(){
		if(xhr.status==200){
			obj.success(xhr.responseText);
		}else{
			console.log('获取失败了')
		}
	}
}