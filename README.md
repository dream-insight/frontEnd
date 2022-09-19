# VueJS Framework v2.x Style guide

참조 문서
===
* [ES6](https://www.w3schools.com/js/js_es6.asp)
* [Vue 2.x](https://v2.vuejs.org/)
* [SCSS](https://sass-lang.com/)
---

# 목차
1. [기본 형태](#1.-기본-형태)
2. [네이밍 룰](#2.-네이밍-룰)
3. [변수 선언](#3.-변수-선언)
---

## 1. 기본 형태

* VueJS v2.x Framework 기본 형식은 아래와 같이 지켜 준다.
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
    // 라이프 사이클훅은 순서대로 배치 한다
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
> VueJS v2.x Composition API는 사용하지 않는다.

## 2. 명명 규칙
* 2.1. 공통
    * 모든 요소(파일, 변수 등등)에 대한 이름은 영문 + 카멜케이스로 작성한다.
    * 이름 가장 앞자리를 숫자로 지정하지 않는다.
    * 필히 한 단어 이상의 조합으로 작명한다.
    * 의미가 불분명한 줄임 단어를 사용하지 않는다.
* 2.2. 파일명 (컴포넌트 명)
    * 기능에 대한 정의를 기술하듯 작성한다.
  ```javascript
  /* 카테고리를 3단으로 선택할 수 있는 컴포넌트 */
  // Bad
  3depthCate.vue      // 모든 명명은 숫자로 시작하지 않는다.
  ctgry3Depth.vue

  // Good
  categorySelector.vue

  /* 체크 버튼 자동으로 생성해주는 컴포넌트 */
  // it's okay
  chkBtn.vue

  // Good
  checkButton.vue
  ```
* 2.3. 변수, 함수명, 클래스
    * 명확한 의미를 부여하여 작명한다.
    * 줄임 단어를 사용하되 의미를 명확히 인지 할수 있도록 주석을 달아 준다.
  ```javascript
  export default {
    data() {
      return {
        // Bad
        bn: '',             // 버튼명
        cbName: '',         // 체크버튼명

        // it's okay
        opt: {},            // 옵션 그룹
        list: [],           // 게시판 목록

        // Good
        buttonName: '',     // 버튼명
        chkButtonName: '',  // 체크버튼명
        options: {},        // 옵션 그룹
        boardList: [],      // 게시판 목록
      }
    },
    methods: {
      // Bad
      call() {
        // 기능이 불분명한 함수명
      },
      set1() {
        ...
      },
      set2() {
        ...
      }

      // Good
      getBoardList() {
        // 게시판 리스 호출
      },
      setButtonName() {

      },
      setOptions() {

      }
      removeOption() {

      }
    }
  }

  /* class naming */
  // Bad
  class cteCol {
    constructor(options) {
      this.opt = options
    }
  }

  // Good
  class categoryCollection {
    constructor(options) {
      this.opt = options
    }
  }
  ```

* 2.4. 모듈 export, import
    * export default 된 모듈은 명확한 의미부여하여 재명명 가능하다.
    * 구조화 된 모듈은 명명된 이름을 그대로 사용하고 as를 통한 재명명은 하지 않는다.

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

:arrow_up: [Go to index](#목차)

## 3. 변수 선언과 Data Type
  * 3.1. 값의 변화를 감지할 필요가 없는 변수는 export문 밖에서 선언하여 사용하여도 무방하다.
    > 단, 전역변수가 아니라면 export 밖에서 선언하여서는 안된다.

  * 3.2. 변수 선언시 null 타입 선언은 지양하고 undefined 선언은 불가하다. null 타입 선언시 아래의 항목을 준수하여야 한다.
    * 비교, 제어시 필히 null로 비교 해야 하며, 초기화시에도 null로 지정한다.
    ```javascript
    let obj = null

    // Bad
    if (!obj) {
      ...
    }

    // Good
    if (obj === null) {
      ...
    }
    ```

  * 3.3. 기본 형태의 Vue v2.x은 Type Script를 사용하기 아려운 관계로 필히 변수 선언시 타입에 기본하여 정의 한다.
    ```javascript
    export default {
      data: () => ({
        name: '',       // String -> 공백
        index: -1,      // Number -> 숫자 형식의 기본값
        ary: [],        // Array -> 빈 배열
        obj: {},        // Object -> 빈 오브젝트
        opt: null,      // 또는 null
      })
    }
    ```