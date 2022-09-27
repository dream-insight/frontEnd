<template>
  <div>
    <p><button type="button" @click="showToast('success')">success toast</button></p>
    <p><button type="button" @click="showToast('info')">info toast</button></p>
    <p><button type="button" @click="showToast('warning')">warning toast</button></p>
    <p><button type="button" @click="showToast('error')">error toast</button></p>
  </div>
</template>

<script>
export default {
  name: 'toast',
  methods: {
    showToast(color) {
      if (color == 'success') {
        this.$toast('success toast message')
      } else {
        this.$toast({ color, message: `${color} toast message` })
      }
    }
  }
}
</script>