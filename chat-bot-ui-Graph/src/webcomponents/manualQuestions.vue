<template>
  <div class="manualQuestions">
    <div class="flex-container">
      <div style="width:48%" v-if="manual">
        <table-component caption="heading" :data="productversion" style="font-size: 13px; height: 515px; overflow: hidden;">
          <table-column show="productname" label="product name"></table-column>
          <table-column show="version" label="product Version"></table-column>
          <table-column :sortable="false" :filterable="false">
            <template slot-scope="row">
              <button style="margin-left:50px;" class="btn btn-primary" title="Add Questions" v-on:click="addquestion()">
                <i class="fas fa-plus"></i>
              </button>
              <button class="btn btn-primary" title="Update Questions">
                <i class="fas fa-pen"></i>
              </button>
            </template>
          </table-column>
        </table-component>
      </div>

      <div style="width:46%">

        <!-- adding new product version -->
        <div style="margin-top:4%;margin-left:11%;" v-if="manual">
          <!-- <b-form @submit="onSubmit" @reset="onReset"> -->

            <b-form-group label="Product Name">
              <b-form-input type="text" v-model="name" required placeholder="Enter Product Name">
              </b-form-input>
            </b-form-group>

            <b-form-group label="Product Version">
              <b-form-input type="text" v-model="prod_version" required placeholder="Enter Product Version">
              </b-form-input>
            </b-form-group>

            <b-form-group label="Parent Product:">
              <select v-model="selected" class="select">
                <option disabled value="">Please select one</option>
                <option v-for="option in productversion"> {{ option.productname }}</option>
              </select>
            </b-form-group>

            <b-form-group label="Status:">
              <select v-model="selectedstatus" class="select">
                <option disabled value="">Please select one</option>
                <option v-for="option in productstatus"> {{ option.text }}</option>
              </select>
            </b-form-group>

            <b-form-checkbox-group v-model="inherit">
              <b-form-checkbox value="yes">Inherit from Parent Product</b-form-checkbox>
            </b-form-checkbox-group>
          <!-- </b-form> -->

          <div style="margin-top:3%;margin-left: 63%;">
            <b-button type="reset" variant="danger" v-on:click="reset()">Reset</b-button>
            <b-button type="submit" variant="primary" v-on:click="addproduct()">Add New Version</b-button>
          </div>
        </div>
        <!-- adding new product version end-->
      </div>
    </div>

    <!-- add question component starts -->
    <b-form @submit="onSubmit" @reset="onReset" v-if="add">
      <div class="outer">
        <div>
          <b-form-group label="Product Version">
            <b-form-input type="text" v-model="version" disabled required placeholder="Enter Product Version">
            </b-form-input>
          </b-form-group>
          <b-form-group label="Question">
            <b-form-textarea type="text" v-model="question" required placeholder="Enter Question">
            </b-form-textarea>
          </b-form-group>

          <b-form-group label="Answer">
            <b-form-textarea type="text" v-model="answer" required placeholder="Enter Answer">
            </b-form-textarea>
          </b-form-group>

          <b-form-group label="Feature Status:">
            <b-form-select id="exampleInput3" :options="featurestatus" required v-model="featurestatus">
            </b-form-select>
          </b-form-group>

          <b-form-group label="Document Reference">
            <b-form-input type="text" v-model="document" required placeholder="Enter Document">
            </b-form-input>
          </b-form-group>

          <div style="margin-left: 77%;}">
            <b-button type="reset" variant="danger">Reset</b-button>
            <b-button type="submit" variant="primary">Submit</b-button>
          </div>
        </div>
      </div>
    </b-form>
    <!--add question component ends-->
  </div>
</template>

<script>
import axios from 'axios';

export default {

  props: ['version', 'token'],

  components: {

  },

  data() {
    return {
      selected: '',
      question: '',
      answer: '',
      name: '',
      prod_version: '',
      inherit: '',
      selectedstatus: '',

      document: '',
      productversion: [

        {
          productname: 'neon_a',
          version: '1'
        },
        {
          productname: 'neon_b',
          version: '2'
        },
      ],

      productstatus: [{
          text: 'Released'
        },
        {
          text: 'Archive'
        },
        {
          text: 'Draft'
        }
      ],

      feature: '',
      add: false,
      manual: true
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.add = false;
      this.manual = !this.add
    },
    onReset(evt) {
      evt.preventDefault();
      this.selectedversion = '',
        this.question = '',
        this.answer = '',
        this.feature = '',
        this.document = ''

    },
    reset() {
      this.prod_version = '',
        this.name = ''
      this.selected = '',
        this.productstatus = '',
        this.inherit = ''

    },
    addquestion() {
      this.add = true;
      this.manual = !this.add
    },
    addproduct(){
      var obj={};
      obj.productname=this.name;
      obj.version=this.prod_version
      this.productversion.push(obj);
      this.reset();
    }
  }
}
</script>

<style scoped>

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


.outer {
  display: flex;
  width: 100%;
  box-shadow: 0px 0px 0px 0px grey;
  border-radius: 0px;
  margin-top: 1%;
}

.outer>div {
    margin: 0px;
    padding: 1%;
    margin-top: 1%;
    width: 47%;
    margin-left: 26%;
}

textarea {
    overflow: auto;
    height: 112px;
    resize: none;
}

.table-component__table th, .table-component__table td {
    padding: .75em .75em;
    vertical-align: top;
    text-align: center!important;
    border-top: 1px solid #d6d3d2;
}

.select {
    display: inline-block;
    width: 100%;
    height: calc(2.25rem + 2px);
    padding: 0.375rem 1.75rem 0.375rem 0.75rem;
    line-height: 1.5;
    color: #495057;
    vertical-align: middle;
    background-size: 8px 10px;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    font-size: 17px;
}



</style>