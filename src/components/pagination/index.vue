<template>
  <nav class="page navigation">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="#" @click.prevent="updateValue(1)">
          <font-awesome-icon icon="fas fa-angle-double-left" />
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" @click.prevent="updateValue(prev)">
          <font-awesome-icon icon="fas fa-angle-left" />
        </a>
      </li>
      <li
        :class="['page-item', {active: item.num === value}]"
        :key="`page-key-${item.num}`"
        v-for="item in pageList">
        <a class="page-link" href="#" @click.prevent="updateValue(item.num)">{{ item.num }}</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" @click.prevent="updateValue(next)">
          <font-awesome-icon icon="fas fa-angle-right" />
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" @click.prevent="updateValue(maxPage)">
          <font-awesome-icon icon="fas fa-angle-double-right" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    value: {
      type: Number,
      required: true
    },
    // 한 페이지 목록 사이즈
    size: {
      type: Number,
      default: 10,
    },
    // 표시할 페이지 개수
    block: {
      type: Number,
      default: 10,
    },
    // 전체 수량
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      pageList: [],
      maxPage: 1,
      startPage: 1,
      endPage: 1,
      prev: 0,
      next: 0,
    }
  },
  watch: {
    total() {
      this.makePageList()
    },
    size() {
      this.makePageList()
    },
    block() {
      this.makePageList()
    },
    value(v) {
      this.makePageList()
    }
  },
  created() {
    this.makePageList()
  },
  methods: {
    makePageList() {
      this.pageList = []

      this.maxPage = Math.ceil(this.total / this.size)
      this.startPage = Math.floor((this.value - 1) / this.block) * this.block + 1

      if (this.startPage < 1) {
        this.startPage = 1
      }

      this.endPage = ((this.startPage + this.block - 1) > this.maxPage)
        ? this.maxPage
        : (this.startPage + this.block - 1)

      if (this.endPage == 0) {
        this.endPage = 1
      }

      this.prev = (this.startPage - 1 > 0) ? this.startPage - 1 : 1
      this.next = (this.startPage + this.block <= this.maxPage)
        ? this.endPage + 1
        : this.maxPage

      if (this.startPage === 1 && this.endPage === 1) {
        this.$emit('input', 1)
      }

      for (let num = this.startPage; num <= this.endPage; num++) {
        this.pageList.push({ num, isOn: (this.value == num) ? true : false })
      }
    },
    updateValue(v) {
      if (parseInt(v) !== this.value) {
        this.$emit('input', v)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-item.active .page-link {
  z-index: 0 !important;
}

.page-item a {
  transition: all .2s;
}
</style>