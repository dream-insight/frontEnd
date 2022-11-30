<template>
  <div class="select-month">
    <button type="button" class="prev2" @click="changeMonth(-12)">
      <font-awesome-icon class="arrow-icon" icon="fas fa-angle-double-left" />
    </button>

    <button type="button" class="prev" @click="changeMonth(-1)">
      <font-awesome-icon class="arrow-icon" icon="fas fa-angle-left" />
    </button>

    <span>
      <em @click="toggleSelector()">
        {{ year }}년

        <selector
          :max="maxYear"
          :date="selectedYear"
          :is-show="showYearSelector"
          @selected="setYearMonth('year', $event)"
          v-show="showYearSelector"
        />
      </em>
      <em @click="toggleSelector('month')">
        {{ month + 1 }}월

        <selector
          :date="selectedMonth"
          :is-show="showMonthSelector"
          @selected="setYearMonth('month', $event)"
          v-show="showMonthSelector"
        />
      </em>
    </span>

    <button type="button" class="next" @click="changeMonth(1)">
      <font-awesome-icon class="arrow-icon" icon="fas fa-angle-right" />
    </button>

    <button type="button" class="next2" @click="changeMonth(12)">
      <font-awesome-icon class="arrow-icon" icon="fas fa-angle-double-right" />
    </button>
  </div>
</template>

<script>
import selector from './selector'

export default {
  name: 'dateController',
  components: {
    selector
  },
  props: {
    isShow: Boolean,
    maxYear: Number,
    minYear: Number,
    year: Number,
    month: Number,
  },
  data() {
    return {
      selectedYear: 0,
      selectedMonth: 0,
      showYearSelector: false,
      showMonthSelector: false,
    }
  },
  watch: {
    isShow(bool) {
      if (!bool) {
        this.showMonthSelector = false
        this.showYearSelector = false
      }
    },
    year(v) {
      this.selectedYear = v
    },
    month(v) {
      this.selectedMonth = v
    },
  },
  created() {
    this.selectedYear = this.year
    this.selectedMonth = this.month
  },
  methods: {
    toggleSelector(flag = 'year') {
      if (flag == 'month') {
        this.showYearSelector = false
        this.showMonthSelector = !this.showMonthSelector
      } else {
        this.showMonthSelector = false
        this.showYearSelector = !this.showYearSelector
      }
    },
    setYearMonth(target, value) {
      this.$emit(`set-${target}`, value)
    },
    changeMonth(increase) {
      this.$emit('change-month', increase)
    },
  }
}
</script>
