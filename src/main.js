// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../fonts/icomoon/style.css'
import '../css/bootstrap.min.css'
import '../css/style.css'
import Notifications from 'vue-notification'

Vue.use(Notifications)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})