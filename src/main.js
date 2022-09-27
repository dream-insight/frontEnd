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
import {
  faExclamationTriangle, faInfoCircle, faBan, faCheckCircle,
  faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faCheckCircle, faInfoCircle, faExclamationTriangle, faBan,
  faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight,
  faQuestionCircle
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

import toast from '@/components/toast'

Vue.use(toast)


import pagination from '@/components/pagination'

Vue.component('pagination', pagination)

import tooltip from '@/components/tooltip'

Vue.component('tooltip', tooltip)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
