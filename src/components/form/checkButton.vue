<template>
  <div :class="['check-button', { button }]">
    <template v-if="button">
      <label
        style="margin-top: 5px;"
        :key="`keyword${i}`" v-for="(v, i) in list">
        <input
          type="checkbox"
          :name="name"
          :value="v.value"
          @click="checkValue($event, v.value, i)"
          v-model="val"
        />
        <span>{{ v.text }}</span>
      </label>
    </template>
    <template v-else>
      <label
        :key="'check-button-' + i"
        v-for="(v, i) in list">
        <input
          type="radio"
          :id="`${name}${i}`"
          :name="name"
          :value="v.value"
          @click="setIndex(i)"
          v-model="val"
          v-on="eventListeners"
          v-if="type == 'radio'"
        />

        <input
          type="checkbox"
          :id="`${name}${i}`"
          :value="v.value"
          :name="name"
          @click="checkValue($event, v.value, i)"
          v-model="val"
          v-on="eventListeners"
          v-else
        />

        {{ v.text }}
      </label>
    </template>

    <p
      :class="['description', { error: errorTransition }]"
      v-if="message !== '' || successful">
      <font-awesome-icon icon="fas fa-exclamation-circle" v-if="!isValidate" />
      {{ message }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'checkButton',
  props: {
    value: [],
    // checkbox, radio (String)
    type: {
      type: String,
      default: 'checkbox'
    },
    name: {
      type: String,
      required: true
    },
    // buttons list [](Array)
    items: {
      type: Array,
      required: true
    },
    // all check button view false(Boolean)
    all: {
      type: Boolean,
      default: false
    },
    // max check able 0(int)
    maxCheck: {
      type: Number,
      default: 0
    },
    validate: {
      type: Array,
      default: () => []
    },
    // 강제 에러 출력 - check함수를 수행 하지 않음
    errorMessage: {
      type: String,
      default: ''
    },
    // success: Boolean,
    button: {
      type: Boolean,
      default: false
    },
  },
  data: () => ({
    list: [],
    val: '',
    clickIndex: null,
    isValidate: true,
    checkPass: false,
    inputType: 'text',
    message: '',
    errorTransition: false
  }),
  watch: {
    value(v) {
      this.val = v
      this.resetValidate()
    },
    val(v) {
      this.$emit('input', v)
    },
    items(item) {
      if (item.length > 0) {
        this.list = [...item]

        this.allButtonAdd()
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
        input: evt => {},
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
      this.list = [...this.items]
    }

    if (this.all) {
      this.list.unshift({ text: '전체', value: '' })
    }

    if (this.type == 'checkbox') {
      this.val = ['']
    }

    this.val = this.value
  },
  methods: {
    allButtonAdd() {
      if (this.all) {
        if (this.list[0].value != '') {
          this.list.unshift({ text: '전체', value: '' })
        }
      }
    },
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
          if (this.maxCheck > 0) {
            if (this.val.length < this.maxCheck) {
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
      // 폼을 검수하여 값을 반환, 임의로 지정된 에러가 없는 경우
      if (this.errorMessage === '') {
        // validate check
        if (this.validate.length) {
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
      if (this.type === 'checkbox') {
        this.val = ['']
      } else {
        this.val = ''
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import './checkButton.scss';
</style>