<template>
  <div>
    <p>현제 페이지는 {{ page }} 입니다.</p>
    <div class="wrap">
      <pagination :total="total" :size="pageSize" v-model="page" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'paginationPrev',
  data() {
    return {
      total: 16723,
      pageSize: 10,
      page: 1,
    }
  },
}
</script>

<style>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css');
.wrap {
  width: 90%;
  margin: auto;
}
</style>