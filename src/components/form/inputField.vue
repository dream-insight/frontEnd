<template>
  <div
    :class="[
      'input_wrap ml-1',
      { error: !isValidate },
      { success: successful },
      { block: block }
    ]"
    :style="{ width: styleWidth }"
    @focus="focus">
    <textarea
      ref="textarea"
      :class="['block', 'form-control form-control-sm', { block: block }]"
      :style="[{ height: height ? height + 'px' : false }]"
      :rows="rows"
      :placeholder="placeholder"
      :value="value"
      :readonly="readonly"
      :tabindex="tabIndex ? tabIndex : false"
      :disabled="disabled"
      v-on="eventListeners"
      v-if="multiline">
    </textarea>

    <input
      autocomplete
      :name="name"
      ref="input"
      :class="[
        'text block form-control form-control-sm',
        { block: block },
        { 'text-right': textRight }
      ]"
      :style="[{ width: width ? width + 'px' : false }]"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      :tabindex="tabIndex ? tabIndex : false"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxLength ? maxLength : false"
      v-on="eventListeners"
      v-else />

    <p
      :class="['description', { error: errorTransition }]"
      v-if="message !== '' || successful">
      <i class="fas fa-exclamation-circle" v-if="!isValidate" />
      {{ message }}
      <i class="fas fa-check-circle" v-if="successful" />
    </p>
  </div>
</template>

<script>
export default {
  name: 'inputField',
  props: {
    value: [String, Number], // model
    name: String,
    type: {
      // 입력 폼 형식 String:''
      type: String,
      default: 'text'
    },
    placeholder: String, // String:''
    rows: {
      // multiline 이 true인 경우 몇 줄 까지 보일지 설정 Number: 5
      type: [Number, String],
      default: 5
    },
    height: [String, Number], // textarea 높이
    width: [String, Number], // 넓이
    block: {
      // display block !!! width가 선언 된 경우 width가 우선
      type: Boolean,
      default: false
    },
    validate: {
      // 폼 검증 배열일 경우 함수에 의거, true일 경우 pattern 호출(password, email만) Array:[condition:function || message:text] or true
      type: Array,
      default: () => []
    },
    blurValidate: {
      type: Boolean,
      default: true
    },
    success: {
      // 폼 검증이 완료된 경우 check icon 표시 여부 Boolean: false
      type: Boolean,
      default: false
    },
    pattern: {
      // 체크할 패턴을 지정 String:''
      type: String,
      default: ''
    },
    maxLength: [String, Number], // maxlength String:''
    errorMessage: {
      // 강제 에러 출력 - check함수를 수행 하지 않음 String:''
      type: String,
      default: ''
    },
    multiline: {
      // textarea 여부,
      type: Boolean,
      default: false
    },
    disabled: Boolean, // disabled : false
    autofocus: {
      type: Boolean,
      default: false
    }, // 자동 포커스
    textRight: String, // text 정렬 오른 쪽으로
    tabIndex: [String, Number], // tabindex
    maxLength: [String, Number], // 최대 입력 가능한 글자 수 (type=text 에만 적용)
    readonly: Boolean // readonly Boolean: false,
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
      if (v != '') {
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
    value(after, before) {
      // 외부에서 model이 업데이트 되도 유효성 검사
      if (after != '') {
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
      } else {
        return false
      }
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

      let obj = {
        pattern: '',
        message: ''
      }

      if (type == 'eng') {
        // 영문만 유효성 검사
        obj.pattern = /^[a-z|A-Z]+$/
        obj.message = '영문만 입력 가능합니다.'

      } else if (type == 'engnum') {
        // 영문,숫자 유효성 검사
        obj.pattern = /^[(a-z|A-Z)0-9]+$/
        obj.message = '영문, 숫자만 입력 가능합니다.'

      } else if (type == 'id')  {
        // 아이디 영문,숫자,underbar(_) 사용 유효성 검사
        obj.pattern = /^[(a-z|A-Z)0-9]+[_]*[(a-z|A-Z)0-9]+$/
        obj.message = '영문, 숫자 입력만 가능합니다.( _ 중간 사용 가능)'

      } else if (type == 'num') {
        // 정수 유효성 검사
        obj.pattern = /^[0-9]+$/
        obj.message = '숫자만 입력 가능합니다.'
      } else if (type == 'wordnum') {
        // 영문,숫자 혼합사용 유효성 검사
        obj.pattern = /^([0-9]+[a-z|A-Z]+)|([a-z|A-Z]+[0-9]+)$/
        obj.message = '영문, 숫자 혼합하여 입력해주세요.'

      } else if (type == 'password') {
        obj.pattern = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])|(?=.*[a-zA-Z])(?=.*[0-9])|(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{8,16}$/
        obj.message = '영문, 숫자, 특수문자 중 2가지 이상을 조합하여 입력해주세요.(8~16자)'

      } else if (type == 'doamin') {
        // 도메인
        obj.pattern = /^([a-zA-Z0-9]{1,}\.?)[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z0-9]{2,})+(?:\:[0-9]{1,})*$/
        obj.message = '도메인주소 형식이 일치 하지 않습니다.(http://, https:// 제외)'

      } else if (type == 'email') {
        // 이메일 유효성 검사
        obj.pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        obj.message = '이메일 형식과 일치하지 않습니다.'

      } else if (type == 'tel') {
        // 전화 번호 유효성
        obj.pattern = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/
        obj.message = '전화번호 형식과 일치하지 않습니다.'
      }

      return obj
    },
    check() {
      // 임의로 지정된 에러가 없는 경우
      if (this.errorMessage === '') {
        // pattern check
        if (this.pattern != '') {
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

        // validate check
        if (this.validate.length > 0) {
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
      }
    },
    resetForm() {
      this.$emit('input', '')
    }
  }
}
</script>

<style scoped>
.input_wrap {
  display: inline-block;
}
.input_wrap.block {
  display: block !important;
}
textarea {
  resize: none;
}
</style>
