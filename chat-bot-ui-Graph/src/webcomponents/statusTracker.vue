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
            <b-button variant="warning" v-if="row.status=='PROCESSED'" v-on:click="download()" id="dwn"  title="Download File" >
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

download(){
// var button=  document.getElementById("dwn");
// var url = 'data:image/png;base64,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';
// var a = document.createElement('a');
// a.href = url;
// a.download = 'file-name.png';
// a.style = 'display: none';
// button.parentNode.appendChild(a);
// a.click();
// a.remove();

},
  getstatusdatas() {
    axios.get(process.env.SERV_URL+'uploaderendpoints?token='+this.token, {
    }).then((resp) => {
      // console.log(resp.data)
      this.loader=false;
      console.log(resp.data);
      
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

