<template>
    <div class="switch_btn_wrap">
        <label :class="['switch_btn', {small: small}, {error: onError}]">
            <input
                type="checkbox"
                :checked="value == trueValue"
                v-on="eventListeners">

            <span></span>

            {{labelText}}
        </label>

        <p :class="['description', {error: errorTransition}]" v-if="!isValidate">
            <i class="fas fa-exclamation-circle" v-if="!isValidate" />
            {{message}}
        </p>
    </div>
</template>

<script>
export default {
    name: 'switchButton',
    props: {
        small: {
            type: Boolean,
            default: false
        },
        value: [String, Boolean],
        label: {                        // array index 0 => false label, index 1 => true label
            type: [Array, Object],
            default: () => ['미설정', '설정'],
        },
        validate: {                     // form check validate Boolean: false
            type: [Boolean, String],
            default: false
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
                if (this.value === true) {
                    this.resetForm()

                    return true
                } else {
                    this.message = (typeof this.validate == 'string') ? this.validate : `${this.label[1]}을(를) 선택해주세요.`
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

<style scoped>
/* switch_btn */
.switch_btn_wrap {display: inline-block;}
.switch_btn {position:relative; line-height: 31px; cursor: pointer; font-size:14px; margin: 0;}
.switch_btn input[type=checkbox] {position:absolute; top:0; left:0; opacity:0;}
.switch_btn input[type=checkbox] + span {position:relative; display:inline-block; width:57px; height: 31px; box-sizing:border-box; border:2px solid #ccc; background:#ccc; border-radius: 25px; vertical-align: top; margin-right:5px; transition:all 0.3s;}
.switch_btn input[type=checkbox] + span:hover {border:2px solid rgb(158, 158, 158); background:rgb(158, 158, 158);}
.switch_btn input[type=checkbox] + span:after {position:absolute; top:0; left:0; width:27px; height:27px; background:#fff; border-radius:100%; content:''; transition:all 0.3s;}
.switch_btn input[type=checkbox]:checked + span { border:2px solid #64B5F6; background:#64B5F6; }
.switch_btn input[type=checkbox]:checked + span:hover { border:2px solid #4490cf; background:#4490cf; }
.switch_btn input[type=checkbox]:checked + span:after {left:26px;}

.switch_btn.small {line-height:22px; font-size:12px}
.switch_btn.small input[type=checkbox] + span {width:38px; height:22px; border-radius: 11px; margin-right:5px;}
.switch_btn.small input[type=checkbox] + span:after {width:18px; height:18px;}
.switch_btn.small input[type=checkbox]:checked + span:after {left:16px;}

.error {color: #f81823;}
</style>