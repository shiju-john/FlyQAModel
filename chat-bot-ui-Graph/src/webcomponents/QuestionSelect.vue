<template>
  <div class="answerSelect">
    <div class="tab">
      <div v-for="(sheet,index) in sheetArray">
        <button class="tablinks" v-on:click="openTab($event,sheet.sheet_name)">{{sheet.sheet_name}}</button>
      </div>
    </div>
    <div id="sheet_sheet_name" class="tabcontent">
      <div class="flex-container">
        <div class="one" style="width:60%">
          <table-component caption="heading" :data="current_tab_data" sort-by="requestTime" style="font-size: 13px; height: 474px; overflow: hidden;">               
            <table-column show="question" label="question"></table-column>
            <table-column :sortable="false" :filterable="false">
              <template slot-scope="row">
                 <!-- <i style="margin-right: 15px;" class="fa fa-times"></i>  -->
                <b-button variant="primary" v-on:click="sendreply(row)" title="Request for solution">
                  <i class="fa fa-reply"></i>
                </b-button>
                <b-button variant="success" v-on:click="clik(row)" title="answers">
                  <i class="fa fa-adn"></i>
                </b-button>
              </template>
            </table-column>
          </table-component>
        </div>
        <div style="width:40%">
          <answerSelect v-if="answerFlag" :data="rowObj" :answer="answers" :token="token"></answerSelect>
          <div v-if="emptyanswer" style="display: inline">
            <span class="noanswer">No answers available!</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="loader">
      <loading :active.sync="loader" :can-cancel="false" :is-full-page="true">
      </loading>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import answerSelect from './answerSelect';
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.min.css';
export default {

components: {
    answerSelect,
    Loading
  },

  props: ['rfpdata','version','token'],


  data() {
    return {
      current_tab_data: [],
      tab_datas: {},
      loader: true,
      answers: [],
      questionId: '',
      sheetArray: this.filterItems(JSON.parse(this.rfpdata.sheets)),
      ans: [],
      emptyanswer: false,
      answerFlag: false,
      temp: String,
      updateflag: Boolean,
      rowObj:[]
    }
  },
  mounted() {
    this.getanswers();
  },

  beforeDestroy() {},

  methods: {
    filterItems: function (items) {
      return items.filter(function (item) {
        return item.skippable != 'true';
      })
    },

    clik(row) {
      this.rowObj.length=0;
      var res = row.answers ? row.answers.replace(/NaN/g ,  "\"\"") : row.answers;
      this.rowObj.push(row);
    
      this.answers = JSON.parse(res);
      if (this.answers.length == 0) {
        this.emptyanswer = true
      } else {
        this.emptyanswer = false
      }
      this.answerFlag = true;
    },
    openTab(e, sheetname) {
      this.loader = true;
      this.updateflag = false;
      this.answers = [];
      const url = process.env.SERV_URL+'visionstatustrackerendpoints/?token='+this.token;
      axios.post(url, {
        templateRefId: this.rfpdata.id,
        sheetName: sheetname
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((resp) => {
        this.rowObj.length=0;
        this.loader = false;
        this.tab_datas[sheetname] = resp.data;
        this.current_tab_data = resp.data;
        var res = [];
        res = resp.data[0].answers.replace("NaN", "\"\"");
        this.answers = JSON.parse(res);
        this.rowObj.push(resp.data[0]);
        if (this.answers.length == 0) {
          this.emptyanswer = true
        } else {
          this.emptyanswer = false
        }
        this.answerFlag = true;
      }).catch(err => {
        this.emptyanswer = true
        this.loader = false;
        this.answerFlag = false;
        const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
        console.log(message);
      })


      var i, tabcontent, tablinks;
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById("sheet_sheet_name").style.display = "block";
      if (e != '') {
        e.currentTarget.className += " active";
      } else {
        tablinks[0].className += " active";
      }
    },

    getanswers() {
      this.openTab('', this.sheetArray[0].sheet_name);
    },

    sendreply(data) {
      this.loader=true;
      axios.post(process.env.SERV_URL + 'visionendpoints?token='+this.token, {
        requestedSource: data.requestSource,
        questionId: data.id,
        templateRefId: data.templateRefId,
        question: data.question,
        productVersion: this.version,
      }).then((resp) => {
        this.loader=false;
        this.$toaster.success('Solution request successfully processed!')
      }).catch(err => {
        this.loader=false;
        const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
        this.$toaster.error(message)
        console.log(message);
      })
    },
  }
}

</script>

<style scoped>

table[data-v-03ad4c97] {
  font-family: inherit;
  border-collapse: inherit;
  width: 100%;
}

td {
  text-align: left;
  width: 25%;
}

.flex-container>div {
  margin: 0px;
  padding-right: 1%;
  padding: 0%;
}

.flex-container {
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  box-shadow: 0px 0px 0px 0px grey;
  margin-top: 0%;
  font-size: 13px;
}

.one.table-component__filter {
  align-self: flex-end;
  z-index: 1 !important;
  margin-right: 19px !important;
}

/* Style the tab */

.tab {
  overflow: hidden;
  background-color: #f1f1f1;
}

/* Style the buttons inside the tab */

.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 17px;
}

.noanswer {
  display: inline-block;
  margin: 10px 10px 0 0;
  padding: 181px 19px;
  font-weight: bolder;
}

/* Change background color of buttons on hover */

.tab button:hover {
  background-color: #ddd;
}

/* Create an active/current tablink class */

.tab button.active {
  background-color: #ccc;
}

/* Style the tab content */

.tabcontent {
  display: none;
  border: 1px solid #ccc;
  border-top: none;
}

.accept {
    color: green;
}

.reject {
    color: red;
}

</style>

