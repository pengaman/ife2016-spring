var listarr=[];
//处理输入的数据
function dealwithData (inputstr) {
	// body...
	var newstr=inputstr.replace(/[\s,，、]+/g," ");
	var newarr=newstr.split(" ");
	return newarr;
}
//检查输入
function checkInput(newarr,tag){
	if(newarr[0]=="")
		return;
	var reg=/[^0-9a-zA-Z\u4E00-\u9FA5\uf900-\ufa2d]/
	for (var i = 0; i <newarr.length; i++) {
		console.log(newarr[i]);
		if(reg.test(newarr[i].toString())){
			continue;
		}
		if(tag==0)
		listarr.unshift(newarr[i]);
	    else
	    listarr.push(newarr[i]);
	}
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
	var newarr=dealwithData(inputnum);
	checkInput(newarr,0);
    render();
	}

// 右侧入
function rightIn(){
	var inputnum=document.getElementById("inputList").value;
	var newarr=dealwithData(inputnum);
	checkInput(newarr,1);
    render();
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
function askword () {
	// body...
	var lists=document.getElementById("list").getElementsByTagName("li");
	var word=document.getElementById("askinput").value;
	if(word=="")
		return;
	for(var i=0;i<listarr.length;i++){
		if(listarr[i].indexOf(word)!=-1){
         	lists[i].className='splists';
		}
		else{
			lists[i].className='stlist';
		}

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
var sub5=document.getElementById("askword");
function init(){
	addEventHandler(sub1, "click", leftIn);
	addEventHandler(sub2, "click", rightIn);
	addEventHandler(sub3, "click", leftOut);
	addEventHandler(sub4, "click", rightOut);
	addEventHandler(sub5,"click",askword)
}
init();