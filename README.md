# VueJS Framework v2.x Style guide

참조 문서
===
* [ES6](https://www.w3schools.com/js/js_es6.asp)
* [Vue 2.x](https://v2.vuejs.org/)
* [SCSS](https://sass-lang.com/)
---

목차
===
1. [기본 형태](#1.-기본-형태)
---

# 1. 기본 형태

* VueJS v2.x Framework 기본 형식은 아래와 같이 지켜 준다.
```javascript
<template>
  ...
</template>

<script>
import componentA from '@...'
import componentB from '@...'
import mixinA from '...'

export default {
  name: 'compnentName',
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
    // 라이프 사이클훅은 순서대로 배치 한다 (이미지 참조)
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
*- VueJS lifecycle*
![lifecycle](https://v2.vuejs.org/images/lifecycle.png)
> VueJS v2.x Composition API는 사용하지 않는다.