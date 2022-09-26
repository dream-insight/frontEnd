import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import modal from '@/components/modal'

Vue.use(modal, {
  modalStyleClass: '.modal-bg',
  noScrollStyleClass: '.no-scroll'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
