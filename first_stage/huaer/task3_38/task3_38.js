var tabletool=(function(){
	function init(opt){
		var instance=new table(opt);
		return instance;
	}
	function table(opt){
		this.opt=opt;
		this.init();
		this.addevent();
	}
	table.prototype={
		init:function(){
			var innerhtml=document.getElementsByTagName("body")[0].innerHTML;
			var str="<table id='"+this.opt.id+"'><tr id='th'>";
			for(var i=0;i<this.opt.th.length;i++){
				if(this.opt.ifspan[i]==0){
					str+="<th>"+this.opt.th[i]+"</th>";
				}else{
					str+="<th>"+this.opt.th[i]+"<span><img src='sort.png'></span>"+"</th>";
				}
			}
			str+="</tr>";
			for(var i=0;i<this.opt.td.length;i++){
				str+="<tr>";
				for(var j=0;j<this.opt.td[i].length;j++){
					str+="<td>"+this.opt.td[i][j]+"</td>";
				}
				str+="</tr>";
			}
			str+="</table>";
			document.getElementsByTagName("body")[0].innerHTML=str+innerhtml;
		},
		addevent:function(){
			var that=this;
			var flag=0;
			document.getElementById("th").onclick=function(e){
				
				var e=e||window.event();
			    var target=e.srcElemrnt||e.target;
				if(target.nodeName==="IMG"){
					for(var i=0;i<that.opt.ifspan.length;i++){
						if(that.opt.ifspan[i]==0)
							continue;
						if(this.childNodes[i].getElementsByTagName('span')[0].getElementsByTagName('img')[0]===target){
							
							if(flag==0){
								that.opt.td.sort(function(a,b){return b[i]-a[i]});
								flag=1;
							}else{
								that.opt.td.sort(function(a,b){return a[i]-b[i]});
								flag=0;
							}				
						}
					}
				}
			that.render();
			}
		},
		render:function(){
			var tbody=document.getElementById(this.opt.id).getElementsByTagName('tbody')[0];
			for (var i = tbody.childNodes.length - 1; i >= 1; i--) {
				tbody.removeChild(tbody.childNodes[i]);
			}	
			var str="";
			for(var i=0;i<this.opt.td.length;i++){
				var node=document.createElement("tr");
				for(var j=0;j<this.opt.td[i].length;j++){
					str+="<td>"+this.opt.td[i][j]+"</td>";
				}
				node.innerHTML=str;
				str="";
				tbody.appendChild(node);
			}

	}
};
	return {
		init:init
	}
}
)();
var table1={
	id:"table1",
	th:["姓名","数学","语文","英语","总分"],
	td:[["你","0","49","74","113"],
	["我","100","100","0","200"],
	["他","89","100","90","179"]],
	ifspan:[0,1,1,1,1]
}
var newtable=tabletool.init(table1);
