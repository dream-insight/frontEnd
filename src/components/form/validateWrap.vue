<template>
  <div class="validate-wrap">
    <slot></slot>

    <div :class="['error-message']" v-if="message !== ''">
      <font-awesome-icon icon="fas fa-exclamation-circle" v-if="!isValidate" />
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'validateWrap',
  props: {
    checkValue: {
      type: [],
      required: true
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
    checkValue() {
      this.resetForm()
    },
    validate() {
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
        if (this.validate.length) {
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

<style lang="scss" scoped>
.validate-wrap .error-message {
  font-size: 12px !important;
  font-weight: normal;
  padding: 0 !important;
  margin-top: 10px;
  margin-bottom: 0 !important;
  border: 0 !important;
  color: #ff5252;
  text-align: left !important;
  animation: shaking 0.3s;
}

/* error message shaking */
@keyframes shaking {
  0% {
    transform: translateX(10px);
  }
  25% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(10px);
  }
  75% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(10px);
  }
}
</style>