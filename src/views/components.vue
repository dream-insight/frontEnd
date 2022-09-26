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


<style lang="scss">
button + button {
  margin-left: 10px;
}
</style>