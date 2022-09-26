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

# 2. options
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
| Name | Type | Default | Require | Description |
|-------|---- |---------|---------|-------------|
| message | String | <code>''</code> | *true* | 표시 할 메시지를 |
| title | String | <code>''</code> | false | 창의 제목을 설정합니다. |
| icon | String | <code>''</code> | false | Font-Awesome 등의 아이콘을 표기 하기 위한 옵션 사용시에 별도의 설정이 필요합니다. |
| width | String, Number | <code>400</code> | false | 모달 창의 넓이를 조절 합니다. |
| okay | Function | <code>null</code> | false | 확인 버튼을 눌렀을때 실행할 callback 함수 |
| cancel | Function | <code>null</code> | false | 취소 버튼을 눌렀을대 실행할 callback 함수 |
| btnOkayText | String | <code>확인</code> | false | 확인 버튼에 표시할 문자열 |
| btnCancelText | String | <code>취소</code> | false | 취소 버튼에 표시할 문자열 |
| modalStyleClass | String | <code>.modal-bg</code> | false | 화면 전체를 가리는 레이아웃의 style class, <br> 꼭 .class-name 으로 입력해야 합니다.|
| noScrollStyleClass | String | <code>.no-scroll</code> | false | modal이 화면을 덮었을때 body 테그에 삽입될 스크롤 삭제 style class |