<template>
  <div class="answerSelect">
    <div class="tab">
      <div v-for="sheet in sheetArray">
        <button class="tablinks " v-if="sheet.skippable!='true'" v-on:click="openChart($event,sheet.sheet_name,sheet)">{{sheet.sheet_name}}</button>
      </div>
    </div>
    <div id="sheet_sheet_name" class="tabcontent">
      <div class="flex-container">
        <div style="width:60%">
          <table-component caption="heading" :data="current_tab_data"  sort-by="requestTime" style="font-size: 13px; height: 474px; overflow: hidden;">
            <table-column show="question" label="question"></table-column>
            <table-column :sortable="false" :filterable="false">
              <template slot-scope="row">
                <b-button variant="primary" title="Request for solution">
                  <i class="fa fa-reply"></i>
                </b-button>
                <b-button variant="success" v-on:click="clik(row)" title="answers">
                  <i class="fa fa-comment"></i>
                </b-button>
              </template>
            </table-column>
          </table-component>
        </div>
        <div style="width:40%">
          <!-- <div style="padding-top:9%">
            <b-tabs pills card>
              <b-tab :title="'Answer ' + (index +1)" v-for="(a, index) in answers" v-on:click="toggle">
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
          </div> -->
          <AnswerSelect v-if="answerFlag" :answer="answers"></AnswerSelect>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import AnswerSelect from './AnswerSelect'
export default {

  components: {
    AnswerSelect
     },
    
    props: ['rfpdata'],

  data() {
    return {
        current_tab_data:[],
        tab_datas:{},

        button:'',
        answers:[],
        questionId:'',
        sheetArray:[],
        ans:[],

        answerFlag:false,

    }
  },
  created: function () {
    this.getanswers();
    
  },

  beforeDestroy() {
   },

  methods: {
    

    clik(row){
        var res =  row.answers? row.answers.replace("NaN", "\"\""):row.answers;
        this.answers=JSON.parse(res);
        this.answerFlag=true;
        this.$refs.AnswerSelect.answerChange(this.answers);
    },
        openChart(e,sheetname,sheets) {

            if (this.tab_datas[sheetname]) {
                this.current_tab_data=this.tab_datas[sheetname]
            }else{
            const url = process.env.QST_URL;
                axios.post(url, {
                    templateRefId:this.rfpdata.id,
                        sheetName:sheetname
                    }, {
                    headers: {
                    'Content-Type': 'application/json'
                    }
                }).then((resp) => {
                    console.log(resp);
                    this.tab_datas[sheetname]=resp.data;
                    this.current_tab_data=resp.data;

                }).catch(err => {
                    const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
                    console.log(message);
                })
            }
      
      var i, tabcontent, tablinks;
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById("sheet_sheet_name").style.display = "block";
      if(e!=''){
         e.currentTarget.className += " active";
      }else{
      }
    },

    getanswers() {
       this.sheetArray=JSON.parse(this.rfpdata.sheets);
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

td, th {
    text-align: left;
    padding: 8px;
}

.flex-container > div {
    margin: 0px; 
    padding-right: 1%;
}

.flex-container {
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    box-shadow: 0px 0px 0px 0px grey;
    margin-top: 0%;
    font-size: 13px;
}



/* Style the tab */
.tab {
    overflow: hidden;
    border: 1px solid #ccc;
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
    /* padding: 6px 12px; */
    border: 1px solid #ccc;
    border-top: none;
}

</style>

