import progressComponent from './progressComponent'

export default {
    install(Vue) {
        let component = Vue.extend(progressComponent);
        let progress = null
        let timeout = null
        let delay = 0
        let count = 0       // progress 수량

        window.progress = () => {}

        window.progress.init = () => {
            if (progress === null) {
                progress = new component({el: document.createElement('div')})
                document.body.appendChild(progress.$el)
            }

            progress.$on('@destroy', () => {
                setTimeout(() => {
                    if (progress !== null) {
                        progress.$el.remove()
                        progress = null
                    }
                }, 300)
            })
        }

        window.progress.show = (msg = 'Progressing...', limit = 10000) => {
            count++

            // 프로그래스 표시 지연 시간을 1초로 한다
            if (timeout === null) {
                timeout = setTimeout(() => {
                    window.progress.init()
                    progress.limitTime = limit
                    progress.show(msg)
                }, delay)
            }
        }

        window.progress.delay = function(sec) {
            if (sec > 0) {
                delay = sec * 1000
            }

            return this
        }

        window.progress.hide = (flag) => {
            count--

            if (count <= 0) {
                delay = 0
                count = 0

                clearTimeout(timeout)
                timeout = null

                if (progress !== null) {
                    progress.hide(flag)
                }
            }
        }
    }
}