var displayform=document.getElementById("displayform");//显示表单
var data=[];     // 放表单里的所有标签
function fromlabel (name,id,type,rules,success,fail) {   //工厂模式创建标签
	var o=new Object();
	o.label=name;
	o.id=id;
	o.type=type;
	o.rules=rules;
	o.success=success;
	o.fail=fail;
	o.validator=check;
	return o;     
}
function create(){  //创建表单各项
	var usernameobj=fromlabel("用户名","username","text","必填，4-16个字符","名字合法","名字不合法");
	var passobj=fromlabel("密码","pass","password","必填，9-16个字符","密码合法","密码不合法");
	var passconfirmobj=fromlabel("确认密码","passconfirm","password","必填，填写一致密码","密码确认成功","密码不一致");
	var mailobj=fromlabel("邮箱","mail","text","填写你的邮箱","邮箱格式正确","邮箱格式错误");
	data=[usernameobj,passobj,passconfirmobj,mailobj];
}
function check(str,i){    //表单验证
	switch(data[i].id){
		case 'username':return validata.lengthtest(str,4,16);
		case 'pass':return validata.lengthtest(str,9,16);
		case 'passconfirm':return validata.passconfirm(str);
		case 'mail':return validata.texttest(str,/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/);     
	}
}
function styleselect(i) {    //选择表单样式
	switch(i){
		case 1:fromstyle.down();break;
		case 2:fromstyle.side();break;
	} 
}
var fromstyle={//表单样式集
	down:function(){
		var str1="";
		for(var i=0;i<data.length;i++){
		str1+="<tr><td><lable for='"+data[i].id+"'>"+data[i].label+"</lable></td><td><input type='"+data[i].type+"' name='"+data[i].id+"' ></td></tr><tr><td></td><td><p id='"+data[i].id+"' class='displaynone'>"+data[i].rules+"</p></td></tr>";
		}
		displayform.innerHTML="<form><table>"+str1+"<tr><td></td><td><input type='submit' value='提交' id='sub' class='positio'></td></tr></table></form>";
	},
	side:function(){
		var str1="";
		for(var i=0;i<data.length;i++){
		str1+="<tr><td><lable for='"+data[i].id+"'>"+data[i].label+"</lable></td><td><input type='"+data[i].type+"' name='"+data[i].id+"' ></td><td><p id='"+data[i].id+"' class='displaynone'>"+data[i].rules+"</p></td></tr>";
		}
		displayform.innerHTML="<form><table>"+str1+"<tr><td></td><td><input type='submit' value='提交' id='sub' class='positio'></td></tr></table></form>";
	}
}


var validata={        //验证集
	texttest:function(str,reg) {     //检验邮箱、电话
		return reg.test(str);
	},
	lengthtest:function (str,min,max) {     //检验用户名、密码长度
		var num=0;
			for(var i=0;i<str.length;i++){
				if(/[\u4e00-\u9fa5]/.test(str.charAt(i))){
					num+=2;
				}
				else{
					num+=1;
				}
			}
			return num>=min&&num<=max;
	},
	passconfirm:function (str){    //确认密码
		for(var i=0;i<data.length;i++){
			if(data[i].id=="pass" && document.getElementById(data[i].id).innerHTML==data[i].success){
				var pass=document.getElementsByName(data[i].id)[0].value;
				return pass==str;
			}
		}	
		return false;	
	}
}
function init () {   //初始化函数
	create(); //表单初始化
	styleselect(2); //选择样式
	for(var i=0;i<data.length;i++){
		(function(e){ 
		var x=document.getElementsByName(data[i].id)[0];     //闭包内是对i的引用,用e存i
		x.onblur=function(){                                 //失去焦点
			var xin=document.getElementsByName(data[e].id)[0];
			var y=document.getElementById(data[e].id);
			var flag=data[e].validator(x.value.trim(),e);
			y.className="";
			if(flag){
				y.innerHTML=data[e].success;
				xin.style.borderColor="green";
				y.style.color="green";
			}
			else{
				y.innerHTML=data[e].fail;
				xin.style.borderColor="red";
				y.style.color="red";
			}};
		x.onfocus=function(){     //获得焦点
			var y=document.getElementById(data[e].id);
			y.className="";
			y.style.color="#ccc";
			y.innerHTML=data[e].rules;
				
			};
		})(i);
	}
	document.getElementById('sub').onclick=function(){     //提交表单
		for(var i=0;i<data.length;i++){
			if(document.getElementById(data[i].id).innerHTML!==data[i].success){
				alert("信息有误");
				break;
			}
		}
		if(i==data.length){
			alert("提交成功");
		}
	};
}
init();


