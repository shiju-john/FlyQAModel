<template>
  <div class="statusTracker">
    <div v-if="status" style="height:100%;">
      <table-component id="st" caption="heading" :data="statusdata" cache-key="t1" sort-by="requestTime" style="font-size: 13px; height: 83vh;overflow: hidden;">
        <table-column show="rfp_name" label="rfp name"></table-column>
        <table-column show="product_version" label="Product Version"></table-column>
        <table-column show="uploadedUser" label="Uploaded User"></table-column>
        <table-column show="uploadedTime" label="Uploaded Time"></table-column>
        <table-column show="status" label="status"></table-column>
        <table-column :sortable="false" :filterable="false">
          <template slot-scope="row">
            <b-button variant="warning" v-if="row.status=='PROCESSED'" v-on:click="download(row)" id="dwn"  title="Download File" >
              <i class="fa fa-download"></i>
            </b-button>
            <b-button v-if="row.status=='PROCESSED'" variant="primary"   title="Status Details" v-on:click="clik(row)">
              <i class="fa fa-chevron-right"></i>
            </b-button>
            <b-button v-if="row.status=='TEMP'" variant="primary"  v-on:click="clik(row)">
              <i class="fa fa-trash-o"></i>
            </b-button>
          </template>
        </table-column>
      </table-component>
    </div>
    <div v-if="loader" >
         <loading :active.sync="loader" 
        :can-cancel="false" 
        :is-full-page="true">
        </loading>
    </div>
    <QuestionSelect :rfpdata="answer" v-if="answer_flag" :token="token" :version="version"></QuestionSelect>
  </div>
</template>

<script>
import axios from 'axios';
import QuestionSelect from './QuestionSelect';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';
export default {

components: {
  QuestionSelect,
  Loading
},

props: ['version','token'],

data() {
  return {
    statusdata: [],
    loader:true,
    status:'',
    uploadedUser:'',
    uploadedTime:'',
    productVersion:'',
    completed:'',
    statusid:'',
    sheetdata:[],
    answer_flag:false,
    status:true
  }
},
created: function () {
  this.getstatusdatas();

},

mounted() {
document.getElementsByTagName("input").value='';

},

beforeDestroy() {
  },

methods: {
  clik(rowdata){
    this.answer=rowdata;
    this.answer_flag=true;
    this.status=false;
  },

download(row){
  this.loader=true;
    axios({
    url: process.env.SERV_URL+'/visionstatustrackerendpoints?token='+this.token+'&action=download&id='+row.id,
    method: 'GET',
    responseType: 'blob', // important
  }).then((response) => {
    this.loader=false;
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', row.rfp_name); //or any other extension
    document.body.appendChild(link);
    link.click();
  });

},
  getstatusdatas() {
    axios.get(process.env.SERV_URL+'uploaderendpoints?token='+this.token, {
    }).then((resp) => {
      // console.log(resp.data)
      this.loader=false;
      // console.log(resp.data);
        if (resp.data.length==0) {
           this.$toaster.info('No RFP Files Uploaded');
        }
      
      this.statusdata=resp.data;
    }).catch(err => {
      this.loader=false;
      const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
      // alert(message);
    })
  },
}
}
</script>

<style scoped>
.btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    /* font-size: 1rem; */
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

</style>

