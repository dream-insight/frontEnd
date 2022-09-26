<template>
    <div class="ml-1 calendar_basic">
        <template v-if="range">
            <div :class="['wrap', {error: onError}]" @click="toggleCalendar">
                <div class="calendar_date_text">
                    <input type="text" style="width: 140px" class="form-control form-control-sm" :placeholder="holderText[0]" :value="value[0]" />
                    <fa-icon far name="calendar-alt" />
                    ~
                    <input type="text" style="width: 140px" class="form-control form-control-sm" :placeholder="holderText[1]" :value="value[1]" />
                    <fa-icon far name="calendar-alt" />
                </div>

                <p :class="['description', {error: errorTransition}]" v-if="!isValidate">
                    <fa-icon name="exclamation-circle" v-if="!isValidate" />
                    {{message}}
                </p>
            </div>

            <transition name="scale-faster">
                <div id="picker" class="calendar_pop" v-show="isShow">
                    <div class="searchDate">
                        <a href="#"
                            :class="['btn btn-sm', v.checked ? 'btn-primary' : 'btn-outline-primary']"
                            v-for="(v, i) in toggleDateButton" :key="v.text"
                            @click.prevent="pickCaseDate(i)">
                            {{v.text}}
                        </a>
                    </div>
                    <div class="calendar_wrap" tabindex="0">
                        <div class="calendar start_calendar">
                            <div class="start_end_text">시작일</div>
                            <div class="select_year_month" v-show="changeYearMonthMode">
                                <select name="Year" v-model="startYear" @change="changSelectBox">
                                    <option v-for="num in opt.year" :key="'sy' + num">{{num}}</option>
                                </select> 년
                                <select name="Month" v-model="startMonth" @change="changSelectBox">
                                    <option v-for="num in opt.month" :key="'sm' + num" :value="num">{{num + 1}}</option>
                                </select> 월
                                <fa-icon right class="hand" name="redo" @click="changeYearMonthMode = false" />
                            </div>
                            <div class="select_month hand" v-show="!changeYearMonthMode">
                                <span @dblclick="changeYearMonth" ><em>{{startYear}}년</em>&nbsp;<em>{{startMonth + 1}}월</em></span>
                                <button type="button" class="prev" @click="changeMonth('start', -1)"><fa-icon name="angle-left" /></button>
                                <button type="button" class="prev2" @click="changeMonth('start', -12)"><fa-icon name="angle-double-left" /></button>
                                <button type="button" class="next" @click="changeMonth('start', 1)"><fa-icon name="angle-right" /></button>
                                <button type="button" class="next2" @click="changeMonth('start', 12)"><fa-icon name="angle-double-right" /></button>
                            </div>

                            <div class="select-calendar-wrap">
                                <transition :name="startTransitionName">
                                    <div class="select_calendar" v-show="startShow">
                                        <ul class="header">
                                            <li v-for="(v, i) in head" :class="{sun: i == 0, sat: i == 6}" :key="'start-head-' + v">{{v}}</li>
                                        </ul>
                                        <ul v-for="(li, i) in start" :key="'start-tr-' + i">
                                            <li
                                                :key="`start-${v.type}-${v.day}`" :class="[v.type, {sun: j == 0, sat: j == 6}]"
                                                v-for="(v, j) in li" @click.prevent="selectedDay(i, j)">
                                                {{v.day}}
                                            </li>
                                        </ul>
                                    </div>
                                </transition>
                            </div>
                        </div>
                        <div class="calendar end_calendar">
                            <div class="start_end_text">종료일</div>
                            <div class="select_year_month" v-if="changeYearMonthMode">
                                <select name="Year" v-model="endYear" @change="changSelectBox($event, 'end')">
                                    <option v-for="num in opt.year" :key="'ey' + num">{{num}}</option>
                                </select> 년
                                <select name="Month" v-model="endMonth" @change="changSelectBox($event, 'end')">
                                    <option v-for="num in opt.month" :key="'em' + num" :value="num">{{num + 1}}</option>
                                </select> 월
                                <fa-icon right class="hand" name="redo" @click="changeYearMonthMode = false" />
                            </div>
                            <div class="select_month hand" v-show="!changeYearMonthMode">
                                <span @dblclick="changeYearMonth"><em>{{endYear}}년</em>&nbsp;<em>{{endMonth + 1}}월</em></span>
                                <button type="button" class="prev" @click="changeMonth('end', -1)"><fa-icon name="angle-left" /></button>
                                <button type="button" class="prev2" @click="changeMonth('end', -12)"><fa-icon name="angle-double-left" /></button>
                                <button type="button" class="next" @click="changeMonth('end', 1)"><fa-icon name="angle-right" /></button>
                                <button type="button" class="next2" @click="changeMonth('end', 12)"><fa-icon name="angle-double-right" /></button>
                            </div>

                            <div class="select-calendar-wrap">
                                <transition :name="endTransitionName">
                                    <div class="select_calendar" v-show="endShow">
                                        <ul class="header">
                                            <li v-for="(v, i) in head" :class="{sun: i == 0, sat: i == 6}" :key="'end-head-' + v">{{v}}</li>
                                        </ul>
                                        <ul v-for="(li, i) in end" :key="'end-tr-' + i">
                                            <li
                                                :key="`end-${v.type}-${v.day}`" :class="[v.type, {sun: j == 0, sat: j == 6}]"
                                                v-for="(v, j) in li" @click.prevent="selectedDay(i, j, 'end')">
                                                {{v.day}}
                                            </li>
                                        </ul>
                                    </div>
                                </transition>
                            </div>
                        </div>

                        <div class="btn_basic tR">
                            <div :class="['select_date', {'selected-error': this.selectedError}]">
                                {{selectedDateView}}
                            </div>
                            <div>
                                <a href="#" class="btn btn-outline-secondary btn-sm" @click.prevent="cancel">취소</a>
                                <a href="#" class="btn btn-primary btn-sm"  @click.prevent="accept">확인</a>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </template>
        <!-- 날짜 단일 선택 달려 -->
        <template v-else>
            <div :class="['wrap', {error: onError}]" @click="toggleCalendar">
                <div class="calendar_date_text">
                    <input type="text" style="width: 140px" :placeholder="holderText" class="form-control form-control-sm" :value="value" />
                    <fa-icon far name="calendar-alt" />
                </div>

                <p :class="['description', {error: errorTransition}]" v-if="!isValidate">
                    <fa-icon name="exclamation-circle" v-if="!isValidate" />
                    {{message}}
                </p>
            </div>

            <transition name="scale-faster">
                <div id="picker" class="calendar_pop single" v-show="isShow">
                    <div class="calendar_wrap">
                        <div class="calendar_inner">
                            <div class="calendar">
                                <div class="select_year_month" v-if="changeYearMonthMode">
                                    <select name="Year" v-model="startYear" @change="changSelectBox">
                                        <option v-for="num in opt.year" :key="'sy' + num">{{num}}</option>
                                    </select> 년
                                    <select name="Month" v-model="startMonth" @change="changSelectBox">
                                        <option v-for="num in opt.month" :key="'sm' + num" :value="num">{{num + 1}}</option>
                                    </select> 월
                                    <fa-icon right class="hand" name="redo" @click="changeYearMonthMode = false" />
                                </div>
                                <div class="select_month hand" v-show="!changeYearMonthMode">
                                    <span @dblclick="changeYearMonth"><em>{{startYear}}년</em>&nbsp;<em>{{startMonth + 1}}월</em></span>
                                    <button type="button" class="prev" @click="changeMonth('start', -1)"><fa-icon name="angle-left" /></button>
                                    <button type="button" class="prev2"  @click="changeMonth('start', -12)"><fa-icon name="angle-double-left" /></button>
                                    <button type="button" class="next" @click="changeMonth('start', 1)"><fa-icon name="angle-right" /></button>
                                    <button type="button" class="next2" @click="changeMonth('start', 12)"><fa-icon name="angle-double-right" /></button>
                                </div>

                                <div class="select-calendar-wrap">
                                    <transition :name="startTransitionName">
                                        <div class="select_calendar" v-show="startShow">
                                            <ul class="header">
                                                <li v-for="(v, i) in head" :class="{sun: i == 0, sat: i == 6}" :key="'start-head-' + v">{{v}}</li>
                                            </ul>
                                            <ul v-for="(li, i) in start" :key="'start-tr-' + i">
                                                <li
                                                    :key="'start-' + v.type + '-' + v.day" :class="[v.type, {sun: j == 0, sat: j == 6}]"
                                                    v-for="(v, j) in li" @click.prevent="selectedDay(i, j)">
                                                    {{v.day}}
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
export default {
    name: 'datePicker',
    props: {
        value: [String, Array],
        validate: {
            type: [Array, Object],
            default: () => []
        },
        placeholder: {
            type: [String, Array],
            default: ''
        },
        range: {
            type: Boolean,
            default: false
        },
        format: String,
        showRight: String,          // 오른쪽 기준으로 팝업 표시
        noSeparator: {              // 구분자 표시 여부 (dash - 없음)
            type: Boolean,
            default: false
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
                {text: '오늘', checked: false},
                {text: '어제', checked: false},
                {text: '최근 7일', checked: false},
                {text: '최근 30일', checked: false},
                {text: '이번 달', checked: false},
                {text: '지난 달', checked: false}
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

            changeYearMonthMode: false,     // 년월일 변경 모드
            opt: {year: [], month: []},

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
            // 시작일 종료일 텍스트 표시 선택된 날짜가 있는 경우 선택된 날짜로 표시
            if (this.startSelectedDay == 0) {
                return  this.dateFormat(this.startYear, this.startMonth, this.startDay)
            } else {
                return this.startSelectedDate
            }
        },
        endDate() {
            if (this.endSelectedDay == 0) {
                return this.dateFormat(this.endYear, this.endMonth, this.endDay)
            } else {
                return this.endSelectedDate
            }
        },
        selectedDateView() {
            if (this.selectedError != '') {
                return this.selectedError
            } else if (this.startSelectedDate !== '' && this.endSelectedDate !== '') {
                return `${this.startSelectedDate} ~ ${this.endSelectedDate}`
            } else {
                return ''
            }
        },
    },
    created() {
        this.init()
        this.makeCanlendar('start')

        let year = this.maxYear

        for (let i = year; i >= this.minYear; i--) {
            this.opt.year.push(i)
        }

        for (let i = 0; i < 12; i++) {
            this.opt.month.push(i)
        }

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

                if (classList.indexOf('current') === -1 && classList.indexOf('today') === -1 && classList.indexOf('date_range') === -1) {
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
            const pickerWidth = this.range ? 584 : 584 / 2
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
                    if (this[flag + 'SelectedDate'] == this.dateFormat(this[flag + 'Year'], this[flag + 'Month'], day)) {
                        objData = {day, type: 'date_start'}
                    } else if (this[flag + 'Year'] == this.curYear && this[flag + 'Month'] == this.curMonth && day == this.curDay) {
                        objData = {day, type: 'today'}
                    } else {
                        objData = {day, type: 'current'}
                    }

                    // 시작 날짜와 끝 날짜 사이에 색상 표시
                    if (this.range && this.startSelectedDate !== '' && this.endSelectedDate !== '') {
                        let time = new Date(this[flag + 'Year'], this[flag + 'Month'], day).getTime()

                        if (time >= this.startTime && time <= this.endTime) {
                            if (flag === 'start' && time > this.startTime) {
                                objData.type = 'date_range'
                            } else if (flag === 'end' && time < this.endTime) {
                                objData.type = 'date_range'
                            }
                        }
                    }

                    day++
                } else if (day > lastDay) {
                    objData = {day: afterDay, type: 'afterMonth'}
                    afterDay++
                } else if (j < startWeek) {
                    objData = {day: beforeDay, type: 'beforeMonth'}
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

            if (increase == 1 || increase == -1) {
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
                if (increase == 12 && this[flag + 'Year'] < this.maxYear) {
                    this[flag + 'Year'] += 1
                    change = true
                } else if (increase == -12 && this[flag + 'Year'] > 1900) {
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

                this[flag + 'Show'] = false

                clearTimeout(this[flag + 'Timeout'])

                this[flag + 'Timeout'] = setTimeout(() => {
                    this.makeCanlendar(flag)
                    this[flag + 'Show'] = true
                }, 150)
            }
        },
        changSelectBox($evt, flag = 'start') {
            // 년 월 select box 변경 이벤트
            this[flag + $evt.target.name] = parseInt($evt.target.value)

            // transition animate
            this[flag + 'TransitionName'] = 'trans-left'
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

            if (flag == 4 || flag == 5) {
                if (flag == 4) {
                    date = new Date(date.getFullYear(), date.getMonth() + 1, 0)
                } else {
                    date = new Date(date.getFullYear(), date.getMonth(), 0)
                }

                var year = date.getFullYear()
                var month = date.getMonth() + 1
                var day = date.getDate()

                if (month.toString().length == 1) {
                    month = '0' + month.toString()
                }

                if (day.toString().length == 1) {
                    day = '0' + day.toString()
                }
            }

            switch (flag) {
                case 0:
                    this.startSelectedDate = date.getDateFormat('Y-m-d', 0)
                    this.endSelectedDate = date.getDateFormat('Y-m-d', 0)
                break
                case 1:
                    this.startSelectedDate = date.getDateFormat('Y-m-d', -1)
                    this.endSelectedDate = date.getDateFormat('Y-m-d', -1)
                break
                case 2:
                    this.startSelectedDate = date.getDateFormat('Y-m-d', -6)
                    this.endSelectedDate = date.getDateFormat('Y-m-d', 0)
                break
                case 3:
                    this.startSelectedDate = date.getDateFormat('Y-m-d', -29)
                    this.endSelectedDate = date.getDateFormat('Y-m-d', 0)
                break
                case 4:
                    this.startSelectedDate = year + '-' + month + '-01'
                    this.endSelectedDate = year + '-' + month + '-' + day
                break
                case 5:
                    this.startSelectedDate = year + '-' + month + '-01'
                    this.endSelectedDate = year + '-' + month + '-' + day
                break
            }

            // 해당 달력으로 변환
            let start = this.startSelectedDate.split('-')
            let end = this.endSelectedDate.split('-')

            this.startYear = parseInt(start[0])
            this.startMonth = parseInt(start[1]) - 1
            this.startDay = parseInt(start[2])

            this.endYear = parseInt(end[0])
            this.endMonth = parseInt(end[1]) - 1
            this.endDay = parseInt(end[2])

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

            if (type == 'current' || type == 'today' || type == 'date_range') {
                this[flag + 'SelectedDay'] = day

                if (flag == 'start') {
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
        changeYearMonth() {
            this.changeYearMonthMode = true
        },
        dateFormat(year, month, day) {
            let date = year + '-' +
                    ((month + 1).toString().length == 1 ? '0' + (month + 1) : month + 1) + '-' +
                    (day.toString().length == 1 ? '0' + day : day)

            if (this.noSeparator) {
                date = date.replace(/-/gi, '')
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
                    let result1 = true, result2 = true

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
</script>

<style scoped>
.calendar_basic {
    position: relative;
    display: inline-block;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.calendar_basic .calendar_pop {
    position: fixed;
    width: 584px;
    border: 1px solid #dadada;
    border-radius: 3px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    background: #fff;
    z-index: 100;
    line-height: 1;
}
.calendar_basic .calendar_pop .searchDate {
    padding: 15px;
    border-bottom: 1px solid #dadada;
    text-align: left;
}
.calendar_basic .calendar_pop .start_end_text {
    line-height: 49px;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    border-bottom: 1px solid #eee;
    color: #444;
}
.calendar_basic .calendar_pop .calendar_wrap .calendar_inner {
    width: 100%;
    text-align: center;
    font-size: 0;
}
.calendar_basic .calendar_pop .calendar_wrap .calendar {
    display: inline-block;
    width: 291px;
    box-sizing: border-box;
    vertical-align: top;
}
.calendar_basic .calendar_pop .calendar_wrap .calendar.end_calendar {
    border-left: 1px solid #eee;
}
.calendar_basic .calendar_pop .calendar_wrap .select_month {
    position: relative;
    text-align: center;
    margin: 15px auto;
    width: 210px;
    height: 30px;
}
.calendar_basic .calendar_pop .calendar_wrap .select_month span,
.calendar_basic .calendar_pop .calendar_wrap .select_month span em {
    font-size: 14px;
    line-height: 30px;
    display: inline-block;
}
.calendar_basic .calendar_pop .calendar_wrap .select_month button {
    position: absolute;
    top: 0px;
    padding: 0;
    width: 30px;
    height: 30px;
    font-size: 24px;
    line-height: 30px;
    border: 0;
    background: transparent;
}
.calendar_basic .calendar_pop .calendar_wrap .select_month button i {
    display: block;
    height: 30px;
}
.calendar_basic .calendar_pop .calendar_wrap .select_month button i:before {
    width: 10px;
    margin: 0;
    color: #bbb;
    line-height: 30px;
    vertical-align: top;
}
.calendar_basic .calendar_pop .calendar_wrap .select_month button.prev {
    left: 30px;
}
.calendar_basic .calendar_pop .calendar_wrap .select_month button.prev2 {
    left: 0px;
}
.calendar_basic .calendar_pop .calendar_wrap .select_month button.next {
    right: 30px;
}
.calendar_basic .calendar_pop .calendar_wrap .select_month button.next2 {
    right: 0;
}

.calendar_pop .calendar_wrap .select_year_month {
    width: 210px;
    height: 30px;
    margin: 15px auto;
    text-align: center;
    font-size: 13px;
}
.calendar_pop .calendar_wrap .select_year_month select:nth-child(1) {
    min-width: 80px !important;
}
.calendar_pop .calendar_wrap .select_year_month select:nth-child(2) {
    min-width: 50px !important;
}
.calendar_pop .calendar_wrap .select_year_month button {
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

.calendar_basic .calendar_pop .calendar_wrap .select_calendar {
    width: 210px;
    margin: 0 auto;
}
.calendar_basic .calendar_pop .calendar_wrap .select_calendar ul {
    display: table;
    width: 100%;
    font-size: 13px;
    margin: 0;
    padding-left: 0;
}
.calendar_basic .calendar_pop .calendar_wrap .select_calendar ul li {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    width: 30px;
    height: 30px;
    cursor: pointer;
}
.calendar_basic .calendar_pop .calendar_wrap .select_calendar ul.header li {cursor: default !important}
.calendar_basic .calendar_pop .calendar_wrap .select_calendar ul li:first-child {color: #ff5253;}

.calendar_basic .calendar_pop .calendar_wrap .select_calendar ul:first-child li {font-weight: 700; color: #222;}
.calendar_basic .calendar_pop .calendar_wrap .select_calendar ul li.beforeMonth,
.calendar_basic .calendar_pop .calendar_wrap .select_calendar ul li.afterMonth {
    color: #aaa;
}
.calendar_basic .calendar_pop .calendar_wrap .select_calendar ul:not(.header) li:hover {
    background: #f1f1f1;
}
.calendar_basic .calendar_pop .calendar_wrap .select_calendar ul li.today {
    background: #425cf432;
}
.calendar_basic .calendar_pop .calendar_wrap .select_calendar ul li.date_range {
    background: #eceefe;
}
.calendar_basic .calendar_pop .calendar_wrap .select_calendar ul li.select,
.calendar_basic .calendar_pop .calendar_wrap .select_calendar ul li.date_start,
.calendar_basic .calendar_pop .calendar_wrap .select_calendar ul li.day_end {
    background: #425cf4;
    color: #fff;
}
.calendar_basic .calendar_pop .calendar_wrap .btn_basic {
    padding: 15px; border-top: 1px solid #dadada;
    display: flex; flex-direction: row; align-items: center; justify-content: space-between;
}
.calendar_basic .calendar_pop .calendar_wrap .btn_basic .select_date {font-size: 15px;}
.calendar_basic .calendar_pop .calendar_wrap .btn_basic .select_date.selected-error {color: red;}

.calendar_basic.show .calendar_pop {
    display: block;
}
.calendar_basic.show .calendar_date_text:after {
    transform: rotate(-180deg);
    transition: all 0.5s;
}
.calendar_date_text {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.calendar_date_text i {
    font-size: 21px;
    color: rgb(143, 143, 143);
    margin: 0 4px;
}
.calendar_date_text i + input {
    margin-left: 5px;
}
.calendar_date_text p {
    display: block;
}

.calendar_basic .calendar_pop.single {
    width: 270px;
}
.calendar_basic .calendar_pop.single .calendar_wrap .calendar {
    width: 210px;
}

.calendar_basic .calendar_pop.singleFull {
    width: 100%;
}
.calendar_basic .calendar_pop.singleFull .calendar_wrap .select_month,
.calendar_basic .calendar_pop.singleFull .calendar_wrap .calendar {
    width: 189px;
}
.calendar_basic .calendar_pop.singleFull .calendar_wrap .select_month button {
    width: 25px;
}
.calendar_basic
    .calendar_pop.singleFull
    .calendar_wrap
    .select_month
    button.prev {
    left: 25px;
}
.calendar_basic
    .calendar_pop.singleFull
    .calendar_wrap
    .select_month
    button.next {
    right: 25px;
}
.calendar_basic .calendar_pop.singleFull .calendar_wrap .select_calendar {
    width: 189px;
    margin-bottom: 20px;
}
.calendar_basic .calendar_pop.singleFull .calendar_wrap .select_calendar ul li {
    width: 27px;
    line-height: 27px;
}

.calendar_inner {
    min-height: 257px;
}
.select-calendar-wrap {
    min-height: 210px !important;
    margin-bottom: 10px;
}
</style>