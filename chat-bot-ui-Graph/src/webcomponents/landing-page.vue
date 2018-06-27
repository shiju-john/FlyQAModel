<template>
<div class='landing-page'  >
  <b-card-group deck class="mb-3">
    <div v-for="item in items" v-if="item.card">
      <b-card bg-variant="primary" text-variant="white" :header="item.name" class="text-center zoom" v-on:click="click(item)">
        <img :src="item.url" style="width: 43%;height: 81%;margin: 2%;">
        <span style="margin-left: 50%;      text-align: justify;  margin-top: -41%;
margin-right: 4%;">
         {{item.content}}
        </span>
      </b-card>
    </div>
  </b-card-group>
</div>
</template>

<script>
export default {
  props: ['items'],

  data() {
     
    return {

    }
  },
  methods: {
      click(item){
        this.$emit('onselect', 
        item
      )
      }
  }
}
</script>

<style scoped>
.card-deck .card {
    display: -ms-flexbox;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -ms-flex: 1 0 0%;
    flex: 1 0 0%;
    -ms-flex-direction: column;
    flex-direction: column;
    margin-right: 15px;
    margin-bottom: 0;
    margin-left: 15px;
    height: 228px!important;
    width: 340px;
    box-shadow: 1px 2px 5px grey!important;
    margin-top: 2em!important;
    font-size: 12px;
}

.zoom {
    transition: transform .2s;
}

.zoom:hover {
    -ms-transform: scale(1.5); /* IE 9 */
    -webkit-transform: scale(1.5); /* Safari 3-8 */
    transform: scale(1.02); 
}

.bg-primary {
    background-color: #016896 !important;
}

.card-body {
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 1.25rem;
    margin-left: 2%!important;
    margin-top: 11%!important;
        display: contents;
}

table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

.card-header:first-child {
    border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
    font-style: bold;
    font-weight: bold!important;
}
</style>
