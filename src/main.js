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
  faQuestionCircle, faExclamationCircle, faArrowDown, faCalendarAlt
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faCheckCircle, faInfoCircle, faExclamationTriangle, faBan,
  faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight,
  faQuestionCircle, faExclamationCircle, faArrowDown, faCalendarAlt
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

import toast from '@/components/toast'

Vue.use(toast)


import pagination from '@/components/pagination'

Vue.component('pagination', pagination)

import tooltip from '@/components/tooltip'

Vue.component('tooltip', tooltip)

import checkButton from '@/components/form/checkButton'
import inputField from '@/components/form/inputField'
import numberFormat from '@/components/form/numberFormat'
import selectBox from '@/components/form/selectBox'
import switchButton from '@/components/form/switchButton'
import validateForm from '@/components/form/validateForm'
import validateWrap from '@/components/form/validateWrap'

Vue.component('check-button', checkButton)
Vue.component('input-field', inputField)
Vue.component('number-format', numberFormat)
Vue.component('select-box', selectBox)
Vue.component('switch-button', switchButton)
Vue.component('validate-form', validateForm)
Vue.component('validate-wrap', validateWrap)


import datePicker from '@/components/datePicker'

Vue.component('date-picker', datePicker)

import listTable from '@/components/table'

Vue.component('list-table', listTable)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
