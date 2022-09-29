<template>
  <form @submit.prevent>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'validateForm',
  data() {
    return {
      checkState: true,
      firstElm: null,
      count: 0,
      ele: null,
    }
  },
  methods: {
    validate() {
      this.checkState = true
      this.firstElm = null

      this.traverse(this)

      // 검수에 통과하지 못한 가장 첫번째 폼에 포커스
      if (this.firstElm !== null) {
        this.firstElm.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }

      return this.checkState
    },
    resetForm() {
      this.traverse(this, 'reset')
    },
    traverse(el, flag = 'dom') {
      this.componentCheck(el, flag)

      const len = el.$children.length

      if (len > 0) {
        const vueNodes = el.$children

        // vue node 전체(chilren)을 탐색 하여 chidren이 또 있는 경우 재귀한다.
        for (let i = 0; i < len; i++) {
          if (vueNodes[i].$children.length > 0) {
            this.traverse(vueNodes[i], flag)
          } else {
            this.componentCheck(vueNodes[i], flag)
          }
        }
      }
    },
    componentCheck(el, flag) {
      const checkList = [
        'inputField', 'numberFormat', 'selectBox', 'switchButton',
        'checkButton', 'datePicker', 'validateWrap'
      ]

      // 컴포넌트인지 체크 후 필요한 처리를 한다.
      if (el._isVue) {
        let tag = el.$vnode.tag.split('-')
        let tagName = tag[tag.length - 1]

        if (checkList.indexOf(tagName) > -1) {
          if (flag == 'reset') {
            el.resetForm()
          } else {
            if (!el.check() && this.checkState) {
              this.checkState = false

              // 가장 처음 검수에 통과 하지 못한 폼 저장 (라인 포커스)
              if (this.firstElm === null) {
                this.firstElm = el.$el
              }
            }
          }
        }
      }
    }
  }
}
</script>