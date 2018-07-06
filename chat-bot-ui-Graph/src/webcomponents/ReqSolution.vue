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
    <div v-if="loader" style="margin-top: -23%;">
    <Spinner  message="Loading..."></Spinner>
  </div>
      <vue-modaltor 
    :visible="open" 
    @hide="open = false"
    :animation-panel="'modal-slide-right'"
    >
    <div class="subject" v-on:click="close" style="cursor:pointer"><h3>Solution Response</h3></div>
       <table>
      <tr>
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
</div>

</template>

<script>
import axios from 'axios'
import Spinner from 'vue-simple-spinner'
export default {

  components: {
    Spinner
     },

  data() {
    return {
      modifiers: {},
      req_obj: {},
      flag: 'none',
      requestdata: [],
      send_reply: [],
      question: String,
      loader:true,
   
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
    // this.timer = setInterval(this.reqsolution, 3000);
        window.addEventListener('keydown', (e) => {
      if (e.key == 'Escape') {
      
      this.remarks = '',
      this.docversion = ''
      }
    });
  },

  beforeDestroy() {
    // clearInterval(this.timer);
   },


  methods: {
    reqsolution() {
      axios.get(process.env.REM_URL + '&status=OPEN', {}).then((resp) => {
        this.loader=false;
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
      this.open = false
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
        this.$toaster.success('Solution request successfully processed!')
        //for refreshing table
        this.reqsolution();
        // console.log(resp);
        this.modal = 'none';
        this.remarks = '',
        this.docversion = ''
      }).catch(err => {
        const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
        console.log(message);
      })
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

td, th {
    border: 1px solid #dddddd;}

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





</style>

