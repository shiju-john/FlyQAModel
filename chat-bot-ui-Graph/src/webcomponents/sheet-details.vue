<template>

  <div class="SheetDetails">
        <div class="container" style="font-size: 17px; margin-top: 4%;">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group label="Header Row Index:">
        <b-form-input type="text" v-model="docarray[indexs].headerIndex" required placeholder="Enter header row index">
        </b-form-input>
      </b-form-group>

      <b-form-group label="Question Column:">
        <b-form-input type="text" v-model="docarray[indexs].questionColumn" required placeholder="Enter question column">
        </b-form-input>
      </b-form-group>

      <b-form-group label="Remarks/Response Column:">
        <b-form-input type="text" v-model="docarray[indexs].resetColumn" required placeholder="Enter remarks column">
        </b-form-input>
      </b-form-group>

      <b-form-group label="Feature Status Column:">
        <b-form-input type="text" v-model="docarray[indexs].statusColumn" required placeholder="Enter feature status column">
        </b-form-input>
      </b-form-group>

      <b-form-group label="Document Reference:">
        <b-form-input type="text" v-model="docarray[indexs].documentReference" required placeholder="Enter document reference">
        </b-form-input>
      </b-form-group>

      <b-button type="reset" variant="danger">Previous</b-button>
      <b-button type="submit" variant="primary">Next</b-button>

    </b-form>
  </div>
  </div>
</template>

<script>
export default {
  props: ['docarray', 'index', 'productversion'],

  data() {
    return {
      show: true,
      indexs: this.index,
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if (this.docarray.length > this.indexs + 1) {
        this.indexs = this.indexs + 1;
      } else {
        console.log('submit all data')
      }
    },

    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      if (this.indexs > 0) {
        this.indexs = this.indexs - 1;
      } else {
        this.display = "false";
      }
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true
      });
    }
  }
}
</script>

<style scoped>

</style>
