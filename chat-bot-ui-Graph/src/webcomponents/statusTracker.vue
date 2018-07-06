<template>
  <div class="statusTracker">
    <div v-if="status">
      <table-component id="st" caption="heading" :data="statusdata" sort-by="requestTime" style="font-size: 13px; height: 515px; overflow: hidden;">
        <table-column show="rfp_name" label="rfp name"></table-column>
        <table-column show="product_version" label="Product Version"></table-column>
        <table-column show="uploadedUser" label="Uploaded User"></table-column>
        <table-column show="uploadedTime" label="Uploaded Time"></table-column>
        <table-column show="status" label="status"></table-column>
        <table-column :sortable="false" :filterable="false">
          <template slot-scope="row">
            <b-button variant="primary" title="Request for solution" v-on:click="clik(row)">
              <i class="fa fa-chevron-right"></i>
            </b-button>
          </template>
        </table-column>
      </table-component>
    </div>
    <div v-if="loader" style="margin-top: -23%;">
      <Spinner message="Loading..."></Spinner>
    </div>
    <answerSelect :rfpdata="answer" v-if="answer_flag"></answerSelect>
  </div>
</template>

<script>
import axios from 'axios';
import answerSelect from './answerSelect';
import Spinner from 'vue-simple-spinner'
export default {

  components: {
    answerSelect,Spinner
     },

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

  beforeDestroy() {
   },

  methods: {
    clik(rowdata){
      this.answer=rowdata;
      this.answer_flag=true;
      this.status=false;
    },

    getstatusdatas() {
      axios.get(process.env.STAT_URL + '&status=OPEN', {
      }).then((resp) => {
         this.loader=false;
        this.statusdata=resp.data;

        console.log(resp);
      }).catch(err => {
        const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
        alert(message);
      })
    },
  }
}
</script>

<style scoped>


</style>

