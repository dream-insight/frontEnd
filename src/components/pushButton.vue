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