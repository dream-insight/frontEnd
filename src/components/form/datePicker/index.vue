<template>
  <div :class="['date-picker', { error: onError }]">
    <div class="wrap" @click="toggleCalendar">
      <div class="picker-date-text">
        <template v-if="range">
          <input
            type="text"
            :placeholder="holderText[0]"
            :value="value[0]"
          />
          <font-awesome-icon class="ml-1" icon="fas fa-calendar-alt" />
          &nbsp;&nbsp;~&nbsp;&nbsp;
          <input
            type="text"
            :placeholder="holderText[1]"
            :value="value[1]"
          />
          <font-awesome-icon class="ml-1" icon="fas fa-calendar-alt" />
        </template>

        <template v-else>
          <input
            type="text"
            :placeholder="holderText"
            :value="value"
          />
          <font-awesome-icon class="ml-1" icon="fas fa-calendar-alt" />
        </template>
      </div>

      <p :class="['description', { error: errorTransition }]" v-if="!isValidate">
        <font-awesome-icon icon="fas fa-exclamation-circle" />
        {{ message }}
      </p>
    </div>

    <template v-if="range">
      <transition name="picker-scale">
        <div id="picker" class="picker-popup" v-show="isShow">
          <div class="search-date">
            <a
              href="#"
              :class="[v.checked ? 'active' : '']"
              :key="v.text" @click.prevent="pickCaseDate(i)"
              v-for="(v, i) in toggleDateButton">
              {{ v.text }}
            </a>
          </div>
          <div class="picker-wrap" tabindex="0">
            <div class="calendar start_calendar">
              <div class="start-end-text">시작일</div>

              <date-controller
                :is-show="isShow"
                :year="startYear"
                :month="startMonth"
                :max-year="maxYear"
                :min-year="minYear"
                @change-month="changeMonth('start', $event)"
                @set-year="changeYearMonth('start', 'Year', $event)"
                @set-month="changeYearMonth('start', 'Month', $event)"
              />

              <div class="select-calendar-wrap">
                <transition :name="startTransitionName">
                  <div class="select-calendar" v-show="startShow">
                    <ul class="header">
                      <li
                        :class="{ sun: i === 0, sat: i === 6 }"
                        :key="`start-head-${name}`"
                        v-for="(name, i) in head">
                        {{ name }}
                      </li>
                    </ul>
                    <ul
                      :key="`start-tr-${i}`"
                      v-for="(li, i) in start">
                      <li
                        :key="`start-${item.type}-${item.day}`"
                        :class="[item.type, { sun: j === 0, sat: j === 6 }]"
                        @click.prevent="selectedDay(i, j)"
                        v-for="(item, j) in li">
                        {{ item.day }}
                      </li>
                    </ul>
                  </div>
                </transition>
              </div>
            </div>
            <div class="calendar end_calendar">
              <div class="start-end-text">종료일</div>

              <date-controller
                :is-show="isShow"
                :year="endYear"
                :month="endMonth"
                :max-year="maxYear"
                :min-year="minYear"
                @change-month="changeMonth('end', $event)"
                @set-year="changeYearMonth('end', 'Year', $event)"
                @set-month="changeYearMonth('end', 'Month', $event)"
              />

              <div class="select-calendar-wrap">
                <transition :name="endTransitionName">
                  <div class="select-calendar" v-show="endShow">
                    <ul class="header">
                      <li
                        :class="{ sun: i === 0, sat: i === 6 }"
                        :key="`end-head-${name}`"
                        v-for="(name, i) in head" >
                        {{ name }}
                      </li>
                    </ul>
                    <ul
                      :key="`end-tr-${i}`"
                      v-for="(li, i) in end">
                      <li
                        :key="`end-${item.type}-${item.day}`"
                        :class="[item.type, { sun: j === 0, sat: j === 6 }]"
                        @click.prevent="selectedDay(i, j, 'end')"
                        v-for="(item, j) in li">
                        {{ item.day }}
                      </li>
                    </ul>
                  </div>
                </transition>
              </div>
            </div>

            <div class="btn-area">
              <div :class="['select-date', { 'selected-error': this.selectedError }]">
                {{ selectedDateView }}
              </div>
              <div>
                <a href="#" class="btn cancel" @click.prevent="cancel">취소</a>
                <a href="#" class="btn okay" @click.prevent="accept">확인</a>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </template>

    <!-------------------------------- 날짜 단일 선택 달력 ---------------------------------->
    <template v-else>
      <transition name="picker-scale">
        <div id="picker" class="picker-popup single" v-show="isShow">
          <div class="picker-wrap">
            <div class="calendar-inner">
              <div class="calendar">

                <date-controller
                  :is-show="isShow"
                  :year="startYear"
                  :month="startMonth"
                  :max-year="maxYear"
                  :min-year="minYear"
                  @change-month="changeMonth('start', $event)"
                  @set-year="changeYearMonth('start', 'Year', $event)"
                  @set-month="changeYearMonth('start', 'Month', $event)"
                />

                <div class="select-calendar-wrap">
                  <transition :name="startTransitionName">
                    <div class="select-calendar" v-show="startShow">
                      <ul class="header">
                        <li
                          :key="`start-head-${name}`"
                          :class="{ sun: i === 0, sat: i === 6 }"
                          v-for="(name, i) in head">
                          {{ name }}
                        </li>
                      </ul>
                      <ul
                        :key="`start-tr-${i}`"
                        v-for="(li, i) in start">
                        <li
                          :key="`start-${item.type}-${item.day}`"
                          :class="[item.type, { sun: j === 0, sat: j === 6 }]"
                          @click.prevent="selectedDay(i, j)"
                          v-for="(item, j) in li">
                          {{ item.day }}
                        </li>
                      </ul>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </template>
  </div>
</template>

<script>
import dateController from './dateController'

export default {
  name: 'datePicker',
  components: {
    dateController
  },
  props: {
    value: [String, Array],
    validate: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: [String, Array],
    },
    range: {
      type: Boolean,
      default: false
    },
    // 년, 월, 일 사이 구분 표시
    separator: {
      type: String,
      default: '-'
    },
    minYear: {
      type: Number,
      default: 1900,
    },
    maxYear: {
      type: Number,
      default: parseInt(new Date().getFullYear()) + 10
    }
  },
  data() {
    return {
      isShow: false,
      picker: null,
      width: 750,
      holderText: '',

      nowChecked: 0,
      toggleDateButton: [
        { text: '오늘', checked: false },
        { text: '어제', checked: false },
        { text: '최근 7일', checked: false },
        { text: '최근 30일', checked: false },
        { text: '이번 달', checked: false },
        { text: '지난 달', checked: false }
      ],

      startShow: true,
      endShow: true,
      startTimeout: null,
      endTimeout: null,
      startTransitionName: '',
      endTransitionName: '',

      curYear: 2019,
      curMonth: 12,
      curDay: 1,

      head: ['일', '월', '화', '수', '목', '금', '토'],

      start: [],
      end: [],
      startYear: 2019,
      startMonth: 11,
      startDay: 1,
      endYear: 2019,
      endMonth: 11,
      endDay: 1,

      opt: {
        year: [],
        month: []
      },

      startSelectedDate: '',
      endSelectedDate: '',
      startSelectedDay: 0,
      endSelectedDay: 0,
      startTime: 0,
      endTime: 0,

      selectedError: '',

      message: '',
      onError: false,
      errorTransition: false,
      isValidate: true
    }
  },
  watch: {
    startSelectedDate(v) {
      this.resetError()
    },
    endSelectedDate(v) {
      this.resetError()
    },
    errorTransition(v) {
      if (v) {
        setTimeout(() => {
          this.errorTransition = false
        }, 300)
      }
    },
    value(v) {
      if (this.range) {
        this.startSelectedDate = v[0]
        this.endSelectedDate = v[1]
      } else {
        this.startSelectedDate = v
      }
    },
    validate() {
      this.message = ''
      this.isValidate = true
      this.errorTransition = false
    }
  },
  computed: {
    startDate() {
      let v = this.startSelectedDate

      // 시작일 종료일 텍스트 표시 선택된 날짜가 있는 경우 선택된 날짜로 표시
      if (this.startSelectedDay === 0) {
        v = this.dateFormat(this.startYear, this.startMonth, this.startDay)
      }

      return v
    },
    endDate() {
      let v = this.endSelectedDate

      if (this.endSelectedDay === 0) {
        v = this.dateFormat(this.endYear, this.endMonth, this.endDay)
      }

      return v
    },
    selectedDateView() {
      let v = ''

      if (this.selectedError != '') {
        v = this.selectedError
      } else if (this.startSelectedDate !== '' && this.endSelectedDate !== '') {
        v = `${this.startSelectedDate} ~ ${this.endSelectedDate}`
      }

      return ''
    },
  },
  created() {
    this.init()
    this.makeCanlendar('start')

    if (this.range) {
      this.makeCanlendar('end')
      this.holderText = ['', '']
    }

    if (this.placeholder) {
      this.holderText = this.placeholder
    }

    if (this.value) {
      if (this.range) {
        this.startSelectedDate = this.value[0]
        this.endSelectedDate = this.value[1]
      } else {
        this.startSelectedDate = this.value
      }
    }
  },
  mounted() {
    this.picker = this.$el.querySelector('#picker')

    document.addEventListener('click', evt => {
      if (this.isShow) {
        const classList = evt.target.classList.value
        const indexOf1 = classList.indexOf('current')
        const indexOf2 = classList.indexOf('today')
        const indexOf3 = classList.indexOf('date-range')

        if (indexOf1 === -1 && indexOf2 === -1 && indexOf3 === -1) {
          this.isShow = this.$el.contains(evt.target)
        }
      }
    })

    document.addEventListener('scroll', () => {
      const rect = this.$el.getBoundingClientRect()
      this.picker.style.top = (rect.top + rect.height + 5) + 'px'

      if (this.isShow) {
        this.isShow = false
      }
    })
  },
  methods: {
    init() {
      const date = new Date()

      this.curYear = date.getFullYear()
      this.curMonth = date.getMonth()
      this.curDay = date.getDate()

      this.startYear = date.getFullYear()
      this.startMonth = date.getMonth()
      this.startDay = date.getDate()
      this.endYear = date.getFullYear()
      this.endMonth = date.getMonth()
      this.endDay = date.getDate()

      this.startSelectedDate = ''
      this.endSelectedDate = ''
      this.startTime = 0
      this.endTime = 0
    },
    toggleCalendar() {
      // 달력 표시 전 처리
      const bodyRect = document.body.getBoundingClientRect()
      const rect = this.$el.getBoundingClientRect()
      const pickerWidth = this.range ? 480 : 230
      const pickerHeight = this.range ? 454 : 280

      // 포지션이 아래쪽으로 치우쳤다면 위로 나오게 변경한다.
      if (window.innerHeight < rect.bottom + pickerHeight) {
        this.picker.style.top = ''
        this.picker.style.bottom = `${Math.floor(window.innerHeight - rect.top) + 5}px`

        if (bodyRect.width / 2 < rect.x) {
          this.picker.style.transformOrigin = 'bottom right'
          this.picker.style.left = `${Math.floor(rect.x + rect.width) - pickerWidth}px`
        } else {
          this.picker.style.transformOrigin = 'bottom left'
        }
      } else {
        this.picker.style.bottom = ''
        this.picker.style.top = `${Math.floor(rect.top + rect.height) + 5}px`

        if (bodyRect.width / 2 < rect.x) {
          this.picker.style.transformOrigin = 'top right'
          this.picker.style.left = `${Math.floor(rect.x + rect.width) - pickerWidth}px`
        } else {
          this.picker.style.transformOrigin = 'top left'
        }
      }

      this.isShow = !this.isShow
    },
    makeCanlendar(flag) {
      // 달력 생성
      const startWeek = new Date(this[flag + 'Year'], this[flag + 'Month'], 1).getDay()
      const lastDay = new Date(this[flag + 'Year'], this[flag + 'Month'] + 1, 0).getDate()

      this[flag + 'MonthLabel'] = this[flag + 'Year'] + '년 ' + (this[flag + 'Month'] + 1) + '월'

      let day = 1, afterDay = 1
      let beforeDay = this.getBeforeDay(this[flag + 'Year'], this[flag + 'Month'], startWeek)

      for (let i = 0; i < 6; i++) {
        this.$set(this[flag], i, [])
      }

      let objData = new Object()

      for (let j = 0; j < 6 * 7; j++) {
        if (j >= startWeek && day <= lastDay) {
          if (this[flag + 'SelectedDate'] === this.dateFormat(this[flag + 'Year'], this[flag + 'Month'], day)) {
            objData = { day, type: 'date-start' }
          } else if (this[flag + 'Year'] === this.curYear && this[flag + 'Month'] === this.curMonth && day === this.curDay) {
            objData = { day, type: 'today' }
          } else {
            objData = { day, type: 'current' }
          }

          // 시작 날짜와 끝 날짜 사이에 색상 표시
          if (objData.type !== 'today') {
            if (this.range && this.startSelectedDate !== '' && this.endSelectedDate !== '') {
              let time = new Date(this[flag + 'Year'], this[flag + 'Month'], day).getTime()

              if (time >= this.startTime && time <= this.endTime) {
                if (flag === 'start' && time > this.startTime) {
                  objData.type = 'date-range'
                } else if (flag === 'end' && time < this.endTime) {
                  objData.type = 'date-range'
                }
              }
            }
          }

          day++
        } else if (day > lastDay) {
          objData = { day: afterDay, type: 'afterMonth' }
          afterDay++
        } else if (j < startWeek) {
          objData = { day: beforeDay, type: 'beforeMonth' }
          beforeDay++
        }

        this.$set(this[flag][Math.floor(j / 7)], j % 7, objData)
      }
    },
    getBeforeDay(year, month, week) {
      // 전달의 마지막 날짜 표시
      const day = new Date(year, month, 0).getDate()

      return day - week + 1
    },
    changeMonth(flag, increase) {
      // 버튼을 통해 달을 변경
      let change = false

      if (increase === 1 || increase === -1) {
        // 월별 이동 (computed 에서 최종 처리)
        if (this[flag + 'Month'] === 11 && increase > 0) {
          // 지정된 최대 년도보다 높아지지 않도록 처리
          if (this[flag + 'Year'] + 1 < this.maxYear) {
            this[flag + 'Month'] = 0
            this[flag + 'Year'] += 1
            change = true
          }
        } else if (this[flag + 'Month'] === 0 && increase < 0) {
          if (this[flag + 'Year'] - 1 > 1900) {
            this[flag + 'Month'] = 11
            this[flag + 'Year'] -= 1
            change = true
          }
        } else {
          this[flag + 'Month'] += increase
          change = true
        }
      } else {
        // 년 단위 이동
        if (increase === 12 && this[flag + 'Year'] < this.maxYear) {
          this[flag + 'Year'] += 1
          change = true
        } else if (increase === -12 && this[flag + 'Year'] > 1900) {
          this[flag + 'Year'] -= 1
          change = true
        }
      }

      if (change) {
        // transition animate
        if (increase > 0) {
          this[flag + 'TransitionName'] = 'trans-left'
        } else {
          this[flag + 'TransitionName'] = 'trans-right'
        }
        console.log(flag + 'TransitionName', this[flag + 'TransitionName'])
        this[flag + 'Show'] = false

        clearTimeout(this[flag + 'Timeout'])

        this[flag + 'Timeout'] = setTimeout(() => {
          this.makeCanlendar(flag)
          this[flag + 'Show'] = true
        }, 150)
      }
    },
    changeYearMonth(flag, target, value) {
      // 년 월 select box 변경 이벤트
      this[flag + target] = value

      // transition animate
      this[flag + 'TransitionName'] = 'trans-down'
      this[flag + 'Show'] = false

      clearTimeout(this[flag + 'Timeout'])

      this[flag + 'Timeout'] = setTimeout(() => {
        this.makeCanlendar(flag)
        this[flag + 'Show'] = true
      }, 150)
    },
    pickCaseDate(flag) {
      this.toggleDateButton[this.nowChecked].checked = false
      this.toggleDateButton[flag].checked = true

      this.nowChecked = flag

      let date = new Date()

      if (flag === 4 || flag === 5) {
        if (flag === 4) {
          date = new Date(date.getFullYear(), date.getMonth() + 1, 0)
        } else {
          date = new Date(date.getFullYear(), date.getMonth(), 0)
        }

        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()

        if (month.toString().length === 1) {
          month = '0' + month.toString()
        }

        if (day.toString().length === 1) {
          day = '0' + day.toString()
        }
      }

      let format = `Y${this.separator}m${this.separator}d`

      switch (flag) {
        case 0:
          this.startSelectedDate = date.getDateFormat(format, 0)
          this.endSelectedDate = date.getDateFormat(format, 0)
          break
        case 1:
          this.startSelectedDate = date.getDateFormat(format, -1)
          this.endSelectedDate = date.getDateFormat(format, -1)
          break
        case 2:
          this.startSelectedDate = date.getDateFormat(format, -6)
          this.endSelectedDate = date.getDateFormat(format, 0)
          break
        case 3:
          this.startSelectedDate = date.getDateFormat(format, -29)
          this.endSelectedDate = date.getDateFormat(format, 0)
          break
        case 4:
          this.startSelectedDate = `${year}${this.separator}${month}${this.separator}01`
          this.endSelectedDate = `${year}${this.separator}${month}${this.separator}${day}`
          break
        case 5:
          this.startSelectedDate = `${year}${this.separator}${month}${this.separator}01`
          this.endSelectedDate = `${year}${this.separator}${month}${this.separator}${day}`
          break
      }

      // 해당 달력으로 변환
      let start = this.startSelectedDate.split(this.separator)
      let end = this.endSelectedDate.split(this.separator)

      this.startYear = parseInt(start[0], 10)
      this.startMonth = parseInt(start[1], 10) - 1
      this.startDay = parseInt(start[2], 10)

      this.endYear = parseInt(end[0], 10)
      this.endMonth = parseInt(end[1], 10) - 1
      this.endDay = parseInt(end[2], 10)

      this.startTime = new Date(this.startYear, this.startMonth, this.startDay).getTime()
      this.endTime = new Date(this.endYear, this.endMonth, this.endDay).getTime()

      // transition animate
      clearInterval(this.startTimeout)

      this.startTransitionName = 'trans-down'
      this.endTransitionName = 'trans-down'

      this.startShow = false
      this.endShow = false

      this.startTimeout = setTimeout(() => {
        this.makeCanlendar('start')
        this.makeCanlendar('end')

        this.startShow = true
        this.endShow = true
      }, 150)

      this.updateValue()
    },
    selectedDay(tr, td, flag = 'start') {
      this.selectedError = ''

      // 날짜 선택
      const type = this[flag][tr][td].type
      const day = this[flag][tr][td].day

      if (type === 'current' || type === 'today' || type === 'date-range') {
        this[flag + 'SelectedDay'] = day

        if (flag === 'start') {
          this.startSelectedDate = this.dateFormat(this.startYear, this.startMonth, this.startSelectedDay)
          this.startTime = new Date(this.startYear, this.startMonth, this.startSelectedDay).getTime()
        } else {
          this.endSelectedDate = this.dateFormat(this.endYear, this.endMonth, this.endSelectedDay)
          this.endTime = new Date(this.endYear, this.endMonth, this.endSelectedDay).getTime()
        }

        if (this.range && this.startTime > 0 && this.endTime > 0) {
          // 범위 선택 달력일 경우 종료일이 시작일보다 빠르지 않도록 처리
          if (this.startTime > this.endTime) {
            this.endSelectedDate = ''
            this.endTime = 0

            this.selectedError = '종료일이 시작일 보다 날짜가 빠릅니다.'
          }
        }

        // 달력을 다시 그려준다.
        this.makeCanlendar('start')

        if (this.range) {
          this.makeCanlendar('end')
        } else {
          this.$emit('input', this.startSelectedDate)
          this.isShow = false
        }
      }
    },
    dateFormat(year, month, day) {
      let date = `${year}-`

      if (month + 1 < 10) {
        date += `0${(month + 1)}-`
      } else {
        date += `${(month + 1)}-`
      }

      if (day < 10) {
        date += `0${day}`
      } else {
        date += day.toString()
      }

      if (this.noSeparator) {
        date = date.replace(/-/gi, '')
        date = date.replace(/\./gi, '')
      }

      return date
    },
    cancel() {
      this.resetForm()
      this.isShow = false
    },
    accept() {
      this.updateValue()
      this.isShow = false
    },
    updateValue() {
      // 종료 날짜가 시작 날짜보다 작지 않을 경우 데이터 적용
      if (this.range) {
        if (this.startSelectedDate && this.endSelectedDate) {
          this.$emit('input', [this.startSelectedDate, this.endSelectedDate])
        } else {
          this.startSelectedDate = ''
          this.endSelectedDate = ''

          this.$emit('input', ['', ''])
        }
      } else {
        this.$emit('input', this.startSelectedDate)
      }
    },
    resetForm() {
      this.init()

      if (this.range) {
        this.makeCanlendar('start')
        this.makeCanlendar('end')
        this.$emit('input', ['', ''])
      } else {
        this.makeCanlendar('start')
        this.$emit('input', '')
      }
    },
    resetError() {
      this.message = ''
      this.onError = false
      this.errorTransition = false
      this.isValidate = true
    },
    check() {
      // 데이터 검증
      if (this.validate.length) {
        for (let i = 0; i < this.validate.length; i++) {
          let result1 = true
          let result2 = true

          if (this.range) {
            result1 = this.validate[i].call(null, this.startSelectedDate)
            result2 = this.validate[i].call(null, this.endSelectedDate)
          } else {
            result1 = this.validate[i].call(null, this.startSelectedDate)
          }

          if (result1 !== true || result2 !== true) {
            this.message = result1
            this.onError = true
            this.errorTransition = true
            this.isValidate = false

            return false
          } else {
            this.message = ''
          }
        }
      }

      return true
    },
  }
}

Date.prototype.getDateFormat = function(format, days = 0) {
  let date = this

  if (days !== 0) {
    const time = date.getTime()
    date = new Date(time + (86400 * days * 1000))
  }

  let year = date.getYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let dYear = date.getFullYear()
  let dMonth = month
  let dDay = day

  if (month.toString().length === 1) {
    dMonth = `0${month}`
  }

  if (day.toString().length === 1) {
    dDay = `0${day}`
  }

  format = format.replace('Y', dYear)
  format = format.replace('m', dMonth)
  format = format.replace('d', dDay)
  format = format.replace('y', year)
  format = format.replace('n', month)
  format = format.replace('j', day)

  return format
}
</script>

<style lang="scss" scoped>
.date-picker {
  position: relative;
  display: inline-block;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &.error input[type=text] {
    border: 2px solid #ff5252;
  }

  .description {
    font-size: 12px !important;
    font-weight: normal;
    padding: 0 !important;
    margin-bottom: 0 !important;
    border: 0 !important;
    color: #ff5252;
    text-align: left !important;

    &.error {
      animation: shaking 0.3s;
    }
  }

  .picker-popup {
    position: fixed;
    border-radius: 3px;
    box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.3);
    background: #fff;
    z-index: 100;
    line-height: 1;

    .search-date {
      padding: 10px;
      border-bottom: 1px solid #dadada;
      text-align: left;

      a {
        display: inline-block;
        text-decoration: none;
        border: 1px solid rgb(138, 138, 138);
        font-size: 12px;
        padding: 0 12px;
        line-height: 24px;
        color: rgb(101, 101, 101);
        border-radius: 3px;

        & + a {
          margin-left: 3px;
        }

        &.active {
          background-color: rgb(138, 138, 138);
          color: #fff;
        }
      }
    }

    .start-end-text {
      line-height: 30px;
      font-size: 14px;
      font-weight: 700;
      text-align: center;
      border-bottom: 1px solid #eee;
      color: #444;
    }

    .picker-wrap {
      .calendar-inner {
        width: 100%;
        text-align: center;
        font-size: 0;
      }

      .calendar {
        display: inline-block;
        width: 240px;
        box-sizing: border-box;
        vertical-align: top;

        &.end_calendar {
          border-left: 1px solid #eee;
        }
      }

      .select-year-month {
        width: 210px;
        height: 30px;
        margin: 15px auto;
        text-align: center;
        font-size: 13px;

        select:nth-child(1) {
          min-width: 80px !important;
        }

        select:nth-child(2) {
          min-width: 50px !important;
        }

        button {
          display: inline-block;
          margin-left: 5px;
          border: 0;
          height: 25px;
          line-height: 25px;
          width: 25px;
          text-align: center;
          background-color: teal;
          color: #fff !important;
          border-radius: 5px;
        }
      }


      .select-calendar {
        width: 210px;
        margin: 0 auto;

        ul {
          display: table;
          width: 100%;
          font-size: 13px;
          margin: 0;
          padding-left: 0;

          li {
            display: table-cell;
            text-align: center;
            vertical-align: middle;
            width: 30px;
            height: 30px;
            cursor: pointer;

            &.beforeMonth,
            &.afterMonth {
              color: #aaa;
            }

            &.today {
              background: #425cf432;
            }

            &.date-range {
              background: #eceefe;
            }

            &.select,
            &.date-start,
            &.day_end {
              background: #425cf4;
              color: #fff;
            }
          }

          &.header li {
            cursor: default !important
          }

          li:first-child {
            color: #ff5253;
          }

          &:first-child li {
            font-weight: 700;
            color: #222;
          }

          &:not(.header) li:hover {
            background: #f1f1f1;
          }
        }
      }

      .btn-area {
        padding: 10px;
        border-top: 1px solid #dadada;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .select-date {
          font-size: 15px;

          &.selected-error {
            color: red;
          }
        }

        .btn {
          display: inline-block;
          text-decoration: none;
          border: 1px solid rgb(138, 138, 138);
          font-size: 14px;
          padding: 0 15px;
          line-height: 28px;
          color: rgb(101, 101, 101);
          border-radius: 3px;

          & + .btn {
            margin-left: 5px;
          }

          &.okay {
            background-color: rgb(138, 138, 138);
            color: #fff;
          }
        }
      }
    }

    &.single {
      width: 230px;

      .picker-wrap .calendar {
        width: 210px;
      }
    }

    &.singleFull {
      width: 100%;

      .picker-wrap {
        .calendar {
          width: 189px;
        }

        .select-calendar {
          width: 189px;
          margin-bottom: 20px;

          ul li {
            width: 27px;
            line-height: 27px;
          }
        }
      }
    }
  }

  &.show .picker-popup {
    display: block;
  }

  &.show .picker-date-text:after {
    transform: rotate(-180deg);
    transition: all 0.5s;
  }

  .picker-date-text {
    display: flex;
    flex-direction: row;
    align-items: center;

    i {
      font-size: 21px;
      color: rgb(143, 143, 143);
      margin: 0 4px;

      & + input {
        margin-left: 5px;
      }
    }

    p {
      display: block;
    }
  }

  .calendar-inner {
    min-height: 257px;
  }

  .select-calendar-wrap {
    min-height: 210px !important;
    margin-bottom: 10px;
  }
}

.ml-1 {
  margin-left: 3px;
}

/* transitions */
.picker-scale-enter,
.picker-scale-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
.picker-scale-enter-active,
.picker-scale-leave-active {
  transition: all 0.1s ease-out;
}

.trans-left-enter {
  opacity: 0;
  transform: translateX(20px);
}
.trans-left-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
.trans-left-enter-active,
.trans-left-leave-active {
  transition: all 0.1s ease-out;
}

.trans-right-enter {
  opacity: 0;
  transform: translateX(-20px);
}
.trans-right-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
.trans-right-enter-active,
.trans-right-leave-active {
  transition: all 0.1s ease-out;
}

.trans-down-enter {
  opacity: 0;
  transform: translateY(-20px);
}
.trans-down-leave-to {
    opacity: 0;
    transform: translateY(20px);
}
.trans-down-enter-active,
.trans-down-leave-active {
    transition: all 0.1s ease-out;
}

/* error message shaking */
@keyframes shaking {
  0% {
    transform: translateX(10px);
  }
  25% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(10px);
  }
  75% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(10px);
  }
}
</style>