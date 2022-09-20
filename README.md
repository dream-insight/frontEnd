# VueJS Framework v2.x Style guide

## 참조 문서

* [ES6](https://www.w3schools.com/js/js_es6.asp)
* [Vue 2.x](https://v2.vuejs.org/)
* [SCSS](https://sass-lang.com/)
---

## 목차

1. [기본 형태](#1-기본-형태)
2. [명명 규칙](#2-명명-규칙)
3. [변수 선언과 데이터형](#3-변수-선언과-데이터형)
4. [함수](#4-함수)
5. [화살표 함수](#5-화살표-함수)
6. [오브젝트 프로퍼티](#6-오브젝트-프로퍼티)
7. [비교와 연산자](#7-비교와-연산자)

---

## 1. 기본 형태
* VueJS v2.x Framework 기본 형식은 아래와 같이 지켜 주세요.
  ```javascript
  <template>
    ...
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
      ...
      description: '직접적으로 this를 쓸 필요가 없는 경우'
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
* 2.1. 공통
  * 모든 요소(파일, 변수 등등)에 대한 이름은 영문 + 카멜케이스로 작성합니다.
  * 이름 가장 앞자리를 숫자로 선언하면 안됩니다.
    > 언어의 형태와 파일, 폴더명은 동일하게 취급하도록 하겠습니다.

  * 필히 한 단어 이상의 유의미한 단어로 조합하고, 의미가 불분명한 줄임 단어를 사용하지 않습니다.
    > 개발시 많이 사용되는 btn, chk, bln, lbl 등등의 줄임단어는 사용하여도 무방합니다.

  * javascript의 예약어를 변수나 함수, class명으로 사용 하지 않습니다.
      > 단, plugin, component를 참조하여 호출 하는 경우는 허용 합니다.
      ```javascript
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

* 2.2. 파일명 (컴포넌트 명)
  * 기능에 대한 정의를 기술하듯 작성합니다.
  ```javascript
  /* 카테고리를 3단으로 선택할 수 있는 컴포넌트 */
  // Bad
  3depthCate.vue      // 모든 명명은 숫자로 시작하지 않도록 합니다.
  ctgry3Depth.vue     // 어떤 사람은 ctgry이 무엇인지 모를 수도 있습니다

  // Good
  categorySelector.vue

  /* 체크 버튼 자동으로 생성해주는 컴포넌트 */
  // it's okay
  chkBtn.vue

  // Good
  checkButton.vue
  ```

* 2.3. 모듈 export, import
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
* 3.1. 기본 형태의 Vue v2.x은 Type Script를 사용하기 어려운 관계로 필히 변수 선언시 타입에 맞게 정의 합니다.
  ```javascript
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

* 3.2. 변수 선언시 <code>null</code> 타입 선언은 지양하고 undefined 선언은 하지 않습니다.
  <code>null</code> 타입 선언시 아래의 항목을 준수하여주세요.

  * 비교, 제어시 필히 <code>null</code>로 비교 해야 하며, 초기화시에도 <code>null</code>로 지정합니다.
  ```javascript
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
  ```

* 3.3. 변수 scope
  * 변수 선언시에는 <code>let, const</code> block scoped 선언 하고, <code>var</code>로 선언하지 마세요.
  * 상수는 <code>const</code>사용 하고, 이는 <code>export default</code> 블럭 밖에서 선언이 가능 합니다.
  * 재할당 가능한 변수는 <code>let</code>으로 선언 하고, <code>export default</code> 블럭 밖에서 선언하지 않도록 합니다.
  ```javascript
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
  ```
* 3.4. 변수 선언 시 콤마를 사용하여 다중 선언 하는 방식은 좋지 않습니다.
  ```javascript
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
  ```
  > 우는 개발을 하면서 간혹 코드를 한꺼번에 수정해야 하는 때도 있다는 것을 알고 있습니다. 그러한 경험이 있는 개발자는 위와 같은 코드 나열 방식이 왜 안좋은지 익히 알고 있고 가독성에서도 좋지 않다는 것도 알 수 있습니다.

:arrow_up: [목차](#목차)

---

## 4. 함수
* 4.1. watch, computed, methods 등에 함수 정의시 단축구문을 이용하세요.
  > 단, computed에 간단한 연산 반환에 대해서는 람다 함수를 허용합니다.

  ```javascript
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
  ```

* 4.2. 함수선언과 함수식을 구분하여 사용하세요.
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
  > 함수 선언 방식과, 함수식으로 정의 하는 방식은 hoist 되는 방식이 다릅니다. 위와 같이 사용하는 이유는 링크를 참조 하세요.
  -> [함수 선언 방식에 따른 hoist 차이](https://github.com/tipjs/javascript-style-guide#%ED%95%A8%EC%88%98functions)

* 4.3. 함수를 명확히 구분하여 사용하세요. (void, return)
  * 대부분의 언어에서는 함수에 대해 명확히 정의 하기를 요구합니다.
  * 반환 값이 있는 함수 <code>return int, str, bool</code> 등등
  * 단순 기능 수행의 <code>void</code> 입니다.
  ```javascript
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
  ```
  * 위 두가지 함수는 거의 비슷한 일을 하지만, 명백히 다른 함수 입니다.
  * 우리는 보통 위와 같이 사용 하고 있지만, 쉽게 아래와 같은 실수를 범하게 됩니다.
  ```javascript
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
  ```
  * 위와 같이 함수 수행을 종료하고자 <code>return false</code>를 사용하는 것은 아무 의미 없습니다.
  * 따라서 void 함수 수행을 종류하고자 할 때는 오직 <code>return</code>으로 종료시켜 주세요.

* 4.4. 함수의 인자(parameters)는 순수 참조(const)로 사용하세요.
  * 함수의 전달 인자에 default 값을 사용하여, 제어 문에서 그 값을 비교하세요.
  * 전달 인자의 값을 직접적으로 변이 하여 사용하게 되면, 찾기 힘든 오류가 발생 할 수도 있습니다.
  ```javascript
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
  ```

* 4.5. this의 사용
  * 당신이 아직 초급자리면 this에 대해서 이해하는데 시간이 필요할 수도 있습니다.
  * 아래의 코드를 보고 간단히 vuejs의 this를 손쉽게 사용하세요.
  ```javascript
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
  * 간단히 설명 하겠습니다. 위와 같이 <code>callback</code> 함수를 화살표 무기명 함수가 아닌 일반 무기명 함수로 사용할 경우,
  <code>this</code>는 vue가 아니라 무기명 함수가 됩니다.
  * <code>callback</code> 함수에서 vue를 참조하는 this를 사용하고 싶을 경우 반듯이 화살표 무기명 함수를 사용하세요.

  > 관련 게시물을 확인하여 좀더 많은 정보를 얻을 수 있습니다. [블로그 링크]

:arrow_up: [목차](#목차)

---

## 5. 화살표 함수
* 5.1. 함수에 전달되어 지는 함수(callback)는 필히 화살표 무명함수를 사용하세요.
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
* 5.2. 간단한 연산에 대해서는 암시적 <code>return</code>을 이용하여 주세요.
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
  const good = ary.map((num) => num + 5)
  ```

* 5.3. 함수의 인자가 1개인 경우 괄호를 생략할 수 있고, 사용되지 않는 인자는 생략 하여도 됩니다.
  ```javascript
  const ary = [1, 2, 3, 4, 5]

  // Good
  ary.map(item => item  + 1)

  // Good
  ary.map((item, index) => item + index)

  // it's okay
  ary.map((, index) => index % 2 == 0)
  ```

:arrow_up: [목차](#목차)

---

## 6. 오브젝트 프로퍼티
* 6.1. 프로퍼티에 값을 할당할 시 단축구문 사용하세요.
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

* 6.2. 프로퍼티에 접근시 점(<code>.</code>)을 이용해주세요.
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

* 6.3. 변수로 접근 시에는 배열형으로 접근하세요.
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

* 6.4. data에 선언된 오브젝트
  * data에 선언된 변수(properties)들은 우리에게 매운 편리한 기능을 재공 합니다.
  * 다만 그 편리함이 우리를 불편하게도 합니다. 아래의 예를 보겠습니다.
  ```javascript
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
  ```
  * 위의 코드에서 <code>this.obj</code> 값을 복사하여 차후 비교 하기 위한 코드를 작성하였다고 가정 해보겠습니다.
  * 하지만 중간에 <code>this.obj.text</code> 값을 변경하였고, 이후 <code>console.log()</code>의 값을 확인 해보면 <code>cp.text</code> 값을 확인 해보면 <code>''</code>으로 변해 버린것을 확인할 수 있습니다.
  * 이것은 깊은 복사(Deep copy), 얕은 복사(Shallow copy)에 의하여 발생하는 현상입니다.
    > 깊은 복사와, 얕은 복사에 대해서는 링크를 참조 해주세요. [블로그 링크]
  ```javascript
  //
  const cp = Object.assign({}, this.obj) // Sometime not work
  const cp = JSON.parse(JSON.stringify(this.obj)) // Good
  const cp = { ...this.obj } // Best
  ```
  * 위와 같이 object 깊은 복사(shallow copy)를 통해 데이터 참조의 고리를 끊을 수 있게 됩니다.
  * 때때로 <code>Object.assign()</code> 방식은 깊은 복사가 안될 때가 있습니다. 그것을 피하기 위해 구조 분해를 통해 값을 복사 해주는 것이 가장 좋습니다.

:arrow_up: [목차](#목차)

---

## 7. 연산자
* 7.1. 비교 연산자
  * 연산자는 정확힌 비교를 위하여 <code>===</code>, <code>!==</code>를 사용하세요.
  * 문자형은 <code>''</code> 값을 제외한 모든 값을 <code>true</code>로 간주합니다.
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

  }
  ```
  * 숫자형을 비교 하기 위해서는 해당 값을 필히 Casting(Number, parseInt, parseFloat) 후 비교 해주세요.
  * 숫자형은 0 이외의 값을 모두 <code>true</code>로 간주 합니다.
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
  * 배열로 선언된 변수는 무조건 <code>true</code>로 간주 합니다. 비교 시에는 <code>Array.length</code>를 통해 값을 변화 여부를 확인 합니다.
  ```javascript
  const ary = []

  if (ary) // true

  if (ary.length) // false
  ```

  * <code>null</code>로 초기화 선언된 object는 비교 하기 위해서는 반듯이 값이 <code>null</code>인지 확인하세요.
  * object 초기화에 <code>{}</code>
  ```javascript
  const obj = null

  // Bad
  if (!obj) {
    ...
  }

  // Good
  if (obj === null) {
    ...
  }

  const obj = {}

  if (obj) // true

  if (obj.text) // undefined

  if (Object.keys(obj).length) // false
  ```


:arrow_up: [목차](#목차)