   
	function check (){
		var result=document.getElementById("result");
		var user=document.getElementById("username");
		var val=user.value;
		val=val.trim();
		var num=0;
		for(var i=0;i<val.length;i++){
			if(/[\u4e00-\u9fa5]/.test(val.charAt(i))){
				num+=2;
			}
			else{
				num+=1;
			}
		}
		if(num==0){
			result.innerHTML="必填，姓名不能为空";
			result.style.color="red";
			user.style.borderColor="red";
		}
		else if(num< 4 || num > 16){
			result.innerHTML="名字不合法,长度4-16个字符";
			
			user.style.borderColor="red";
			result.style.color="red";
		}
		else{
			result.innerHTML="名字合法";
			user.style.borderColor="green";
			result.style.color="green";
		}
		return false;
	}
var sub=document.getElementById("sub");
sub.onclick=check;
	
	