/**
 * Created by ibest on 2016/3/25.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var row = 1; /*记录当前表格长度*/

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var success = false;
    var aqiCity = document.getElementById("aqi-city-input");
    var aqiValue = document.getElementById("aqi-value-input");
    var isCity = aqiCity.value.replace(/\s/g, "").match(/^[\u4e00-\u9fa5]+$/) || aqiCity.value.match(/^[a-zA-Z]+$/);
    var isValue = aqiValue.value.replace(/\s/g, "").match(/^[0-9]+$/); //去空格同时校验输入合法性
    if (isCity && isValue) {
        aqiData[aqiCity.value] = aqiValue.value;
        success = true;
    } else {
        alert("城市名称不是中英文或者空气指数不是数字, 请重新输入");
    }
    aqiCity.value = "";
    aqiValue.value = ""; //reset输入框为空, 方便下次输入
    return success;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var aqiTable = document.getElementById("aqi-table");
    aqiTable.innerHTML="<tr><th>城市</th><th>空气质量</th><th>操作</th></tr>";
    for (var i in aqiData) {
        var addRow = aqiTable.insertRow(1);
        var addCity = addRow.insertCell(0);
        var addAqi = addRow.insertCell(1);
        var operation = addRow.insertCell(2);
        addCity.innerHTML = i;
        addAqi.innerHTML = aqiData[i];
        operation.innerHTML = "<button>删除</button>";
        row++; /*当前表格长度加一*/
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    if (addAqiData()){
        renderAqiList();
    }

}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
    var delBtn = document.getElementById("aqi-table");
    delBtn.addEventListener("click", function (e) {
        if (e.target && e.target.nodeName.toUpperCase() == "BUTTON") {
            var delTarget = e.target.parentNode.parentNode.firstChild.innerText;
            delete aqiData[delTarget];
            renderAqiList();
        }
    },false);
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var add_btn = document.getElementById("add-btn");
    add_btn.onclick = addBtnHandle;
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    delBtnHandle();

}

init();