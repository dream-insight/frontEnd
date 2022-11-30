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
