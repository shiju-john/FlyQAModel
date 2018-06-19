<template>
<!-- ashik -->
<div class="ReqSolution">
  <!-- The Modal -->
    <!-- Modal content -->
    <div class="modal-content">
<div class="head1">Pending Request Solutions</div>
<table-component  caption="heading" :data="requestdata" sort-by="requestTime">
  <table-column show="question" label="question"></table-column>
  <table-column show="productVersion" label="product Version"></table-column>
  <table-column show="requestUser" label="request User"></table-column>
  <table-column show="requestTime" label="request Time"></table-column>
  <table-column :sortable="false" :filterable="false">
      <template slot-scope="row">
           <button class="btn" v-on:click="reply(row)">
                <img class="img" src="../../static/img/reply.jpg">
              </button>
         </template>
  </table-column>

</table-component>

    
    </div> 
</div>


</template>

<script>
// for api requests
import axios from 'axios'

export default {

  props: ['requestdata'],

  data() {
      return {
        modifiers: {},
        req_obj:{},
        flag:'none',
        question:String,

      }
    },
    methods: {

    close() {
    //   this.reply_flag = "false"
    },

    display() {
      this.flag = "block"
    },

    reply(data){
      this.req_obj.question=data.question,
      this.req_obj.question_id=data.id,
      this.req_obj.requestTime=data.requestTime,
      this.req_obj.productVersion=data.productVersion,
      this.req_obj.requestUser=data.requestUser
      this.$emit('reqsent', {
        reqdata: this.req_obj,
      })
    },
  }
}

</script>

<style scoped>

.head1{
    font-weight: bold;
}
/* scroll */
table.scroll {
    width: 100%;
    border-spacing: 0;
    border: 2px solid black;
}

table.scroll th,
table.scroll td,
table.scroll tr,
table.scroll thead,
table.scroll tbody { display: block; }

table.scroll thead tr {
    /* fallback */
    width: 97%;
    /* minus scroll bar width */
    width: -webkit-calc(100% - 16px);
    width:    -moz-calc(100% - 16px);
    width:         calc(100% - 16px);
}

table.scroll tr:after {
    content: ' ';
    display: block;
    visibility: hidden;
    clear: both;
}

table.scroll tbody {
    height: 100px;
    overflow-y: auto;
    overflow-x: hidden;
}

table.scroll tbody td,
table.scroll thead th {
    width: 19%;
    float: left;
    border-right: 1px solid black;
}

thead tr th { 
    height: 30px;
    line-height: 30px;
}

tbody { border-top: 2px solid black; }

tbody td:last-child, thead th:last-child {
    border-right: none !important;
}
/* scroll */


textarea {
    resize: none;
}

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
    padding: 20px;
    border: 1px solid #888;
    width: 99%;
    margin-top: 18px;
    width: 100%;
    height: 477px;
    overflow: auto;
    /* background-color:#b2cfff */
}

table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    /* background-color:#b2cfff */
}

td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
    font-size: 11px;
}

.img{
  width: 24px;
}

.btn{
    margin-left: 46px;
    cursor: pointer;
}

.save{
  cursor: pointer;
}
.replytab{
      background-color: white;
    width: 99%;
    margin-left: 7px;
}

/* table scroll function */



/* close button */
.close {
    color: #aaaaaa;
    float: right;
    font-size: 23px;
    font-weight: bold;
    margin-top: -2%;
}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}



</style>
