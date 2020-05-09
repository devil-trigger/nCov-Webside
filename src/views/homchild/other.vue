<template>
  <div>
    <div class="world">
      <b-jumbotron bg-variant="info" text-variant="white" border-variant="dark">
        <template v-slot:header>
          疫情信息
        </template>
        <template v-slot:lead>
          7:00-10:00为更新高峰且数据更新有稍许延迟，数据若滞后敬请谅解
        </template>
        <hr class="my-4" />
        <p></p>
        <!-- ------------------Aplayer------ -->
        <ncovplayer></ncovplayer>
        <!-- ----------------------------0-- -->
      </b-jumbotron>
<!-- --------------------------辟谣组件----------------------- -->
      <rumour></rumour>
<!-- ------------------------------------------------- -->
       <div class="table-style">
        <b-table :items="otherdatas" :busy="isBusy" caption-top responsive fixed info>
             <template v-slot:table-caption>国内疫情实时数据统计</template>
        </b-table>
       </div>
       <div class="table-style">
        <b-table :items="foredatas" :busy="isBusy" caption-top responsive fixed info>
             <template v-slot:table-caption>国外疫情实时数据统计</template>
        </b-table>
       </div>
       <div class="table-style">
        <b-table :items="worldatas" :busy="isBusy" caption-top responsive fixed info>
             <template v-slot:table-caption>全球疫情实时数据统计</template>
        </b-table>
       </div>

<!-- ------------------------------------------------- -->
      <div class="table-style">
        <b-table id="table-transition-example" :items="countryitems" :busy="isBusy" hover small caption-top responsive :fields="fields" >
          <template v-slot:table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>

          </template>
          <template v-slot:table-caption>国内疫情实时详细数据</template>
        </b-table>
      </div>
      <div id="myChart" ref="myChart" style="width: 100%;height: 50rem;margin-bottom: 3.2rem;"></div>
      <worldecharts></worldecharts>

    </div>
  </div>
</template>

<script>
  import echarts from "echarts";
  import mapdata from '@/untlis/other-Option.js'

  import worldecharts from '@/components/other-chart.vue'

  import rumour from '@/components/rumour.vue'

export default{
  data(){
      return{
          countryitems:[
            [
              {
                地区: '黑龙江',
                疑似: 89,
                现存:234,
                累计:234,
                治愈:32,
                死亡:32,
                重症:32,
                _rowVariant: 'danger'
              }
            ],

          ],
          fields:[
                      { key: '疫情地区', sortable: false },
                      { key: '现有', sortable: true },
                      { key: '累计', sortable: true },
                      { key: '疑似', sortable: true },
                      { key: '治愈', sortable: true },
                      { key: '死亡', sortable: true }
          ],
          isBusy: true,
          othersource:[["疫情地区Top5"],["疑似"],["累计确诊"],["痊愈数"],["死亡数"]],
          otherdatas:[
            { 累计确诊: 40, 现存确诊: 333, 累计死亡: 23, 累计痊愈: 23,较昨天新增: 2345,境外输入:22,无症状:55}
          ],
          foredatas:[
            {累计确诊: 40, 现存确诊: 333, 累计死亡: 23, 累计痊愈: 23,较昨天新增: 2345}
          ],
          worldatas:[
            {累计确诊: 40, 现存确诊: 333, 累计死亡: 23, 累计痊愈: 23,较昨天新增: 2345}
          ]
      }
  },
  methods:{
      mapEchartsInit(){
          let myChart = this.$echarts.init(this.$refs.myChart);
          myChart.setOption(mapdata, true);
      },
      async getcontinentdata(){
          this.axios({
            url:"http://api.tianapi.com/txapi/ncovcity/index",
            method: 'GET',
            params: {
              key: '7e83a892f6a95b46d88ba6c7ffc242b1'
            }}).then(res=>{
                if(res.data.code == 200){
                  this.isBusy = !this.isBusy
                  let Tabledata=[]
                    for(let i in res.data.newslist){
                        let CountrtTableObj = {};
                        CountrtTableObj.疫情地区=res.data.newslist[i].provinceName
                        CountrtTableObj.现有=res.data.newslist[i].currentConfirmedCount
                        CountrtTableObj.累计=res.data.newslist[i].confirmedCount
                        CountrtTableObj.疑似=res.data.newslist[i].suspectedCount
                        CountrtTableObj.治愈=res.data.newslist[i].curedCount
                        CountrtTableObj.死亡=res.data.newslist[i].deadCount
                        Tabledata.push(CountrtTableObj)
                    }
                    this.countryitems=Tabledata
                }
               // -----------------------柱状图数据-------------
                for (let i = 0; i < mapdata.dataset.source.length ; i++) {
                  this.othersource[0].push(this.countryitems[i].疫情地区);
                  this.othersource[1].push(this.countryitems[i].疑似)
                  this.othersource[2].push(this.countryitems[i].累计)
                  this.othersource[3].push(this.countryitems[i].治愈)
                  this.othersource[4].push(this.countryitems[i].死亡)
                }
                 // console.log(this.othersource)
                mapdata.dataset.source=this.othersource
                // ------------------------
                this.mapEchartsInit();
            })

      },
      getcountrydatalists(){
          this.axios({
            url:"http://api.tianapi.com/txapi/ncov/index",
            method: 'GET',
            params: {
              key: '869941cd56fe09e14b255d12467651bd'
            }}).then(res=>{
              // console.log(res.data.newslist[0].desc.confirmedCount)
              this.otherdatas[0].累计确诊=res.data.newslist[0].desc.confirmedCount
              this.otherdatas[0].现存确诊=res.data.newslist[0].desc.currentConfirmedCount
              this.otherdatas[0].累计死亡=res.data.newslist[0].desc.deadCount
              this.otherdatas[0].累计痊愈=res.data.newslist[0].desc.curedCount
              this.otherdatas[0].较昨天新增=res.data.newslist[0].desc.deadIncr
              this.otherdatas[0].境外输入=res.data.newslist[0].desc.suspectedCount
              this.otherdatas[0].无症状=res.data.newslist[0].desc.seriousCount

              // -------------------------------------------------------------------------
              this.foredatas[0].累计确诊=res.data.newslist[0].desc.foreignStatistics.confirmedCount
              this.foredatas[0].现存确诊=res.data.newslist[0].desc.foreignStatistics.currentConfirmedCount
              this.foredatas[0].累计死亡=res.data.newslist[0].desc.foreignStatistics.deadCount
              this.foredatas[0].累计痊愈=res.data.newslist[0].desc.foreignStatistics.curedCount
              this.foredatas[0].较昨天新增=res.data.newslist[0].desc.foreignStatistics.deadIncr
              // -------------------------------------------------------------------------
              this.worldatas[0].累计确诊=res.data.newslist[0].desc.globalStatistics.confirmedCount
              this.worldatas[0].现存确诊=res.data.newslist[0].desc.globalStatistics.currentConfirmedCount
              this.worldatas[0].累计死亡=res.data.newslist[0].desc.globalStatistics.deadCount
              this.worldatas[0].累计痊愈=res.data.newslist[0].desc.globalStatistics.curedCount
              this.worldatas[0].较昨天新增=res.data.newslist[0].desc.globalStatistics.deadIncr

            })
      }
},
created() {

},
  mounted(){
this.getcontinentdata()
this.getcountrydatalists()
},
components:{
  worldecharts,
  rumour
}
}
</script>

<style scoped="scoped">
.world {
  width: 95%;
  margin: 0 auto;
  margin-top: 1rem;
  height:  calc(100% - 3.2rem);
}
/* .table-style{
  width: 70rem;
  margin: 0 auto;
} */

</style>
