<template>
<div class='landing-page'>
     <b-card-group deck
                  class="mb-3" >
    <div  v-for="item in items" v-if="item.card" >
        <b-card bg-variant="primary"
                text-variant="white"
                :header="item.name"
                class="text-center zoom"
                v-on:click="click(item)"
                >
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
    display: flex;
    -ms-flex: 1 0 0%;
    flex: 1 0 0%;
    -ms-flex-direction: column;
    flex-direction: column;
    margin-right: 15px;
    margin-bottom: 0;
    margin-left: 15px;
    height: 195px!important;
     box-shadow: 1px 2px 5px grey!important;
     margin-top: 2em!important;
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
    background-color: #f76868 !important;
}

.card-body {
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 1.25rem;
    margin-left: 19%!important;
    margin-top: 11%!important;
}
</style>
