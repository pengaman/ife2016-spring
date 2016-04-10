function Construct(nodein,nodedisplay){   //构造方法设置私有属性
	this.arr=[];
	this.inputname=nodein;
	this.listname=nodedisplay;
	}
Construct.prototype.render = function(stylename) { //渲染页面
	var list=this.listname;
	str="";
	for(var i in this.arr){
		str+=" <li class="+stylename+">"+this.arr[i]+"</li>";
	}
	list.innerHTML=str;
};
Construct.prototype.inlist = function(inputnum){ //进入数组
	if(inputnum==""){
		return;
	}
	for (var i = this.arr.length - 1; i >= 0; i--) {
		if(this.arr[i]==inputnum )
			return;
	}
	if (this.arr.length==10) {
		this.arr.shift();
	}
	this.arr.push(inputnum);
    this.render("stlist");
};
var list0=document.getElementById("list0");
var input1 = new Construct(document.getElementById('inputList0'),document.getElementById('list0'));
var input2 = new Construct(document.getElementById('inputList'),document.getElementById('list'));
function delegateEvent(ele,tag,eventname,listener){ //事件代理兼容
	ele["on"+eventname]=function(e){
		var e=e||window.event();
	    var target=e.srcElemrnt||e.target;
		if(target.nodeName.toLowerCase()===tag){
			listener(target);
		}
	}
}
function displayover(targetli){    //鼠标事件over
	targetli.className="blue";
	targetli.innerHTML="删除"+targetli.innerHTML;
	
}
function displayoff(targetli){    //鼠标事件out
	targetli.className="stlist";
	var newinner=targetli.innerHTML.substring(2);
	targetli.innerHTML=newinner;
}
function displaydel(targetli){    //点击事件删除
	var lis=list0.getElementsByTagName("li");
	for(var i=0;i<lis.length;i++){
		if(lis[i]==targetli){
			input1.arr.splice(i,i+1);
		}
	}
	input1.render("stlist");
}
function keyevent(event){     //tag键盘事件
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if(e.keyCode==13 || e.keyCode==32 || e.keyCode==188){ 
                  input1.inlist(input1.inputname.value.replace(/[,，、 ]+/g," ").trim());
				  input1.inputname.value="";
             }
         }
function dealwithData(){		//处理兴趣爱好字符串
	var newstr=input2.inputname.value.replace(/[\s,，、]+/g," ");
	newstr=newstr.trim();
	var newarr=newstr.split(" ");
	for (var i=0; i<newarr.length; i++) {
		input2.inlist(newarr[i]);
	}
	input2.inputname.value="";
	input2.render("splists");
}
//绑定事件
	input1.inputname.onkeyup=keyevent;
	document.getElementById('sub').onclick=dealwithData;
	delegateEvent(list0,"li","mouseover",displayover);
	delegateEvent(list0,"li","mouseout",displayoff);
	delegateEvent(list0,"li","click",displaydel);
