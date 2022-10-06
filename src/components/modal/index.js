import modalComponent from './component'

export default {
  install(Vue, options = null) {
    const component = Vue.extend(modalComponent)
    let e = null

    let modalStyleClass = '.modal-bg'
    let noScrollStyleClass = '.no-scroll'

    if (options !== null) {
      if (options.modalStyleClass !== undefined) {
        modalStyleClass = options.modalStyleClass
      }

      if (options.noScrollStyleClass !== undefined) {
        noScrollStyleClass = options.noScrollStyleClass
      }
    }

    const modal = {}

    /**
     * opt 값이 문자열일때는 기본 설정에 메시지만 보여준다.
     * opt 설정이 되어 있다면, 해당 설정을 적용한다
     *
     * @param { Object, String } opt 옵션 또는 텍스트
     * @param { String } type alert, confirm
     */
     modal.setMessage = function(opt, type) {
      if (e === null) {
        e = new component({ el: document.createElement('div') })
        document.body.appendChild(e.$el)
      }

      e.type = type

      if (typeof opt === 'object') {
        if (!opt.message) {
          console.error('modal need message option')
          return
        } else {
          e.message = opt.message
        }

        if (opt.title !== undefined) {
          e.title = opt.title
        }

        if (opt.icon !== undefined) {
          e.icon = opt.icon
        }

        if (opt.width !== undefined) {
          if (!isNaN(parseInt(opt.width, 10))) {
            e.width = parseInt(opt.width, 10)
          }
        }

        if (typeof opt.okay == 'function') {
          e.okay = opt.okay
        }

        if (typeof opt.cancel == 'function') {
          e.cancel = opt.cancel
        }

        if (opt.modalStyleClass !== undefined) {
          e.modalStyleClass = opt.modalStyleClass
        } else {
          e.modalStyleClass = modalStyleClass
        }

        if (opt.noScrollStyleClass !== undefined) {
          e.noScrollStyleClass = opt.noScrollStyleClass
        } else {
          e.noScrollStyleClass = noScrollStyleClass
        }

        // 아이콘 표시사용시 설정 (component에서 위치 설정 필요)
        if (opt.icon === undefined) {
          if (type == 'alert') {
            e.icon = 'fas fa-volume-up'
          } else if (type == 'confirm') {
            e.icon = 'fas fa-question-circle'
          }
        }
      } else {
        e.message = opt
      }

      e.show()

      // 버튼 클릭으로 모달이 종료 될때 html element 제거
      e.$on('@destroy', () => {
        if (e !== null) {
          e.$el.remove()
          e = null
        }
      })
    }

    modal.alert = function(params) {
      this.setMessage(params, 'alert')
    }

    modal.confirm = function(params) {
      this.setMessage(params, 'confirm')
    }

    // prototype 설정으로 this.$modal 접근
    Vue.prototype.$modal = modal
  }
}
