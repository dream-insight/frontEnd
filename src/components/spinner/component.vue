<template>
    <div class="progress">
        <transition name="scale">
            <div class="box" v-if="isShow">
                <div class="spinner"></div>
                <p>{{message}}</p>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'progressUI',
    data() {
        return {
            isShow: false,
            message: 'Loading...',
            timeout: null,
            progress: 0,
            limitTime: 0,
            flag: false         // progress가 바로 닫힐 지를 결정
        }
    },
    watch: {
        progress(after) {
            if (after <= 0) {
                if (this.flag === true) {
                    this.isShow = false
                    this.$emit('@destroy')
                } else {
                    this.timeout = setTimeout(() => {
                        this.isShow = false
                        this.$emit('@destroy')
                    }, 300)
                }
            } else if (after > 0) {
                this.isShow = true
            }
        }
    },
    methods: {
        show(msg) {
            this.progress++

            clearTimeout(this.timeout)

            this.message = msg

            setTimeout(() => {
                this.progress = 0
            }, this.limitTime)
        },
        hide(flag = false) {
            this.flag = flag

            if (this.progress > 0) {
                this.progress--
            }
        }
    }
}
</script>

<style scoped>
.progress {
    z-index: 100000; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0);
    display: flex; flex-direction: row; justify-content: center; align-items: center;
}
.progress .box {
    width: 300px; height: 200px; background-color: rgba(0, 0, 0, .7); text-align: center; border-radius: 15px;
     display: flex; flex-direction: column; justify-content: center; align-items: center;
}
.progress .box::before {
    content: '\f110'; font-family: 'Font Awesome 5 Free'; font-weight: 700; font-size: 70px; color: #fff; display: block; line-height: 70px;
    transform-origin: center center; animation: spin .8s step-end infinite;
}
.progress p {color: #fff; margin-top: 20px; font-size: 20px;}

@keyframes spin {
    0% {transform: rotate(0deg)}
    12.5% {transform: rotate(45deg)}
    25% {transform: rotate(90deg)}
    37.5% {transform: rotate(135deg)}
    50% {transform: rotate(180deg)}
    62.5% {transform: rotate(225deg)}
    75% {transform: rotate(270deg)}
    87.5% {transform: rotate(315deg)}
    100% {transform: rotate(360deg)}
}
</style>
