<template>
  <div class="AnsweSelect">
    <div v-bind:style="[src ? {'padding-top':'0%'} : {'padding-top':'7%'}]">
      <b-tabs pills card>
        <b-tab :title="'Answer ' + (index +1)" v-for="(a, index) in answer" v-on:click="toggle">
          <table class="table">
              <col width="60">
            <tr>
              <th>Feature Status:</th>
              <td v-if="!src">
                <textarea style="margin-left:-9px;" id="textfield0" @click="selects" v-model="a.featureStatus" placeholder="No feature status available" v-if="text"></textarea>
                <select @change="edited" v-if="!text" v-model="drop"  style="margin-left:-9px;">
                 <option v-for="option in options" v-bind:value="option.text">
                      {{ option.text }}
                    </option>
                </select>
              </td>
              <td v-if="src">
                <textarea style="margin-left:-9px;" placeholder="No feature status available" v-model="a.featureStatus" :readonly="src"></textarea>
              </td>
            </tr>
            <tr>
              <th>Document Reference:</th>
              <td height="10">
                <textarea style="margin-left:-9px;" :readonly="src" v-model="a.doc_ref" placeholder="No documents available" @keyup="edited"></textarea>
              </td>
            </tr>
            <tr>
              <th>Answer:</th>
              <td height="200">
                <textarea :readonly="src" placeholder="No documents available" v-model="a.answer" style="position: absolute;" @keyup="edited"></textarea>
              </td>
            </tr>
            <tr >
              <td v-if="!src" colspan="2">
                <div style="margin-left:69%;">
                  <b-button variant="info" v-if="updateFlag"  v-on:click="response('update',index)">Update</b-button>
                  <b-button variant="info" v-if="disabled"  disabled >Update</b-button>
                  <b-button variant="success" style="background-color:green" v-on:click="response('accept',index)">accept</b-button>
                <!-- <b-button variant="danger" style="margin-left: 50px;" v-on:click="response('reject',index)">reject</b-button> -->
                </div>
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


</style>

