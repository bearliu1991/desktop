<template>
    <div id="loginIndex">
        <div class="land_wrap">
          <img v-show="logoShow" class="logo" src="http://xingke100.com/logo.png" alt="electron-vue">
          <div class="version" v-show="!isCheck && !detailShow">
            <div class="title">销大师</div>
            <p class="version_wrap">版本: {{updateData.outerVersion}}</p>
          </div>
          <div class="checking" v-show="isCheck">检测更新中...</div>
          <div class="updateCont" v-show="detailShow">
            <div class="detail_wrap">
              <div class="bold">销大师有新版本了</div>
              <ul>
                <li v-for="(item, index) in (updateData.descripts)" :key="index">{{item}}</li>
              </ul>
            </div>
            <Button type="primary" class="update" @click="excRefresh">立即更新</Button>
          </div>
          <Percent v-show="percentShow"></Percent>
          <div class="installTip" v-show="showTip">
            <div class="install" @click="showModal = true">立即安装</div>
            <Modal
              v-model="showModal"
              title="Common Modal dialog box title"
              @on-ok="install"
              @on-cancel="cancel">
              <p>您的销大师正在运行，是否关闭以后安装</p>
            </Modal>
        </div>
        </div>
    </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {ipcRenderer} from 'electron'
  import Percent from './percent'
  export default {
    name: 'login-index',
    data () {
      return {
        logoShow : true,
        versionShow: true,
        isCheck : true,
        detailShow : false,
        percentShow: false,
        showTip: false,
        showModal : false,
        updateData: {descripts: []}
      }
    },
    created() {
      this.checkUpdate()
    },
    components: {Percent},
    methods: {
      ...mapActions('update', ['getUpdateDate']),
      checkUpdate() {
        this.$post(this.publicPath.checkUpdate).then((res) => {
          let obj = res.data
          if (obj.code === 1) {
            if (obj.data.isUpdate) {
              this.isCheck = false
              this.detailShow = true
              this.updateData = obj.data
            } else {
              this.$router.push('/login')
            }
          }
        })
      },
      install () {
        ipcRenderer.send('reOpen')
      },
      cancel() {},
      excRefresh () {
        this.versionShow = true
        this.detailShow = false
        this.percentShow = true
        this.updateData.installUpdate && ipcRenderer.send('checkVersion')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '~@/assets/css/index.styl'
    #loginIndex
      position:absolute
      right:0
      left:0
      top:0
      bottom:0
      padding:20px
      setMiddle()
      text-align:center
      bgColor(#fafafa)
      .land_wrap
        width:100%
        .logo
          display:block
          margin:0 auto
          margin-bottom: 20px
          width: 50px
          height: 50px
        .version
          .title
            margin-bottom:10px
            fn(20px)
            color(#121243)
            font-weight:bold
          p
            fn(16px)
            color(#979797)
        .checking
          margin-top: 70px
          fn(20px)
          color(#000)
          font-weight: bold
        .updateCont
          .detail_wrap
            padding:12px 5px 0 5px
            background: #fff
            .bold
              text-align:left
              bold()
            ul
              text-align:left
              height:160px
              overflow-y:auto
              margin:5px 0 20px 0
              li
                  margin:5px 0
          .update
            display:inline-block
            margin:0 auto
            width:190px
            line-height:30px
            height:30px
            padding:0 5px
            color:#fff
            cursor:pointer
        .installTip
          .install
            display:inline-block
            height:25px
            line-height:25px
            background-color:lightskyblue
            color: #ffffff
            padding:0 25px
            cursor:pointer
</style>
