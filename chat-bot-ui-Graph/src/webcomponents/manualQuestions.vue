<template>
  <div class="ManualQuestions">
    <div style="margin-top:1%;">
      <b-button style="margin-left:1%;z-index: 46;" title="Add Training Data" variant="danger lg" v-on:click="addtrainingdata()">
        <span>
          <i class="fas fa-plus"></i> Training Data</span>
      </b-button>
      <table-component caption="heading" :data="manualquestion" sort-by="requestTime" style="font-size: 13px;height:560px;overflow:hidden;margin-top: -35px;">
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
        <table class="table">
          <col width="5">
          <col width="350">
          <tr>
            <th>Product Version
              <span style="color:red;">*</span>:</th>
            <td>
              <select style="margin-left: -15px;" v-model="selectedversion" title="select version">
                <option v-for="option of version">{{option}}</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>Question
              <span style="color:red;">*</span>:</th>
            <td height="100">
              <textarea v-model="question" style="position: absolute;"></textarea>
            </td>
          </tr>
          <tr>
            <th>Answer
              <span style="color:red;">*</span>:</th>
            <td height="100">
              <textarea v-model="answer" style="position: absolute;"></textarea>
            </td>
          </tr>
          <tr>
            <th>Feature Status
              <span style="color:red;">*</span>:</th>
            <td>
              <select style="margin-left: -15px;" v-model="featureStatus">
                <option disabled value="">Please select one</option>
                <option>Fully Compliance</option>
                <option>Partially Compliance</option>
                <option>Non Compliance</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>Document Reference:</th>
            <td>
              <textarea v-model="docversion" style="position: absolute;"></textarea>
            </td>
          </tr>
        </table>
        <div style="padding: 2%;">
          <b-button v-if="updateflag" style="margin-left: 85%;" variant="success" v-on:click="updateclicked()">update</b-button>
          <b-button v-else style="margin-left: 85%;" variant="success" v-on:click="submittrainingdata()">Add</b-button>
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
        loader:false
      }
    },

    computed: {

    },

    mounted() {
        this.getQuestions();
    },
    methods: {
      update(row) {
        this.updateflag = true
        this.$modal.show('Model');
          this.question=  row.question,
            this.id=row.id,
            this.productVersion= row.productVersion,
            this.answer= row.answer,
            this.docversion= row.docLink,
            this.featureStatus= row.featureStatus,
            this.id=row.id           
      },

      updateclicked(){
          this.loader=true;
           this.$modal.hide('Model');
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
           this.$modal.hide('Model');
        if (this.answer == '' || this.featureStatus == '' || this.question == '') {
          //  do nothing
          this.$toaster.warning('Please fill fields marked as important!');
        } else {
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
  width: 94%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  resize: none; 
  border: none;
}

select {
    border: 0;
    width: 100%;
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
</style>
