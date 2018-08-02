<template>
  <div class="SheetDetails">
    <div class="container">
      <div v-if="loader">
        <loading :active.sync="loader" :can-cancel="false" :is-full-page="true">
        </loading>
      </div>
      <form-wizard title='' subtitle='' color="#e86824">
        <tab-content v-for="(doc,index) in docarray" :title="doc.sheetname">
          <div class="flex-container">
            <div>
              <b-form-group label="Header Row Index: <font color=red>*</font>">
                <b-form-input type="text" v-model="doc.headerIndex" required placeholder="Enter header row index">
                </b-form-input>
                <span v-if="header" style="color:red;font-size: 11px; margin-left: 4px;">Please fill this field!</span>
              </b-form-group>

              <b-form-group label="Question Column: <font color=red>*</font>">
                <b-form-input type="text" v-model="doc.questionColumn" required placeholder="Enter question column">
                </b-form-input>
                <span v-if="header" style="color:red;font-size: 11px; margin-left: 4px;">Please fill this field!</span>
              </b-form-group>

              <b-form-group label="Remarks/Response Column: <font color=red>*</font>">
                <b-form-input type="text" v-model="doc.remarks" required placeholder="Enter remarks column">
                </b-form-input>
                 <span v-if="response" style="color:red;font-size: 11px; margin-left: 4px;">Please fill this field!</span>
              </b-form-group>
            </div>
            <div>
              <b-form-group label="Feature Status Column:">
                <b-form-input type="text" v-model="doc.statusColumn" required placeholder="Enter feature status column">
                </b-form-input>
              </b-form-group>

              <b-form-group label="Document Reference:">
                <b-form-input type="text" v-model="doc.documentReference" required placeholder="Enter document reference">
                </b-form-input>
              </b-form-group>

              <b-form-group>
                <b-form-checkbox-group>
                  <b-form-checkbox value="true" v-if="skipflag"  v-model="doc.skippable">Skippable</b-form-checkbox>
                 
                </b-form-checkbox-group>
                <b-form-checkbox-group>
                 
                  <b-form-checkbox value="true" v-if="skipflag" v-on:change="sameSettings(index)">Copy Settings</b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>

            </div>
          </div>
        </tab-content>

        <template slot="footer" slot-scope="props">
       <div class=wizard-footer-left>
           <wizard-button  v-if="props.activeTabIndex > 0 && !props.isLastStep" @click.native="props.prevTab()" :style="props.fillButtonStyle">Previous</wizard-button>
        </div>
        <div class="wizard-footer-right">
          <wizard-button v-if="!props.isLastStep" @click.native="nextTab(props.activeTabIndex,props)" class="wizard-footer-right" :style="props.fillButtonStyle">Next</wizard-button>

          <wizard-button v-else @click.native="onSubmit(props.activeTabIndex)"  class="wizard-footer-right finish-button" :style="props.fillButtonStyle">{{props.isLastStep ? 'Done' : 'Next'}}</wizard-button>
        </div>
      </template>
      </form-wizard>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import StepProgress from 'vue-step-progress';
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.min.css';

export default {
  components: {
    StepProgress,
    Loading
  },
  props: ['docarray', 'index', 'productversion', 'rfpname', 'sheetarray', 'file_id', 'file_path', 'token'],

  data() {
    return {
      show: true,
      submit_flag: "false",
      indexs: this.index,
      resp_str: {
        id: '',
        filepath: '',
        rfp_name: '',
        product_version: '',
        sheets: []
      },
      chk: '',
      loader: false,
      header: false,
      response: false,
      skipflag:true
    }
  },



    mounted: function () {
      if(this.docarray.length<2){
        this.skipflag=false;
      } 
    },
  methods: {

    sameSettings(index) {
      for (var j = index; j < this.docarray.length; j++) {
        this.docarray[j].statusColumn = this.docarray[index].statusColumn
        this.docarray[j].headerIndex = this.docarray[index].headerIndex
        this.docarray[j].questionColumn = this.docarray[index].questionColumn
        this.docarray[j].remarks = this.docarray[index].remarks
        this.docarray[j].documentReference = this.docarray[index].documentReference
      }
    },
    nextTab: function (index, props) {
     this.validate(index)? props.nextTab():null;

    },

    validate(index){
      if(this.docarray[index].skippable[0]!=="true"){
      if (this.docarray[index].headerIndex == '') {
              this.header = true;
            } else if (this.docarray[index].remarks == '') {
              this.response = true;
              
            } else {
              
              console.log("This is called before switchind tabs")
              this.header = false;
              this.response = false;
              return true;
             
            }
      }else{
        return true;
      }

            return false;
    },

    onSubmit(index) {
      if(this.validate(index)){
      this.loader = true;
      this.resp_str.id = this.file_id;
      this.resp_str.filepath = this.file_path;
      this.resp_str.rfp_name = this.rfpname;
      this.resp_str.product_version = this.productversion;
      for (let i = 0; i < this.docarray.length; i++) {
        var sheet_obj = {
          sheet_name: '',
          skippable: '',
          header_index: '',
          columns: {
            question: '',
            feature_status: '',
            remark: '',
            doc_ref: ''
          }
        }
        sheet_obj.sheet_name = this.docarray[i].sheetname;
        if (this.docarray[i].skippable == "") {
          sheet_obj.skippable = "false"
        } else {
          sheet_obj.skippable = this.docarray[i].skippable[0];
        }

        sheet_obj.header_index = this.docarray[i].headerIndex;
        sheet_obj.columns.question = this.docarray[i].questionColumn;
        sheet_obj.columns.feature_status = this.docarray[i].statusColumn;
        sheet_obj.columns.remark = this.docarray[i].remarks;
        sheet_obj.columns.doc_ref = this.docarray[i].documentReference;
        this.resp_str.sheets.push(sheet_obj);

      }
      this.upload(this.resp_str)
      }
    
    },

    upload(data) {
      const url = process.env.SERV_URL + 'uploaderendpoints?token=' + this.token;;
      axios.put(url, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((resp) => {
        this.$toaster.success('RFP File Succesfully Submitted')
        this.afterupload(data.id);
      }).catch(err => {
        this.loader = false;
        const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
        console.log(message);
      })
    },

    afterupload(id) {
      const url = process.env.AI_URL + 'ai';
      axios.post(url, {
        "token": this.token,
        "template_ref_id": id,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((resp) => {
        this.loader = false;
        this.$toaster.success('AI Process Started');
        this.$emit('finish', {})
      }).catch(err => {
        this.loader = false;
        const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
        console.log(message);
      })
    },
  }
}
</script>

<style scoped>

.flex-container {

  display: flex;
}

.flex-container > div {
  padding: 4%;
  width: 50%;

}
.vue-form-wizard .wizard-tab-content {
    min-height: 100px;
    padding: 5px 20px 1px!important;
}

.vue-form-wizard .wizard-btn {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-width: 2px;
    background-color: transparent;
    font-size: 14px;
    font-weight: 600;
    padding: 6px 12px;
    min-width: 140px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.vue-form-wizard {
    padding-bottom: 12px!important;
}


</style>
