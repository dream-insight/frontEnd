<template>
  <div
    :style="{ width: styleWidth }"
    :class="['select-box', 'ml-1', { error: !isValidate, block: block }]">
    <select
      ref="selectbox"
      :class="{ size: parseInt(width) > 0 }"
      v-on="eventListeners">
      <option
        value=""
        :selected="value == ''"
        v-if="placeholder">
        {{ placeholder }}
      </option>
      <option
        :selected="value == item.value"
        :value="item.value"
        :key="'select-' + i"
        v-for="(item, i) in options">
        {{ item.text }}
      </option>
    </select>

    <p
      :class="['description', { error: errorTransition }]"
      v-if="!isValidate">
      <font-awesome-icon icon="fas fa-exclamation-circle" />
      {{ message }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'selectBox',
  props: {
    value: [String, Number],
    options: {
      type: Array,
      default: []
    },
    placeholder: {
      type: String,
      default: '',
    },
    block: {
      type: Boolean,
      default: false,
    },
    validate: {
      type: Array,
      default: () => []
    },
    errorMessage: {
      type: String,
      default: ''
    },
    width: [String, Number],
  },
  data() {
    return {
      val: '',
      isValidate: true,
      message: '',
      errorTransition: false,
      selectedIndex: -1
    }
  },
  watch: {
    errorMessage(v) {
      if (v !== '') {
        this.isValidate = false
        this.message = this.errorMessage
      }
    },
    errorTransition(v) {
      if (v) {
        setTimeout(() => {
          this.errorTransition = false
        }, 300)
      }
    },
    validate() {
      this.message = ''
      this.isValidate = true
      this.errorTransition = false
    }
  },
  computed: {
    eventListeners() {
      return {
        ...this.$listeners,
        input: evt => {
          this.updateValue(evt)
        },
      }
    },
    styleWidth() {
      if (this.width) {
        return (this.width.indexOf('%') >= 0) ? this.width : this.width + 'px'
      }

      return false
    },
  },
  created() {
    if (this.value !== '') {
      this.val = this.value
    } else {
      if (this.placeholder === '') {
        // placeholder가 없는 경우 옵션의 첫번째 값을 기본으로 잡아줌
        this.$emit('input', this.options[0].value)
      }
    }
  },
  mounted() {
    if (this.value === '' && this.placeholder === '') {
      this.val = this.options[0].value
      this.$emit('input', this.options[0].value)
    }
  },
  methods: {
    getText() {
      return this.$refs.selectbox.options[this.selectedIndex].text
    },
    updateValue(evt) {
      // 추후 수정 예정
      let value = evt.target.value
      this.selectedIndex = this.$refs.selectbox.selectedIndex

      this.$emit('input', value, this.$refs.selectbox.selectedIndex)
      this.check()
    },
    check() {
      // 폼을 검수하여 값을 반환
      // 임의로 지정된 에러가 없는 경우
      if (this.errorMessage === '') {
        // validate check
        if (this.validate.length) {
          for (let i = 0; i < this.validate.length; i++) {
            let result = this.validate[i].call(null, this.$refs.selectbox.value)

            if (result !== true) {
              this.message = result
              this.isValidate = false
              this.errorTransition = true

              return false
            }
          }
        }
      }

      this.message = ''
      this.isValidate = true

      return true
    },
    resetForm() {
      if (this.placeholder === '') {
        this.val = this.options[0].value
      } else {
        this.val = ''
      }

      this.$emit('input', this.val)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './selectBox.scss';
</style>