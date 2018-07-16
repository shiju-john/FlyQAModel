<template>
  <div class="SheetDetails">
    <div class="container">
      <form-wizard title='' subtitle='' color="#e86824" @on-complete="onSubmit()">
        <tab-content v-for="doc in docarray" :title="doc.sheetname" >
          <div class="flex-container">
            <div>
              <b-form-group label="Header Row Index:">
                <b-form-input type="text" v-model="doc.headerIndex" required placeholder="Enter header row index">
                </b-form-input>
              </b-form-group>

              <b-form-group label="Question Column:">
                <b-form-input type="text" v-model="doc.questionColumn" required placeholder="Enter question column">
                </b-form-input>
              </b-form-group>

              <b-form-group label="Remarks/Response Column:">
                <b-form-input type="text" v-model="doc.remarks" required placeholder="Enter remarks column">
                </b-form-input>
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

              <b-form-group >
                <b-form-checkbox-group>
                  <b-form-checkbox value="true"  v-model="doc.skippable">Skippable</b-form-checkbox>
                  <!-- <b-form-checkbox value="same" @change="sameSettings"  v-model="chk">Same for all</b-form-checkbox> -->
                </b-form-checkbox-group>             
              </b-form-group>
            </div>
          </div>
        </tab-content>
      </form-wizard>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import StepProgress from 'vue-step-progress';

export default {
  components: {
    StepProgress
  },
  props: ['docarray', 'index', 'productversion', 'rfpname', 'sheetarray', 'file_id', 'file_path','token'],

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
      chk:''
    }
  },

  methods: {

    sameSettings() {
      // console.log('checked')
      for (let i = 0; i < this.docarray.length; i++) {
        this.docarray[i + 1] = this.docarray[0]
      }
    },

    beforeTabSwitch(evt) {
      evt.preventDefault();
      // console.log("This is called before switchind tabs");
      return true;
    },

    onSubmit(evt) {
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
    },

    upload(data) {
      const url = process.env.SERV_URL+'uploaderendpoints?token='+this.token;;
      axios.put(url, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((resp) => {
        this.$toaster.success('RFP File Succesfully Submitted')
        this.afterupload(data.id);
      }).catch(err => {
        const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
        console.log(message);
      })
    },

    afterupload(id) {
      const url = process.env.AI_URL+'ai';
      axios.post(url, {
        "token": this.token,
        "template_ref_id": id,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((resp) => {
        this.$toaster.success('AI Process Started');
      }).catch(err => {
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
