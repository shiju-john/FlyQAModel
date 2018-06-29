<template>
<div class="ReqSolution">
    <table-component caption="heading" :data="requestdata" sort-by="requestTime" style="font-size: 13px; height: 515px; overflow: hidden;">
      <table-column show="question" label="question"></table-column>
      <table-column show="productVersion" label="product Version"></table-column>
      <table-column show="requestUser" label="requested User"></table-column>
      <table-column show="requestTime" label="requested Time"></table-column>
      <table-column :sortable="false" :filterable="false">
        <template slot-scope="row">
           <button v-on:click="reply(row)" class="btn btn-primary">
             <i class="fa fa-reply"></i>
          </button>
        </template>
      </table-column>
    </table-component>
      <vue-modaltor  
    :visible="open" 
    @hide="open = false"
    :animation-panel="'modal-slide-right'"
    
    >
       <table>
      <tr>
        <span class="head1">Solution Response</span>
        <!-- <span v-on:click="close()" class="close">&times;</span> -->
      </tr>
      <tr>
        <table>
          <tr>
            <th>Question</th>
            <th>Feature Status</th>
            <th>Remarks</th>
            <th>Document version</th>
            <th> </th>
          </tr>
          <tr>
            <td ><div style="width:90%; max-height:90px; overflow-x:auto;overflow-y:auto">
              {{this.property}}
              </div>
              
            <td>
              <select v-model="featureStatus">
                <option disabled value="">Please select one</option>
                <option>Fully Compliance</option>
                <option>Partially Compliance</option>
                <option>Non Compliance</option>
              </select>
            </td>
            <td>
              <textarea v-model="remarks"  ></textarea>
            </td>
            <td>
              <textarea v-model="docversion"  ></textarea>
            </td>
            <td>
               <button type="button" v-on:click="sendreply()" class="btn btn-success">Save</button>
            </td>
          </tr>
        </table>
      </tr>
    </table>
  </vue-modaltor>
  
  <div><div id="snackbar">Solution request successfully processed!</div></div>
</div>

</template>

<script>
import axios from 'axios'

export default {

  data() {
    return {
      modifiers: {},
      req_obj: {},
      flag: 'none',
      requestdata: [],
      send_reply: [],
      question: String,
   
      open:false,
      property: '',
      remarks: '',
      docversion: '',
      featureStatus: '',
      property: '',

    }
  },
  created: function () {
    this.reqsolution();
    this.timer = setInterval(this.reqsolution, 3000);
        window.addEventListener('keydown', (e) => {
      if (e.key == 'Escape') {
      
      this.remarks = '',
      this.docversion = ''
      }
    });
  },

  methods: {
    reqsolution() {
      axios.get(process.env.REM_URL + '&status=OPEN', {}).then((resp) => {
        this.requestdata = resp.data;
      }).catch(err => {
        const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
        alert(message);
      })
    },

    reply(data) {
      this.open=true
      this.send_reply = data;
      this.property = data.question
      var modal = document.getElementById('myModal');
    },

    close() {
      this.remarks = '',
      this.docversion = ''
    },

    sendreply() {
      axios.put(process.env.REM_URL, {
        id: this.send_reply.id,
        question: this.send_reply.question,
        productVersion: this.send_reply.productVersion,
        requestUser: this.send_reply.requestUser,
        requestTime: this.send_reply.requestTime,
        answer: this.remarks,
        docLink: this.docversion,
        featureStatus: this.featureStatus
      }).then((resp) => {
        this.toast();
        // console.log(resp);
        this.modal = 'none';
        this.remarks = '',
        this.docversion = ''
      }).catch(err => {
        const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
        console.log(message);
      })
    },
    toast() {
      var x = document.getElementById("snackbar");
      x.className = "show";
      setTimeout(function () {
        x.className = x.className.replace("show", "");
      }, 3000);
    },   
  }
}

</script>

<style scoped>

.head1{
font-weight: bold;
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
     height: 515px;
    overflow: scroll;
}

.img{
  width: 24px;
}


/* popup css */

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



/* The Close Button */
.close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    padding-right: 1%;
}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}

/* popup inner content */
.button {
    background-color: #7518a0;
    border: none;
    color: white;
    padding: 11px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    transition-duration: 0.4s;
    margin-left: 0px;
}

.button2:hover {
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
}




textarea {
    resize: none;
    height: 100px;
   width: 100%;
   padding:1%;
   border: 1px solid #CCCCCC !important;
   /* border:none; */
}

/* table */
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;

}

td, th {
    
    text-align: left;
    padding: 6px;
    font-size: 11px;
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

