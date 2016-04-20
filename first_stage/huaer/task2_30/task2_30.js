   var flagname,flagpass,flagpassfirm,flagmail,flagphone;
	function checkname (){ //检查名字
		var result=document.getElementById("resultuser");
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
			flagname=false;
		}
		else if(num< 4 || num > 16){
			result.innerHTML="名字不合法";
			
			user.style.borderColor="red";
			result.style.color="red";
			flagname=false;
		}
		else{
			result.innerHTML="名字合法";
			user.style.borderColor="green";
			result.style.color="green";
			flagname=true;
		}
		result.parentNode.parentNode.className="";
	}
	function checkpass (){    //检查密码
		var result=document.getElementById("resultpass");
		var pass=document.getElementById("pass");
		var val=pass.value;
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
			result.innerHTML="必填，密码不能为空";
			result.style.color="red";
			pass.style.borderColor="red";
			flagpass=false;
		}
		else if(num< 9 || num > 16){
			result.innerHTML="密码不合法";
			flagpass=false;
			pass.style.borderColor="red";
			result.style.color="red";
		}
		else{
			result.innerHTML="密码设置成功";
			pass.style.borderColor="green";
			result.style.color="green";
			flagpass=true;
		}
		result.parentNode.parentNode.className="";
	}
	function checkpassfirm() { //确认密码
		var result=document.getElementById("resultpassfirm");
		var passfirm=document.getElementById("passfirm");
		var pass=document.getElementById("pass");
		var val1=pass.value;
		var val2=passfirm.value;
		if(val1==val2){
			result.innerHTML="密码确认成功";
			passfirm.style.borderColor="green";
			result.style.color="green";
			flagpassfirm=true;
		}
		else{
			result.innerHTML="请正确输入密码";
			passfirm.style.borderColor="red";
			result.style.color="red";
			flagpassfirm=false;
		}
		result.parentNode.parentNode.className="";
	}
	function checkmail () {      //确认邮箱
		var result=document.getElementById("resultmail");
		var mail=document.getElementById("mail");
		var val=mail.value;
		val=val.trim();
		if( /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(val)){
			result.innerHTML="邮箱格式正确";
			mail.style.borderColor="green";
			result.style.color="green";
			flagmail=true;
		}
		else{
			result.innerHTML="邮箱格式错误";
			mail.style.borderColor="red";
			result.style.color="red";
			flagmail=false;
		}
		result.parentNode.parentNode.className="";
	}
	function checkphone () {    //检验手机号
		var result=document.getElementById("resultphone");
		var phone=document.getElementById("phone");
		var val=phone.value;
		val=val.trim();
		if(/^1([0-9]{10})$/.test(val)){
			result.innerHTML="手机格式正确";
			phone.style.borderColor="green";
			result.style.color="green";
			flagphone=true;
		}
		else{
			result.innerHTML="手机格式错误";
			phone.style.borderColor="red";
			result.style.color="red";
			flagphone=false;
		}
		result.parentNode.parentNode.className="";
	}
	function sub() {   //提交
		if (flagmail && flagphone && flagpassfirm && flagpass &&flagname) {
			alert("提交成功！");
		}
		else{
			alert("输入有误");
		}
	}
document.getElementById("username").onblur=checkname;
document.getElementById("pass").onblur=checkpass;
document.getElementById("passfirm").onblur=checkpassfirm;
document.getElementById("mail").onblur=checkmail;
document.getElementById("phone").onblur=checkphone;
document.getElementById("sub").onclick=sub;	
	