<template>
  <div class="wrap">
    <p>
      <tooltip top message="위에 나오는 메시지" />
    </p>
    <p>
      <tooltip right message="오른쪽에 나오는 메시지" />
    </p>
    <p>
      <tooltip left width="200" message="왼쪽에 나오는 메시지">
        slot 활용가능
        <font-awesome-icon icon="fas fa-question-circle" />
      </tooltip>
    </p>
    <p>
      <tooltip :message="message">
        <font-awesome-icon icon="fas fa-question-circle" />
        slot 활용가능
      </tooltip>
    </p>
  </div>
</template>

<script>
export default {
  name: 'tooltipPrev',
  data() {
    return {
      message: [
        '아래에서 나오는 메시지',
        '매시지를 목록으로 전달 가능'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  padding: 200px;
  text-align: center;
}
</style>