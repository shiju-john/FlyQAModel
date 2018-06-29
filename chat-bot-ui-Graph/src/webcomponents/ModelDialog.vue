<template>
<modal name="ModelDialog"  height="auto" :scrollable="true">
  <div class="head1" >Solutions</div>
    <div class="modal-content" >
      <table v-if="this.remarks.doc_ref">
        <tr>
          <th>Document reference</th>
          <th>Remarks</th>
        </tr>
        <tr>
          <td>{{this.remarks.doc_ref}}</td>
          <td ><div style="width:100%; max-height:100px; overflow:auto">
            {{this.remarks.remark_text}}
            </div>
            </td>
        </tr>
      </table>
      <!-- <button v-on:click="request"  class="button button2">request for solution</button> -->
       <b-button variant="success" v-on:click="request">Request for Solution</b-button>
    </div>
     <div id="snackbar">Solution request successfully sent!</div>
</modal>
</template>
   
<script>
// for api requests
import axios from 'axios'

export default {

  props: ['remarks', 'flag', 'question', 'version'],

  data() {
    return {
      modifiers: {},
    }
  },
  methods: {

    request() {
      axios.post(process.env.REM_URL, {
        question: this.question,
        productVersion: this.version
      }).then((resp) => {
        this.toast(this.$modal);
      }).catch(err => {
        const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
        console.log(message);
      })
    },

    toast(modal) {
      var x = document.getElementById("snackbar");
      x.className = "show";
      setTimeout(function () {
        x.className = x.className.replace("show", "");
      }, 3000);
      setTimeout(function () {
        modal.hide('ModelDialog');
      }, 1000);
    }
  }
}

</script>

<style scoped>

.head1{
    font-weight: bold;
    padding-top: 16px;
    padding-left: 11px;
}
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
    padding: 3px;
    /* border: 1px solid #888; */
    width: 99%;
    margin-top: 15px;
    font-size: 13px;
}

table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    height: 206px;
}

td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
    text-align: center;
}

/* toast css */
#snackbar {
    visibility: hidden;
    min-width: 250px;
    margin-left: -125px;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    padding: 16px;
    position: fixed;
    z-index: 1;
    left: 50%;
    bottom: 30px;
    font-size: 17px;
}

#snackbar.show {
    visibility: visible;
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
    from {bottom: 0; opacity: 0;} 
    to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
    from {bottom: 30px; opacity: 1;} 
    to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
    from {bottom: 30px; opacity: 1;}
    to {bottom: 0; opacity: 0;}
}


</style>
