<template>
  <div class="SheetDetails">
    <div class="container">
      <form-wizard title='' subtitle='Fill the excel sheet template details' color="#e86824" @on-complete="onSubmit()">
        <tab-content v-for="doc in docarray" :title="doc.sheetname">
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
                <b-form-checkbox-group v-model="doc.skippable">
                  <b-form-checkbox value="true">Skippable</b-form-checkbox>
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
  props: ['docarray', 'index', 'productversion', 'rfpname','sheetarray'],

  data() {
    return {
      show: true,
      submit_flag: "false",
      indexs: this.index,
      resp_str: {
        file: '',
        rfp_name: '',
        product_version: '',
        sheets: []
      },
    }
  },

  methods: {
    onSubmit(evt) {
      this.resp_str.file = this.rfpname;
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
        if(this.docarray[i].skippable==""){
           sheet_obj.skippable="false"
        }else{
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
      const url = `http://192.168.127.17:3000`;
      axios.post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((resp) => {
        this.toast();
      }).catch(err => {
        const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
        console.log(message);
      })
    },

    toast() {
      var x = document.getElementById("snackbar");
      x.className = "show";
      setTimeout(function () {
        x.className = x.className.replace("show", "");
      }, 3000);
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

/* toast css */
#snackbar {
    visibility: hidden;
    min-width: 250px;
    margin-left: -125px;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    padding: 16px;
    position: fixed;
    z-index: 1;
    left: 50%;
    bottom: 30px;
    font-size: 17px;
}

#snackbar.show {
    visibility: visible;
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
    from {bottom: 0; opacity: 0;} 
    to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
    from {bottom: 30px; opacity: 1;} 
    to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
    from {bottom: 30px; opacity: 1;}
    to {bottom: 0; opacity: 0;}
}
</style>
