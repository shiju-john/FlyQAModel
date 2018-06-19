<template>
<div class="ReqSolution">
  <div class="modal-content">
    <div class="head1">Solutions</div>
    <table-component caption="heading" :data="requestdata" sort-by="requestTime">
      <table-column show="question" label="question"></table-column>
      <table-column show="productVersion" label="productVersion"></table-column>
      <table-column show="requestUser" label="requestUser"></table-column>
      <table-column show="requestTime" label="requestTime"></table-column>
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
import axios from 'axios'

export default {

  data() {
      return {
        modifiers: {},
        req_obj:{},
        flag:'none',
        requestdata:[],
        question:String,

      }
    },
    created: function() {
    this.reqsolution();
    this.timer = setInterval(this.reqsolution, 3000)
},
    methods: {
    reqsolution(){
        axios.get(process.env.REM_URL +'&status=OPEN', {
        }).then((resp) => {
          this.requestdata=resp.data;
        }).catch(err => {
          const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
          alert(message);
        })
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
    padding-top: 16px;
    padding-left: 11px;
}

.head{
background-color:#306696;
padding:3%;
}

.head2{
background-color:#306696;
padding-top: 3%;
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
}

.img{
  width: 24px;
}

.btn{
    margin-left: 46px;
    cursor: pointer;
}
</style>
