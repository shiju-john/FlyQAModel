<template>
  <div class="AnsweSelect">
                <div style="padding-top:9%">
            <b-tabs pills card>
              <b-tab :title="'Answer ' + (index +1)" v-for="(a, index) in answer" v-on:click="toggle">
                <table>
                  <tr>
                    <th style="width: 24%;">Feature Status:</th>
                    <td>
                      <textarea style="top: 8px;" @click="selects" v-if="text">{{a.featureStatus}}</textarea>
                      <select @change="edited" v-if="select">
                        <option value="">Fully Compliance</option>
                        <option value="">Partially Compliance</option>
                        <option value="">Non Compliance</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th>Document :</th>
                    <td height="10">
                      <textarea style="top: 8px;" @keyup="edited">{{a.doc_ref}}</textarea>
                    </td>
                  </tr>
                  <tr>
                    <th>Answer:</th>
                    <td height="200">
                      <textarea @keyup="edited">{{a.answer}}</textarea>
                    </td>
                  </tr>
                  <tr>
                    <th></th>
                    <td>
                      <b-button variant="success">accept</b-button>
                      <b-button variant="danger" style="margin-left: 50px;">reject</b-button>
                      <b-button variant="info" v-if="updateFlag" style="margin-left: 50px;">Update</b-button>
                    </td>
                  </tr>
                </table>
              </b-tab>
            </b-tabs>
          </div>
    <div >
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {

  components: {
     },
     props: ['answer'],

  data() {
    return {
        // answers:this.answer,
        updateFlag:false,
        select:false,
        text:true,
    }
  },
  created: function () {
  },

  beforeDestroy() {
   },

  methods: {
            selects(){
          this.select=true;
          this.text=false;
      },
      toggle(){
        this.updateFlag=false;
        this.select=false;
          this.text=true;
      },
      edited(){
          this.updateFlag=true;
      },
      answerChange(data){
          answers=data

      }

  }
}
</script>

<style scoped>

table[data-v-03ad4c97] {
    font-family: inherit;
    border-collapse: inherit;
        width: 100%;
}

td, th {
    text-align: left;
    padding: 8px;
}

select {
    border: 0;
    width: 100%;
}

/* Style the tab */
.tab {
    overflow: hidden;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
}



textarea {
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  resize: none;
  border: none;
}

</style>

