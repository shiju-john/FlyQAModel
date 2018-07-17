<template>
  <div class="sc-message--text"> {{data.text}} <span class="span" v-if="data.welcomemsg=='false'" v-on:click="myFunction(data)">....</span><p v-if="data.meta" class='sc-message--meta'>{{data.meta}}</p></div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
     cutomFunction:{
      type: Function,
      required: true
    }
  },
  methods: {
    myFunction(a) {
      this.cutomFunction(a);   
    } 
  }
}
</script>

<style scoped>
.span {
    font-weight: bold;
    cursor: pointer;
    
  }
</style>
