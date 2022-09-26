# VueJS Framework v2.x Style guide

## 참조 문서

* [ES6](https://www.w3schools.com/js/js_es6.asp)
* [Vue 2.x](https://v2.vuejs.org/)
* [SCSS](https://sass-lang.com/)
* [작성 참조 - AirBnB](https://github.com/tipjs/javascript-style-guide)
* [Vue2.x 컴포넌트 모음](https://github.com/dream-insight/frontEnd/tree/main/src)
---

## 목차

1. [기본 형태](#1-기본-형태)
2. [명명 규칙](#2-명명-규칙)
3. [변수 선언과 데이터형](#3-변수-선언과-데이터형)
4. [함수](#4-함수)
5. [화살표 함수](#5-화살표-함수)
6. [오브젝트 프로퍼티](#6-오브젝트-프로퍼티)
7. [문자열](#7-문자열)
8. [연산자](#8-연산자)
9. [블럭](#9-블럭)
10. [반복문](#10-반복문)
11. [세미콜론](#11-세미콜론)
12. [공백과 들여쓰기](#12-공백과-들여쓰기)
13. [코멘트](#13-코멘트)
14. [Vue 템플릿](#14-Vue-템플릿)
15. [컴포넌트 SFC](#15-컴포넌트-SFC)
16. [이벤트 버스](#16-이벤트-버스)
17. [상태 관리자 Vuex](#17-상태-관리자-Vuex)
18. [라우터 Router](#18-라우터-Router)

---

## 1. 기본 형태

### 1.1. VueJS v2.x Framework 기본 형식은 아래와 같이 지켜 주세요.
```vue
<template>
  <div>
    ...
  </div>
</template>

<script>
import componentA from './componentA'
import componentB from './componentB'
import mixinA from '@/mixins/mixinA'

export default {
  name: 'compnentName (파일명이 겹치는 경우 무조건 작성)',
  components: {
    componentA,
    compB: componentB
  },
  mixins: [mixinA]
  props: {
    apple: type,
    banana: {
      type: String
    }
  },
  data() {
    return {
      ...
    }
  },
  data: () => ({
    // 직접적으로 this를 쓸 필요가 없는 경우 단축하여 사용합니다.
    ...
  }),
  watch: {
    apple(v, preV) {
      // 인자 변수 명은 구분 하기 쉽도록 사용
    }
  },
  computed: {
    fluits() {
      return this.apple != this.banana
    }
  },
  beforeCreated() {
    // 라이프 사이클훅은 순서대로 배치
    ...
  },
  destoryed() {
    ...
  },
  methods: {
    method1() {
      ...
    }
  }
}
</script>

<style lang="scss">
...
</style>
```
> VueJS v2.x Composition API는 사용하지 않습니다.

:arrow_up: [목차](#목차)

## 2. 명명 규칙

### 2.1. 공통
* 모든 요소(파일, 변수 등등)에 대한 이름은 영문 + 카멜케이스로 작성합니다.
* 이름 가장 앞자리를 숫자로 선언하면 안됩니다.
  > 파일, 폴더명 역시 동일하게 취급합니다.

* 필히 한 단어 이상의 유의미한 단어로 조합하고, 의미가 불분명한 줄임 단어를 사용하지 않습니다.
  > 개발시 많이 사용되는 btn, chk, bln, lbl 등등의 줄임단어는 사용하여도 무방합니다.

* javascript의 예약어를 변수나 함수, class명으로 사용 하지 않습니다.
  > 단, plugin, component를 참조하여 호출 하는 경우는 허용 합니다.
```vue
<script>
import modal from '@/components/modal'

export default {
  name: 'component',
  data() {
    return {
      // Bad
      Number: 0,
    }
  },
  created() {
    // Bad
    this.Number = 10

    // it's okay
    modal.alert('test')
  },
  methods: {
    // Bad
    alert() {
      ...
    },
    confirmLayer() {
      // it's okay
      modal.confirm({
        message: 'test',
        okay: () => {
          ...
        }
      })
    }
  }
}
</script>
```

### 2.2. 파일명 (컴포넌트 명)
* 기능에 대한 정의를 기술하듯 작성합니다.
```javascript
/* 카테고리를 3단으로 선택할 수 있는 컴포넌트 */
// Bad
3depthCate.vue      // 파일명 역시 숫자로 시작하여서는 안됩니다.
ctgry3Depth.vue     // 어떤 사람은 ctgry이 무엇인지 모를 수도 있습니다

// Good
categorySelector.vue

/* 체크 버튼 자동으로 생성해주는 컴포넌트 */
// it's okay
chkBtn.vue

// Good
checkButton.vue
```

### 2.3. 모듈 export, import
* <code>export default</code> 된 모듈은 명확한 의미부여하여 명명 해주세요.
* 구조화 된 모듈은 명명된 이름을 그대로 사용하고 as를 통한 재명명은 하지 않도록 합니다.
```javascript
export { getCategory }

// Bad
import { getCategory as category } from './module'

// Good
import { getCategory } from './module'

export default codeLibrary

// Bad
import library from './module'

// Good
import codeLib from './module'
```

:arrow_up: [목차](#목차)

---

## 3. 변수 선언과 데이터형

### 3.1. 기본 형태의 Vue v2.x은 Type Script를 사용하기 어려운 관계로 필히 변수 선언시 타입에 맞게 정의 합니다.
```vue
export default {
  data: () => ({
    name: '',       // String -> 공백
    index: -1,      // Number -> 숫자 형식의 기본값
    bool: false,    // Boolean -> true or false (0, 1 사용 불가)
    ary: [],        // Array -> 빈 배열
    obj: {},        // Object -> 빈 오브젝트
    opt: null,      // 또는 null (3.2 항목 참조)
  })
}
```

### 3.2. 변수 선언시 <code>null</code> 타입 선언은 지양하고 undefined 선언은 하지 않습니다.
* <code>null</code> 타입 선언시 아래의 항목을 준수하여주세요.
* 비교, 제어시 필히 <code>null</code>로 비교 해야 하며, 초기화시에도 <code>null</code>로 지정합니다.
  ```vue
  <script>
  export default {
    data() {
      return {
        // Bad
        name: null,
      }
    }
    created() {
      this.name = 'dreaminsight'

      let obj = null

      // Bad
      if (!obj) {
        ...
      }

      // Good
      if (obj === null) {
        ...
      }
    }
  }
  </script>
  ```

### 3.3. 변수 scope
* 변수 선언시에는 <code>let, const</code> block scoped 선언 하고, <code>var</code>로 선언하지 마세요.
* 상수는 <code>const</code>사용 하고, 이는 <code>export default</code> 블럭 밖에서 선언이 가능 합니다.
* 재할당 가능한 변수는 <code>let</code>으로 선언 하고, <code>export default</code> 블럭 밖에서 선언하지 않도록 합니다.
```vue
<script>
// it's okay
const seed = 1

// Bad
let main = 'banana'

export defualt {
  data() {
    isOpenMarket: false,
    // main: '',
  },
  created() {
    if (this.isOpenMarket === false) {
      main = 'apple' // => this.main
    }
  },
  mounted() {
    buyFluits() {
      // Good
      let lemon = 2

      // if (this.isOpenMarket && this.main == 'apple') {
      if (this.isOpenMarket && main == 'apple') {
        lemon += seed
      } else {
        lemon--
      }

      return lemon
    }
  }
}
</script>
```

### 3.4. 변수 선언 시 콤마를 사용하여 다중 선언 하는 방식은 좋지 않습니다.
```vue
<script>
export default {
  methods: {
    getData() {
      // Bad
      let alpha = '', bravo = '', charlie = ''
      const dream = 'insight', by = 'dream'

      // Good
      let alpha = ''
      let bravo = ''
      let charlie = ''
      const dream = 'insight'
      const by = 'dream'
    }
  }
}
</script>
```
  > 코드를 작성하면서 간혹 비슷한 형태의 여러코드를 수정해야 하는 때도 있습니다.<br>
  그러한 그러한 상황에 위와 같은 코드 나열 방식은 우리를 매우 불편하게 합니다.

:arrow_up: [목차](#목차)

---

## 4. 함수
### 4.1. watch, computed, methods 등에 함수 정의시 단축구문을 이용하세요.
  > 단, computed에 간단한 연산 반환에 대해서는 람다식을 허용합니다.

```vue
<script>
export default {
  data() {
    return {
      name: ''
    }
  },
  watch: {
    // Bad
    nameCheck: (val, preVal) => {
      ...
    }
    // Good
    checkName(val, preVal) {
      ...
    }
  },
  computed: {
    // Bad
    nameText: () => this.name + '씨\n 드림 인사이트 방문을 환영합니다.\n' + this.name.substr(0, 2) + '님 좋은 시간 보내세요.'
    // it's okay
    nameChange: () => this.name + '님',
    // Good
    nameComment() {
      let text  = this.name.substr(0, 1) +
                  '씨\n 드림 인사이트 방문을 환영합니다.\n' +
                  this.name.substr(0, 2) +
                  '님 좋은 시간 보내세요'

      return text
    }
  },
  methods: {
    // Good
    getNameString() {
      return this.name
    }
  }
}
</script>
```

### 4.2. 함수선언과 함수식을 구분하여 사용하세요.
```javascript
// Bad (함수식)
const func = function() {
  ...
}

// Good (함수 선언)
function func() {
  ...
}

// Good (화살표 함수식)
const func = () => {
  ...
}
```
  > 함수 선언 방식과, 함수식으로 정의 하는 방식은 hoist 되는 방식이 다릅니다.

```javascript
// it's working
getCodeName('tag')

function getCodeName(key) {
  return code[key]
}

// error
getCodeString('tag')

const getCodeString = (key) => {
  return code[key]
}

const getCodeString = function(key) {
  return code[key]
}
```
> 우리가 변수를 사용하기 전에 먼저 선언해주는 것과 같습니다. 함수 선언 방식은 변수를 선언하는 것과 동일하게 여겨집니다.

### 4.3. 함수를 명확히 구분하여 사용하세요. (void, return)
* 대부분의 언어에서는 함수에 대해 명확히 정의 하기를 요구합니다.
* 반환 값이 있는 함수 <code>return int, str, bool</code> 등등
* 단순 기능 수행의 <code>void</code> 입니다.
```vue
<script>
export default {
  data() {
    return {
      userName: '',
    }
  },
  created() {
    this.userName = this.getUserName()
  },
  methods: {
    getUserName() {
      // return
      let text = '당신은 ' + this.$store.getters.getFamilyName +
                '씨이고, 이름은 ' + this.store.getters.getYourName + '입니다'

      return text
    },
    setUserName() {
      // void
      this.userName = '당신은 ' + this.$store.getters.getFamilyName +
                      '씨이고, 이름은 ' + this.store.getters.getYourName + '입니다'
    }
  }
}
</script>
```

* 위 두가지 함수는 거의 비슷한 일을 하지만, 명백히 다른 함수 입니다.
* 우리는 보통 위와 같이 사용 하고 있지만, 쉽게 아래와 같은 실수를 범하게 됩니다.
```vue
<script>
export default {
  data() {
    return {
      name: '홍길동',
      familyName: ''
    }
  },
  created() {
    this.isUserName()
  },
  methods: {
    // Bad
    isUserName() {
      if (this.name.substr(0, 1) != '김') {
        return false
      } else {
        this.familyName = this.name.substr(0, 1)
      }
    },
    // Good
    setFamilyName() {
      if (this.name.substr(0, 1) !=  '김') {
        return
      }

      this.familyName = this.name.substr(0, 1)
    }
  }
}
</script>
```
* 위와 같이 함수 수행을 종료하고자 <code>return false</code>를 사용하는 것은 아무 의미 없습니다.
* 따라서 void 함수 수행을 종료하고자 할 때는 오직 <code>return</code>으로 종료시켜 주세요.

### 4.4. 함수의 인자(parameters)는 참조로만 사용하세요.
* 함수의 전달 인자에 default 값을 사용하여, 제어 문에서 그 값을 비교하세요.
* 전달 인자의 값을 직접적으로 변이 하여 사용하게 되면, 찾기 힘든 오류가 발생 할 수도 있습니다.
```vue
<script>
export default {
  created() {
    let size = this.getArraySize()
    let objSize = this.getObjectLength()
  },
  methods: {
    // Bad
    getSizeOfArray(prm) {
      if (params === undefined) {
        prm = []
      }

      return prm.length
    },
    // Good
    getObjectLength(prm = {}) {
      return Object.keys(prm).length
    }
  }
}
</script>
```

### 4.5. this의 사용
* 당신이 아직 초급자리면 this에 대해서 이해하는데 시간이 필요할 수도 있습니다.
* 아래의 코드를 보고 간단히 vuejs의 this를 손쉽게 사용하세요.
```vue
<template>
  <div>
    <p><button type="button" ref="button1">this !== vue</button></p>
    <p><button type="button" ref="button2">this === vue</button></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '이것은 vuejs의 this입니다.'
    }
  },
  mounted() {
    // wrong, 이것은 vuejs this를 참조하지 못합니다.
    this.$refs.button1.addEventListener('click', function() {
      alert(this.message)
    })

    // Bad
    const that = this

    this.$refs.button1.addEventListener('click', function() {
      alert(that.message)
    })

    // Good, 화살표 함수를 이용하여 vuejs this에 접근 할 수 있습니다.
    this.$refs.button2.addEventListener('click', () => {
      alert(this.message)
    })
  },
}
</script>
```
* 간단히 설명 하겠습니다. 위와 같이 <code>callback</code> 함수를 화살표 무명 함수가 아닌 일반 무명 함수로 사용할 경우,
<code>this</code>는 vue가 아니라 무명 함수가 됩니다.
* <code>callback</code> 함수에서 vue를 참조하는 this를 사용하고 싶을 경우 반듯이 화살표 무명 함수를 사용하세요.
  > 관련 게시물을 확인하여 좀더 많은 정보를 얻을 수 있습니다. [블로그 링크]


:arrow_up: [목차](#목차)

---

## 5. 화살표 함수

### 5.1. 함수에 전달되어 지는 함수(callback)는 필히 화살표 무명함수를 사용하세요.
```javascript
const ary = [1, 2, 3, 4, 5]

// Bad
const bad = ary.map(function(num) {
  return num + 5
})

// Good
const good = ary.map((item) => {
  return num + 5
})
```

### 5.2. 간단한 연산에 대해서는 암시적 <code>return</code>을 이용하여 주세요.
```javascript
const ary = [1, 2, 3, 4, 5]

// it's okay
const okay1 = ary.map((num) => parseInt(intNum) + ((parseInt(intNum) / 2) * 0.1))

// it's okay
const okay2 = ary.map((num) => {
  let intNum = parseInt(num)

  return intNum + ((intNum / 2) * 0.1)
})

// Good
const good = ary.map(num => num + 5)

// Bad
const bad = ary.map((num) => {
  return num + 5
})
```

### 5.3. 함수의 인자가 1개인 경우 괄호를 생략할 수 있고, 사용되지 않는 인자는 생략 하여도 됩니다.
```javascript
const ary = [1, 2, 3, 4, 5]

// Good
ary.map(item => item  + 1)

// Good
ary.map((item, index) => item + index)

// it's okay
ary.filter((, index) => index % 2 == 0)
```

:arrow_up: [목차](#목차)

---

## 6. 오브젝트 프로퍼티

### 6.1. 프로퍼티에 값을 할당할 시 가능한한 단축구문 사용하세요.
```javascript
let text = '드림인사이트'
let value = 'dreaminsight'

// Bad
let obj = {
  text: text,
  value: value,
}

// Good
let obj = { text, value }
```

### 6.2. 프로퍼티에 접근시 점(<code>.</code>)을 이용해주세요.
```javascript
let obj = {
  text: '드림인사이트',
  value: 'dreaminsight'
}

// Bad
console.log(obj['text'])

// Good
console.log(obj.text)
```

### 6.3. 변수로 접근 시에는 배열형으로 접근하세요.
```javascript
let obj = {
  text: '드림인사이트',
  value: 'dreaminsight'
}

// Bad
const getText = (target) => eval(`obj.${target}`)

// Good
const getText = (target) => obj[target]

```

### 6.4. data에 선언된 오브젝트
* data에 선언된 변수(properties)들은 우리에게 매운 편리한 기능을 재공 합니다.
* 다만 그 편리함이 우리를 불편하게도 합니다. 아래의 예를 보겠습니다.
```vue
<script>
export default {
  data() {
    return {
      obj: {
        text: '드림인사이트',
        value: 'dreaminsight',
      }
    }
  },
  created() {
    this.checkData()
  },
  methods: {
    checkData(prm = '') {
      let result = false
      const cp = this.obj

      if (prm == '') {
        this.obj.text = ''
      }

      if (JSON.stringify(cp) === JSON.stringify(this.obj)) {
        result = true
      }

      console.log(cp.text) // print ''

      return result
    }
  }
}
</script>
```
* 위의 코드에서 <code>this.obj</code> 값을 복사하여 차후 비교 하기 위한 코드를 작성하였다고 가정 해보겠습니다.
* 하지만 중간에 <code>this.obj.text</code> 값을 변경하였고, 이후 <code>cp.text</code> 값을 확인 해보면 <code>''</code> 공백 값으로 변경된 것을 확인할 수 있습니다.
* 이것은 깊은 복사(Deep copy), 얕은 복사(Shallow copy)에 의하여 발생하는 현상입니다.
  > 깊은 복사와, 얕은 복사에 대해서는 링크를 참조 해주세요. [블로그 링크]
```javascript
const cp = JSON.parse(JSON.stringify(this.obj)) // it's okay
const cp = Object.assign({}, this.obj) // Good
const cp = { ...this.obj } // Best
```
* 위와 같이 object 깊은 복사(shallow copy)를 통해 데이터 참조의 고리를 끊을 수 있게 됩니다.

:arrow_up: [목차](#목차)

---

## 7. 문자열
### 7.1. 문자열은 더블쿼트 <code>""</code>는 사용하지 않습니다. 모든 문자열은 싱글쿼트로 <code>''</code> 처리 합니다
```javascript
// Bad
const str = "드림인사이트 개발팀"

// Good
const str = '드림인사이트 개발팀'
```

### 7.2. 문자열 연결할 수 있는 방법은 <code>String().concat()</code>, <code>+</code> 등이 있지만, 사용하지 않습니다.
```javascript
const company = '드림인사이트'
const team = '개발팀'

// Bad
const str1 = company.concat(' ', team)    // '드림인사이트 개발팀'
const str2 = company + ' ' + team         // '드림인사이트 개발팀'
```

### 7.3. 템플릿 문자열 조합은 복잡한 문장을 만들때도 매우 편리 하며, 특히 가독성이 좋습니다.
```javascript
const gender = 'M'
const name = 'Julia'
const str = '당신의 성별은'
let result = ''

if (gender === 'F') {
  result = `${str} 여자이고, 이름은`
}

if (result === '') {
  result = `${str} 남자이고, 이름은 알 수 없습니다`
} else {
  result = `${result} ${name}입니다`
}
```

### 7.4. 문자열이 너무 길 경우, 템플릿 문자열을 활용하여 줄내림을 표현합니다.
```javascript
const str = `우리집강아지는 복슬 강아지,
학교갔다 돌아오면 멍멍멍,
꼬리치며 따라오며 멍멍멍`
```
  > 다만 위와 같은 방식은 가독성이 떨어지기 때문에, 별도의 문자열 Library를 생성하여 사용하기를 권합니다.

:arrow_up: [목차](#목차)

---

## 8. 연산자
### 8.1. 비교 연산자
* 연산자는 정확힌 비교를 위하여 <code>===</code>, <code>!==</code>를 사용하세요.
* 문자형은 <code>''</code> 값을 제외한 모든 값을 <code>true</code>로 간주 됩니다.
```javascript
const apple = 'apple'
const banana = ''

// Bad
if (apple != banana) {
  ...
}

// Bad
if (banana == '') {
  ...
}

// Good
if (apple === banana) {
  ...
} else if (apple !== '') {
  ...
}
```
* 숫자형을 비교 하기 위해서는 해당 값을 필히 Type Casting(Number, parseInt, parseFloat) 후 비교 해주세요.
> 비교 대상의 변수의 자료형을 알 수 없는 경우, 또는 API를 통해 받은 값
* 숫자형은 0 이외의 값을 모두 <code>true</code>로 간주 됩니다.
```javascript
const hour = 3
const min = '3'

// Bad
if (hour == min) {
  ...
}

// Good
if (hour === Number(min)) {
  ...
}
```
* 배열로 선언된 변수는 <code>true</code>로 간주 됩니다. 비교 시에는 <code>Array.length</code>를 통해 값을 변화 여부를 확인 합니다.
```javascript
const ary = []

if (ary) // true

if (ary.length) // false
```

* 오브젝트 선언시 빈 오브젝트(<code>{}</code>)로 값을 할당하였을 경우 <code>true</code>로 간주 됩니다.
* 오브젝트의 프로퍼티가 있는지 확인 하기 위해서는 꼭 <code>Object.keys().length</code>로 검수하세요.
* 오브젝트의 특정 프로퍼티 존재 유무를 확인 할 시에는 <code>undefined</code>로 비교해주세요.
* 만약, <code>null</code>로 초기화 선언된 object는 비교 하기 위해서는 반듯이 값이 <code>null</code>인지 확인하세요.
```javascript
const obj = {}

if (obj) // true

if (Object.keys(obj).length) // false

// Bad
if (!obj.text) {
  obj.text = 'dreaminsight'
}

// Good
if (obj.text === undefined) {
  obj.text = 'dreaminsight'
}

const obj = null

// Bad
if (!obj) {
  ...
}

// Good
if (obj === null) {
  ...
}
```

### 8.2. 논리 연산자 및 3항 연산자
```javascript
// 논리 연산을 통한 값 할당
const str = 'apple'

const apple = (str === 'apple') && true       // true
const banana = (str !== 'apple') && 'banana'  // false

const apple = (str !== 'apple') || 'banana'   // 'banana'
const banana = (str === 'apple') || false     // true

const apple = (str !== 'apple') ? true : false    // false
```

* <code>&&</code> 연산은 왼쪽항이 <code>true</code>일때 오른쪽 항의 값이 할당됩니다.
* <code>||</code> 연산은 왼쪽항이 <code>false</code>일때 오른쪽 항의 값이 할당됩니다.
* 3항 연산은 조건부가 <code>true</code> 일때 <code>:</code>기준 왼쪽값을 할당, <code>false</code>일때 오른쪽 값을 할당 됩니다.
* 중첩 3항 연산 사용은 지양합니다.
```javascript
const apple = false
const pineApple = true

// Bad
let buyCount = apple ? 10 : pineApple ? 2 : 0

// Good
let buyCount = 0

if (apple) {
  buyCount = 10
} else if (pineApple) {
  buyCount = 2
}
```
  > 중첩 3항 연산은 길이가 짧다고 하여도, 가독성이 매우 떨어집니다. 이는 익숙하지 않은 사람에게 더욱더 그렇습니다.

:arrow_up: [목차](#목차)

---

## 9. 블럭
### 9.1. 블럭이 필요한 모든 문법에서 블럭을 사용하세요. 람다식은 예외로 합니다.
```javascript
// Bad
function isOpenMarket() {
  if (isOpen) return true
  else return false
}

// Bad
function isOpenMarket() {
  if (isOpen) { return true }
  else { return false}
}

// Bad
function isOpenMarket() { return isOpen }

// Good
function isOpenMarket() {
  if (isOpen) {
    return true
  } else {
    return false
  }
}

// Good
const isOpenMarket = () => isOpen
```

### 9.2. <code>if</code> 와 <code>else</code> 사이의 블럭 연결 부분에서 개행 하지 않도록 합니다.
```javascript
// Bad
if (isOpen) {
  goMarket()
}
else {
  stayHome()
}

// Good
if (isOpen) {
  goMarket()
} else {
  stayHome()
}
```

### 9.3. 블럭이 종료된 후에는 반듯이 개행 해줍니다.
```javascript
// Bad
if (isOpen) {
  goMarket()
}
if (isCook) {
  goKitchen()
} else {
  return
}

// Good
if (isOpen) {
  goMarket()
}

if (isCook) {
  goKitchen()
} else {
  return
}
```

:arrow_up: [목차](#목차)

---

## 10. 반복문
### 10.1. 이터러블(<code>for-of</code>) 대신 <code>map()</code>, <code>reduce()</code>와 같은 고급 함수를 사용하세요.
```javascript
const numbers = [1, 2, 3, 4, 5]

// Bad
let sum = 0

for (let num of numbers) {
  sum += num
}

// Good
let sum = 0

numbers.forEach((num) => sum += num)

// Best
const sum = numbers.reduce((total, num) => total + num, 0)
```
> 위의 코드는 AirBnB의 JS Convention 코드를 인용하였습니다. [링크 참조](https://github.com/tipjs/javascript-style-guide#%EC%9D%B4%ED%84%B0%EB%A0%88%EC%9D%B4%ED%84%B0%EC%99%80-%EC%A0%9C%EB%84%88%EB%A0%88%EC%9D%B4%ED%84%B0iterators-and-generators)

### 10.2. 특히 오브젝트 프로퍼티 탐색시 이터러블이 종종 사용 됩니다.
```javascript
let values = []
let items = []
const obj = {
  text: '드림인사이트',
  value: 'dreamninsight',
  isOpen: true
}

// Bad
for (const [key, val] of Object.entries(obj)) {
  values.push(val)
}

// Bad
for (const key of Object.keys(obj)) {
  values.push(obj[key])
}

// Good
Object.entries(obj).map(([key, val]) => {
  values.push(key)
})

// Good
Object.keys(obj).map(key => {
  values.push(obj[key])
})
```

### 10.3. 중첩 Loop
* 우리는 JSON 데이터형식을 매우 많이 사용하고, 이것을 탐색하여 데이터를 가공하는 코드를 빈번하게 작성합니다.
```javascript
const data = [
  {
    text: "운영관리", sub: [
      {
        text: "기본정책", sub: [
          { text: "기본 정보 설정" },
          { text: "약관설정" },
          { text: "아이콘 노출 설정" },
          { text: "스크립트 관리" },
          { text: "단어 필터링" },
        ]
      },
      {
        text: "운영자 관리", path: "mng", sub: [
          { text: "운영자 리스트" },
        ]
      },
      {
        text: "분류 관리", path: "category", sub: [
          { text: "공통 분류 관리" }
        ]
      }
    ]
  },
  {
    text: "회원", sub: [
      {
        text: "회원 관리", sub: [
          { text: "회원 리스트" },
          { text: "휴면 회원관리" },
          { text: "회원 탈퇴" },
        ]
      },
      {
        text: "알림", sub: [
          { text: "알림 발송" },
          { text: "알림 발송 내역" },
        ]
      },
    ]
  }
]
```
* 위와 같이 복잡한 구조를 갖고 있는 JSON 데이터를 처리 할때 중첩 <code>for</code>문을 이용하게 됩니다.
```javascript
let doms = ''

for (let i = 0; i < data.length; i++) {
  doms += `<div>${data[i].text}`

  if (data[i].sub !== undefined) {
    let sub1 = data[i].sub

    for (let j = 0; j < sub1.length; j++) {
      doms += `<div>${sub1.text}`

      if (sub1[j].sub !== undefined) {
        let sub2 = sub1[j].sub

        for (let l = 0; l < sub2.length; l++) {
          doms += `<div>${sub2[l].text}</div>`
        }
      }

      doms += '</div>'
    }

    doms += '</div>'
  }

  doms += '</div>'
}
```
* <code>for</code>문을 포함한 모든 <code>loop</code>문은 중첩하게 되면 가독성이 매우 떨어지며, side effect 발생할 확율이 매우 높습니다.
  > 가장 위험한 <code>Infinity loop</code>(무한루프) 발생할 확율이 매우 높습니다.
* 이러한 문제를 해결하기 위해 <code>Recursion Function</code>을(재귀함수) 사용하기 권합니다.
```javascript
function makeDOM(data = {}) {
  if (Object.keys(data).length) {
    let doms = []

    Object.entries(data).forEach(([, item]) => {
      if (item.sub !== undefined) {
        let tag = `<div><span>${item.text}</span> ${makeMenu(item.sub).join('')}</div>`
        doms.push(tag)
      } else {
        doms.push(`<div><span>${item.text}</span></div>`)
      }

      return doms
    })
  }
}

const tags = makeDOM(data)
```
* 위와 같이 코드의 가독성이 좋아지고, 무엇보다 무한루프 발생 확율도 매우 낮습니다.

:arrow_up: [목차](#목차)

---

## 11. 세미콜론
* 생략 합니다.
  > webpack을 통해 빌드 될때 세미콜론은 자동으로 생성됩니다. 웹팩의 수고를 고맙게 생각합시다.
  ```javascript
  const type = 'test'
  let server = ''

  // Bad
  switch (type) {
    case 'development': server = '192.168.0.1'; break
    case 'test': server = '111.222.123.255'; break
    case 'production': server = '100.200.123.255'
  }

  // Good
  switch (type) {
    case 'development':
      server = '192.168.0.1'
      break
    case 'test':
      server = '111.222.123.255'
      break
    case 'production':
      server = '100.200.123.255'
  }

  ```
  > 이것은 webpack을 통한 vuejs 개발시에만 해당 됩니다. 혹여, 순수 js를 작성할 상황이 생긴다면 세미콜론을 사용해주세요.

:arrow_up: [목차](#목차)

---

## 12. 공백과 들여쓰기

### 12.1. 들여쓰기는 <code>Tab</code>이 아닌 <code>Space</code>로 정하고, 2칸으로 설정하세요.
```javascript
// Bad
if (isOpen) {
····// do something
}

// Bad (Tab)
if (isOpen) {
→→→→// do something
// or
→→// do something
}

// Good
if (isOpen) {
··// do something
}
```
### 12.2. 연산자, 등호, 제어문, 콤마 뒤에는 공백으로 구분하세요.
```javascript
// Bad
const isOpen=true
const num=10
const ary=[1,2,3,4,5]
const obj={text:'text',value:10}

if(isOpen){
  num=num/2
}

for(let i=0;i<num;i++){
  if(num%2==0) num++
}

const test=()=>num


// Good
const isOpen = true
const num = 10
const ary = [1, 2, 3, 4, 5]
const obj = {
  text: 'text',
  value: 10
}

if (isOpen) {
  num = num / 2
}

for (let i = 0; i < num; i++) {
  if (num % 2 == 0) {
    num++
  }
}

// Bad
const test = () => num
```

### 12.3. 괄호, 대괄호(배열) 안쪽 앞뒤로 공백을 삽입하지마세요.
```javascript
// Bad
const timeList = [ 0, 1, 2, 3, 4 ]

if ( isOpen ) {
  ...
}

const date = ( isOpen ) ? new Date() : false

function getTime( time ) {
  return timeList[ time ]
}


// Good
const timeList = [0, 1, 2, 3, 4]

if (isOpen) {
  ...
}

const date = (isOpen) ? new Date() : false

function getTime(time) {
  return timeList[time]
}
```

### 12.4. 중괄호(<code>{}</code>) 안쪽 앞뒤로 공백을 삽입해주세요.
```javascript
// Bad
import {getDateTime} from 'datetime'
const {result, total} = json
const obj = {text: '', value: ''}

// Good
import { getDateTime } from 'datetime'
const { result, total } = json
const obj = { text: '', value: '' }
```

> 되도록이면 오브젝트 선언시에는 중괄호를 블럭문처럼 사용하세요. 가독성이 좋아집니다.

* 이것은 템플릿 문법에도 적용됩니다.
  ```html
  <template>
    <!-- Bad -->
    <div>{{text}}</div>

    <!-- Good -->
    <div>{{ text }}<div>
  </template>
  ```

:arrow_up: [목차](#목차)

---

## 13. 코멘트
### 13.1. 라인 코멘트는 필요한 라인 윗쪽에 표기 하세요.
```vue
<script>
export default {
  data() {
    return {
      // Bad
      text1: '',      // 텍스트를 표시 합니다.

      // Good
      // 텍스트를 표시 합니다.
      text1: '',
    }
  },
  created() {
    // Bad
    let text = ''       // 텍스트 내용

    // Good
    // 텍스트 내용
    let text = ''
  }
}
</script>
```

### 13.2. 제어문
* 제어문에 대한 코멘트 작성시, 최상단에 표기하고, 제어 구분마다 표기 시에는 안쪽에 서술해주세요.
```vue
<script>
export default {
  created() {
    // Bad
    if (isOpen) {   // 마켓이 열려 있으면 사과와 바나나를 삽니다.
      apple += 1
      banana += 1
    } else {        // 그렇지 않을 경우 편의점에가서 우유만 삽니다.
      milk += 1
    }

    // Good
    // 마켓 오픈 여부에 따라 다른 상품을 구매 합니다.
    if (isOpen) {
      // 열려 있을 경우 사과와 바나나를 삽니다.
      apple += 1
      banana += 1
    } else {
      // 그렇지 않을 경우 편의점에가서 우유만 삽니다.
      milk += 1
    }
  }
}
</script>
```

### 13.3. 긴 코멘트가 필요한 경우 <code>/** */</code>로 기술합니다.
```vue
<script>
export default {
  methods: {
    // Bad
    // 마켓이 열려 있으면 사과와 바나나를 사도록하고,
    // 그렇지 않을 경우 편의점에 가서 우유를 삽니다.
    // 만약 편의 점도 닫혀 있다면 집으로 돌아 옵니다.
    goMart(isOpen) {
      // ...
      return total
    },
    // Good
    /**
     * 마켓이 열려 있으면 사과와 바나나를 사도록하고,
      * 그렇지 않을 경우 편의점에 가서 우유를 삽니다.
      * 만약 편의 점도 닫혀 있다면 집으로 돌아 옵니다.
      *
      * @param {Boolean} isOpen
      * @return {Number} 구매한 총 수량을 반환
      */
    goMart(isOpen) {
      // ...
      return total
    }
  }
}
</script>
```
> 함수의 경우 위와 같은 방식으로 전달인자 및 리턴값에 대해 기술 해주세요.

:arrow_up: [목차](#목차)

---

## 14. Vue 템플릿 문법
### 14.1. 테그는 길게 늘어 놓지 않습니다.
* 계층 구조에 맞도록 개행과 들여쓰기로 구분해주세요.
```vue
<template>
  <div>
    <!-- Bad -->
    <ul>
      <li>text1</li><li>text2</li><li>text3</li>
    </ul>
    <table>
      <thead><tr><td>text1</td></tr></thead>
      <tbody>
        <tr><td><span>text2</span></td></tr>
        <tr><td>text3</td></tr>
      </tbody>
    </table>

    <!-- Good -->
    <ul>
      <li>text1</li>
      <li>text2</li>
      <li>text3</li>
    </ul>

    <table>
      <thead>
        <tr>
          <td>text1</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span>text2</span>
          </td>
          <td>text3</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
```

### 14.2. 태그 싱글 톤과 닫기를 명확히 사용합니다.
```vue
<template>
  <div>
    <!-- Bad -->
    <div v-html="rawHtml" />
    <input type="button">

    <!-- Good -->
    <div v-html="rawHtml"></div>
    <input type="button" />
  </div>
</template>
```
  > 닫기가 있는 태그는 필히 닫기를 해주고, 싱글 톤은 <code>< /></code>형태로 닫아 줍니다.

### 14.3. <code>v-bind, v-on</code> 디렉티브는 약어<code>:, @</code> 표기 하고, 동적 전달은 지양합니다.
```vue
<template>
  <div>
    <!-- Bad -->
    <a href="#" v-on:click.prevent="setText">눌러주세요</a>
    <check-button v-bind:items="data" />

    <!-- Good -->
    <a href="#" @click.prevent="setText">눌러주세요</a>
    <check-button :items="data" />

    <!-- not use -->
    <check-button :[prop]="whatToDo" @[event]="action" />
  </div>
</template>
```
  > 동적 전달을 사용할 경우 코드가 불분명해지고, 가독성이 떨어집니다.

### 14.4. 조건부 랜더링 구현시에는 의미 없는 태그 사용을 자제하세요.
```vue
<template>
  <div>
    <!-- Bad -->
    <div v-if="number == 1">
      <span>1번 입구로 가세요.</span>
    </div>
    <div v-else-if="number == 2">
      <span>2번 입구로 가세요.</span>
    </div>
    <div v-else-if="number == 3">
      <span>3번 입구로 가세요.</span>
    </div>
    <div v-else>
      <span>입장이 불가합니다.</span>
    </div>

    <!-- Good -->
    <span v-if="number == 1">1번 입구로 가세요.</span>
    <span v-else-if="number == 2">2번 입구로 가세요.</span>
    <span v-else-if="number == 3">3번 입구로 가세요.</span>
    <span v-else>입장이 불가합니다.</span>
  </div>
</template>
```


### 14.5. <code>v-for</code>와 <code>v-if</code>를 같은 테그에 함께 사용하지 마세요.
```vue
<template>
  <div>
    <!-- Bad -->
    <div :key="item" v-for="item in list" v-if="item % 2 == 0">
      {{ item }}
    </div>

    <!-- Good -->
    <template v-for="item in list">
      <div :key="item" v-if="item % 2 == 0">{{ item }}</div>
    </template>
  </div>
</template>
```

### 14.6. 속성(Attribute) 및 디렉티브 나열 순서를 지켜 주세요. 나열되는 종류가 많을 경우 개행 및 들여쓰기로 구분해주세요.
```vue
<template>
  <div>
    <!-- Bad -->
    <div id="Mart" v-if="isOpen" :class="{ disabled: isSunday }" @click="checkItOut">{{ letsGo }}</div>

    <!-- Good -->
    <div
      id="Mart"
      :class="{ disabled: isSunday }"
      @click="checkItOut"
      v-if="isOpen" >
      {{ letsGo }}
    </div>
  </div>
</template>
```
> 디렉티브 나열 순서: 일반 bind -> 변수(숫자) bind(:) -> 이벤트(@) -> v-html -> v-model -> v-for -> v-if

### 14.7. 같은 속성을 중복하여 사용하지 마세요.
```vue
<template>
  <div>
    <!-- Bad -->
    <div class="default" :class="{ isActive: active }" v-html="html"></div>

    <!-- Good -->
    <div :class="['default', { isActive: active }]" v-html="html"></div>
  </div>
</template>
```

### 14.8. 템플릿 안에 복잡한 수식 사용은 지양합니다.
```vue
<template>
  <div>
    <!-- Bad -->
    <div v-for="num in numbers">
      {{ num + (num / 100 * 10) }}
    </div>

    <!-- Good -->
    <div v-for="num in numbers">
      {{ getCalculate(num) }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numbers: [1, 2, 3, 4, 5, 6],
    }
  },
  methods: {
    getCalculate() {
      return num + (num / 100 * 10)
    }
  }
}
</script>
```
> 수식이 template 안에 들어가게 되면 코드 가독성이 매우 떨어집니다.


:arrow_up: [목차](#목차)

---

## 15. 컴포넌트 SFC

### 15.1. 컴포넌트 명명
* 컴포넌트 import 시에는 카멜캐이스로, template 배치시에 케밥캐이스로 구분 합니다.
```vue
<template>
  <div>
    <!-- Bad -->
    <check_button />
    <CheckButton />

    <!-- Good -->
    <check-button />
  </div>
</template>

<script>
// Bad
import check_button from '@/components/checkButton'
import CheckButton from '@/components/checkButton'

// Good
import checkButton from '@/components/checkButton'
</script>
```

### 15.2. Props 정의
* 모든 Props에 대해 자료형을 정의하고, 그외 필요한 옵션을 정의 하세요.
* 자료형외에 필요한 부분이 없다면 자료형 정의만 하여도 무관합니다.
``` vue
<script>
// componentA
export default {
  // Bad
  props: ['value', 'maxLength', 'title', 'isHide'],

  // Good
  props: {
    value: {
      type: [Number, String],
      required: true,
    },
    maxLength: Number,
    title: {
      type: String,
      default: '기본 Text',
    },
    isHide: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      required: true,
    }
  }
}
</script>
```
  > 좀 더 자세항 내용은 링크를 참조 하세요. [Props 유효성 검사](https://v3.ko.vuejs.org/guide/component-props.html#prop-%E1%84%8B%E1%85%B2%E1%84%92%E1%85%AD%E1%84%89%E1%85%A5%E1%86%BC-%E1%84%80%E1%85%A5%E1%86%B7%E1%84%89%E1%85%A1)

* template 배치시 props명은 케밥캐이스로 정의 하고, 각 props 자료형에 맞춰 설정하세요.
```vue
<template>
  <div>
    <!-- Bad -->
    <component-a
      maxLength="10"
      :is-hide="true"
      :title="'사과 좋아요!'"
      :items="list"
      v-model="apple"
    />

    <!-- Good -->
    <component-a
      is-hide
      title="사과 좋아요!"
      :max-length="10"
      :items="list"
      v-model="apple"
    />
  </div>
</template>
```

### 15.3. v-model
*  Props의 데이터는 단방향입니다. 컴포넌트간 데이터를 주고 받아야 한다면, v-model로 연결 하세요.
```vue
<template>
  <div>
    <!-- Bad -->
    <input
      type="text"
      v-model="val"
    />

    <!-- Good -->
    <input
      type="text"
      :value="val"
      @input="updateValue"
    />
  </div>
</template>

<script>
// inputField component
export default {
  name: 'inputField',
  props: {
    text: [Number],
    value: [Number, String],
  },
  data: () => ({
    val: '',
  }),
  methods: {
    updateValue(event) {
      // 정상적인 model 연결을 통한 양방한 바인딩
      this.$emit('input', event.target.value)
    }
  }
}
</script>
```

```vue
<template>
  <div>
    <!-- Bad -->
    <input-field ref="input" @input="inputValue" />

    <!-- Good -->
    <input-field v-model="text" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
    }
  },
  methods: {
    inputValue() {
      this.text = this.$refs.input.val
    },
  }
}
</script>
```
> ref 설정으로 컴포넌트의 <code>data</code>를 직접 참조하는 방식은 비효율적입니다. <br>
플러그인 작성 외에는 절대 data를 직접 참조 또는 변이 하지 않도록 합니다.


:arrow_up: [목차](#목차)

---

## 16. 이벤트 버스

### 16.1. 이벤트 버스(Event Bus)란?
```javascript
// main.js
Vue.prototype.eventBus = new Vue()
```

```vue
<script>
// componentA.vue
export default {
  mounted() {
    // $emit('onPush') 대응
    this.$eventBus.$on('onPush', (options) => {
      // something to do
    })
  }
}
</script>
```

```vue
<script>
// componentB.vue
export default {
  methods: {
    pushMessage() {
      this.$eventBus.$emit('onPush', {
        type: 'toast'
        message: 'yes! it is event bus',
      })
    }
  }
}
</script>
```
* 위의 예제를 보면 componentA와 componentB는 서로 어느 위치에 있는지 알수 없는 상태입니다.
* 하지만 위의 <code>this.$eventBus</code>를 통해 컴포넌트간 이벤트를 전달 할 수 있는 것을 볼 수 있습니다.
* 이벤트 버스는 위와 같이 간편하게 이벤트를 발생하여 컴포넌트간 손쉬운 통신을 할 수 있습니다.

### 16.2. 사용하지 않습니다.
* 왜? 이벤트 버스에는 치명적인 단점이 있습니다. 코드 관리 포인트가 광범위 해진다는 것입니다.
* 손쉽게 사용할 수 있다 하여, 여기저기 남발하게 되면 어디에서 보내고 받는 것인지 찾기 힘들어질 수 있습니다.
* 우리는 그것을 관리 하기 위하여 또 다른 문서를 작성해야 하고, 오류가 발생 하였을때 찾는 것도 쉽지 않을 것입니다.
* 그리고, 이것은 대체 가능한 기능이 이미 vue에 있습니다. 바로 상태 관리자(Vuex) 입니다.
  ```javascript
  // store.js
  export default new Vuex.Store({
    state: {
      onPush: false,
      onPushMsg: [],
    },
    getters: {
      getOnPush(state) {
        return state.onPush
      },
      getPushMessage(state) {
        return state.onPushMsg
      }
    },
    mutations: {
      onPushToggle(state, bool) {
        state.onPush = bool
      },
      pushMessage(state, payload) {
        const { onPush, type, message } = payload

        state.onPush = onPush

        if (onPush) {
          state.onPushMsg.push({ type, message })
        }
      }
    },
    actions: {
      setPushMessage({ commit }, payload) {
        payload.onPush = true
        commit('pushMessage', payload)

        setTimeout(() => {
          commit('onPushToggle', false)
        }, 3000)
      }
    },
  })
  ```

* component A: 버튼을 클릭하면 입력폼에의 내용이 store에 저장됩니다.
  ```vue
  <template>
    <div>
      <p>
        <input type="text" v-model="text" />
      </p>
      <button type="button" @click="click">버튼을 클릭하세요.</button>
    </div>
  </template>

  <script>
  import { mapActions } from 'vuex'

  export default {
    name: 'pushButton',
    data() {
      return {
        text: '',
      }
    },
    methods: {
      ...mapActions(['setPushMessage']),
      click() {
        this.setPushMessage({
          type: 'toast',
          message: this.text
        })
      }
    }
  }
  </script>
  ```

* component B: component A 에서 작성된 message가 변경되면 메시지를 표시 해줍니다.
  ```vue
  <template>
    <div>
      <p>이곳에 메시지가 나타 납니다.</p>

      <p v-for="item in getPushMessage">
        {{ item.type }}: {{ item.message }}
      </p>
    </div>
  </template>

  <script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'message',
    computed: {
      ...mapGetters(['getOnPush', 'getPushMessage'])
    },
  }
  </script>
  ```
  > 위와 같이 코드는 이벤트 버스를 사용할 때 보다 많아지지만, 흐름이 눈에 보이기 때문에 유지보수에 용의 합니다.


:arrow_up: [목차](#목차)

---

## 17. 상태 관리자 Vuex
### 17.1. 기능별 모듈 분리를 기본으로 합니다.
  * 분류가 모호한 코드는 것들은 store/index.js에 나열하고 코멘트 처리 해줍니다.
```javascript
import session from '@/store/modules/session.js'
import board from '@/store/modules/board.js'

const store = new Vuex.Store({
  modules: {
    session,
    board,
  },
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
})
```

### 17.2. mutations, actions, getters
  * 기본 명명 규칙을 준수하여 작성해주세요.
  * mutations -> mut, actions -> set, getters -> is, get 으로 명명합니다.
```javascript
const session = {
  namespaced: true,
  state: {
    user: {
      token: '',
      id: '',
      name: '',
    },
    loginTime: '',
  },
  mutations: {
    mutSession(state, payload) {
      // do something
    },
    mutLogout(state, payload) {
      // do somthing
    }
  },
  actions: {
    setLogin({ commit }, payload) {
      const { token, id, name } = payload
      commit('mutSession', { token, id, name })
      // do something
    },
    setLogout({ commit }, payload) {
      // do somthing
    }
  },
  getters: {
    isLogin(state) {
      if (state.user.token) {
        return true
      }

      return false
    },
    getUserName(state) {
      return state.user.name
    }
  }
}
```

:arrow_up: [목차](#목차)

---

## 18. 라우터 Router
* 이름은 경로와 일치 시키되 앞쪽 <code>/</code>는 사용하지 않습니다.
* 별도의 import로 파일을 불러 오지 않고 <code>component</code> 옵션에 바로 <code>() => import()</code> 방식으로 매칭 시켜 줍니다.
* meta 옵션은 필요한 부분에만 작성하여 주고, 그외에는 설정하지 않습니다.
```javascript
// Bad
import petList from '@/views/pet/list'

const routes = [
  { path: '/', name: 'index', component: () => import('@/views/index') },

  // Bad
  { path: '/pet/list', name: 'pet/list', component: petList },

  // Good
  {
    path: '/board/list', name: 'board/list', component: () => import('...'), children: [
      { path: '/board/detail', name: 'board/detail', component: () => import('...') },
      { path: '/board/comment', name: 'board/comment', component: () => import('...') },
    ]
  },
  { path:  '/board/write', name: 'board/write', component: () => import('...') },

  {
    path:  '/member/detail', name: 'member/detail', component: () => import('...'), meta: { pullScreen: true }, children: [
      { path: '/member/detail/password', name: 'member/detail/password', component: () => import('...') },
    ]
  },
]
```


:arrow_up: [목차](#목차)

---

* 초안 작성 2022.09.26일 완료 (작성자: 김종윤 수석 매니저)