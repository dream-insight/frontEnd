<template>
  <transition name="modal-fade">
    <div class="alert-modal" tabindex="0" v-show="isShow">
      <transition appear name="modal-scale" @after-leave="destory">
        <div class="modal-box"
          :style="{ width: `${width}px` }"
          v-show="isShow" >
          <h3 class="title">{{ titleText }}</h3>
          <div class="contents" v-html="message"></div>
          <div class="actions">
            <a
              href="#"
              class="btn btn-cancel"
              @click.prevent="clickCancel"
              v-if="type == 'confirm'">
              {{ btnCancelText }}
            </a>
            <a
              href="#"
              ref="okay"
              class="btn btn-okay"
              @click.prevent="clickOkay">
              {{ btnOkayText }}
            </a>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modalComponent',
  data: () => ({
    type: 'alert',
    isShow: false,

    title: '',
    message: '',
    icon: '',
    width: 400,

    okay: null,
    cancel: null,

    btnOkayText: '확인',
    btnCancelText: '취소',

    modalStyleClass: '',
    noScrollStyleClass: ''
  }),
  computed: {
    titleText() {
      if (this.type) {
        return (this.type == 'alert') ? '알림' : '확인'
      }

      return this.title
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.okay.focus()
      this.$refs.okay.blur()
    }, 300)

    this.$el.addEventListener('keyup', this.keyupEvent)
  },
  methods: {
    keyupEvent(evt) {
      // Enter 키를 눌렀을 때 okay 실행
      if (evt.keyCode === 13) {
        this.clickOkay()
      }

      // ESC 키를 눌렀을때 창을 닫아 줌(cancel과 동일)
      if (evt.keyCode === 27) {
        this.clickCancel()
      }
    },
    show() {
      document.body.classList.add(this.modalStyleClass)
      this.isShow = true
    },
    hide() {
      // 화면 전체를 가려 주는 레아아웃의 클래스명으로 수정
      let modalCheck = document.body.querySelectorAll(this.modalStyleClass)

      // 전체를 가리고 있는 배경이 남아 있을 경우 스크롤 삭제 기능 수행 안함
      if (modalCheck.length == 0) {
        document.body.classList.remove(this.noScrollStyleClass)
      }

      this.isShow = false
    },
    clickOkay() {
      if (typeof this.okay === 'function') {
        this.okay.call()
      }

      this.hide()
    },
    clickCancel() {
      if (typeof this.cancel === 'function') {
        this.cancel.call()
      }

      this.hide()
    },
    destory() {
      document.removeEventListener('keyup', this.keyupEvent)
      this.$emit('@destroy')
    },
  },
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
