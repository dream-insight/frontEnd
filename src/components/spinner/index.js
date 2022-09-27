import spinnerCompnent from './component'

export default {
  install(Vue, options = null) {
    let component = Vue.extend(spinnerCompnent)
    let spinner = null

    const objectSpinner = {
      init() {
        if (spinner === null) {
          spinner = new component({ el: document.createElement('div') })
          document.body.appendChild(spinner.$el)

          if (options !== null) {
            if (options.limitTime !== undefined) {
              spinner.limitTime = options.limitTime
            }

            if (options.delay !== undefined) {
              spinner.delay = options.delay
            }
          }

          spinner.$on('destroy', () => {
            if (spinner !== null) {
              spinner.$el.remove()
              spinner = null
            }
          })
        }
      },

      /**
       * spinner 최대 표시 시간을 설정
       *
       * @param { Number } limit 최대 표시 시간 기본 10초
       * @returns
       */
      timeout(limit) {
        this.init()

        if (limit) {
          spinner.limitTime = limit
        }

        return this
      },

      /**
       * Spinner를 표시 하기 위한 메서드
       *
       * @param { String } msg 박스 하단 부분에 표시될 text
       */
      async show(msg = '') {
        this.init()
        await spinner.show(msg)
      },

      /**
       * 채이닝 이후 메서드 실행을 지연시키기 위한 메서드
       *
       * @param { Number } sec 지연 시간 (초)
       * @returns { Object } 메서드 채이닝을 위한 this 반환
       */
      delay(sec) {
        this.init()
        spinner.delay = sec

        return this
      },

      /**
       * 스피너를 닫아 줍니다.
       */
      hide() {
        this.init()
        spinner.hide()
      }
    }

    window.spinner = objectSpinner
  }
}
