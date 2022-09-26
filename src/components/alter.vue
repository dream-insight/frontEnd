<template>
  <div class="alter-wrap" @mouseenter="isShow = true" @mouseleave="isShow = false">
    <i class="far fa-question-circle" />

    <transition :name="transitionName">
      <div ref="messageBox" class="message-box" v-show="isShow">
        <template v-if="Array.isArray(message)">
          <ul>
            <li
              :key="`alter-message-list${msg}`"
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
  name: 'alterComponent',
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
      type: Number,
      default: 300
    }
  },
  data: () => ({
    position: '',
    isShow: false,
    transitionName: '',
  }),
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
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const rect = this.$el.getBoundingClientRect()

      this.$refs.messageBox.style.width = this.width.toString() + 'px'

      if (this.position == 'right') {
        this.transitionName = 'fade-move-right'
        this.$refs.messageBox.style.top = '-100%'
        this.$refs.messageBox.style.left = `${rect.width + 3}px`
      } else if (this.position == 'left') {
        this.transitionName = 'fade-move-left'
        this.$refs.messageBox.style.top = '-100%'
        this.$refs.messageBox.style.right = `${rect.width + 3}px`
      } else if (this.position == 'top') {
        this.transitionName = 'fade-move-up'
        this.$refs.messageBox.style.bottom = `${rect.height + 3}px`
        this.$refs.messageBox.style.left = `-${(this.width / 2).toString()}px`
      } else {
        this.transitionName = 'fade-move-down'
        this.$refs.messageBox.style.left = `-${(this.width / 2).toString()}px`
      }
    }
  }
}
</script>

<style scoped>
.alter-wrap {display: inline-block; position: relative;}
.alter-wrap .message-box {
  position: absolute; border: 1px solid #000; background-color: #fff; padding: 7px; border-radius: 3px;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.3); font-size: 13px !important; font-weight: 400 !important;
}
.alter-wrap .message-box ul {padding: 0; padding-left: 18px; margin: 0; list-style: disc}
.alter-wrap .message-box ul li:not(:first-child) {padding-top: 5px;}

.fade-move-down-enter, .fade-move-down-leave-to {opacity: 0; transform: translateY(-5px)}
.fade-move-down-enter-active, .fade-move-down-leave-active {transition: all 0.2s ease-in-out;}

.fade-move-up-enter, .fade-move-up-leave-to {opacity: 0; transform: translateY(5px)}
.fade-move-up-enter-active, .fade-up-down-leave-active {transition: all 0.2s ease-in-out;}

.fade-move-right-enter, .fade-move-right-leave-to {opacity: 0; transform: translateX(-5px)}
.fade-move-right-enter-active, .fade-move-right-leave-active {transition: all 0.2s ease-in-out;}

.fade-move-left-enter, .fade-move-left-leave-to {opacity: 0; transform: translateX(5px)}
.fade-move-left-enter-active, .fade-move-left-leave-active {transition: all 0.2s ease-in-out;}
</style>