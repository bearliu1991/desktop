import publicPath from './publicPath'
import chatPath from './chatPath'
import qs from 'qs'
import Vue from 'vue'
import Common from '@/js/public'

export default function () {
  Vue.prototype.publicPath = publicPath
  Vue.prototype.chatPath = chatPath
  Vue.prototype.$get = Common.httpGet
  Vue.prototype.$post = Common.httpPost
  Vue.prototype.intercept = function (url, args) {
    return Common.httpPost(url, args)
  }
  Vue.prototype.login = function (args) {
    return Common.httpPost(publicPath.login, qs.stringify(args))
  }
  Vue.prototype.register = function (args) {
    return Common.httpPost(publicPath.register, qs.stringify(args))
  }
  Vue.prototype.logout = function (args) {
    return Common.httpPost(publicPath.logout)
  }
  Vue.prototype.upload = function (args) {
    return Common.httpPost(publicPath.upload, args, { 'Content-Type': 'multipart/form-data' })
  }
  Vue.prototype.getRoutes = function (args) {
    return Common.httpPost(publicPath.routeMap)
  }
  Vue.prototype.auth = function (args) {
    return Common.httpPost(publicPath.auth, qs.stringify(args))
  }
  Vue.prototype.searchUser = function (args) {
    return Common.httpPost(chatPath.searchUser)
  }
  Vue.prototype.chatDetail = function (args) {
    return Common.httpPost(chatPath.msgRecord, qs.stringify(args))
  }
  Vue.prototype.scrollMore = function (args) {
    return Common.httpPost(chatPath.scrollMore, qs.stringify(args))
  }
  Vue.prototype.submitModelData = function (args) {
    return Common.httpPost(chatPath.modelData, qs.stringify(args))
  }
}
