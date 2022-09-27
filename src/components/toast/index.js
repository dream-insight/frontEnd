import toastComponent from './component'

export default {
  install(Vue, options = null) {
    const component = Vue.extend(toastComponent)
    let toast = null

    const setMessage = (opt) => {
      if (toast == null) {
        toast = new component({ el: document.createElement('div') })
        document.body.appendChild(toast.$el)
      }

      if (options !== null) {
        if (options.maxShowMessage !== undefined) {
          toast.maxShowMessage = options.maxShowMessage
        }

        if (options.delay !== undefined) {
          toast.delay = options.delay
        }
      }

      if (typeof opt == 'object') {
        if (opt.message !== undefined) {
          toast.message = opt.message
        } else {
          console.error('toast message is not set')
          return
        }

        if (opt.color != undefined) {
          toast.color = opt.color
        }

        switch (opt.color) {
          case 'warning':
            toast.icon = 'exclamation-triangle'
            break
          case 'info':
            toast.icon = 'info-circle'
            break
          case 'error':
            toast.icon = 'ban'
            break
        }
      } else {
        if (opt !== undefined) {
          toast.icon = 'check-circle'
          toast.color = 'success'
          toast.message = opt
        } else {
          console.error('toast message is not set')
        }
      }

      toast.show()
    }

    const objectToast = (params) => {
      setMessage(params, 'toast')
    }

    objectToast.hide = () => {
      toast.hide()
    }

    // window.toast = objectToast
    Vue.prototype.$toast = objectToast
  }
}
