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