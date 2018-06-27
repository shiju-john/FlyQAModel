<template>
  <div class="form-rfp">
    <div class="container" v-if="showsheet==='false'">
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="exampleInputGroup2" label="File Input" label-for="exampleInput2">
        <RfpUploader @sheetnames='sheetnames'></RfpUploader>
      </b-form-group>
      <b-form-group id="exampleInputGroup2" label="RFP Name" label-for="exampleInput2">
        <b-form-input id="exampleInput2" type="text" v-model="file_name" required placeholder="Enter RFP name">
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup3" label="Product Version" label-for="exampleInput3">
        <b-form-select id="exampleInput3" :options="foods" required v-model="selectedversion">
        </b-form-select>
      </b-form-group>
      <div style="margin-left: 50%;}">
        <b-button type="reset" variant="danger">Reset</b-button>
        <b-button type="submit" variant="primary">Next</b-button>
      </div>
    </b-form>
    </div>
   <SheetDetails v-if="showsheet==='true'" :index=0  :docarray="doc_arr"></SheetDetails>
  </div>
</template>

<script>
import RfpUploader from '../webcomponents/RfpUploader'
import SheetDetails from '../webcomponents/sheet-details'

export default {
   components: {RfpUploader,SheetDetails},
  data () {
    return {
      form: {
        name: '',
        food: null,
      },
      showsheet:'false',
      doc_arr:[],
      file_name:'',
      selectedversion:'Neon 3.5',
      foods: [{
          text: 'Neon 3.5',
          value: 'Neon 3.5'
        },
        {
          text: 'Neon 3.0',
          value: 'Neon 3.0'
        },
        {
          text: 'Neon 2.0',
          value: 'Neon 2.0'
        },
        {
          text: 'Neon 1.0',
          value: 'Neon 1.0'
        }
      ],
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      this.showsheet= 'true'

    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.name = '';
      this.form.food = null;
      this.file_name=''
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true });
    },
    sheetnames(sheets){
      
      console.log(sheets);

      for (var sheet in sheets[0].sheets){
        this.doc_arr.push(
           {
          headerIndex:'',
          sheetname:sheet,
          questionColumn:'',
          resetColumn:'',
          statusColumn:''
          }
        )
    }


  }
  }
}
</script>
<style>
.form-rfp{
    font-size: 17px;
    margin: 1%;
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

</style>