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
                <textarea id="textfield0" @click="selects"  v-if="text">{{a.featureStatus}}</textarea>
                <select @change="edited" v-if="!text">
                  <option value="" selected>Fully Compliance</option>
                  <option value="">Partially Compliance</option>
                  <option value="">Non Compliance</option>
                </select>
              </td>
              <td v-if="src">
                <textarea :readonly="src">{{a.featureStatus}}</textarea>
              </td>
            </tr>
            <tr>
              <th>Document Reference:</th>
              <td height="10">
                <textarea :readonly="src" v-model="a.doc_ref" placeholder="no documents available" @keyup="edited"></textarea>
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
                <b-button variant="success">accept</b-button>
                <b-button variant="danger" style="margin-left: 50px;">reject</b-button>
                <b-button variant="info" v-if="updateFlag" style="margin-left: 50px;">Update</b-button>
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
  props: ['answer', 'src'],


  data() {
    return {
      updateFlag: false,
      text: true,
    }
  },
  created: function () {},

  watch: {
    'answer' () {
      this.updateFlag=false;
      this.text=true;
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

