// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'

import vmodal from 'vue-js-modal'
import TableComponent from 'vue-table-component';
// import Chat from 'vue-beautiful-chat'
import CircleMenu from 'vue-circle-menu'
// import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);
Vue.component('CircleMenu', CircleMenu)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(TableComponent);
Vue.use(vmodal);
Vue.use(VueChartkick, {adapter: Chart});

//global registration
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
Vue.use(VueFormWizard)

// MODAL
// import Vue from 'vue'
import VueModalTor from 'vue-modaltor'
Vue.use(VueModalTor)

// spiner
import Spinner from 'vue-spinkit'

Vue.component('Spinner', Spinner)
//toast
import Toaster from 'v-toaster'

// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'v-toaster/dist/v-toaster.css'

// optional set default imeout, the default is 10000 (10 seconds).
Vue.use(Toaster, {timeout: 3000})

// file uploader
const VueUploadComponent = require('vue-upload-component')
Vue.component('file-upload', VueUploadComponent)
// Vue.use(Chat);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
