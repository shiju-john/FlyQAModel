<template>
  <div class="form-rfp">
    <div class="container" v-if="showsheet==='false'">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <div class="flex-container">
          <div>
            <b-form-group label="File Input">
              <RfpUploader @sheetnames='sheetnames' :token="token"></RfpUploader>
            </b-form-group>
          </div>
          <div>
            <div style="margin-top: 9%;">
              <b-form-group label="RFP Name">
                <b-form-input type="text" v-model="file_name" required placeholder="Enter RFP name">
                </b-form-input>
              </b-form-group>
              <b-form-group label="Product Version">
                <b-form-select :options="version" required v-model="selectedversion">
                </b-form-select>
              </b-form-group>
              <div style="text-align: right;">
                <b-button type="reset" variant="danger">Reset</b-button>
                <b-button type="submit" variant="primary">Next</b-button>
              </div>
            </div>
          </div>
        </div>
      </b-form>
    </div>
    <SheetDetails @finish="finish" v-if="showsheet==='true'"  :token="token" :file_path="file_path" :file_id="file_id" :index=0 :rfpname="file_name" :docarray="doc_arr" :sheetarray="sheetarray" :productversion="selectedversion"></SheetDetails>
  </div>
</template>

<script>

import RfpUploader from '../webcomponents/RfpUploader'
import SheetDetails from '../webcomponents/sheet-details'

export default {
  props: ['token','version'],
  components: {
    RfpUploader,
    SheetDetails
  },
  data() {
    return {
      form: {
        name: '',
        food: null,
      },
      showsheet: 'false',
      doc_arr: [],
      sheetarray:[],
      file_name: '',
      file_id:'',
      file_path:'',
      selectedversion: this.version[0],
      show: true,
      
    }
  },
  methods: {
    finish(){
      this.$emit('finish', {
        })
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.showsheet = 'true'

    },
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.name = '';
      this.form.food = null;
      this.file_name = ''
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true
      });
    },
    sheetnames(sheets) {
      this.sheetarray=sheets.sheets
      this.file_id=sheets.id;
      this.file_name=sheets.name;
      this.file_path=sheets.filename;
      for (var sheet in sheets.sheets) {
        this.doc_arr.push({
          headerIndex: '',
          sheetname:  sheets.sheets[sheet],
          questionColumn: '',
          remarks: '',
          statusColumn: '',
          documentReference:'',
          skippable:''
        })

      }

    }
  }
}
</script>
<style>
.form-rfp{
    /* font-size: 17px; */
    /* margin: 1%; */
}

.form-control {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 12px;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.flex-container {
  display: flex;
  width: 100%;
  box-shadow: 0px 0px 6px 0px grey;
  border-radius: 16px;
  margin-top: 4%;
}

.flex-container>div {
  margin: -1px;
  padding: 1%;
  /* font-size: 20px; */
  /* width: 31%; */
  margin-top: 1%;
  width: 47%;
}
</style>