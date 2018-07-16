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
    <div v-if="loader" >
         <loading :active.sync="loader" 
        :can-cancel="false" 
        :is-full-page="true">
        </loading>
    </div>
  <vue-modaltor :visible="open" defaultWidth="40%" @hide="open = false" v-on:click="close" :animation-panel="'modal-slide-right'">
    <div class="subject" v-on:click="close" style="cursor:pointer">
      <h3>Solution Response</h3>
    </div>
    <table class="table">
      <col width="60">
      <tr>
        <th>Question:</th>
        <td>
          <textarea :readonly="true"> {{this.property}}</textarea>
        </td>
      </tr>
      <tr>
        <th>Feature Status:</th>
        <td>
          <select v-model="featureStatus">
            <option disabled value="">Please select one</option>
            <option>Fully Compliance</option>
            <option>Partially Compliance</option>
            <option>Non Compliance</option>
          </select>
        </td>
      </tr>
      <tr>
        <th>Remarks:</th>
        <td>
          <textarea v-model="remarks" style="position: absolute;"></textarea>
        </td>
      </tr>
      <tr>
        <th>Document version:</th>
        <td>
          <textarea v-model="docversion" style="position: absolute;"></textarea>
        </td>
      </tr>
    </table>
    <button style="margin-left: 30%;" type="button" v-on:click="sendreply()" class="btn btn-success">Request For Solution</button>
  </vue-modaltor>
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

  props: ['requestdata', 'token'],

  data() {
    return {
      modifiers: {},
      req_obj: {},
      flag: 'none',
      // requestdata: [],
      send_reply: [],
      question: String,
      loader: true,
      open: false,
      property: '',
      remarks: '',
      docversion: '',
      featureStatus: '',
      property: '',

    }
  },
  watch: {
    'requestdata' () {
      this.loader=false;
    }
  },
  created: function () {
    //  this.requestdata
    // this.reqsolution();
    window.addEventListener('keydown', (e) => {
      if (e.key == 'Escape') {
        this.close()
        this.remarks = '',
          this.docversion = ''
      }
    });
  },

  beforeDestroy() {},

  methods: {
    reqsolution() {
      axios.get(process.env.SERV_URL + 'visionendpoints?token=' + this.token + '&status=OPEN', {}).then((resp) => {
        this.loader = false;
        this.requestdata = resp.data;
        // this.$toaster.success('Solution request successfully sent!')
      }).catch(err => {
        const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
        // alert(message);
        this.loader = false;
        this.$toaster.error(message)
      })
    },

    reply(data) {
      this.open = true
      this.send_reply = data;
      this.property = data.question
    },

    close() {
      this.remarks = '',
        this.docversion = ''
      this.open = false
    },

    sendreply() {
      axios.put(process.env.SERV_URL + 'visionendpoints?token=' + this.token, {
        id: this.send_reply.id,
        question: this.send_reply.question,
        productVersion: this.send_reply.productVersion,
        requestUser: this.send_reply.requestUser,
        requestTime: this.send_reply.requestTime,
        answer: this.remarks,
        docLink: this.docversion,
        featureStatus: this.featureStatus
      }).then((resp) => {
        this.$toaster.success('Solution request successfully processed!');
        this.open = false
        //for refreshing table
        this.reqsolution();
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

.img{
  width: 24px;
}

td, th {
  border-bottom: 1px solid #ddd;
  font-weight: normal;
    }

textarea {
  width: 100%;
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

</style>

