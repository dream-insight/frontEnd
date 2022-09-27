<template>
  <div id="toast" @click="hide()">
    <transition-group name="toast-view">
      <div
        :class="['toast-body', (item.color != '' ? `bg-${item.color}` : '')]"
        :key="`toast-${item.key}`"
        @click="hide(i)"
        v-for="(item, i) in list">

        <template v-if="item.icon">
          <font-awesome-icon class="icon" :icon="item.icon" />
        </template>

        <span class="message">{{ item.message }}</span>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      maxShowMessage: 3,
      delay: 5,

      message: '',
      icon: '',
      // success, info, warning, error
      color: 'success',
      list: [],
      timeout: [],
      key: 0
    }
  },
  watch: {
    list(items) {
      if (items.length === 0) {
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
      }, this.delay * 1000))

      this.key++

      let len = this.list.length

      if (len > this.maxShowMessage) {
        this.hide(0)
      }
    },
    hide(index = 0) {
      try {
        clearTimeout(this.timeout[this.list[index].key])

        if (this.list.length > 0) {
          this.list.splice(index, 1)
        }
      } catch (e) { }
    }
  }
}
</script>

<style lang="scss" scoped>
#toast {
  position: fixed;
  bottom: 0;
  z-index: 100000;
  width: 100%;
  background-color: transparent;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}

.toast-body {
  margin: 5px 0;
  height: 55px;
  padding: 0 25px 0 15px;
  min-width: 400px;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  box-shadow: 2px 2px 5px 2px #00000044;

  &.bg-success {
    border-left: 6px solid #3a863c;
  }

  &.bg-info {
    border-left: 6px solid #1a74be;
  }

  &.bg-warning {
    border-left: 6px solid #cc7000;
  }

  &.bg-error {
    border-left: 6px solid #b33a3a;
  }

  .icon {
    display: block;
    margin-right: 10px;
    font-size: 20px;
  }

  .message {
    font-size: 14px;
  }
}

.success {
  color: #4caf50 !important;
}

.info {
  color: #2196f3 !important;
}

.warning {
  color: #fb8c00 !important;
}

.error {
  color: #ff5252 !important;
}

.bg-success {
  background-color: #4caf50 !important;
  color: #fff;
}

.bg-info {
  background-color: #2196f3 !important;
  color: #fff;
}

.bg-warning {
  background-color: #fb8c00 !important;
  color: #fff;
}

.bg-error {
  background-color: #ff5252 !important;
  color: #fff;
}

.toast-view-enter {
  margin-bottom: -60px;
  opacity: 0;
}
.toast-view-leave-to {
  transform: scale(0);
  opacity: 0;
}
.toast-view-enter-active,
.toast-view-leave-active {
  transition: all 0.2s ease-out;
}
</style>