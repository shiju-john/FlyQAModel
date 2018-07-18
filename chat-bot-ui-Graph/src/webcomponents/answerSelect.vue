<template>
  <div class="AnsweSelect">
    <div v-bind:style="[src ? {'padding-top':'0%'} : {'padding-top':'9%'}]">
      <b-tabs pills card>
        <b-tab :title="'Answer ' + (index +1)" v-for="(a, index) in answer" v-on:click="toggle">
          <table class="table">
              <col width="60">
            <tr>
              <th>Feature Status:</th>
              <td v-if="!src">
                <textarea id="textfield0" @click="selects"  placeholder="No feature status available" v-if="text">{{a.featureStatus}}</textarea>
                <select @change="edited" v-if="!text" >
                  <option value="" selected>Fully Compliance</option>
                  <option value="">Partially Compliance</option>
                  <option value="">Non Compliance</option>
                </select>
              </td>
              <td v-if="src">
                <textarea placeholder="No feature status available" :readonly="src">{{a.featureStatus}}</textarea>
              </td>
            </tr>
            <tr>
              <th>Document Reference:</th>
              <td height="10">
                <textarea :readonly="src" v-model="a.doc_ref" placeholder="No documents available" @keyup="edited"></textarea>
              </td>
            </tr>
            <tr>
              <th>Answer:</th>
              <td height="200">
                <textarea :readonly="src" v-model="a.answer" style="position: absolute;" @keyup="edited"></textarea>
              </td>
            </tr>
            <tr >
              <td v-if="!src" colspan="2">
                <b-button variant="success" v-on:click="response('accept',index)">accept</b-button>
                <b-button variant="danger" style="margin-left: 50px;" v-on:click="response('reject',index)">reject</b-button>
                <b-button variant="info" v-if="updateFlag" style="margin-left: 50px;" v-on:click="response('update',index)">Update</b-button>
              </td>
            </tr>
          </table>
        </b-tab>
      </b-tabs>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {

components: {},
  props: ['data', 'answer', 'src', 'token'],


  data() {
    return {
      updateFlag: false,
      text: true,
      count: 0,
    }
  },
  created: function () {},

  watch: {
    'answer' () {
      this.updateFlag = false;
      this.text = true;
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
      }
    },

    response(action, index) {
      this.answer[index].status = action;
      if (action == 'reject') {
        this.count++;
      }
      if (this.count == this.answer.length) {
        this.data[0].finalStatus = 'reject';
      }
      if (this.answer.length > 1) {
        delete this.data[0].vueTableComponentInternalRowId;
        var ans = [];
        var data = [];
        for (let i = 0; i < this.answer.length; i++) {
          ans.push(this.answer[i])
        }
        this.data[0].answers = JSON.stringify(ans);
        data.push(this.data[0]);
        // console.log(JSON.stringify(this.data[0]));
        // this.req(data)
      } else {
        this.answer.status = action;
        this.data[0].answers = JSON.stringify(this.answer);
        delete this.data[0].vueTableComponentInternalRowId;
        var data = [];
        data.push(this.data[0]);
        // this.req(data);
        // console.log(JSON.stringify(this.data[0]));
      }


    },

    req(data) {
      axios.put(process.env.SERV_URL + 'visionstatustrackerendpoints?token=' + this.token, {
        postKey: 'saveQuestions',
        questions: data
      }).then((resp) => {
        this.$toaster.success('request successfully sent!');
      }).catch(err => {
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
}

/* td, th {
    border: 1px solid #dddddd;
    text-align: left;
    border-bottom: 1px solid #ddd;
} */

</style>

