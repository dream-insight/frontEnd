<template>
  <table :class="['table_basic']">
    <thead v-if="multiHeader === 0">
      <tr>
        <th width="50" v-if="checkAll">
          <input type="checkbox" ref="listTableCheck" @click="checkAllEvent" />
        </th>
        <th
          :width="(item.width ? item.width : '')"
          :key="'head' + item.text"
          v-for="item in tableHeader">
          <div
            :class="['columns', item.align]"
            @click.prevent="setSort(item.target, item.order)"
            v-if="item.sort && dataList.length > 0">
            <div class="sort-cell-text" v-html="item.text.nl2br()"></div>
            <span :class="['sorting rotate', item.order]">
              <transition appear name="icon-scale">
                <span class="order-icon" v-if="item.order">↓</span>
              </transition>
            </span>
          </div>
          <span v-html="item.text.nl2br()" v-else></span>
        </th>
      </tr>
    </thead>
    <thead v-else>
      <th width="50" :rowspan="tableHeader.length" v-if="checkAll">
        <input type="checkbox" ref="listTableCheck" @click="checkAllEvent" />
      </th>
      <tr v-for="(headLine, i) in tableHeader" :key="`h${i}`">
        <th
          :colspan="item.colspan"
          :rowspan="item.rowspan"
          :width="item.width ? item.width : ''"
          :key="`th${i}${j}`"
          v-for="(item, j) in headLine">
          <div
            :class="['hand flex-row', `justify-${item.align}`]"
            @click="setSort(item.target, item.order)"
            v-if="item.sort && dataList.length > 0">
            <div style="margin-right: 5px;" v-html="item.text.nl2br()"></div>
            <span :class="['sorting rotate', item.order]">
              <transition appear name="icon-scale">
                <span class="order-icon" v-if="item.order">↓</span>
              </transition>
            </span>
          </div>
          <span v-html="item.text.nl2br()" v-else></span>
        </th>
      </tr>
    </thead>

    <tbody :class="{'no-hover-bg': noHoverBg}" v-if="items.length > 0">
      <slot name="bodyTop"></slot>

      <template v-if="dataList.length > 0">
        <slot name="items" v-for="(item, index) in dataList" :props="item" :index="index"></slot>
      </template>
      <template v-else>
        <slot name="items" v-for="(item, index) in items" :props="item" :index="index"></slot>
      </template>
    </tbody>
    <tbody v-else>
      <tr>
        <td class="no-data" :colspan="colspan">
          <div>{{noDataText}}</div>
        </td>
      </tr>
    </tbody>

    <tfoot v-if="footer.length > 0">
      <tr>
        <template v-for="(item, i) in footer">
          <th
            :colspan="item.colspan"
            :class="item.align"
            :width="item.width"
            :key="`foot${i}`"
            v-if="item.tag == 'th'">
            {{item.value}}
          </th>
          <td
            :colspan="item.colspan"
            :class="item.align"
            :width="item.width"
            :key="`foot-${i}`"
            v-else>
            <b>{{item.value}}</b>
          </td>
        </template>
      </tr>
    </tfoot>
    <tfoot v-else>
      <slot name="footer"></slot>
    </tfoot>
  </table>
</template>

<script>
/*
  해당 컴포넌트는 정렬기능을 활성화 시킨 상태에서
  라인당 추가되는 하위 데이터에 대한 변화를 감지 하지 못합니다.
*/
export default {
  name: 'listTable',
  props: {
    header: {                       // 목록 최상단 라벨링 Array:[{text: string, width: int, sort: boolean, target: string(sort target)}] *
      type: Array,
      default: () => []
    },
    footer: {
      type: Array,
      default: () => []
    },
    items: {                        // 테이블 목록 Array:[] *
      type: Array,
      required: true
    },
    emptyText: String,              // 목록이 없을 경우 표시할 텍스트 String:''
    noHoverBg: {                    // 설정시 라인 색상이 적용 되지 않음
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: ''
    },
    checkAll: {                     // 리스트 체크 여부 Boolean:false
      type: Boolean,
      default: false
    },
    multiHeader: {
      type: Number,
      default: 0,
    }
  },
  data: () => ({
    checked: false,
    colspan: 0,
    noDataText: '데이터가 없습니다.',
    tableHeader: [],
    dataList: [],

    target: '',
    order: '',
    isInit: false,
  }),
  watch: {
    header() {
      this.setHeader()
    },
    items(data) {
      if (this.target != '') {
        this.dataList = this.copy(data)
        this.sorting()
      }

      if (this.checkAll) {
        this.$refs.listTableCheck.checked = false
      }
    }
  },
  created() {
    this.setHeader()

    if (this.multiHeader > 0) {
      this.colspan = this.multiHeader + (this.checkAll ? 1 : 0)
    } else {
      this.colspan = this.header.length + (this.checkAll ? 1 : 0)
    }

    if (this.emptyText) {
      this.noDataText = this.emptyText
    }

    if (this.items.length > 0 && this.target != '') {
      this.dataList = this.copy(this.items)
    }
  },
  methods: {
    setHeader() {
      if (this.header.length > 0) {
        // 정렬이 지정되어 있는 경우 해당 컬럼을 정렬해준다.
        if (this.multiHeader > 0) {
          this.header.forEach((head, i) => {
            this.tableHeader.push([])

            this.tableHeader[i] = head.map(item => {
              if (item.order) {
                this.order = item.order
                this.target = item.target
              }

              return {
                text: item.text,
                width: item.width,
                sort: item.sort ? true : false,
                target: item.target,
                colspan: !!item.colspan ? item.colspan : false,
                rowspan: !!item.rowspan ? item.rowspan : false,
                order: item.order,
                align: !item.align ? 'center' : item.align
              }
            })
          })
        } else {
          this.tableHeader = this.header.map(item => {
            if (item.order) {
              this.order = item.order
              this.target = item.target
            }

            return {
              text: item.text,
              width: item.width,
              sort: item.sort,
              target: item.target,
              colspan: !!item.colspan ? item.colspan : false,
              rowspan: !!item.rowspan ? item.rowspan : false,
              order: item.order,
              align: !item.align ? 'center' : item.align
            }
          })
        }
      }
    },
    checkAllEvent(evt) {
      this.$emit('checked', evt.target.checked)
    },
    setSort(target, order) {
      this.target = target

      if (order == 'desc') {
        this.order = 'asc'
      } else if (order == 'asc') {
        this.order = ''
      } else {
        this.order = 'desc'
      }

      this.sorting()
    },
    sorting() {
      if (this.target != '') {
        if (this.order) {
          this.dataList.sort((a, b) => {
            let condA = parseInt(a[this.target]),
                condB = parseInt(b[this.target])

            if (this.order == 'asc') {
              if (condA > condB) return 1
              else if (condA == condB) return 0
              else if (condA < condB) return -1
            } else {
              if (condA > condB) return -1
              else if (condA == condB) return 0
              else if (condA < condB) return 1
            }
          })
        } else {
          if (this.items.length > 0) {
            this.dataList = this.copy(this.items)
          }
        }

        if (this.multiHeader > 0) {
          this.tableHeader.forEach(main => {
            main.forEach(item => {
              if (item.target == this.target) {
                item.order = this.order
              } else {
                item.order = ''
              }
            })
          })
        } else {
          this.tableHeader.forEach(item => {
            if (item.target == this.target) {
              item.order = this.order
            } else {
              item.order = ''
            }
          })
        }

        this.$emit('@sortChange', { data: this.copy(this.dataList), target: this.target, order: this.order })
      }
    },
    copy(data) {
      return JSON.parse(JSON.stringify(data))
    },
    showToolTip(item) {
      console.log(item)
    }
  }
}
</script>

<style scoped>
.columns {cursor: pointer; display: flex; flex-direction: row; align-items: center;}
.columns.center {justify-content: center;}
.columns.left {justify-content: flex-start;}
.columns.right {justify-content: flex-end;}
.sorting {
  transition: all .2s; transform-origin: center; text-align: center;
  font-size: 14px; width: 21px; height: 21px; color: #528ff2;
}
.order-icon {display: block; line-height: 21px; width: 21px; font-size: 18px; text-align: center;}
.sorting:hover {color: rgba(82, 143, 242, 0.5);}
.desc {transform: rotate(360deg);}
.asc {transform: rotate(180deg);}
.sort-cell-text {margin-right: 5px; position: relative;}
.icon-scale-enter, .icon-scale-leave-to {transform: scale(0)}
.icon-scale-enter-active, .icon-scale-leave-active {transition: transform .2s;}
</style>