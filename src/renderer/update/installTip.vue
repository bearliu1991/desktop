<template>
    <div id="installTip">
        <!--<div class="land_wrap" v-show="isShowBar">-->
        <!--<div :style="{width: width}"></div>-->
        <!--</div>-->
        <div class="install" @click="showModal = true">立即安装</div>
        <Modal
                v-model="showModal"
                title="Common Modal dialog box title"
                @on-ok="install"
                @on-cancel="cancel">
            <p>您的销大师正在运行，是否关闭以后安装</p>
        </Modal>
    </div>
</template>

<script>
  import {ipcRenderer} from 'electron';

  export default {
    name: 'login-index',
    data () {
      return {
        width: '0',
        showModal : false,
      }
    },
    mounted() {
      let self = this;

    },
    methods: {
      install () {
        ipcRenderer.send('reOpen')
      },
      cancel() {

      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '~@/assets/css/index.styl'
    #installTip
        .install
            display:inline-block
            height:25px
            line-height:25px
            background-color:lightskyblue
            color: #ffffff
            padding:0 25px
            cursor:pointer
        .land_wrap
            position:relative
            margin:10px
            width:160px
            height:10px
            background-color:#999
            div
                position:absolute
                left:0
                top:0
                bottom:0
                background-color:lightskyblue
</style>
