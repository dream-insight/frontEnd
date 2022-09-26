<template>
  <div :class="['flex-row', `justify-${align}`]">
    <div style="margin-right: 5px;" v-html="text.nl2br()"></div>
    <a href="#" :class="['sorting', {rotate: !sorting}]" @click.prevent="changeSorting">
      <i class="fas fa-arrow-down" />
    </a>
  </div>
</template>

<script>
export default {
  name: 'sorting-cell',
  props: {
    align: {
      type: String,
      default: 'between'
    },
    target: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  data: () => ({
    sorting: true, // true desc, false asc
  }),
  methods: {
    changeSorting() {
      this.sorting = !this.sorting
      this.$emit('sorting', this.target + ' ' + (this.sorting ? 'desc' : 'asc'))
    }
  }
}
</script>

<style scoped>
.sorting {
  transition: all .2s; transform-origin: center; text-align: center;
  font-size: 14px; width: 21px; height: 21px; color: #528ff2;
}
.sorting:hover {color: #3c69b1;}
.rotate {transform: rotate(180deg);}
</style>