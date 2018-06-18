<template>

<modal name="ModelDialog" >
  <!-- Trigger/Open The Modal -->
  <!-- <button v-on:click="display">Open Modal</button> -->
  <!-- The Modal --> 
   <!-- <div id="myModal">  -->
    <!-- Modal content -->
    <div class="modal-content" >
      <!-- <span class="close" v-on:click="close">&times;</span> -->
      <table>
        <tr >
          <th>doc_ref</th>
          <th>remark_text</th>
        </tr>
        <tr>
          <td>{{this.remarks.doc_ref}}</td>
          <td>{{this.remarks.remark_text}}</td>
        </tr>
      </table>
      <button v-on:click="request">request for solution</button>
    </div>
  <!-- </div> -->
</modal>
<!-- modal dialog box -->
</template>

<script>
// for api requests
import axios from 'axios'

export default {

  props: ['remarks', 'flag','question','version'],

  data() {

    return {
      modifiers: {},
    }
  },
  methods: {

    display() {
      console.log(this.question)
      // this.flag = "block"
    },

    close() {
      // console.log(this.remarks)
      this.remarks.text = {};
      this.flag = "none"
    },

    request() {
        console.log("api called");
        console.log(process.env.REM_URL)
      // inputs here are asked question and product version
      axios.post(process.env.REM_URL, {
        question: this.question,
        productVersion:this.version
      }).then((resp) => {
        console.log(resp);
      }).catch(err => {
        const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
        console.log(message);
      })
    }
  }
}

</script>

<style scoped>

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
    border: 1px solid #888;
    width: 99%;
    margin-top: 64px;
}

/* The Close Button */
.close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}

.r{
  color: black
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
</style>
