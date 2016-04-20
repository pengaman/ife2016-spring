var data={
	"北京":["清华","北大","北航"],
	"上海":["上海交大"],
	"河北":["河北大学","河北农大"],
	};
var selectcity=document.getElementById("city");
function schoollist () {    //生成学校下拉列表
	var city=selectcity.value;
	var school=document.getElementById("school");
	var str="";
	for (var i = 0; i < data[city].length; i++) {
		str+="<option>"+data[city][i]+"</option>";
	}
	school.innerHTML=str;
}
var radio=document.getElementsByName("ifstudent");
function ifstudent () {
	for(var i=0;i<radio.length;i++){
		if(radio[i].checked){
			document.getElementById(radio[i].value).parentNode.style.display="block";
		}
		if(!radio[i].checked){
			document.getElementById(radio[i].value).parentNode.style.display="none";
		}
	}
}
function init () {
	schoollist();
	ifstudent();
	selectcity.onchange=schoollist;
	document.getElementById("row1").onclick=ifstudent;
}
init();
