<template>
<div class="statusTracker">
  <div  v-if="status">
          <table-component caption="heading" :data="statusdata" sort-by="requestTime" style="font-size: 13px; height: 515px; overflow: hidden;">
          <table-column show="name" label="name"></table-column>
          <table-column show="productVersion" label="Product Version"></table-column>
          <table-column show="uploadedUser" label="Uploaded User"></table-column>
          <table-column show="uploadedTime" label="Uploaded Time"></table-column>
          <table-column show="status" label="status"></table-column>
          <table-column :sortable="false" :filterable="false">
            <template slot-scope="row"  v-if="row.status=='true'">
              <b-button variant="primary"  title="Request for solution" v-on:click="clik(row.id)">  <i class="fa fa-reply"></i></b-button>
            </template>
          </table-column>
        </table-component>

  </div>
     <answerSelect v-if="answer"></answerSelect>

</div>
</template>

<script>
import axios from 'axios';
import answerSelect from './answerSelect'
export default {

  components: {
    answerSelect
     },

  data() {
    return {
      statusdata: [],
      status:'',
      uploadedUser:'',
      uploadedTime:'',
      productVersion:'',
      completed:'',
      statusid:'',
      answer:false,
      status:true
    }
  },
  created: function () {
     this.getstatusdatas();
  },

  beforeDestroy() {
   },

  methods: {
    clik(a){
      // console.log(a)
      this.answer=true;
      this.status=false;
    },

    getstatusdatas() {
      // axios.get(process.env.STAT_URL + '&status=OPEN', {}).then((resp) => {
        this.statusdata = [
                {   
                    id:'stat-1',
                    name:'test_1',
                    status:'false',
                    uploadedUser:'user_1',
                    uploadedTime:'10:30',
                    productVersion:'3.5',
                    completed:false
                }
                ,{
                    id:'stat-2',
                    name:'test_2',
                    status:'true',
                    uploadedUser:'user_2',
                    uploadedTime:'3:30',
                    productVersion:'3.3',
                    completed:true
                    }
            
        ];

        // console.log(resp);
      // }).catch(err => {
      //       this.statusdata = [
      //           {   
      //               id:'stat-1',
      //               name:'test_1',
      //               status:'uploaded',
      //               uploadedUser:'user_1',
      //               uploadedTime:'10:30',
      //               productVersion:'3.5',
      //               completed:false
      //           }
      //           ,{
      //               id:'stat-2',
      //               name:'test_2',
      //               status:'completed',
      //               uploadedUser:'user_2',
      //               uploadedTime:'3:30',
      //               productVersion:'3.3',
      //               completed:true
      //               }
            
      //   ];
      //   const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
      //   alert(message);
      // })
    },
  }
}

</script>

<style scoped>


</style>

