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
.spinner-box {
  z-index: 100000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .box {
    width: 200px;
    height: 200px;
    background-color: rgba(0, 136, 170, 0.3);
    text-align: center;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p { color: #ff693a; font-weight: bold; }
  }

  .spinner {
    padding: 0;
    margin: 0;

    img {
      transform-origin: center center;
      animation: spin 0.8s step-end infinite;
      width: 100px;
      margin: 0 !important;
    }
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  12.5% {
    transform: rotate(45deg);
  }
  25% {
    transform: rotate(90deg);
  }
  37.5% {
    transform: rotate(135deg);
  }
  50% {
    transform: rotate(180deg);
  }
  62.5% {
    transform: rotate(225deg);
  }
  75% {
    transform: rotate(270deg);
  }
  87.5% {
    transform: rotate(315deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.scale-enter,
.scale-leave-to { transform: scale(0); opacity: 0; }
.scale-enter-active,
.scale-leave-active { transition: all 0.2s ease-in }
</style>
