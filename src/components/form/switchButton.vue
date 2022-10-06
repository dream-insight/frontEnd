<template>
  <div class="switch-wrap">
    <label
      :class="['switch', { small, error: onError }]">
      <input
        type="checkbox"
        :checked="value == trueValue"
        v-on="eventListeners"
      />
      <span></span>
      {{ labelText }}
    </label>

    <p
      :class="['description', { error: errorTransition }]"
      v-if="!isValidate">
      <font-awesome-icon icon="fas fa-exclamation-circle" v-if="!isValidate" />
      {{ message }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'switchButton',
  props: {
    value: [String, Boolean],
    small: {
      type: Boolean,
      default: false
    },
    // [0] => false label, [1] => true label
    label: {
      type: Array,
      default: () => ['미설정', '설정'],
    },
    // form check validate Boolean: false
    validate: {
      type: [Boolean, String],
    },
    trueValue: {
      type: [String, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Boolean],
      default: false
    }
  },
  data() {
    return {
      onError: false,
      errorTransition: false,
      message: '',
      isValidate: true,
    }
  },
  watch: {
    value(v) {
      this.resetForm()
    }
  },
  computed: {
    eventListeners() {
      return {
        ...this.$listeners,
        input: evt => {
          this.$emit('input', evt.target.checked ? this.trueValue : this.falseValue)
        }
      }
    },
    labelText() {
      return this.value == this.trueValue ? this.label[1] : this.label[0]
    }
  },
  methods: {
    check() {
      // validate check
      if (this.validate) {
        if (this.value === true || this.value == this.trueValue) {
          this.resetForm()
        } else {
            this.message = (typeof this.validate == 'string')
              ? this.validate
              : `${this.label[1]}을(를) 선택해주세요.`

          this.onError = true
          this.isValidate = false
          this.errorTransition = true

          return false
        }
      }

      return true
    },
    resetForm() {
      this.message = ''
      this.onError = false
      this.isValidate = true
      this.errorTransition = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import './switchButton.scss';
</style>