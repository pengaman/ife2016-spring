var listarr=[];

//检查输入是否是数字
function checkInput(inputnum){
	if(/[^0-9]/.test(inputnum) ||inputnum==""){
		alert("请输入数字");
		return false;
	}
	else
		return true;
}
//渲染队列
function render(){
	var list=document.getElementById("list");
	str="";
	for(var i in listarr){
		str+=" <li class='stlist'>"+listarr[i]+"</li>";
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

var sub1=document.getElementById("leftInput");
var sub2=document.getElementById("rightInput");
var sub3=document.getElementById("leftOutput");
var sub4=document.getElementById("rightOutput");
function init(){
	addEventHandler(sub1, "click", leftIn);
	addEventHandler(sub2, "click", rightIn);
	addEventHandler(sub3, "click", leftOut);
	addEventHandler(sub4, "click", rightOut);
}
init();