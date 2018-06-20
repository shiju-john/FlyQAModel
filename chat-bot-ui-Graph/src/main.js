// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'

import vmodal from 'vue-js-modal'
import TableComponent from 'vue-table-component';

import CircleMenu from 'vue-circle-menu'
Vue.component('CircleMenu', CircleMenu)

Vue.use(TableComponent);
Vue.use(vmodal)
Vue.use(VueChartkick, {adapter: Chart})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
