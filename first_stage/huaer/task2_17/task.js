/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}
var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};
function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "",
  nowGraTime: "day"
}
//产生随机颜色
function getRandomColor(){
        return '#' + (function(h){
            return new Array(7 - h.length).join("0") + h
        }
                )((Math.random() * 0x1000000 << 0).toString(16))
    }

/**
 * 渲染图表
 */
function renderChart() {
  var doc=document.getElementsByClassName("aqi-chart-wrap");
  var selectData=chartData[pageState.nowGraTime][pageState.nowSelectCity];
  var str="";
  
  for(var i in selectData){

      str+="<div class='selectflex"+pageState.nowGraTime+"' style='height:"+selectData[i]+"px;background-color:"+getRandomColor()+";"+"' title='"+i+":"+selectData[i]+"'></div>";
      str+="</div>";
    }
  doc[0].innerHTML=str;

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(types) {
  // 确定是否选项发生了变化 
var val=types.value;
if(val!=pageState.nowGraTime){
  pageState.nowGraTime=val;
  renderChart();
}
  // 设置对应数据
   // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
 var city = this.value;
    if (city !== pageState.nowSelectCity) {
        // 设置对应数据
        pageState.nowSelectCity = city;
        // 调用图表渲染函数
        renderChart();
}
}
/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var types=document.getElementsByName("gra-time");
  for (var i = 0; i < types.length; i++) {
        (function (n) {
            addEventHandler(types[n], 'click', function () {
                graTimeChange(types[n])
            })
        })(i);
    }   
    

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
   var select=document.getElementById("city-select");
   var str="";
        for(var city in aqiSourceData){
          str+="<option value='"+city+"'>"+city+"</option>";
        }
        select.innerHTML=str;
        // 给select设置事件，当选项发生变化时调用函数citySelectChange
        addEventHandler(select,"change",citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
// 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var monthDay=0,weekDay,sumAqi1,dcount1,dcount2,sumAqi2,tag=0,
      week = {},month = {}, mcount, wcount, oneMonth = {},oneWeek = {};
  for (var key in aqiSourceData) {
        dcount1=0,dcount2=0, mcount = 1, wcount = 1,sumAqi1=0,sumAqi2=0,monthDay=0;

        if(tag==0){
          pageState.nowSelectCity=key;
          tag=1;
        }
        for(var d in aqiSourceData[key]){
          var date=new Date(d);
          weekDay=date.getDay();
          dcount1+=1;
          sumAqi1+= aqiSourceData[key][d];
          if(weekDay==6){
            oneWeek["week"+wcount]=Math.round(sumAqi1/dcount1);
            wcount+=1;
            sumAqi1=0;
            dcount1=0;
          }
          
          
          if(monthDay==date.getMonth()){
            sumAqi2+= aqiSourceData[key][d];
            console.log("1");
            console.log(aqiSourceData[key][d]);
            console.log(sumAqi2);
            dcount2+=1;
          }
          else if(monthDay!=date.getMonth()){
            //console.log(sumAqi2);
            oneMonth["month"+mcount]=Math.round(sumAqi2/dcount2);

            mcount+=1;
            sumAqi2=0;
            dcount2=1;
            sumAqi2+= aqiSourceData[key][d];
            monthDay=date.getMonth();
            
          }
        
        }
        oneMonth["month"+mcount]=Math.round(sumAqi2/dcount2); 
        week[key] = oneWeek;
        month[key] = oneMonth;
        oneWeek = {};
        oneMonth = {};
    }
    // 处理好的数据存到 chartData 中
    chartData.day = aqiSourceData;
    chartData.week = week;
    chartData.month = month;
    renderChart();
 }

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
 initCitySelector();
  initAqiChartData();
}
init();
