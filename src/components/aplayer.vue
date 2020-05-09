<template>
  <div id="app">
    <div class="aplayerstyle">
      <aplayer
        :music="this.audio"
        :lrcType="3"
        showLrc
        :list='this.list'
        autoplay
      />
    </div>
  </div>
</template>
        <!-- autoplay -->
<script>
import aplayer from 'vue-aplayer'; //音乐插件  。。

export default {
  data() {
    return {
      audio: {
        title: '平凡天使',
        artist: 'G.E.M 邓紫棋',
        src: 'https://cdn.jsdelivr.net/gh/devil-trigger/sdn@master/ncov/music/G.E.M.%20%E9%82%93%E7%B4%AB%E6%A3%8B%20-%20%E5%B9%B3%E5%87%A1%E5%A4%A9%E4%BD%BF.mp3',
        cover: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
        // lrc: 'https://cdn.jsdelivr.net/gh/devil-trigger/sdn@master/ncov/music/G.E.M.%20%E9%82%93%E7%B4%AB%E6%A3%8B%20-%20%E5%B9%B3%E5%87%A1%E5%A4%A9%E4%BD%BF.lrc',
      },
      list:[
      {
        title: '你要相信这不是最后一天 (Live).）',
        artist: '华晨宇',
        src: 'https://cdn.jsdelivr.net/gh/devil-trigger/sdn@master/ncov/music/华晨宇 - 你要相信这不是最后一天 (Live).mp3',
        cover: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
      },
      {
        title: '我们心在一起',
        artist: '群星',
        src: 'https://cdn.jsdelivr.net/gh/devil-trigger/sdn@master/ncov/music/王俊凯 _ 关晓彤 _ 黄晓明 _ 张艺兴 _ 惠若琪 _ 经超 _ 韩栋 _ 吉克隽逸 _ 何晟铭 _ 沙宝亮 _ 周奇 _ 王静 _ 毛大庆 _ 徐子崴 _ 刘维 _ 张碧晨 _ 吴静钰 _ 邹侑根 _ 杜若溪 _ 严屹宽 _ 隔壁老樊 _ 杨嘉松 _ 张雪迎 _ 邹凯 _ 黄宥明 _ 墨汁 _ 朱赞锦 _ 吉克杰拉 _ 昂萨 _ 张北北 _ 韩丹桐 _ 段丽阳 _ 江映蓉 _ 旺姆 _ 张远 - 我们心在一起.mp3',
        cover: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
        lrc: '',
      },
      {
        title: '坚定希望（With hope,with me)',
        artist: '李治廷 _ 孙伯纶 _ 刘端端 _ 张新成 _ 叶禹含 _ 董芷依 _ 伍佳丽',
        src: 'https://cdn.jsdelivr.net/gh/devil-trigger/sdn@master/ncov/music/李治廷 _ 孙伯纶 _ 刘端端 _ 张新成 _ 叶禹含 _ 董芷依 _ 伍佳丽 - 坚定希望（With hope,with me).mp3',
        cover: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
        lrc: '',
      },
      ]
    };
  },
  components: {
     aplayer
  },
  methods:{
      getmusiclist(){
          this.axios({
            url: 'http://139.9.163.138:3000/song/url?id=33894312',
            method: 'GET',
            params: {

            }
          }).then(res => {
              // console.log(res.data.data[0].url)
              // this.audio.url=res.data.data[0].url
              // console.log(this.audio.url)
              // this.audio.url=require(res.data.data[0].url)

          })
      }
  },
  created() {
    this.getmusiclist()
  }
};
</script>

<style scoped="scoped">
.aplayerstyle {
  width: 100%;
}
</style>
