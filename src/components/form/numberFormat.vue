<template>
    <div
        :class="['input_wrap', {error: !isValidate}, {success: successful}, {block: block}]"
        :style="{width: width ? width : ''}">

        <input
            ref="input"
            type="text"
            class="block text text-right form-control form-control-sm"
            :style="{width: width ? width + 'px' : false}"
            :placeholder="placeholder"
            :tabindex="tabIndex ? tabIndex : false"
            :disabled="disabled"
            :readonly="readonly"
            :maxlength="maxLength ? maxLength : false"
            @focus="zeroCheck"
            @blur="zeroCheck"
            v-on="eventListeners">

        <p :class="['description', {error: errorTransition}]" v-if="message !== '' || successful">
            <i class="fas fa-exclamation-circle" v-if="!isValidate" />
            {{message}}
            <i class="fas fa-check-circle" v-if="successful" />
        </p>
    </div>
</template>

<script>
export default {
    name: 'numberFormat',
    props: {
        value: [String, Number],        // model
        placeholder: String,            // String:''
        validate: {                     // 폼 검증 배열일 경우 함수에 의거, true일 경우 pattern 호출(password, email만) Array:[condition:function || message:text] or true
            type: Array,
            default: () => []
        },
        success: {                      // 폼 검증이 완료된 경우 check icon 표시 여부 Boolean: false
            type: Boolean,
            default: false
        },
        errorMessage: {                 // 강제 에러 출력 - check함수를 수행 하지 않음 String:''
            type: String,
            default: ''
        },
        disabled: Boolean,              // disabled : false
        block: {                        // display block
            type: Boolean,
            default: false
        },
        width: {                        // 넓이
            type: [String, Number],
            default: ''
        },
        autofocus: {                    // 자동 포커스
            type: Boolean,
            default: false
        },
        tabIndex: {                     // tabindex
            type: [String, Number],
            default: 0
        },
        maxLength: {                    // 최대 입력 가능한 글자 수 (type=text 에만 적용)
            type: [String, Number],
            default: ''
        },
        readonly: {                     // readonly Boolean: false,
            type: Boolean,
            default: false
        },
        isPositive: {
            type: Boolean,
            default: false,
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
        value(after, before) {
            // 외부에서 model이 업데이트 되도 유효성 검사
            if (after !== '') {
                this.message = ''
                this.isValidate = true
                this.errorTransition = false

                this.$refs.input.value = this.format(after)
                this.updateValue()
            }
        },
        validate(obj) {
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
        updateValue() {
            // let value = parseInt(this.valueText.value.replace(/,/g, ''))
            let value = this.isPositive
                        ? this.valueText.value.replace(/[^\d]/g,'').replace(/^$/, 0)
                        : this.valueText.value.replace(/[^\d\-]/g,'').replace(/\-{2,}/g, '-').replace(/^$/, 0)

            value = value.charAt(0) === '-' ? '-'.concat(value.replace(/[-]/g,'')) : value.replace(/[-]/g,'')

            if (!isNaN(value)) {
                this.valueText.value = this.format(value)
                this.$emit('input', parseInt(value))
            }
        },
        format(v) {
            if (v !== '') {
                let minus = parseFloat(v) >= 0 ? false : true
                let find = /(\d+)(\d{3})/
                let spNum = v.toString().split('.')
                let num = parseInt(spNum[0].replace(/[^0-9]/g, '')).toString()

                while (find.test(num)) {
                    num = num.replace(find, '$1' + ',' + '$2')
                }

                if (minus) {
                    num = '-' + num
                }

                return num
            }

            return ''
        },
        check() {
            // 임의로 지정된 에러가 없는 경우
            if (this.errorMessage === '') {
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
        },
    }
}
</script>

<style scoped>
.input_wrap {display: inline-block; vertical-align: top;}
.input_wrap.block {display: block !important;}
</style>