<template>
  <div :class="['inline', 'ml-1', color, { button }]">
    <label
      :class="{ 'box-block': width != '' }"
      :style="{ width: width != '' ? width + 'px' : '' }"
      :key="'check-button-' + i"
      v-for="(v, i) in list">
      <input
        type="radio"
        :id="`${name}${i}`"
        :value="v.value"
        @click="setIndex(i)"
        v-model="val"
        v-on="eventListeners"
        v-if="type == 'radio'" />

      <input
        type="checkbox"
        :id="`${name}${i}`"
        :value="v.value"
        :checked="val.indexOf(v.value) > -1 ? true : false"
        @click="checkValue($event, v.value, i)"
        v-model="val"
        v-on="eventListeners"
        v-else />

      <span>{{ v.text }}</span>
    </label>

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
  name: 'checkButton',
  props: {
    value: [String, Number, Array, Boolean],
    type: {
      // checkbox, radio (String)
      type: String,
      default: 'checkbox'
    },
    all: {
      // all check button view false(Boolean)
      type: Boolean,
      default: false
    },
    items: {
      // buttons list [](Array)
      type: Array,
      required: true
    },
    maxCheck: {
      // max check able 0(int)
      type: Number,
      default: 0
    },
    validate: {
      type: Array,
      default: () => []
    },
    name: {
      type: String,
      required: true
    },
    errorMessage: {
      // 강제 에러 출력 - check함수를 수행 하지 않음 String:''
      type: String,
      default: ''
    },
    success: Boolean,
    width: {
      type: [String, Number],
      default: ''
    },
    button: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'secondary'
    }
  },
  data: () => ({
    list: [],
    val: '',
    max: 0,
    clickIndex: null,
    isValidate: true,
    checkPass: false,
    inputType: 'text',
    message: '',
    errorTransition: false
  }),
  watch: {
    value(v) {
      this.val = this.value
      this.resetValidate()
    },
    val(v) {
      this.$emit('input', v)
    },
    items(v) {
      if (v.length > 0) {
        this.list = v
      }
    },
    validate() {
      this.resetValidate()
    },
    errorTransition(v) {
      if (v) {
        setTimeout(() => {
          this.errorTransition = false
        }, 300)
      }
    }
  },
  computed: {
    eventListeners() {
      return {
        ...this.$listeners,
        input: evt => {
          this.$emit('input', this.val)
        },
        click: evt => {
          this.$emit('click', evt, this.clickIndex)
        }
      }
    },
    successful() {
      return this.success === true && this.isValidate && this.checkPass
    }
  },
  created() {
    if (this.items) {
      this.list = this.$copy(this.items)
    }

    if (this.all) {
      this.list.unshift({ text: '전체 선택', value: '' })
    }

    if (this.type == 'checkbox') {
      this.val = ['']
    }

    if (this.maxCheck > 0) {
      this.max = parseInt(this.maxCheck)
    }

    if (this.value) {
      this.val = this.value
    }
  },
  methods: {
    setIndex(index) {
      this.clickIndex = index
    },
    checkValue(evt, v, index) {
      this.setIndex(index)

      if (v === '') {
        this.val = ['']
        this.$el.querySelectorAll('input[type=checkbox]')[0].checked = true
      } else {
        if (this.val.indexOf('') > -1) {
          this.val.splice(0, 1)
        }

        if (this.val.indexOf(v) === -1) {
          if (this.max > 0) {
            if (this.val.length < this.max) {
              this.val.push(v)
            } else {
              evt.preventDefault()
            }
          } else {
            this.val.push(v)
          }
        } else {
          this.val.splice(this.value.indexOf(v), 1)
        }
      }
    },
    check() {
      // 폼을 검수하여 값을 반환
      // 임의로 지정된 에러가 없는 경우
      if (this.errorMessage === '') {
        // validate check
        if (this.validate.length > 0) {
          for (let i = 0; i < this.validate.length; i++) {
            let result = ''

            if (this.type == 'checkbox') {
              result = this.validate[i].call(null, Array.from(this.val))
            } else {
              result = this.validate[i].call(null, this.val)
            }

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
    resetValidate() {
      this.message = ''
      this.isValidate = true
      this.errorTransition = false
    },
    resetForm() {
      if (this.type == 'checkbox') {
        this.val = ['']
      } else {
        this.val = ''
      }
    }
  }
}
</script>

<style scoped>
label {
  margin-bottom: 0 !important;
}
label input {
  margin-right: 3px;
}
label:not(.box-block) + label {
  margin-left: 20px;
}
label.box-block {
  margin-bottom: 15px !important;
}
.button label span {
  display: inline-block;
  padding: 5px 13px;
  border-width: 1px;
  border-style: solid;
}
.button label:first-child span {
  border-radius: 4px 0 0 4px;
}
.button label:last-child span {
  border-radius: 0 4px 4px 0;
}
.button label + label {
  margin-left: -1px;
}
.button label input {
  display: none;
}

.button.primary label span {
  border-color: #1867c0 !important;
  color: #1867c0 !important;
}
.button.primary label span:hover {
  background-color: #1867c0aa !important;
  color: #fff !important;
}
.button.primary label input:checked + span {
  background-color: #1867c0;
  color: #fff !important;
}

.button.success label span {
  border-color: #4caf50 !important;
  color: #4caf50 !important;
}
.button.success label span:hover {
  background-color: #4caf50aa !important;
  color: #fff !important;
}
.button.success label input:checked + span {
  background-color: #4caf50 !important;
  color: #fff !important;
}

.button.info label span {
  border-color: #5cbbf6 !important;
  color: #5cbbf6 !important;
}
.button.info:hover label span:hover {
  background-color: #5cbbf6aa !important;
  color: #fff !important;
}
.button.info label input:checked + span {
  background-color: #5cbbf6 !important;
  color: #fff !important;
}

.button.secondary label span {
  border-color: #6c757d !important;
  color: #6c757d !important;
  transition: all .2s linear;
}
.button.secondary:hover label span:hover {
  background-color: #6c757daa !important;
  color: #fff !important;
}
.button.secondary label input:checked + span {
  background-color: #6c757d !important;
  color: #fff !important;
}
</style>
