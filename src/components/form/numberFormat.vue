<template>
  <div :class="['input-wrap', {error: !isValidate, success: successful, block }]"
    :style="{width: width ? width : ''}">

    <input
      ref="input"
      type="text"
      :style="{width: width ? width + 'px' : false}"
      :placeholder="placeholder"
      :tabindex="tabIndex ? tabIndex : false"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxLength ? maxLength : false"
      @focus="zeroCheck"
      @blur="zeroCheck" v-on="eventListeners"
    />

    <p
      :class="['description', { error: errorTransition }]"
      v-if="message !== '' || successful">
      <font-awesome-icon icon="fas fa-exclamation-circle" v-if="!isValidate" />
      {{message}}
      <font-awesome-icon icon="fas fa-check-circle" v-if="successful" />
    </p>
  </div>
</template>

<script>
export default {
  name: 'numberFormat',
  props: {
    value: [String, Number],
    placeholder: String,
    // 폼 검증 배열일 경우 함수에 의거, true일 경우 pattern 호출(password, email만)
    // Array:[condition:function || message:text] or true
    validate: {
      type: Array,
      default: () => []
    },
    // 강제 에러 출력 - check함수를 수행 하지 않음
    errorMessage: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    // display block
    block: {
      type: Boolean,
      default: false
    },
    width: [String, Number],
    autofocus: {
      type: Boolean,
      default: false
    },
    tabIndex: {
      type: [String, Number],
      default: 0
    },
    maxLength: {
      type: [String, Number],
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    // 폼 검증이 완료된 경우 check icon 표시 여부 Boolean: false (사용 보류)
    success: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      valueText: null,
      isValidate: true,
      checkPass: false,
      message: '',
      errorTransition: false,
    }
  },
  watch: {
    errorMessage(v) {
      // 임의로 지정된 에러가 있는 경우 에러 아이콘 표기
      if (v != '') {
        this.message = v
        this.isValidate = false
        this.errorTransition = true
      } else {
        this.message = ''
        this.isValidate = true
        this.errorTransition = false
      }
    },
    errorTransition(v) {
      if (v) {
        setTimeout(() => {
          this.errorTransition = false
        }, 300)
      }
    },
    value(v) {
      // 외부에서 model이 업데이트 되도 유효성 검사
      if (v !== '') {
        this.message = ''
        this.isValidate = true
        this.errorTransition = false

        this.$refs.input.value = this.format(v)
        this.updateValue()
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
        input: () => {
          this.updateValue()
        }
      }
    },
    successful() {
      return this.success && this.isValidate && this.checkPass
    }
  },
  mounted() {
    this.valueText = this.$refs.input

    if (this.autofocus) {
      this.$refs.input.focus()
    }

    if (this.value !== '') {
      this.valueText.value = this.format(this.value)
      this.updateValue()
    }
  },
  methods: {
    zeroCheck(evt) {
      if (evt.type == 'focus' && evt.target.value == '0' && evt.target.value.length == 1) {
        evt.target.value = ''
        this.$emit('input', 0)
      } else if (evt.type == 'blur' && evt.target.value == '' && evt.target.value.length == 0) {
        evt.target.value = '0'
        this.$emit('input', 0)
      }
    },
    format(v) {
      if (v !== '') {
        let minus = parseFloat(v) >= 0 ? false : true
        let find = /(\d+)(\d{3})/
        let spNum = v.toString().split('.')
        let num = parseInt(spNum[0].replace(/[^0-9]/g, ''), 10).toString()

        while (find.test(num)) {
          num = num.replace(find, '$1' + ',' + '$2')
        }

        if (minus) {
          num = `-${num}`
        }

        return num
      }

      return ''
    },
    updateValue() {
      let value = this.valueText.value.replace(/[^\d\-]/g, '').replace(/\-{2,}/g, '-').replace(/^$/, 0)

      value = (value.charAt(0) === '-') ? '-'.concat(value.replace(/[-]/g, '')) : value.replace(/[-]/g, '')

      if (!isNaN(value)) {
        this.valueText.value = this.format(value)
        this.$emit('input', parseInt(value, 10))
      }
    },
    check() {
      // 임의로 지정된 에러가 없는 경우
      if (this.errorMessage === '') {
        // validate check
        if (this.validate.length) {
          for (let i = 0; i < this.validate.length; i++) {
            let result = this.validate[i].call(null, this.value)

            if (result !== true) {
              this.message = result
              this.isValidate = false
              this.checkPass = false
              this.errorTransition = true

              return false
            } else {
              this.message = ''
            }
          }
        }

        this.isValidate = true
        this.checkPass = true

        return true
      } else {
        this.errorTransition = true
        return false
      }
    },
    resetForm() {
      this.$emit('input', '')
    },
  }
}
</script>

<style lang="scss" scoped>
  .input-wrap {
    display: inline-block;

    input {
      width: 100%;
      text-align: right;
    }

    &.error input,
    &.error textarea {
      border: 2px solid #ff5252;
    }

    &.error .description {
      color: #ff5252;
    }

    .description {
      font-size: 12px !important;
      font-weight: normal;
      padding: 0 !important;
      margin-bottom: 0 !important;
      border: 0 !important;
      color: #ff5252;
      text-align: left !important;

      &.error {
        animation: shaking 0.3s;
      }
    }
  }

  .block {
    display: block !important;
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
