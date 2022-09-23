<template>
  <div id="app">
    <message />

    <pushButton />
  </div>
</template>

<script>
import pushButton from '@/components/pushButton'
import message from '@/components/message'

export default {
  name: 'App',
  components: {
    pushButton,
    message
  },
  data() {
    return {
      text: 'text'
    }
  }
}
</script>
