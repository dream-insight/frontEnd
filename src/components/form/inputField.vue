<template>
  <div
    :class="['input-wrap', { error: !isValidate, success: successful, block }]"
    :style="{ width: styleWidth }"
    @focus="focus">
    <textarea
      ref="textarea"
      :class="['block', { block: block }]"
      :style="[{ height: height ? `${height}px` : '' }]"
      :rows="rows"
      :placeholder="placeholder"
      :value="value"
      :readonly="readonly"
      :tabindex="tabIndex ? tabIndex : false"
      :disabled="disabled"
      @blur="blurValidateCheck"
      v-on="eventListeners"
      v-if="multiline">
    </textarea>

    <input
      autocomplete
      ref="input"
      type="text"
      :class="['block', { block: block }, { 'text-right': textRight }]"
      :style="[{ width: width ? `${width}px` : '' }]"
      :placeholder="placeholder"
      :value="value"
      :tabindex="tabIndex ? tabIndex : false"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxLength ? maxLength : false"
      @blur="blurValidateCheck"
      v-on="eventListeners"
      v-else />

    <p
      :class="['description', { error: errorTransition }]"
      v-if="message !== '' || successful">
      <font-awesome-icon icon="fas fa-exclamation-circle" v-if="!isValidate" />
      {{ message }}
      <font-awesome-icon icon="fas fa-check-circle" v-if="successful" />
    </p>
  </div>
</template>

<script>
export default {
  name: 'inputField',
  props: {
    value: [String, Number],
    placeholder: String,
    // display block !!! width가 선언 된 경우 width가 우선
    block: {
      type: Boolean,
      default: false
    },
    multiline: {
      // textarea 여부,
      type: Boolean,
      default: false
    },
    // multiline 이 true인 경우 몇 줄 까지 보일지 설정 Number: 5
    rows: {
      type: Number,
      default: 5
    },
     // textarea 일때 적용됨
    height: [String, Number],
    width: [String, Number],
    // 폼 유효성 검사 함수 배열
    validate: {
      type: Array,
      default: () => []
    },
    blurValidate: {
      type: Boolean,
      default: true
    },
    // 폼 검증이 완료된 경우 check icon 표시 여부 Boolean: false
    // success: {
    //   type: Boolean,
    //   default: false
    // },
    maxLength: [String, Number],
    // 강제 에러 출력 - check함수를 수행 하지 않음
    errorMessage: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    // 자동 포커스
    autofocus: {
      type: Boolean,
      default: false
    },
    textRight: {
      type: Boolean,
      default: false,
    },
    // tabindex
    tabIndex: [String, Number],
    // 최대 입력 가능한 글자 수 (type=text 에만 적용)
    maxLength: [String, Number],
    // 체크할 패턴을 지정 String:''
    pattern: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      isValidate: true,
      checkPass: false,
      message: '',
      errorTransition: false
    }
  },
  watch: {
    errorMessage(v) {
      // 임의로 지정된 에러가 있는 경우 에러 아이콘 표기
      if (v) {
        this.message = v
        this.isValidate = false
        this.checkPass = false
        this.errorTransition = true
      } else {
        this.message = ''
        this.isValidate = true
        this.checkPass = true
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
    value(after) {
      // 외부에서 model이 업데이트 되도 유효성 검사
      if (after) {
        this.message = ''
        this.isValidate = true
        this.errorTransition = false
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
        }
      }
    },
    successful() {
      return this.success === true && this.isValidate && this.checkPass
    },
    styleWidth() {
      if (this.width) {
        return this.width.toString().indexOf('%') >= 0
          ? this.width
          : this.width + 'px'
      }

      return false
    }
  },
  created() {
    if (this.value != '') {
      this.updateValue()
    }
  },
  mounted() {
    if (this.autofocus) {
      if (this.multiline) {
        this.$refs.textarea.focus()
      } else {
        this.$refs.input.focus()
      }
    }
  },
  methods: {
    focus(evt) {
      // 포커스 이벤트 매칭
      if (this.multiline) {
        this.$refs.textarea.focus()
      } else {
        this.$refs.input.focus()
      }
    },
    updateValue(evt = null) {
      let v = ''

      if (evt === null) {
        v = this.value
      } else {
        v = evt.target.value
      }

      this.$emit('input', v)
    },
    getPattern(type = '') {
      if (this.pattern !== undefined) {
        type = this.pattern
      }

      let pattern = ''
      let message = ''

      switch (type) {
        // 영문만 유효성 검사
        case 'eng':
          pattern = /^[a-z|A-Z]+$/
          message = '영문만 입력 가능합니다.'
          break
        // 영문,숫자 유효성 검사
        case 'engnum':
          pattern = /^[(a-z|A-Z)0-9]+$/
          message = '영문, 숫자만 입력 가능합니다.'
          break
        // 아이디 영문,숫자,underbar(_) 사용 유효성 검사
        case 'id':
          pattern = /^[(a-z|A-Z)0-9]+[_]*[(a-z|A-Z)0-9]+$/
          message = '영문, 숫자 입력만 가능합니다.( _ 중간 사용 가능)'
          break
        // 정수 유효성 검사
        case 'num':
          pattern = /^[0-9]+$/
          message = '숫자만 입력 가능합니다.'
          break
        // 영문,숫자 혼합사용 유효성 검사
        case 'wordnum':
          pattern = /^([0-9]+[a-z|A-Z]+)|([a-z|A-Z]+[0-9]+)$/
          message = '영문, 숫자 혼합하여 입력해주세요.'
          break
        case 'password':
          pattern = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])|(?=.*[a-zA-Z])(?=.*[0-9])|(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{8,16}$/
          message = '영문, 숫자, 특수문자 중 2가지 이상을 조합하여 입력해주세요.(8~16자)'
          break
        // 도메인
        case 'domain':
          pattern = /^([a-zA-Z0-9]{1,}\.?)[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z0-9]{2,})+(?:\:[0-9]{1,})*$/
          message = '도메인주소 형식이 일치 하지 않습니다.(http://, https:// 제외)'
          break
        // 이메일 유효성 검사
        case 'email':
          pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
          message = '이메일 형식과 일치하지 않습니다.'
          break
        // 전화 번호 유효성
        case 'tel':
          pattern = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/
          message = '전화번호 형식과 일치하지 않습니다.'
          break
      }

      return { pattern, message }
    },
    blurValidateCheck() {
      if (this.blurValidate) {
        this.check()
      }
    },
    check() {
      // 임의로 지정된 에러가 없는 경우
      if (this.errorMessage === '') {
        if (this.value !== '') {
          // pattern check
          if (this.pattern) {
            const check = this.getPattern()

            if (check.pattern.test(this.value)) {
              this.message = ''
            } else {
              this.message = check.message
              this.isValidate = false
              this.checkPass = false
              this.errorTransition = true

              return false
            }
          }
        }

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
      }

      this.errorTransition = true
      return false
    },
    resetForm() {
      this.$emit('input', '')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './inputField.scss';
</style>
