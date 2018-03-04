
$(function () {


  //1. 准备dom
  var myChart = echarts.init(document.querySelector(".charts_1"));
  var myChart2 = echarts.init(document.querySelector(".charts_2"));

  //2. 准备数据
  var option = {
    title: {
      text: '2017年注册人数'
    },
    tooltip: {},
    legend: {
      data:['人数']
    },
    xAxis: {
      data: ["1月","2月","3月","4月","5月","6月"]
    },
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',
      data: [100, 200, 333, 600, 400, 244]
    }]
  };

  var option2 = {
    title : {
      text: '热门品牌销售',
      subtext: '2018年3月',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克','阿迪王','adidas','新百伦','李宁']
    },
    series : [
      {
        name: '访问来源',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
          {value:335, name:'耐克'},
          {value:310, name:'阿迪王'},
          {value:234, name:'adidas'},
          {value:135, name:'新百伦'},
          {value:1548, name:'李宁'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  //显示数据
  myChart.setOption(option);
  myChart2.setOption(option2);

});