<template>
  <div>
    <div class="wrap">
      <validate-form ref="form">
        <p>
          <h5>버튼 형식 checkbox</h5>
          <check-button
            button
            name="check1"
            :validate="rules.checkbox"
            :items="opt.checkbox"
            v-model="checkbox1"
          />
        </p>
        <p>
          <h5>일반 checkbox</h5>
          <check-button
            all
            name="check2"
            :items="opt.checkbox"
            v-model="checkbox2"
          />
        </p>
        <p>
          <h5>radio</h5>
          <check-button
            type="radio"
            name="check3"
            :validate="rules.radio"
            :items="opt.checkbox"
            v-model="radio"
          />
        </p>
        <p>
          <h5>input field</h5>
          <input-field
            block
            placeholder="이곳에 입력해주세요"
            :validate="rules.input"
            v-model="text"
          />
        </p>
        <p>
          <h5>textarea</h5>
          <input-field
            block
            multiline
            placeholder="이곳에 입력해주세요"
            :rows="10"
            :validate="rules.input"
            v-model="area"
          />
        </p>
        <p>
          <h5>input field number</h5>
          <number-format
            :validate="rules.input"
            v-model="number"
          />
        </p>
        <p>
          <h5>select box</h5>
          <select-box
            placeholder="한 가지 항목을 선택해주세요"
            :validate="rules.select"
            :options="opt.select"
            v-model="select"
          />
        </p>
        <p>
          <h5>switch button</h5>
          <switch-button validate="설정으로 바꿔주세요." v-model="bool" />
        </p>
        <p>
          <h5>small size switch button</h5>
          <switch-button
            small
            validate
            true-value="T"
            false-value="F"
            :label="label"
            v-model="boolValue"
          />
        </p>
        <p>
          <h5>validate wrapping</h5>
          <validate-wrap :validate="rules.file" :check-value="files">
            <input type="file" @change="fileSelected" />
          </validate-wrap>
        </p>
      </validate-form>

      <p>
        <button type="button" @click="validate">유효성 검사</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'formPrev',
  data() {
    return {
      checkbox1: [],
      checkbox2: [''],
      radio: '',
      text: '',
      area: '',
      number: 0,
      select: '',
      bool: false,
      boolValue: 'T',
      label: ['동의 안함', '동의'],
      files: [],

      opt: {
        checkbox: [],
        select: [],
      },

      rules: {
        checkbox: [v => !(v.length == 0) || '항목을 하나 이상 선택해주세요.'],
        radio: [v => !!v || '항목을 하나 선택해주세요.'],
        input: [v => !!v || '필수 입력 항목입니다.'],
        select: [v => !!v || '필수 선택 항목입니다.'],
        file: [v => !!v.legth || '파일을 선택해주세요.'],
      }
    }
  },
  created() {
    for (let value = 1; value <= 10; value++) {
      this.opt.checkbox.push({ text: `체크버튼${value}`, value })
      this.opt.select.push({ text: `선택 - ${value}`, value })
    }
  },
  methods: {
    fileSelected(evt) {
      if (evt.target.files.length) {
        this.files = evt.target.files
      } else {
        this.files = []
      }
    },
    validate() {
      this.$refs.form.validate()
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  width: 400px;
}

h5 {
  margin-bottom: 5px;
}
</style>