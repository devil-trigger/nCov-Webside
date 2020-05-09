<template>
  <div>
           <b-button v-b-toggle.sidebar-right size="lg" v-b-tooltip.hover title="点击打开侧边栏">实时  辟谣</b-button>

           <b-sidebar id="sidebar-right" title="不传谣,不信谣" right shadow width="15rem">
             <div class="px-3 py-2">
                <b-card class="rumourstyle" :title="item.title" :img-src="item.imgsrc" img-alt="Image" img-top v-for="(item,index) in rumourlist" :key="index">
                  <b-card-text>
                    {{item.desc}}
                    <h2>{{item.explain}}!</h2>
                  </b-card-text>
                  <template v-slot:footer>
                    <small class="text-muted">{{item.author}}发布于{{item.date}}</small>
                  </template>
                </b-card>
                <b-img src="https://cdn.jsdelivr.net/gh/devil-trigger/sdn/ncov/7.jpg" fluid thumbnail style="border-radius: 22px;"></b-img>
             </div>
           </b-sidebar>
  </div>
</template>

<script>
  export default{
        data(){
          return{
              rumourlist:[]
          }

        },
        methods:{
          getrumourdata(){
              this.axios({
                url:"http://api.tianapi.com/txapi/rumour/index",
                method: 'GET',
                params: {
                  key: '869941cd56fe09e14b255d12467651bd'
                }}).then(res=>{
                    if(res.data.code == 200){
                        this.rumourlist=res.data.newslist
                        console.log(this.rumourlist)
                    }

                })

           }
        },
        created() {
          this.getrumourdata()
        }
  }
</script>

<style>
.rumourstyle{
  margin-bottom: 0.7rem;
}
</style>
