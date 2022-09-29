<template>
  <div>
    <p><date-picker v-model="date1" /></p>
    <p><date-picker range v-model="date2" /></p>
  </div>
</template>

<script>
export default {
  name: 'datePickerPrev',
  data() {
    return {
      date1: '',
      date2: ['', ''],
    }
  }
}
</script>