<template>
  <nav :class="['page navigation', { inline: inline }]">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="#" @click.prevent="updateValue(1)">
          <fa-icon name="angle-double-left" />
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" @click.prevent="updateValue(prev)">
          <fa-icon name="angle-left" />
        </a>
      </li>
      <li
        :class="['page-item', {active: v.num === nowPage}]"
        :key="`page-key-${v.num}`"
        v-for="v in pageList">
        <a class="page-link" href="#" @click.prevent="updateValue(v.num)">{{ v.num }}</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" @click.prevent="updateValue(next)">
          <fa-icon name="angle-right" />
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" @click.prevent="updateValue(maxPage)">
          <fa-icon name="angle-double-right" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    value: [String, Number],
    size: [String, Number],         // 한 페이지 목록 사이즈
    block: [String, Number],        // 표시할 페이지 개수
    total: [String, Number],        // 전체 수량
    addClass: String,
    inline: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pageList: [],
      nowPage: 1,
      maxPage: 1,
      pageBlock: 10,
      startPage: 1,
      endPage: 1,
      prev: 0,
      next: 0,
    }
  },
  watch: {
    total(v) {
      this.makePageList()
    },
    size(v) {
      this.makePageList()
    },
    block(v) {
      this.makePageList()
    },
    value(v) {
      if (this.nowPage != v && v > 0) {
        this.makePageList()
        this.nowPage = v
      }
    }
  },
  created() {
    if (this.block) {
      this.pageBlock = parseInt(this.block)
    }

    this.nowPage = this.value
    this.makePageList()
  },
  methods: {
    makePageList() {
      this.pageList = []
      this.maxPage = Math.ceil(this.total / this.size)
      this.startPage = Math.floor((this.nowPage - 1) / this.pageBlock) * this.pageBlock + 1

      if (this.startPage < 1) {
        this.startPage = 1
      }

      this.endPage = ((this.startPage + this.pageBlock - 1) > this.maxPage) ? this.maxPage : (this.startPage + this.pageBlock - 1)

      if (this.endPage == 0) {
        this.endPage = 1
      }

      this.prev = (this.startPage - 1 > 0) ? this.startPage - 1 : 1
      this.next = (this.startPage + this.pageBlock <= this.maxPage) ? this.endPage + 1 : this.maxPage

      if (this.startPage === 1 && this.endPage === 1) {
        this.nowPage = 1
      }

      for (let i = this.startPage; i <= this.endPage; i++) {
        this.pageList.push({
          num: i,
          isOn: (this.nowPage == i) ? true : false
        })
      }
    },
    updateValue(v) {
      if (parseInt(v) != this.nowPage) {
        this.nowPage = v
        this.$emit('input', v)

        this.makePageList()
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