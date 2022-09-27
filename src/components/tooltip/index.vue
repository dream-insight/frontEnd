<template>
  <div class="tooltip-wrap" @mouseenter="onMouse(true)" @mouseleave="onMouse(false)">
    <slot v-if="showIcon"></slot>
    <font-awesome-icon class="icon" icon="fas fa-question-circle" v-else />

    <transition :name="transitionName">
      <div
        :class="['message-box', position]"
        :style="[{width: `${width}px`}, addStyle]"
        v-if="isShow">
        <template v-if="Array.isArray(message)">
          <ul>
            <li
              :key="`tooltip-message-list${msg}`"
              v-for="msg in message">
              {{ msg }}
            </li>
          </ul>
        </template>
        <template v-else>
          {{ message }}
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'tooltipMessage',
  props: {
    message: {
      type: [Array, String],
      required: true
    },
    left: {
      type: Boolean,
      default: false,
    },
    right: {
      type: Boolean,
      default: false,
    },
    top: {
      type: Boolean,
      default: false,
    },
    bottom: {
      type: Boolean,
      default: true,
    },
    width: {
      type: [Number, String],
      default: 300
    }
  },
  data() {
    return {
      position: '',
      isShow: true,
      transitionName: '',
      addStyle: {},

      rect: {},
      boxRect: {}
    }
  },
  computed: {
    showIcon() {
      return this.$slots.default !== undefined
    }
  },
  created() {
    if (this.top) {
      this.position = 'top'
    } else if (this.left) {
      this.position = 'left'
    } else if (this.right) {
      this.position = 'right'
    } else {
      this.position = 'bottom'
    }

    this.transitionName = `tooltip-${this.position}`
  },
  mounted() {
    this.rect = this.$el.getBoundingClientRect()

    const interval = setInterval(() => {
      this.boxRect = this.$el.querySelector('.message-box').getBoundingClientRect()

      if (this.boxRect.width > 0) {
        this.isShow = false
        clearInterval(interval)
      }
    }, 10)
  },
  methods: {
    init() {
      if (this.position == 'top') {
        this.addStyle = {
          top: '',
          bottom: '100%',
          left: ((this.rect.width - this.boxRect.width) / 2) + 'px',
          marginBottom: '7px',
          marginTop: 0,
        }
      } else if (this.position == 'right') {
        this.addStyle = {
          top: ((this.rect.height - this.boxRect.height) / 2) + 'px',
          left: '100%',
          marginLeft: '7px',
          marginTop: 0,
        }
      } else if (this.position == 'left') {
        this.addStyle = {
          top: ((this.rect.height - this.boxRect.height) / 2) + 'px',
          right: '100%',
          marginRight: '7px',
          marginTop: 0,
        }
      } else {
        this.addStyle = {
          top: '100%',
          left: ((this.rect.width - this.boxRect.width) / 2) + 'px',
          marginTop: '7px'
        }
      }
    },
    onMouse(show) {
      this.init()
      this.isShow = show
    }
  }
}
</script>

<style lang="scss" scoped>
.tooltip-right-enter,
.tooltip-right-leave-to {
  opacity: 0;
  transform: translateX(-20px)
}
.tooltip-right-enter-active,
.tooltip-right-leave-active {
  transition: all 0.2s ease-in-out;
}

.tooltip-left-enter,
.tooltip-left-leave-to {
  opacity: 0;
  transform: translateX(20px)
}
.tooltip-left-enter-active,
.tooltip-left-leave-active {
  transition: all 0.2s ease-in-out;
}

.tooltip-top-enter,
.tooltip-top-leave-to {
  opacity: 0;
  transform: translateY(20px)
}
.tooltip-top-enter-active,
.tooltip-top-leave-active {
  transition: all 0.2s ease-in-out;
}

.tooltip-bottom-enter,
.tooltip-bottom-leave-to {
  opacity: 0;
  transform: translateY(-20px)
}
.tooltip-bottom-enter-active,
.tooltip-bottom-leave-active {
  transition: all 0.2s ease-in-out;
}

.tooltip-wrap {
  display: inline-block;
  position: relative;
  z-index: 100000;

  .icon {
    width: 20px;
    height: 20px;
  }

  .message-box {
    position: absolute;
    border: 1px solid #ff693a;
    background-color: #fff;
    padding: 7px;
    border-radius: 3px;
    box-shadow: 0 0 2px 1px #ff693a55;
    font-size: 13px !important;
    font-weight: 400 !important;
    transition: all 0.2s ease-in-out;
    text-align: left !important;
    color: #000;
    margin-top: 100000px;

    ul {
      padding: 0;
      padding-left: 18px;
      margin: 0;
      list-style: disc;

      li {
        text-align: left !important;
      }

      li:not(:first-child) {
        padding-top: 5px;
      }
    }

    &.visible {
      visibility: visible;
    }
  }
}
</style>