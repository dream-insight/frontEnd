<template>
  <div :class="['table-section', { half: isHalf }, { 'min-size': isMin }]">
    <table class="settlement" :width="width">
      <thead>
        <tr ref="head">
          <th
            v-for="(head, i) in header"
            :key="head.name"
            :style="{ minWidth: headerWidth[i] ? ` ${headerWidth[i]}px` : '' }">
            <sorting-cell
              :target="head.name"
              :text="head.text"
              @sorting="sorting"
              v-if="head.sorting === true" />
            <template v-else>{{ head.text }}</template>

            <div
              class="column-resize"
              @mousedown="resizeColumn($event, i)"
              @mouseup="resizeColumn($event, i)"
              v-if="resizable" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          :class="{ hold: i === lineHoldIndex }"
          v-for="(item, i) in items"
          :key="`data-list${i}`"
          @click="clickList(i)">
          <td
            :class="{ 'text-right': td.align == 'right' }"
            v-for="(td, j) in header"
            :key="`td-list-${i}-${j}`">
            <template v-if="item[td.name] == undefined">
              -
            </template>
            <template v-else-if="td.type == 'number'">
              {{ item[td.name].numberFormat() }}
            </template>
            <template v-else>
              {{ item[td.name] }}
            </template>
          </td>
        </tr>
      </tbody>
      <tfoot v-if="Object.keys(footer).length > 0 && items.length > 0">
        <tr>
          <template v-if="span !== undefined">
            <th :colspan="span.size" style="text-align: center">
              {{ span.text }}
            </th>
            <template v-for="(td, i) in header">
              <th
                v-if="i >= span.size || span.size === undefined"
                :class="{ 'text-right': td.align == 'right' }"
                :key="`footer-${td.name}`">
                <template v-if="footer[td.name] !== undefined">
                  <template v-if="td.type == 'number'">
                    {{ footer[td.name].numberFormat() }}
                  </template>
                  <template v-else>
                    {{ footer[td.name] }}
                  </template>
                </template>
              </th>
            </template>
          </template>
          <template v-else>
            <th
              v-for="td in header"
              :class="{ 'text-right': td.align == 'right' }"
              :key="`footer-${td.name}`">
              <template v-if="footer[td.name] !== undefined">
                <template v-if="td.type == 'number'">
                  {{ footer[td.name].numberFormat() }}
                </template>
                <template v-else>
                  {{ footer[td.name] }}
                </template>
              </template>
            </th>
          </template>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import sortingCell from '@/components/utils/sortingCell'

export default {
  name: 'dataTable',
  components: { sortingCell },
  props: {
    width: {
      type: [String, Number],
      default: '100%',
    },
    header: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    footer: Object,
    isMin: {
      // 최소 싸이즈로 변경
      type: Boolean,
      default: false,
    },
    isHalf: {
      type: Boolean,
      default: false,
    },
    span: Object, // footer 용
  },
  watch: {
    items(data) {
      if (data.length == 0) {
        this.lineHoldIndex = -1
      }
    },
    isHalf(bln) {
      if (bln) {
        setTimeout(() => {
          document
            .querySelector('.hold')
            .scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest',
            })
        }, 200)
      }
    },
  },
  data() {
    return {
      lineHoldIndex: -1,

      // 제목 컬럼 리사이즈 옵션
      resizable: true,
      mouseDownPosX: -1,
      resizeHeaderIndex: -1,
      headerWidth: [],
      targetWidth: 0,
    }
  },
  created() {
    this.headerWidth = this.header.map((obj) => {
      // 만약 하나라도 column size가 비율(%)로 잡혀 있다면 resize 불가
      if (obj.width.indexOf('%') > -1 || obj.width == '') {
        this.resizable = false
      }

      return parseInt(obj.width)
    })
  },
  mounted() {
    this.$el.addEventListener('scroll', (evt) => {
      let scrollHeight = evt.target.scrollHeight
      let scrollTop = evt.target.scrollTop
      let inner = evt.target.offsetHeight + 100

      if (scrollHeight <= scrollTop + inner) {
        this.$emit('@listEnd')
      }
    })

    document.addEventListener('mouseup', this.destroyEvent)
  },
  beforeDestroy() {
    document.removeEventListener('mouseup', this.destroyEvent)
  },
  methods: {
    clickList(index) {
      this.lineHoldIndex = index
      this.$emit('@clickList', index)
    },
    sorting(target) {
      this.$emit('@sorting', target)
    },
    resizeColumn(evt, index) {
      if (evt.type == 'mousedown') {
        document.body.style.cursor = 'col-resize'
        this.resizeHeaderIndex = index
        this.mouseDownPosX = evt.x
        this.targetWidth = this.headerWidth[index]

        document.addEventListener('mousemove', this.mouseMove)
      }
    },
    mouseMove(evt) {
      const moveRange = this.mouseDownPosX - evt.x

      if (moveRange < 0) {
        // 사이즈를 늘림
        this.$set(
          this.headerWidth,
          this.resizeHeaderIndex,
          this.targetWidth + Math.abs(moveRange)
        )
      } else if (moveRange > 0) {
        // 사이즈를 줄임
        this.$set(
          this.headerWidth,
          this.resizeHeaderIndex,
          this.targetWidth - Math.abs(moveRange)
        )
      }
    },
    destroyEvent() {
      document.body.style.cursor = 'default'
      document.removeEventListener('mousemove', this.mouseMove)
    },
  },
}
</script>

<style scoped>
.table-section table thead th {
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  word-break: keep-all;
}
.column-resize {
  cursor: col-resize;
  position: absolute;
  width: 5px;
  height: 100%;
  right: -1px;
  top: 0;
}
.column-resize:hover {
  background-color: rgb(102, 168, 255);
}
</style>
