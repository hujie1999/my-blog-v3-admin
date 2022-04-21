
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import MavonEditor from 'mavon-editor' 
import 'mavon-editor/dist/css/index.css'
import axios from 'axios'
import hljs from 'highlight.js'
import moment from 'moment'
Vue.prototype.$hljs = hljs
Vue.prototype.$axios = axios
Vue.prototype.$moment = moment

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(MavonEditor)

Vue.filter('dateFormat', function (value) {
  return moment(value).format('YYYY-MM-DD HH:mm:ss')
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
