<template>
  <div class="tooltip-wrap" @mouseenter="onMouse(true)" @mouseleave="onMouse(false)">
    <slot v-if="showIcon"></slot>
    <font-awesome-icon class="icon" icon="fas fa-question-circle" v-else />

    <transition name="tooltip">
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
      isShow: false,
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
  },
  methods: {
    onMouse(show) {
      this.isShow = show
    }
  }
}
</script>

<style lang="scss">
@import './style.scss';
</style>