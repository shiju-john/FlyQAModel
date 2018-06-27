<template>

  <div class="SheetDetails">
        <div class="container" style="font-size: 17px; margin-top: 4%;">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group label="Header Row Index:">
        <b-form-input type="text" v-model="form.headerIndex" required placeholder="Enter header row index">
        </b-form-input>
      </b-form-group>

      <b-form-group label="Question Column:">
        <b-form-input type="text" v-model="form.QuestionColumn" required placeholder="Enter question column">
        </b-form-input>
      </b-form-group>

      <b-form-group label="Remarks Column:">
        <b-form-input type="text" v-model="form.ResetColumn" required placeholder="Enter remarks column">
        </b-form-input>
      </b-form-group>

      <b-form-group label="Feature Status Column:">
        <b-form-input type="text" v-model="form.StatusColumn" required placeholder="Enter feature status column">
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
    data() {
        return {
          form: {
            headerIndex: '',
            QuestionColumn:'',
            ResetColumn:'',
            StatusColumn:''
          },
          show: true
        }
      },
      methods: {
        onSubmit(evt) {
          evt.preventDefault();
          alert(JSON.stringify(this.form));
        },
        onReset(evt) {
          evt.preventDefault();
          /* Reset our form values */
          this.form.headerIndex = '';
          this.form.QuestionColumn = '';
          this.form.ResetColumn = '';
          this.form.StatusColumn = '';
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
