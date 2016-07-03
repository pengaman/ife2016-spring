/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
 var city,val;
 var pre;

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function delegateEvent(element, tag, eventName) {
            element['on'+eventName]= function (e) {
                var event = e || window.event,
                    target = event.target || event.srcElement;
                if (target.tagName === tag.toUpperCase()) {
     				pre=target.parentNode.parentNode.firstChild.innerHTML;
                  
                    delBtnHandle();

            }
                }
        }
function addAqiData() {
	city=document.getElementById("aqi-city-input").value;
	val=document.getElementById("aqi-value-input").value;
	if(/[^a-zA-Z\u4E00-\u9FA5\uf900-\ufa2d]/.test(city)||/[^0-9]/.test(val))
	{
		alert("非法输入：城市名必须为中英文字符，空气质量指数必须为整数");
		return false;
	}
	else
	{
		aqiData[city]=val;
	}
	
}

/**
 * 渲染aqi-table表格
 */
 list=document.getElementById("aqi-table");
function renderAqiList() {
	
	list.innerHTML="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	for(var p in aqiData)
	{
		var node=document.createElement("tr");
		var node1=document.createElement("td");
		var node2=document.createElement("td");
		var node3=document.createElement("td");
		var btn=document.createElement("button");
		node1.innerHTML=p;
		node2.innerHTML=aqiData[p];
		btn.innerHTML="删除";
		node3.appendChild(btn);
		node.appendChild(node1);
		node.appendChild(node2);
		node.appendChild(node3);
		list.appendChild(node);
	}
	
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}
/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
  delete aqiData[pre];
  renderAqiList();
}

function init() {
	
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
 var addbtn=document.getElementById("add-btn");
 if (addbtn.attachEvent) { //低版本 IE 中，当然现在IE没有那么任性了
    addbtn.attachEvent('onclick',function () {addBtnHandle();}
); 


}
 else {
//firefox googleChorme
  addbtn.addEventListener('click', function () {addBtnHandle();
 
 });}

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  delegateEvent(list, "button", "click");
}

init();