export default{
    legend: {},
  title : {
      text: '世界各国现有确诊Top10',
      subtext: '',
      x:'center',
      bottom:'10%'
  },
    tooltip: {},
    dataset: {
        source: [
            ['国家',],
            ['累计确诊',],
            ['现有确诊',],
            ['死亡数',]
        ]
    },
    xAxis: [
        {type: 'category', gridIndex: 0},
    ],
    yAxis: [
        {gridIndex: 0},
    ],
    grid: [
        {bottom: '20%'}
    ],
    series: [
        // These series are in the first grid.
        {type: 'bar', seriesLayoutBy: 'row'},
        {type: 'bar', seriesLayoutBy: 'row'},
        {type: 'bar', seriesLayoutBy: 'row'},
        // These series are in the second grid.
    ]
};
