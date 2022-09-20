# VueJS Framework v2.x Style guide

## 참조 문서

* [ES6](https://www.w3schools.com/js/js_es6.asp)
* [Vue 2.x](https://v2.vuejs.org/)
* [SCSS](https://sass-lang.com/)
---

## 목차

1. [기본 형태](#1-기본-형태)
2. [명명 규칙](#2-명명-규칙)
3. [변수 선언과 Data Type](#3-변수-선언과-Data-Type)
4. [함수](#4-함수)
5. [화살표 함수](#5-화살표-함수)

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

## 3. 변수 선언과 Data Type
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
  * 상수는 <code>const</code>사용 하고, <code>export default</code> 블럭 외에선 선언이 가능 합니다.
  * 재할당 가능한 변수는 <code>let</code>으로 선언 합니다.
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
:arrow_up: [목차](#목차)

---

## 4. 함수
* 4.1. watch, computed, methods 등에 함수 정의시 단축구문을 이용한다.
  > 단, 간단한 리턴에 대한 computed에 대해서는 람다 함수 허용

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
  * 단순 기능 수행의 <code>void</code> 역할인가 입니다.
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
                  '씨이고, 이름은 ' + this.store.getters.getYourName

        return text
      },
      setUserName() {
        // void
        this.userName = '당신은 ' + this.$store.getters.getFamilyName +
                        '씨이고, 이름은 ' + this.store.getters.getYourName
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
        if (this.name.substr(0, 1) !== '김') {
          return false
        } else {
          this.familyName = this.name.substr(0, 1)
        }
      },
      // Good
      setFamilyName() {
        if (this.name.substr(0, 1) !==  '김') {
          return
        }

        this.familyName = this.name.substr(0, 1)
      }
    }
  }
  ```
  * 위와 같이 void 함수에서 함수의 수행을 종료하고자 <code>return false</code>를 사용하는 것은 아무런 의미가 없습니다.
  * 따라서 void 함수에서 함수의 수행을 종류하고자 할 때는 오직 <code>return</code>으로 종료시켜 주세요.

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

* 5.3. 함수의 인자가 1개인 경우 괄호를 생략하셔되 됩니다.
  * 사용되지 않는 전달인자는 생략 하여도 됩니다.
  ```javascript
  const ary = [1, 2, 3, 4, 5]

  // it's okay
  ary.map(item => item  + 1)

  // Good
  ary.map((item, index) => item + index)

  // it's okay
  ary.map((, index) => index + 10)
  ```

:arrow_up: [목차](#목차)

---