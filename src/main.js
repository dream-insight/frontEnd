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

import spinner from '@/components/spinner'

Vue.use(spinner, {
  limitTime: 10,
  delay: 1,
})

// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faExclamationTriangle, faInfoCircle, faBan, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faCheckCircle, faInfoCircle, faExclamationTriangle, faBan)

Vue.component('font-awesome-icon', FontAwesomeIcon)

import toast from '@/components/toast'

Vue.use(toast)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
