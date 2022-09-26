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
.modal-fade-enter,
.modal-fade-leave-to { opacity: 0 }
.modal-fade-enter-active,
.modal-fade-leave-active { transition: opacity 0.2s ease-out; }

.modal-scale-enter,
.modal-scale-leave-to { transform: scale(0.4); }
.modal-scale-enter-active,
.modal-scale-leave-active { transition: all 0.2s ease-out; }

.alert-modal {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10000;

  .modal-box {
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 7px;
    max-height: 95vh;
    max-width: 95vw;
    box-shadow: 3px 3px 25px 8px #00000055;

    .title {
      line-height: 50px;
      height: 50px;
      box-sizing: border-box;
      font-weight: bold;
      border-radius: 7px 7px 0 0;
      background-color: rgb(240, 240, 240);
      padding: 0 15px;
      font-size: 18px;
      color: rgb(56, 56, 56);
      margin: 0;

      .close-popup {
        display: block;
      }
    }

    .contents {
      padding: 15px;
      font-size: 15px;
      color: rgb(56, 56, 56);
      box-sizing: border-box;
      overflow-y: auto;
      max-height: calc(100vh - 226px);
      display: block;

      p {
        margin-bottom: 10px;
      }
    }

    .actions {
      border-top: 1px solid rgb(240, 240, 240);
      padding: 10px;
      text-align: right;
      font-size: 20px;

      .btn {
        font-size: 14px;
        padding: 0 15px;
        text-decoration: none;
        display: inline-block;
        line-height: 33px;
        height: 33px;
        border-radius: 5px;
        box-sizing: border-box;
      }

      .btn-cancel {
        color: gray;
        border: 1px solid gray;
        margin-right: 5px;
      }

      .btn-okay {
        color: #fff;
        background-color: gray;
        border: 1px solid gray;
      }
    }

    h5 {
      margin-top: 10px;
      margin-bottom: 5px;
    }

    h4 {
      margin-top: 20px;
      margin-bottom: 5px;
      font-weight: bold;
      font-size: 18px;
    }
  }
}
</style>
