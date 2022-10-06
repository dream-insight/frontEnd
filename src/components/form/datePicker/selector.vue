<template>
  <transition appear name="trans-slide-down">
    <div :class="['selector-box', { month: max === 0 }]">
      <div class="selector-box-wrap">
        <div class="arrow"></div>
        <ul ref="ul">
          <li
            :class="{ active: num == date }"
            @click="updateValue(num)"
            v-for="num in items">
            <template v-if="max > 0">
              {{ num }}
            </template>
            <template v-else>
              {{ num + 1 }}
            </template>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'datePickerYearMonthSelector',
  props: {
    date: Number,
    max: {
      type: Number,
      default: 0
    },
    isShow: {
      type: Boolean
    }
  },
  watch: {
    max(v) {
      if (v > 0) {
        for (let i = this.max; i >= 1900; i--) {
          this.items.push(i)
        }
      }
    },
    isShow(v) {
      if (v) {
        setTimeout(() => {
          const li = this.$refs.ul.$el.querySelector('li.active')
          const top = li.offsetTop - li.offsetHeight
          this.$refs.ul.$el.scrollTop = top
        }, 100)
      }
    }
  },
  data() {
    return {
      isShow: true,
      items: [],
    }
  },
  mounted() {
    if (this.max > 0) {
      for (let i = this.max; i >= 1900; i--) {
        this.items.push(i)
      }
    }

    for (let i = 0; i < 12; i++) {
      this.items.push(i)
    }
  },
  methods: {
    updateValue(v) {
      this.$emit('selected', v)
    }
  }
}
</script>

<style lang="scss" scoped>
.selector-box {
  position: absolute;
  top: 100%;
  left: calc(-50% + 12px);
  background-color: #555;
  padding: 8px 4px 8px 8px;
  margin-top: 5px;
  border-radius: 3px;

  &.month {
    left: calc(-50% - 7px);
  }

  .selector-box-wrap {
    position: relative;

    .arrow {
      position: absolute;
      transform: rotate(45deg);
      background-color: #555;
      width: 5px;
      height: 5px;
      top: -11px;
      left: calc(50% - 3px);
    }

    ul {
      max-height: 210px;
      overflow-y: auto;
      padding: 0;
      margin: 0;
      list-style: none;
      &::-webkit-scrollbar {
        width: 4px
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgb(7, 78, 158);
        border-radius: 2px;
      }
      &::-webkit-scrollbar-track {
        background-color: #888;
        border-radius: 2px;
      }

      li {
        padding: 5px 8px;
        color: #ccc;
        border-radius: 3px;
        margin-right: 3px;

        &.active,
        &:hover {
          background-color: #777;
        }
      }
    }
  }
}

.trans-slide-down-enter,
.trans-slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px)
}
.trans-slide-down-enter-active,
.trans-slide-down-leave-active {
  transition: all 0.2s ease-out;
}
</style>