<template>
  <div>
    <slot></slot>

    <div :class="['error-message']" v-if="message !== ''">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'validateWrap',
  props: {
    checkValue: {
      type: [String, Number, Boolean, Array, Object],
    },
    validate: {
      // 폼 검증 함수 ex) [v => !!v || '필수 입력항목입니다.']
      type: Array,
      default: () => []
    },
    errorMessage: {
      type: String,
      default: '',
    }
  },
  watch: {
    checkValue(v) {
      this.resetForm()
    },
    validate(ary) {
      this.resetForm()
    },
    errorMessage(v) {
      this.message = v
    }
  },
  data() {
    return {
      isValidate: true,
      checkPass: false,
      message: '',
    }
  },
  methods: {
    check() {
      // 임의로 지정된 에러가 없는 경우
      if (this.errorMessage === '') {
        // validate check
        if (this.validate.length > 0) {
          for (let i = 0; i < this.validate.length; i++) {
            let result = this.validate[i].call(null, this.checkValue)

            if (result !== true) {
              this.message = result
              this.isValidate = false
              this.checkPass = false

              return false
            } else {
              this.message = ''
            }
          }
        }

        this.isValidate = true
        this.checkPass = true

        return true
      }
    },
    resetForm() {
      this.isValidate = true
      this.checkPass = false
      this.message = ''
    },
  }
}
</script>