import toastComponent from './toastComponent'

export default {
    install(Vue) {
        let component = Vue.extend(toastComponent)
        let mw = null

        window.toast = params => {
            this.setMessage(params, 'toast')
        }

        window.toast.hide = () => {
            mw.hide()
        }

        this.setMessage = (opt) => {
            let message = '', icon = 'check-circle', delay = 3000, color = 'success', messageLimit = 3

            if (mw == null) {
                mw = new component({el: document.createElement('div')})
                document.body.appendChild(mw.$el)
            }

            if (typeof opt == 'object') {
                if (opt.delay != null && opt.delay != undefined) {
                    delay = opt.delay
                }

                if (opt.color != null && opt.color != undefined) {
                    color = opt.color
                }

                if (opt.messageCount > 0) {
                    messageLimit = opt.messageLimit
                }

                switch (color) {
                    case 'warning':
                        icon = 'exclamation-circle'
                        break
                    case 'info':
                        icon = 'info-circle'
                        break
                    case 'error':
                        icon = 'times'
                        break
                }

                message = opt.message
            } else {
                message = opt
            }

            mw.icon = icon
            mw.message = message
            mw.delay = delay
            mw.color = color
            mw.messageLimit = messageLimit

            mw.show()
        }
    }
}