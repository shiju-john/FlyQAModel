<template>
<div class="ReqSolution">
  <table-component caption="heading" :data="requestdata" sort-by="requestTime" style="font-size: 13px;height:515px;overflow:hidden;">
    <table-column show="question" label="question"></table-column>
    <table-column show="productVersion" label="product Version"></table-column>
    <table-column show="requestUser" label="requested User"></table-column>
    <table-column show="requestedSource" label="requested Source"></table-column>
    <table-column show="requestTime" label="requested Time"></table-column>
    <table-column :sortable="false" :filterable="false">
      <template slot-scope="row">
        <button v-on:click="reply(row)" class="btn btn-primary">
          <i class="fa fa-reply"></i>
        </button>
      </template>
    </table-column>
  </table-component>
  <div v-if="loader">
    <loading :active.sync="loader" :can-cancel="false" :is-full-page="true">
    </loading>
  </div>
  <modal name="Model" height="auto" :scrollable="true" style=" overflow: hidden; height:auto;">
    <div class="head1" style="background-color: #0996b2;">Solution Response
      <span v-on:click="hide" style="margin-left: 71%;cursor:pointer;">
        <i class="fa fa-times"></i>
      </span>
    </div>
    <div class="modal-content">
      <b-form style="padding: 2%;font-weight: 600;">
        <b-form-group label="Question:<font color=red>*</font>">
          <b-form-textarea placeholder="Enter Response" :rows="3" v-model="property" :max-rows="3" disabled>
          </b-form-textarea>
        </b-form-group>

        <b-form-group label="Response:<font color=red>*</font>">
          <b-form-textarea placeholder="Enter Response" :rows="3" v-model="remarks" :max-rows="3">
          </b-form-textarea>
        </b-form-group>

        <b-form-group label="Document Reference:">
          <b-form-input id="exampleInput2" type="text" v-model="docversion" placeholder="Enter Document Reference">
          </b-form-input>
        </b-form-group>
        <b-form-group label="Feature Status:<font color=red>*</font>">
          <select class="select" v-model="featureStatus">
            <option disabled value="">Please select one</option>
            <option>Fully Compliance</option>
            <option>Partially Compliance</option>
            <option>Non Compliance</option>
          </select>
        </b-form-group>
      </b-form>
      <div style="padding: 2%;text-align: right;">
        <b-button  variant="warning" v-on:click="reset()">Reset</b-button>    
        <b-button variant="success" v-on:click="sendreply()">Submit</b-button>
      </div>
    </div>
  </modal>
</div>
</template>

<script>
import axios from 'axios';
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.min.css';

export default {

  components: {
    Loading
  },

  props: ['token'],

  data() {
    return {
      modifiers: {},
      req_obj: {},
      flag: 'none',
      send_reply: [],
      question: String,
      loader: true,
      open: false,
      property: '',
      remarks: '',
      docversion: '',
      featureStatus: '',
      enable:true,
      requestdata:[]
    }
  },

  mounted(){
    this.reqsolution();
  },
  created: function () {
    window.addEventListener('keydown', (e) => {
      if (e.key == 'Escape') {
        this.hide()
        this.remarks = '',
        this.docversion = ''
        this.featureStatus = ''
      }
    });
  },

  beforeDestroy() {
    // console.log('destroyed')
  },

  methods: {
    reset(){
        this.remarks = '',
        this.docversion = ''
    },
    reqsolution() {
      axios.get(process.env.SERV_URL + 'visionendpoints?token=' + this.token + '&status=OPEN', {}).then((resp) => {
        this.loader = false;
        this.requestdata = resp.data;
      }).catch(err => {
        const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
        this.loader = false;
        this.$toaster.error(message)
      })
    },

    reply(data) {
      this.$modal.show('Model');
      this.send_reply = data;
      this.property = data.question
    },

    hide(){
       this.$modal.hide('Model');
       this.enable=true;
       this.docversion='';
       this.featureStatus=''
       this.remarks=''
    },

    sendreply() {
      if (this.remarks=='' || this.featureStatus=='' ||this.property=='') {
      //  do nothing
       this.$toaster.warning('Please fill fields marked as important!');
      }else{
        this.$modal.hide('Model');
        this.enable=false;
        axios.put(process.env.SERV_URL + 'visionendpoints?token=' + this.token, {
            id: this.send_reply.id,
            templateRefId:this.send_reply.templateRefId,
            question: this.send_reply.question,
            questionId:this.send_reply.questionId,
            productVersion: this.send_reply.productVersion,
            requestUser: this.send_reply.requestUser,
            requestTime: this.send_reply.requestTime,
            answer: this.remarks,
            docLink: this.docversion,
            featureStatus: this.featureStatus,
            requestedSource:this.send_reply.requestedSource,
          }).then((resp) => {
            this.$toaster.success('Solution succesfully submitted!');
            this.remarks = '',
            this.docversion = ''
            this.reqsolution();
            this.remarks = '',
            this.docversion = ''
          }).catch(err => {
            const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
            console.log(message);
          })
      }
 
    },
  }
}

</script>

<style scoped>

.img{
  width: 24px;
}

td, th {
  border-bottom: 1px solid #ddd;
  font-weight: normal;
    }


textarea {
    resize: none;
}

.modal-vue-wrapper .modal-vue-panel .modal-vue-content {
    display: flex;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 24px;
    line-height: 1.5;
}

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
    width: 99%;
    font-size: 13px;
        border: 0px solid rgba(0, 0, 0, 0.2);
}
.head1{
    font-weight: bold;
    padding: 16px;
    padding-left: 17px;
    color: aliceblue;
}

 body {font-family: Arial, Helvetica, sans-serif;}
.table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 0rem!important;
    background-color: transparent;
}

.table-component__filter {
    align-self: flex-end;
    margin-right: 101px!important;
} 

.select {
    display: inline-block;
    width: 100%;
    height: calc(2.25rem + 2px);
    padding: 0.375rem 1.75rem 0.375rem 0.75rem;
    line-height: 1.5;
    color: #495057;
    vertical-align: middle;
    background-size: 8px 10px;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    font-size: 16px;
} 

</style>

