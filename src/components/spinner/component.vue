<template>
  <div class="spinner-box">
    <transition appear name="scale" @after-leave="destroy">
      <div class="box" v-if="isShow">
        <div class="spinner">
          <img src="./spinner.png" />
        </div>
        <p>{{ message }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'spinnerComponent',
  data() {
    return {
      isShow: false,
      timeout: null,
      progress: 0,
      message: 'Loading...',
      limitTime: 10,
      delay: 0,
    }
  },
  watch: {
    progress(after) {
      if (after <= 0) {
        this.delay = 0
        this.isShow = false
        this.$emit('destroy')
      } else if (after > 0) {
        this.isShow = true
      }
    },
  },
  methods: {
    waiting() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, this.delay * 1000)
      })
    },
    async show(msg) {
      if (msg !== '') {
        this.message = msg
      }

      clearTimeout(this.timeout)

      await this.waiting()

      this.progress++

      // hide 호출이 없을 경우 최대 지속 시간 이후 사라지도록
      this.timeout = setTimeout(() => {
        this.progress = 0
      }, this.limitTime * 1000)
    },
    async hide() {
      await this.waiting()

      if (this.progress > 0) {
        clearTimeout(this.timeout)
        this.progress--
      }
    },
    destroy() {
      this.$emit('destroy')
    }
  },
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
