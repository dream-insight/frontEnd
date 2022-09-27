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
          <input-field
            block
            placeholder="이곳에 입력해주세요"
            :validate="rules.input"
            v-model="text"
          />
        </p>
        <p>
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
          <number-format
            :validate="rules.input"
            v-model="number"
          />
        </p>
        <!-- <p><select-box /></p>
        <p><switch-button /></p> -->
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
      switch: false,

      opt: {
        checkbox: [],
      },

      rules: {
        checkbox: [v => !(v.length == 0) || '항목을 하나 이상 선택해주세요.'],
        radio: [v => !!v || '항목을 하나 선택해주세요.'],
        input: [v => !!v || '필수 입력 항목입니다.']
      }
    }
  },
  created() {
    for (let value = 1; value <= 10; value++) {
      this.opt.checkbox.push({ text: `체크버튼${value}`, value })
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap { width: 400px; }
h5 {
  margin-bottom: 5px;
}
</style>