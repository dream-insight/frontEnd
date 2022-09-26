# Modal component plugin

# 1. 사용방법
```javascript
// main.js
import modal from '@/components/modal'

Vue.use(modal, {
  modalStyleClass: '.modal-bg',
  noScrollStyleClass: '.no-scroll'
})
```

```Vue
<template>
  <div>
    <p>{{ message }}</p>
    <button type="button" @click="modal('alert')">Alert Modal</button>
    <button type="button" @click="modal('confirm')">Confirm Modal</button>
  </div>
</template>

<script>
export default {
  name: 'components',
  data() {
    return {
      message: 'test'
    }
  },
  methods: {
    modal(type) {
      if (type == 'alert') {
        this.$modal.alert({
          title: 'alert 제목'
          message: 'Modal Alert',
          okay: () => {
            this.message = 'okay button click!'
          }
        })
      } else {
        this.$modal.confirm({
          title: '이것은 confirm 모달입니다.',
          message: 'Confirm',
          cancel: () => {
            this.message = '취소 버튼 클릭'
          },
          okay: () => {
            this.message = '확인 버튼 클릭'
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
button + button {
  margin-left: 10px;
}
</style>
```

# 2. options 설정
```javascript
{
  title: '',
  message: '',
  icon: '',
  width: 400,
  okay: null,
  cancel: null,
  btnOkayText: '확인',
  btnCancelText: '취소',
  modalStyleClass: '',
  noScrollStyleClass: ''
}
```
| Name | Type | Default | Description |
|-------|--------|-----------------|-------------------|
| title | String | <code>''</code> | 창의 제목을 설정합니다. |
|-------|--------|-----------------|-------------------|
|