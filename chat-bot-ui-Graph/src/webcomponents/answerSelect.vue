<template>
<div class="AnsweSelect">
  <div >
    <b-tabs pills card>
      <b-tab :title="'Answer ' + (index +1)" v-for="(a, index) in answer" v-on:click="toggle">
        <b-form style="padding: 2%;font-weight: 600;">
          <b-form-group label="Feature Status:">
            <div v-if="!src">
              <b-form-textarea   @click.native.native="selects" class="text" v-model="a.featureStatus" placeholder="No feature status available" v-if="text"></b-form-textarea >
              </div>
                <select @change="edited" class="select" v-if="!text" v-model="drop"  style="margin-left:-9px;">
                 <option v-for="option in options" v-bind:value="option.text">
                      {{ option.text }}
                    </option>
                </select>
            <div v-if="src">
              <b-form-textarea :rows="3"  :max-rows="3" placeholder="No feature status available" v-model="a.featureStatus" disabled>
              </b-form-textarea>
            </div>
          </b-form-group>

          <b-form-group label="Document Reference:">
            <b-form-textarea v-if="src"   type="text" v-model="a.doc_ref" placeholder="No documents available" @keyup.native="edited" disabled>
            </b-form-textarea>
                  <b-form-textarea v-else @keyup.native="edited"  type="text" v-model="a.doc_ref" placeholder="No documents available" >
            </b-form-textarea>
          </b-form-group>


          <b-form-group label="Answer:">
            <b-form-textarea v-if="src" :rows="5" disabled :max-rows="5" @keyup.native="edited" placeholder="No documents available" v-model="a.answer">
              </b-form-textarea>
               <b-form-textarea v-else :rows="5" :max-rows="5" @keyup.native="edited" placeholder="No documents available" v-model="a.answer">
              </b-form-textarea>
          </b-form-group>
        </b-form>

        <div v-if="!src" style="text-align:right;">
          <b-button variant="info" v-if="updateFlag" v-on:click="response('update',index)">Update</b-button>
          <b-button variant="info" v-if="disabled" disabled>Update</b-button>
          <b-button variant="success" style="background-color:green" v-on:click="response('accept',index)">accept</b-button>
        </div>
      </b-tab>
    </b-tabs>
    <div v-if="loader">
      <loading :active.sync="loader" :can-cancel="false" :is-full-page="true">
      </loading>
    </div>
  </div>
  <div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';
export default {

components: {Loading},
  props: ['data', 'answer', 'src', 'token'],


  data() {
    return {
      updateFlag: false,
      loader:false,
      text: true,
      disabled:true,
      count: 0,
      drop:'Fully Compliance',
      options: [
      { text: 'Fully Compliance', },
      { text: 'Partially Compliance', },
      { text: 'Non Compliance', }
    ]
    }
  },
  created: function () {},

  watch: {
    'answer' () {
      this.updateFlag = false;
      this.text = true;
      this.disabled=true;
    }
  },

  beforeDestroy() {},

  methods: {
    selects() {
      this.text = false;
    },
    toggle() {
      this.updateFlag = false;
      this.text = true;
      

    },
    edited() {
      if (this.src) {
        this.updateFlag = false;
      } else {
        this.updateFlag = true;
        this.disabled=false;
      }
    },

    response(action, index) {
      this.loader=true;
      if (action == 'update') {
      }else{
        this.answer[index].status = action;
      }

      this.answer[index].featureStatus = this.drop;
      if (action == 'accept') {
        this.data[0].finalStatus = 'accept';
      }
      // if (action == 'reject') {
      //   this.count++;
      // }
      // if (this.count == this.answer.length &&this.data[0].finalStatus!=='solution_waiting') {
      //   this.data[0].finalStatus = 'reject';
      // }
      if (this.answer.length > 1) {
        delete this.data[0].vueTableComponentInternalRowId;
        var ans = [];
        var data = [];
        for (let i = 0; i < this.answer.length; i++) {
          // this.answer[i].featureStatus = this.drop;
          ans.push(this.answer[i])
        }
        this.data[0].answers = JSON.stringify(ans);
        data.push(this.data[0]);
        // console.log(JSON.stringify(this.data[0]));
        this.req(data)
      } else {
        this.answer.status = action;
        this.answer.featureStatus = this.drop;
        this.data[0].answers = JSON.stringify(this.answer);
        delete this.data[0].vueTableComponentInternalRowId;
        var data = [];
        data.push(this.data[0]);
        this.req(data);
        // console.log(JSON.stringify(this.data[0]));
      }


    },

    req(data) {
      axios.put(process.env.SERV_URL + 'visionstatustrackerendpoints?token=' + this.token, {
        postKey: 'saveQuestions',
        questions: data
      }).then((resp) => {
        this.loader=false;
        this.$toaster.success('request successfully sent!');
      }).catch(err => {
        this.loader=false;
        const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
        console.log(message);
      })
    }
  }
}
</script>

<style scoped>


.tabs.card-header {
    padding: 0.75rem 2.25rem;
    }
    
td, th {
    text-align: left;
}

select {
    border: 0;
    width: 95%;
}

/* Style the tab */
.tab {
    overflow: hidden;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
}

textarea {
  width: 95%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  resize: none; 
  border: none;
  font-size: 14px;
}

text {
  width: 95%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  resize: none; 
  border: none;
}

.select {
    display: inline-block;
    width: 94%;
    height: calc(2.25rem + 2px);
    padding: 0.375rem 1.75rem 0.375rem 0.75rem;
    line-height: 1.5;
    color: #495057;
    vertical-align: middle;
    background-size: 8px 10px;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    font-size: 16px;
    left: 11px;
} 


</style>

