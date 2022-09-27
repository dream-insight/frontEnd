# Form validate Components
 validateForm Component와 호환 가능한 폼을 통해 간편히 유효성 검사를 실행하기 위해 만들어진 컴포넌트 모음입니다.<br>
 CSS 변경시에는 컴포넌트 내부 CSS를 복사, 제거 후 형식에 맞춰서 작성하세요.

* [checkButton](#1-checkButton)
* [inputField](#2-inputField)
* [selectBox](#-checkButton)
* [numberFormat](#-checkButton)
* [switchButton](#-checkButton)
* [validateWrap](#-checkButton)
* [validateForm](#-checkButton)

  > validation 예제를 확인 하세요. [예제 보기](https://github.com/dream-insight/frontEnd/blob/main/src/views/form.vue)
---

## 1. checkButton
  * <code>\<input type="checkbox" /></code>, <code>\<input type="radio" /></code> 버튼을 표시해줍니다.

### 1.1. 사용방법
* all 옵션을 설정해 주면 빈 값의 '전체' 버튼을 자동 생성해줍니다.
* checkbox, radio 버튼의 특성상 name 값을 필히 설정해줘야 합니다.
* checkbox model의 경우 all 설정이 되어 있으면 data 변수의 기본값을 <code>['']</code>로 해줘야 정상적으로 '전체'에 체크 됩니다.
* buttons 옵션을 설정해주면 버튼 디자인으로 항목이 나열 됩니다.
```vue
<template>
  <div>
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
        :max-check="3"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkbox1: [],
      checkbox2: [''],
      radio: '',
      opt: {
        checkbox: [],
      },

      rules: {
        checkbox: [v => !(v.length == 0) || '항목을 하나 이상 선택해주세요.'],
        radio: [v => !!v || '항목을 하나 선택해주세요.'],
      }
    }
  },
  created() {
    for (let value = 1; value <= 10; value++) {
      this.opt.checkbox.push({ text: `체크버튼${value}`, value })
    }
  },
}
</script>
```

### 1.2. Props

| Name | Type | Default | Require | Description |
|-------|---- |---------|---------|-------------|
| value | Any | <code>none</code> | false | v-model |
| type | String | <code>checkbox, radio</code> | false | checkbox 또는 radio 선택 |
| name | String | <code>''</code> | *true* | input name 애드립뷰트 값을 설정 |
| items | Array | <code>[Object]</code> | *true* | 항목을 만들 배열 데이터 <br> [{ text: '', value: '' }] |
| all | Boolean | <code>false</code> | false | '전체' 항목을 추가 해주는 옵션 |
| maxCheck | Number | <code>0</code> | false | 0이상의 값 부여시, 체크된 항목의 수량이 maxCheck 만큼으로 재한 |
| validate | Array | <code>[Function]</code> | false | 폼 유효성 검사에 필요한 callback 함수를 배열에 나열여 입력 |
| errorMessage | String | <code>''</code> | false | 강제로 에러 메시지를 출력, 유효성 검사에서 통과 하지 못 함 |
| button | Boolean | <code>false</code> | false | checkbox, radio 폼이 버튼 형식으로 디자인 변경 |

:arrow_up: [목차](#-Form-validate-Components)

---

## 2. inputField
  * <code>\<input type="text" /></code>, <code>\<textarea>\</textarea></code> 폼을 표시 해줍니다.

### 2.1. 사용방법
```vue
<template>
  <div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      area: '',

      rule: [v => !!v || '필수 입력항목 입니다.']
    }
  },
}
</script>
```

### 2.2. Props

| Name | Type | Default | Require | Description |
|-------|---- |---------|---------|-------------|
| value | String | <code>''</code> | false | v-model |
| multiline | Boolean | <code>false</code> | false | textarea 폼으로 변경 |
| block | Boolean | <code>false</code> | false | display: block 설정 |
| rows | Number | <code>5</code> | false | multiline 설정시 textarea 높이를 설정 |
| width | String, Number | <code>none</code> | false | 넓이 설정 (block 보다 우선) |
| height | String, Number | <code>none</code> | false | multiline 설정시 textarea 높이를 설정 (rows 보다 우선) |
| validate | Array | <code>[Function]</code> | false | 폼 유효성 검사에 필요한 callback 함수를 배열에 나열 입력<br> pattern 옵션이 설정 되어 있는 경우 pattern 검수가 먼저 이루어 집니다. |
| blurValidate | Boolean | <code>false</code> | false | 폼의 커서가 없어 질때 유효성 검사를 할 것인지 여부 |
| maxLength | String, Number | <code>none</code> | false | 최대 입력 가능한 문자 수 |
| errorMessage | String | <code>''</code> | false | 강제로 오류 메시지를 표시 |
| disabled | Boolena | <code>false</code> | false | 폼 사용불가 처리 |
| readonly | Boolena | <code>false</code> | false | 폼 입력 불가 처리 |
| autofocus | Boolena | <code>false</code> | false | 화면 로드시 커서가 자동으로 들오 오도록 할 것인지 |
| textRight | Boolena | <code>false</code> | false | 텍스트 정렬 방향을 우측으로 설정 |
| tabIndex | String, Number | <code>none</code> | false | 탭 순서 입력시 포커스 이동 순서 |
| pattern | String | <code>case</code> | false | value 값에 대해 정규식 검사 실행 후 매칭되지 않을 경우 validation 오류 처리 |
| | | eng | | 영문만 입력 가능 |
| | | engnum | | 영문, 숫자만 입력 가능 |
| | | id | | 영문, 숫자, underbar(_) 입력가능 |
| | | num | | 숫자만 입력 가능 |
| | | wordnum | | 영문, 숫자 혼합 입력 |
| | | password | | 영문, 숫자, 특수문자 2가지 이상 조합 입력 |
| | | doamin | | 도메인 형식 입력 |
| | | email | | 이메일 형식 입력 |
| | | tel | | 전화번호 형식 입력 (10~11자리) |

:arrow_up: [목차](#-Form-validate-Components)

---

## 3. numberFormat
  * <code>\<input type="text" /></code> 폼에 숫자만 입력 가능한 필드를 생성합니다
  * 필드에는 숫자만 입력가능하며, 자동으로 1,000 단위로 콤마를 생성 해줍니다.
  * model 변수에는 숫자(<code>Number</code>)형으로 입력됩니다.
  * 필드 값이 없을 경우 자동으로 0을 표시 합니다.
  * 소숫점 입력은 불가능합니다.

### 2.1. 사용방법
```vue
<template>
  <div>
    <p>
      <number-format
        block
        :validate="rule"
        v-model="text"
      />
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0,
      rule: [v => !!v || '필수 입력항목 입니다.']
    }
  },
}
</script>
```

### 3.2. Props

| Name | Type | Default | Require | Description |
|-------|---- |---------|---------|-------------|
| value | String | <code>''</code> | false | v-model |
| block | Boolean | <code>false</code> | false | display: block 설정 |
| width | String, Number | <code>none</code> | false | 넓이 설정 (block 보다 우선) |
| validate | Array | <code>[Function]</code> | false | 폼 유효성 검사에 필요한 callback 함수를 배열에 나열 입력 |
| maxLength | String, Number | <code>none</code> | false | 최대 입력 가능한 문자 수 |
| errorMessage | String | <code>''</code> | false | 강제로 오류 메시지를 표시 |
| disabled | Boolena | <code>false</code> | false | 폼 사용불가 처리 |
| readonly | Boolena | <code>false</code> | false | 폼 입력 불가 처리 |
| autofocus | Boolena | <code>false</code> | false | 화면 로드시 커서가 자동으로 들오 오도록 할 것인지 |
| isPositive | Boolena | <code>false</code> | false | 마이너스(-)값 입력 불가 설정 |

:arrow_up: [목차](#-Form-validate-Components)

---