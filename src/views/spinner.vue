<template>
  <div>
    <p v-if="message">{{ message }}</p>
    <p v-else>{{ timer }}초 이후 스피너가 닫힙니다.</p>
    <button type="button" @click="show()">10초 보기</button>
    <button type="button" @click="show(1)">3초 후에 5초 보기</button>
    <button type="button" @click="show(2)">스피너 보기 (3초 2초 딜레이 후 사라짐)</button>
  </div>
</template>

<script>
export default {
  name: 'spinnerPreview',
  data() {
    return {
      timer: 0,
      message: '버튼을 클릭해서 스피너를 확인 하세요.'
    }
  },
  methods: {
    setTimer(time) {
      this.timer = time

      const interval = setInterval(() => {
        time--
        this.timer = time

        if (time < 0) {
          clearInterval(interval)
          this.message = '버튼을 클릭해서 스피너를 확인 하세요.'
        }
      }, 1000)
    },
    async show(flag = 0) {
      this.message = ''

      if (flag == 0) {
        this.setTimer(10)
        spinner.show()
      } else {
        this.setTimer(8)
        await spinner.delay(3).show()
        spinner.delay(5).hide()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
button + button { margin-left: 5px; }
</style>