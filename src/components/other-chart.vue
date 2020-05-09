<template>
    <div>
        <div id="myChart" ref="myChart" style="width: 100%;height: 50rem;margin-bottom: 3.2rem;"></div>

    </div>
</template>

<script>
  import echarts from "echarts";
  import mapdata from '@/untlis/other-worldOption.js'
  export default{
      data(){
        return{
            worldlist:[]
        }
      },
      methods:{
        mapEchartsInit(){
            let myChart = this.$echarts.init(this.$refs.myChart);
            myChart.setOption(mapdata, true);
        },
        thebee(arr) {
          var len = arr.length;
          for (var i = 0; i < len-1; i++) {
            for (var j = 0; j < len - 1 - i; j++) {
                 // 相邻元素两两对比，若符合前一个比后一个大，则元素交换，大的元素交换到后面，小的元素在前面
                if (arr[j].currentConfirmedCount < arr[j + 1].currentConfirmedCount) {//if条件判定
                    var temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
          }
          return arr;//返回传入的数组
        },
          getworldcharts(){
              this.axios({
                url:"http://api.tianapi.com/txapi/ncovabroad/index",
                method: 'GET',
                params: {
                  key: '869941cd56fe09e14b255d12467651bd'
                }}).then(res=>{
                    if(res.data.code == 200){
                        // this.thebee()
                        this.worldlist=res.data.newslist
                         this.thebee(this.worldlist)
                         for (let i = 0; i < 10; i++) {
                                mapdata.dataset.source[0].push(this.worldlist[i].provinceName)
                                mapdata.dataset.source[1].push(this.worldlist[i].confirmedCount)
                                mapdata.dataset.source[2].push(this.worldlist[i].currentConfirmedCount)
                                mapdata.dataset.source[3].push(this.worldlist[i].deadCount)

                         }
                         console.log(mapdata.dataset.source[0])
                    }
                      this.mapEchartsInit()
                })

          }
      },
      created() {
        this.getworldcharts()
      }
  }
</script>

<style>
</style>
