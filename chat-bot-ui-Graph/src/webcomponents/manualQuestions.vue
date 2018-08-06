<template>
<div class="ManualQuestions">
  <div style="margin-top:1%;">
    <b-button style="margin-left:1%;z-index: 46;" title="Add Training Data" variant="warning lg" v-on:click="addtrainingdata()">
      <span>
        <i class="fas fa-plus"></i> Training Data</span>
    </b-button>
    <div style="height:100%;"> 
      <table-component caption="heading" :data="manualquestion" cache-key="t2" sort-by="requestTime" style="font-size: 13px;height: 83vh;overflow:hidden;margin-top: -35px;">
      <table-column show="question" label="questions"></table-column>
      <table-column show="answer" label="answers"></table-column>
      <table-column show="featureStatus" label="feature status"></table-column>
      <table-column show="docLink" label="document reference"></table-column>
      <table-column show="productVersion" label="Product version"></table-column>
      <table-column :sortable="false" :filterable="false">
        <template slot-scope="row">
          <button v-on:click="update(row)" class="btn btn-primary" title="Edit question">
            <i class="fas fa-pen"></i>
          </button>
        </template>
      </table-column>
    </table-component>
    </div>

  </div>

  <!-- add manual questions starts -->
  <modal name="Model" height="auto" :scrollable="true" style=" overflow: hidden; height:auto;">
    <div class="head1" style="background-color: #0996b2;">
      <span v-if="updateflag">Edit Training Data</span>
      <span v-else>Add Training Data</span>
      <span v-on:click="hide" style="margin-left: 71%;cursor:pointer;">
        <i class="fa fa-times"></i>
      </span>
    </div>
    <div class="modal-content">
      <b-form style="padding: 2%;font-weight: 600;">
        <b-form-group label="Product version:">
          <select class="select" v-model="selectedversion" title="select version">
            <option v-for="option of version">{{option}}</option>
          </select>
        </b-form-group>

        <b-form-group label="Question:<font color=red>*</font>">
          <b-form-textarea placeholder="Enter Question" :rows="3" v-model="question" :max-rows="3">
          </b-form-textarea>
        </b-form-group>

        <b-form-group label="Answer:<font color=red>*</font>">
          <b-form-textarea placeholder="Enter Answer" :rows="3" v-model="answer" :max-rows="3">
          </b-form-textarea>
        </b-form-group>

        <b-form-group label="Document Reference:">
          <b-form-input id="exampleInput2" type="text" v-model="docversion" placeholder="Enter Document Reference">
          </b-form-input>
        </b-form-group>
        <b-form-group label="Feature Status:">
          <select class="select" v-model="featureStatus">
            <option disabled value="">Please select one</option>
            <option>Fully Compliance</option>
            <option>Partially Compliance</option>
            <option>Non Compliance</option>
          </select>
        </b-form-group>
      </b-form>
      <div style="padding: 2%;text-align: right;">
        <div v-if="updateflag">
          <b-button variant="warning" v-on:click="reset()">Reset</b-button>
          <b-button variant="success" v-on:click="updateclicked()">update</b-button>
        </div>
        <div v-else>
          <b-button variant="warning" v-on:click="reset()">Reset</b-button>
          <b-button variant="success" v-on:click="submittrainingdata()">Add</b-button>
        </div>
      </div>
    </div>
  </modal>
  <!-- add manual questions ends -->
  <div v-if="loader">
    <loading :active.sync="loader" :can-cancel="false" :is-full-page="true">
    </loading>
  </div>
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
  props: ['version','token'],
  data() {
      return {
        question: '',
        featureStatus: '',
        answer: '',
        docversion: '',
        selectedversion: this.version[0],
        updateflag: false,
        manualquestion:[],
        id:'',
        loader:false,
      }
    },

    computed: {

    },

    mounted() {
        this.getQuestions();
    },
    methods: {
      reset(){
            this.question=  '', 
            this.productVersion='' ,
            this.answer= '',
            this.docversion= '',
            this.featureStatus= ''

      },
      update(row) {
        this.updateflag = true
        this.$modal.show('Model');
          this.question=  row.question,
            this.id=row.id,
            this.productVersion= row.productVersion,
            this.answer= row.answer,
            this.docversion= row.docLink,
            this.featureStatus= row.featureStatus
      },

      updateclicked(){
           
           if(this.featureStatus!=null &&this.answer && this.question!==''){
             this.$modal.hide('Model');
             this.loader=true;
           axios.put(process.env.SERV_URL + 'visionendpoints?token=' + this.token, {
            question:  this.question,
            id:this.id,
            productVersion:this.productVersion,
            answer: this.answer,
            docLink: this.docversion,
            featureStatus: this.featureStatus,
            requestStatus: 'MANUAL_ENTRY',
            requestedSource: 'MANUAL_ENTRY'
          }).then((resp) => {
              this.loader=false;
              this.getQuestions();
            this.$toaster.success('Training data succesfully updated!');
          }).catch(err => {
                this.loader=false;
            const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
            console.log(message);
          })
             
           }else{
             this.loader=false
             this.$toaster.warning('Please fill fields marked as important!');
             
           }

      },

      addtrainingdata() {
        this.question = '',
        this.productVersion = ''
        this.answer = '',
        this.docversion = '',
        this.featureStatus = ''
        this.$modal.show('Model');
        this.updateflag = false;
      },

      submittrainingdata() {
        if (this.featureStatus!='' &&this.answer && this.question!=='') {
          //  do nothing
         this.$modal.hide('Model');
          this.loader=true;
          this.enable = false;
          axios.post(process.env.SERV_URL + 'visionendpoints?token=' + this.token, {
            question: this.question,
            productVersion: this.selectedversion,
            answer: this.answer,
            docLink: this.docversion,
            featureStatus: this.featureStatus,
            requestStatus: 'MANUAL_ENTRY',
            requestedSource: 'MANUAL_ENTRY'

          }).then((resp) => {
              this.getQuestions();
              this.loader=false;
              this.$toaster.success('Training data succesfully submitted!');
              this.question = '',
              this.productVersion = ''
              this.answer = '',
              this.docversion = '',
              this.featureStatus = ''
          }).catch(err => {
              this.loader=false;
              const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
              console.log(message);
          })
        } else {
             this.$toaster.warning('Please fill fields marked as important!');

        }
      },

      getQuestions(){
          this.loader=true;
            axios.get(process.env.SERV_URL + 'visionendpoints?token=' + this.token, {
            status:'MANUL_ENTRY'
          }).then((resp) => {
              this.loader=false;
              this.manualquestion=resp.data;
           console.log(resp)
          }).catch(err => {
              this.loader=false;
              const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
              console.log(message);
          })
      },

      hide() {
        this.$modal.hide('Model');
      },

    },

  }
</script>

<style scoped>
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

.btn-danger {
    color: #fff;
    background-color: #e86824!important;
    border-color: #e86824!important;
}

.btn-danger:hover {
    color: #fff;
    background-color: #e25003!important;
    border-color: #e86824!important;
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

.table-component__filter__field {
    padding: 0 1.25em 0 .75em;
    height: 2.5em;
    border: solid 2px #e0e0e0;
    border-radius: 2em;
    font-size: inherit;
    margin-left: 81%;
}


</style>
