var listarr=[];
//随机生成数据
function createDate(){
	listarr=[];
	for(var i=0;i<60;i++){
		listarr.push(Math.floor(Math.ceil(Math.random()*10)*9+Math.random()*10));
	}
	render();
}
//排序
function selectSort(){
	var min,temp,i=0,j;
	function ss(){
		if(i<listarr.length){
			min=i;
			for(j=i+1;j<listarr.length;j++){
				if(listarr[min]>listarr[j]){
					min=j;
				}
			}

			if(min!=j){
				temp=listarr[i];
				listarr[i]=listarr[min];
				listarr[min]=temp;
			}
			i+=1;
			render();
	    }
	    else{
	    	clearInterval(ins);
	    }
	    
	}
	var ins=setInterval(ss, 300);

}
//检查数字,检查队列长度
function checkInput(inputnum){
	if(listarr.length<60){
		if(/[^0-9]/.test(inputnum) ||inputnum=="" || inputnum > 100 || inputnum < 10){
			alert("请输入10-100的数字");
			return false;
		}
		else
			return true;
	}
	else{
		alert("队列已满，请删除不必要的数据");
	}
}
//根据数值设置颜色
function setColor(lis){
	if(lis>=80){
		return "green";
	}
	else if(lis>=60){
		return "blue";
	}
	else if(lis>=40){
		return "yellow";
	}
	else if(lis>=20){
		return "red";
	}
	else{
		return "#ccc";
	}
}
//渲染队列
function render(){
	var list=document.getElementById("list");
	str="";
	for(var i in listarr){
		var height=listarr[i]*2;
		str+=" <li class='stlist' style='height:"+height+"px;background-color:"+setColor(listarr[i])+";' title='"+listarr[i]+"'>"+"</li> ";
	}
	list.innerHTML=str;
}
//左侧入
function leftIn(){
	var inputnum=document.getElementById("inputList").value;
	inputnum=inputnum.replace(/\s*/g,'');
	if(checkInput(inputnum)){
		listarr.unshift(inputnum);
		render();
	}
}
// 右侧入
function rightIn(){
	var inputnum=document.getElementById("inputList").value;
	inputnum=inputnum.replace(/\s*/g,'');
	if(checkInput(inputnum)){
		listarr.push(inputnum);
		render();
	}
}
//左侧出
function leftOut(){
	if(listarr.length==0){
		alert("队列空了");
	}
	else{
		alert(listarr.shift());
		render();
	}
}
//右侧出
function rightOut(){
	if(listarr.length==0){
		alert("队列空了");
	}
	else{
		alert(listarr.pop());
		render();
	}	
}
function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}
var sub0=document.getElementById("createD");
var sub1=document.getElementById("leftInput");
var sub2=document.getElementById("rightInput");
var sub3=document.getElementById("leftOutput");
var sub4=document.getElementById("rightOutput");
var sub5=document.getElementById("selectSort");
function init(){
	addEventHandler(sub0, "click", createDate);
	addEventHandler(sub1, "click", leftIn);
	addEventHandler(sub2, "click", rightIn);
	addEventHandler(sub3, "click", leftOut);
	addEventHandler(sub4, "click", rightOut);
	addEventHandler(sub5, "click", selectSort);
}
init();