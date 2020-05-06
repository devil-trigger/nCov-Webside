<template>
  <div>
  <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      no-hover-pause
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide
        v-for="(item, index) in newsDatalist"
        :key="index"
        :caption="item.infoSource"
        :text="item.title"
        :img-src="SlideImg(index)"
      ></b-carousel-slide>
    </b-carousel>
<!-- -------------------------------------------轮播图--------------------- -->
<!-- -------------------------------------------新闻----------------- -->
<br>

<div style="width:90%;margin: 0 auto;">
  <div style="margin:2rem 0;">
    <b-card no-body class="overflow-hidden" style="max-width:100%;">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img src="https://cdn.jsdelivr.net/gh/devil-trigger/sdn/ncov/3.jpg" alt="Image" class="rounded-0"></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body title="新型冠状病毒">
                <b-card-text>
                  <p class="mb-0">{{this.nCovInfo.info1}}</p>
                </b-card-text>
                <b-card-text>
                <p class="mb-0">{{this.nCovInfo.info4}}</p>
                </b-card-text>
                <b-card-text>
                <p class="mb-0">{{this.nCovInfo.info5}}</p>
                </b-card-text>
              </b-card-body>
              <br>
              <div style="text-align: center;margin-bottom:2rem;">
                <b-button href="https://baike.baidu.com/item/2019%E6%96%B0%E5%9E%8B%E5%86%A0%E7%8A%B6%E7%97%85%E6%AF%92/24267858?fromtitle=%E6%96%B0%E5%86%A0%E7%97%85%E6%AF%92&fromid=24424810&fr=aladdin" size="lg" variant="outline-secondary">点击了解更多详情</b-button>
              </div>
            </b-col>
          </b-row>
    </b-card>
  </div>
  <div style="margin:2rem 0;">
    <b-card no-body class="overflow-hidden" style="max-width:100%;">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-body title="传播途径">
                <b-card-text>
                  <p class="mb-0">{{this.nCovInfo.info3}}</p>
                </b-card-text>
                <b-card-text>
                  <p class="mb-0">{{this.nCovInfo.info2}}</p>
                </b-card-text>
                <b-card-text>
                  <p class="mb-0">{{this.nCovInfo.info6}}</p>
                </b-card-text>
              </b-card-body>
            </b-col>
            <b-col md="6">
              <b-card-img src="https://cdn.jsdelivr.net/gh/devil-trigger/sdn/ncov/5.jpg" alt="Image" class="rounded-0"></b-card-img>
            </b-col>
          </b-row>
    </b-card>
  </div>
</div>


<hr>
<!-- -------------------------------------------------------------------------------------------------------------------------- -->
<div>
  <b-card-group deck>
    <b-card :title="item.title" v-for="(item, index) in newsDatalist" :key="index" img-alt="Image" :img-src="ImgSrcData(index)" img-top>
      <b-overlay :show="show" rounded="sm" style="height: 100%;" v-if='show'></b-overlay>
      <b-card-text>
        <p class="mb-0">{{item.summary}}</p>
      </b-card-text>
      <template v-slot:footer>
        <small class="text-muted">{{item.infoSource}} 发布于 {{item.pubDateStr}}</small>
      </template>
      <div style="text-align: center;">
        <b-button :href="item.sourceUrl" size="lg" variant="outline-secondary">了解详情</b-button>
      </div>
    </b-card>

  </b-card-group>
</div>
  </div>
</template>

<script>
 export default {
    data() {
      return {
        slide: 0,
        show:true,
        sliding: null,
        nCovInfo:{},
        newsDatalist:[],
        srcdata:[3,4,5]
      }
    },
    methods: {
      onSlideStart(slide) {   //轮播图左右按钮
        this.sliding = true
      },
      onSlideEnd(slide) {   //轮播图左右按钮
        this.sliding = false
      },
      ImgSrcData(a){
        // this.srcdata
        let imgnum=a+1
        let srcname="https://cdn.jsdelivr.net/gh/devil-trigger/sdn/ncov/NewsImg/"+imgnum+".jpg"
        return srcname
      },
      SlideImg(index){
        let slidenum=index+1
        let slidename="https://cdn.jsdelivr.net/gh/devil-trigger/sdn/ncov/NewSlide/"+slidenum+".jpg"
        return slidename

      },
      async getNewsdata(){
          this.axios({
              url: 'http://api.tianapi.com/txapi/ncov/index',
              method: 'GET',
              params:{
                  key: '869941cd56fe09e14b255d12467651bd'
                }
            }).then(res => {
              if (res.data.code == 200) {
                 // console.log(res.data.newslist[0].desc)
                 this.show=false
                this.nCovInfo.info1=res.data.newslist[0].desc.note1;
                this.nCovInfo.info2=res.data.newslist[0].desc.note2;
                this.nCovInfo.info3=res.data.newslist[0].desc.note3;
                this.nCovInfo.info4=res.data.newslist[0].desc.remark1;
                this.nCovInfo.info5=res.data.newslist[0].desc.remark2;
                this.nCovInfo.info6=res.data.newslist[0].desc.remark3;
                this.newsDatalist=res.data.newslist[0].news
                console.log( this.newsDatalist)
              }
            });
          }
      },
      mounted() {
          this.getNewsdata()
      }
    }

</script>

<style scoped="scoped">
.nCov-info-card{
  overflow: hidden;
  display: flex;
}
.nCov-info-card>div{
  margin-left: 30px;
}
</style>
