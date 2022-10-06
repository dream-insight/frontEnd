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
@import './style.scss';
</style>