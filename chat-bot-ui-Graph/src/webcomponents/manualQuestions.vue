<template>
<div class="ManualQuestions" v-if="single">
  <div style="margin-top: 5px;">
    <b-button style="margin-left:1%;z-index: 1;" title="Add Training Data" variant="warning lg" v-on:click="addtrainingdata()">
      <span >
        <i class="fas fa-plus">&nbsp;&nbsp;</i> Training Data</span>
    </b-button>
      <b-button style="margin-left:1%;z-index: 1;" title="Upload Training Data File" variant="warning lg" v-on:click="uploadtrainingdata()">
      <span >
        <i class="fas fa-upload">&nbsp;&nbsp;</i>Upload Training Data</span>
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

  <!-- add manual questions model starts -->
  <modal name="Model" height="auto" :scrollable="true" style="overflow: hidden; height:auto;">
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

<!-- multiple training data file upload starts here -->

    <div class="container"  v-else>
        <div v-if="loader">
    <loading :active.sync="loader" :can-cancel="false" :is-full-page="true">
    </loading>
  </div>
      <b-form @submit="onSubmit"  @reset="onReset" >
        <div class="flex-container">
          <div>
            <b-form-group>
                <multipleUploader @fileobject="fileobj" ref="multipleUploader"></multipleUploader>
            </b-form-group>
          </div>
          <div>
            <div >
              <b-form-group label="Product Version">
                <select class="select" v-model="selectedversion" title="select version">
            <option v-for="option of version">{{option}}</option>
          </select>
              </b-form-group>

              <b-form-group label="Header Index">
                <b-form-input type="text" v-model="headerindex" required placeholder="Header index">
                </b-form-input>
                <span v-if="header" style="color:red;font-size: 11px; margin-left: 4px;">Please fill this field!</span>

              </b-form-group>

              <b-form-group label="Question Column Name">
                <b-form-input type="text" v-model="questionname" required placeholder="Question Column Name">
                </b-form-input>
                <span v-if="header" style="color:red;font-size: 11px; margin-left: 4px;">Please fill this field!</span>
                
              </b-form-group>

                 <b-form-group label="Answer Column Name">
                <b-form-input type="text" v-model="answername" required placeholder="Answer Column Name">
                </b-form-input>
                <span v-if="header" style="color:red;font-size: 11px; margin-left: 4px;">Please fill this field!</span>
               
              </b-form-group>

                <b-form-group label="Document Reference Column Name">
                <b-form-input type="text" v-model="doc_refname" required placeholder="Document Reference Column Name">
                </b-form-input>
                <span v-if="header" style="color:red;font-size: 11px; margin-left: 4px;">Please fill this field!</span>

              </b-form-group>
              
                 <b-form-group label="Feature Status Column Name">
                <b-form-input type="text" v-model="featurestatusname" required placeholder="Feature Status Column Name">
                </b-form-input>
                <span v-if="header" style="color:red;font-size: 11px; margin-left: 4px;">Please fill this field!</span>

              </b-form-group>

              <div style="text-align: right;">
                <b-button type="reset" variant="danger">Reset</b-button>
                <b-button type="submit" variant="primary" >Submit</b-button>
              </div>
            </div>
          </div>
        </div>
      </b-form>
    </div>

    <!-- multiple training data file upload ends here -->

</template>
<script>
    
import axios from 'axios';
import Loading from 'vue-loading-overlay';
import multipleUploader from '../webcomponents/multipletrainingdata'
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.min.css';
export default {
  components: {
    Loading,
    multipleUploader
  },
  props: ['version', 'token'],
  data() {
    return {
      single: true,
      question: '',
      featureStatus: '',
      answer: '',
      docversion: '',
      selectedversion: this.version[0],
      updateflag: false,
      manualquestion: [],
      id: '',
      loader: false,

      questionname: '',
      answername: '',
      doc_refname: '',
      featurestatusname: '',
      headerindex: '',
      fileobject: {},
      header: false,
    }
  },

  computed: {

  },

  mounted() {
    this.getQuestions();
  },
  methods: {
    reset() {
      this.question = '',
        this.productVersion = '',
        this.answer = '',
        this.docversion = '',
        this.featureStatus = ''

    },
    update(row) {
      this.updateflag = true
      this.$modal.show('Model');
      this.question = row.question,
        this.id = row.id,
        this.productVersion = row.productVersion,
        this.answer = row.answer,
        this.docversion = row.docLink,
        this.featureStatus = row.featureStatus
    },

    updateclicked() {
      if (this.featureStatus != null && this.answer && this.question !== '') {
        this.$modal.hide('Model');
        this.loader = true;
        axios.put(process.env.SERV_URL + 'visionendpoints?token=' + this.token, {
          question: this.question,
          id: this.id,
          productVersion: this.productVersion,
          answer: this.answer,
          docLink: this.docversion,
          featureStatus: this.featureStatus,
          requestStatus: 'MANUAL_ENTRY',
          requestedSource: 'MANUAL_ENTRY'
        }).then((resp) => {
          this.loader = false;
          this.getQuestions();
          this.$toaster.success('Training data succesfully updated!');
        }).catch(err => {
          this.loader = false;
          const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
          console.log(message);
        })
      } else {
        this.loader = false
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
      if (this.featureStatus != '' && this.answer && this.question !== '') {
        //  do nothing
        this.$modal.hide('Model');
        this.loader = true;
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
          this.$toaster.success('Training data succesfully submitted!');
          this.question = '',
            this.productVersion = ''
          this.answer = '',
            this.docversion = '',
            this.featureStatus = ''
        }).catch(err => {
          this.loader = false;
          const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
          console.log(message);
        })
      } else {
        this.$toaster.warning('Please fill fields marked as important!');
      }
    },

    getQuestions() {
      this.loader = true;
      axios.get(process.env.SERV_URL + 'visionendpoints?token=' + this.token + '&status=' + 'MANUAL_ENTRY').then((resp) => {
        this.loader = false;
        this.manualquestion = resp.data;
        // console.log(resp)
      }).catch(err => {
        this.loader = false;
        const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
        this.$toaster.warning('Please try again!');
      })
    },

    hide() {
      this.$modal.hide('Model');
    },

    uploadtrainingdata() {

      this.single = false;
      this.questionname= '',
      this.answername= '',
      this.doc_refname= '',
      this.featurestatusname= '',
      this.headerindex= ''
    },

    fileobj(obj) {
      this.fileobject = obj;
    },

    onSubmit(evt) {
      
      evt.preventDefault();
      var fileObj = this.fileobject
      if(Object.keys(fileObj).length === 0){
        // console.log('no file');
        this.$toaster.warning('Please try after uploading the file!');
        
      }else{
        
      if (this.headerindex && this.questionname && this.answername && this.doc_refname && this.featurestatusname != '') {
        
        var config = {};
        config.productversion=this.selectedversion,
        config.headerIndex = this.headerindex,
        config.questionColumn = this.questionname,
        config.answerColumn = this.answername,
        config.docRefColumn = this.doc_refname,
        config.featureColumn = this.featurestatusname

        var data = new FormData();
        Array
          .from(Array(fileObj.length).keys())
          .map(x => {
            data.append('file', fileObj[x]);
            data.append('config', JSON.stringify(config));
          });
        this.loader = true;
        const url = process.env.SERV_URL + '/trainingdatauploaderendpoints?token=' + this.token;
        axios.post(url,
          data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then((resp) => {
          this.loader = false;
          // console.log(resp);
          this.$toaster.success('Training data succesfully uploaded!');
          this.single = true;
        }).catch(err => {
          this.loader = false;
          const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
          // console.log(message);
          this.$toaster.warning('Please try again!');
        })
      } else {
        this.header = true;
      }
      }




    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.multipleUploader.resetfile()
      /* Reset our form values */
      this.questionname = '',
        this.answername = '',
        this.doc_refname = '',
        this.featurestatusname = ''
      this.headerindex = ''
      /* Trick to reset/clear native browser form validation state */

      this.$nextTick(() => {
        this.show = true
      });
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
    z-name: 1; /* Sit on top */
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

/* multiple file upload */
.flex-container {
  display: flex;
  width: 100%;
  box-shadow: 0px 0px 6px 0px grey;
  border-radius: 16px;
  margin-top: 1.5%;
}

.flex-container>div {
  margin: -1px;
  padding: 1%;
  /* font-size: 20px; */
  /* width: 31%; */
  margin-top: 1%;
  width: 47%;
}

</style>
