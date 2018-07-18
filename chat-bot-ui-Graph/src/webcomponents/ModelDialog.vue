<template>
  <modal name="ModelDialog" height="auto" :scrollable="true" style=" overflow: hidden; height: auto;">
    <div class="head1" style="background-color: #0996b2;">Solutions
       <span style="margin-left: 82%;cursor:pointer" v-on:click="close"><i class="fa fa-times"></i></span>
    </div>
    <div class="modal-content">
      <answerSelect :src="model" :answer="remarks.answerarray"></answerSelect>
      <div style="padding: 2%;border-top: 1px solid #dee2e6;">
        <b-button style="margin-left: 68%;" variant="success" v-on:click="request">Request for Solution</b-button>
      </div>
    </div>
  </modal>
</template>
   
<script>
// for api requests
import axios from 'axios';
import answerSelect from './answerSelect';


export default {

  components: {
    answerSelect
  },

  props: ['remarks', 'flag', 'question', 'version','token'],

  data() {
    return {
      modifiers: {},
      model: true
    }
  },

  mounted() {},
  methods: {

    request() {
      axios.post(process.env.SERV_URL + 'visionendpoints?token='+this.token, {
        question: this.question,
        productVersion: this.version,
        requestedSource:'Assistant'
      }).then((resp) => {
        this.$toaster.success('Solution request successfully sent!');
        this.$emit('submit', {
        })
      }).catch(err => {
        const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
        console.log(message);
      })
    },

    close(){
      this.$modal.hide('ModelDialog');
    }
  }
}

</script>

<style scoped>


.req{
  cursor: pointer;
}
 body {font-family: Arial, Helvetica, sans-serif;}

/* The Modal (background) */
.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
    background-color: #fefefe;
    margin: auto;
    /* padding: 3px; */
    /* border: 1px solid #888; */
    width: 99%;
    /* margin-top: 15px; */
        /* margin-top: -40px; */
    font-size: 13px;
        border: 0px solid rgba(0, 0, 0, 0.2);
}
.head1{
    font-weight: bold;
    padding: 16px;
    padding-left: 17px;
    color: aliceblue;
}


</style>
