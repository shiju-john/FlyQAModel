<template>
<div class="ReqSolution">




  <div id="myModal">
    <!-- Modal content -->
    <div class="modal-content">
  

  
<table-component  caption="heading" :data="requestdata" sort-by="requestTime">
  <table-column show="question" label="question"></table-column>
  <table-column show="productVersion" label="productVersion"></table-column>
  <table-column show="requestUser" label="requestUser"></table-column>
  <table-column show="requestTime" label="requestTime"></table-column>
  <table-column :sortable="false" :filterable="false">
      <template slot-scope="row">
           <button class="btn" v-on:click="reply(data)">
                <img class="img" src="../../static/img/reply.jpg">
              </button>
         </template>
  </table-column>

</table-component>


  

    
    </div>
    <div v-if="reply_flag=='true'" class="replytab">
      <table>
  <tr>
    <th class="head2">Feedback <span class="close" v-on:click="close()">&times;</span></th>
  </tr>
  <tr>
    <table >
          <tr>
            <th>Question</th>
            <th>Feature Status</th>
            <th>Remarks</th>
            <th>Doc_version</th>
            <th> </th>
          </tr>
          <tr>
            <td>{{this.question}}</td>
            <td>
              <select v-model="featureStatus">
                <option disabled value="">Please select one</option>
                <option>Fully Compliance</option>
                <option>Partially Compliance</option>
                <option>Non Compliance</option>
              </select>
            </td>
            <td>
              <textarea v-model="remarks" rows="4" cols="30"></textarea>
            </td>
            <td>
              <textarea v-model="docversion" rows="4" cols="30"></textarea>
            </td>
            <td>
              <button class="save" v-on:click="sendreply()">Save</button>
            </td>
          </tr>
      </table>
  </tr>
</table>
      
    </div>
  </div>
  <div id="snackbar">Solution request successfully processed!</div>
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
        flag:'none',
        reply_flag:"false",
        question:String,
        question_id:String,
        requestTime:String,
        productVersion:String,
        requestUser:String,
        // initialising v-model variables as empty
        remarks:'',
        docversion:'',
        featureStatus:''

      }
    },
    methods: {

    close() {
      this.reply_flag = "false"
    },

    display() {
      this.flag = "block"
      // console.log(this.requestdata)
    },

    reply(data){
      this.reply_flag="true"
      this.question=data.question,
      this.question_id=data.id,
      this.requestTime=data.requestTime,
      this.productVersion=data.productVersion,
      this.requestUser=data.requestUser

    },

    sendreply(){
      this.reply_flag="false"
      axios.put(process.env.REM_URL, {
        id :this.question_id,
        question :this.question,
        productVersion:this.productVersion,
        requestUser:this.requestUser,
        requestTime :this.requestTime,
        answer:this.remarks,
        docLink :this.docversion,
        featureStatus :this.featureStatus
      }).then((resp) => {
        this.toast();
        console.log(resp);
      }).catch(err => {
        const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
        console.log(message);
      })
    },

    toast() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}



  }
}

</script>

<style scoped>
/* scroll */

/* scroll */

.head{
background-color:red;
padding:3%;
}

.head2{
background-color:red;
padding-top: 3%;
}

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

/* table scroll  */



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
