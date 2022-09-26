<template>
    <div id="toast" @click="hide()">
        <transition-group name="toast-view">
            <div
                :class="'toast-body ' + (v.color != '' ? 'bg-' + v.color : '')"
                v-for="(v, i) in list" :key="'toast-' + v.key"
                @click="hide(i)">
                <i v-if="v.icon != ''" :class="'fas fa-' + v.icon" />
                <span class="message">{{v.message}}</span>
            </div>
        </transition-group>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: '',
            icon: '',
            delay: 0,
            color: '',       // success, info, warning, error
            list: [],
            timeout: [],
            messageLimit: 2,
            key: 0
        }
    },
    watch: {
        list(a, b) {
            if (a.length === 0) {
                this.key = 0
                this.timeout = []
            }
        }
    },
    methods: {
        show() {
            this.list.push({
                key: this.key,
                color: this.color,
                message: this.message,
                icon: this.icon
            })

            // 표시 시간이 지나면 자동으로 메시지 삭제
            this.timeout.push(setTimeout(() => {
                this.hide(0)
            }, this.delay))

            this.key++

            let len = this.list.length

            if (len > this.messageLimit) {
                this.hide(0)
            }
        },
        hide(index = 0) {
            try {
                clearTimeout(this.timeout[this.list[index].key])

                if (this.list.length > 0) {
                    this.list.splice(index, 1)
                }
            } catch (e) {}
        }
    }
}
</script>

<style scoped>
#toast {
    position: fixed; bottom: 0; z-index: 100000; width: 100%; background-color: transparent;
    display: inline-flex; flex-direction: column; align-items: center;
}
.toast-body {
    margin: 5px 0; height: 55px; padding: 0 25px 0 15px; min-width: 400px; border-radius: 5px; box-sizing: border-box;
    display: flex; flex-direction: row; align-items: center; justify-content: left; box-shadow: 2px 2px 5px 2px #00000044;
}
.toast-body.bg-success {border-left: 6px solid #3a863c;}
.toast-body.bg-info {border-left: 6px solid #1a74be;}
.toast-body.bg-warning {border-left: 6px solid #cc7000;}
.toast-body.bg-error {border-left: 6px solid #b33a3a;}
.toast-body i {display: block; margin-right: 10px; font-size: 24px;}
.toast-body .message {font-size: 14px;}

.success {color: #4caf50 !important;}
.info {color: #2196f3 !important;}
.warning {color: #fb8c00 !important;}
.error {color: #ff5252 !important;}
.bg-success {background-color: #4caf50 !important; color: #fff;}
.bg-info {background-color: #2196f3 !important; color: #fff;}
.bg-warning {background-color: #fb8c00 !important; color: #fff;}
.bg-error {background-color: #ff5252 !important; color: #fff;}

.toast-view-enter {margin-bottom: -60px; opacity: 0;}
.toast-view-leave-to {transform: scale(0); opacity: 0;}
.toast-view-enter-active {transition: all .3s ease-out;}
.toast-view-leave-active {transition: all .2s ease-out;}
</style>