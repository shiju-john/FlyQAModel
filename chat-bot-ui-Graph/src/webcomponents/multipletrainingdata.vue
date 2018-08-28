<template>
  <div class="multipleUploader">
    <div class="container">
      <div v-if="loader">
      <loading :active.sync="loader" :can-cancel="false" :is-full-page="true">
      </loading>
    </div>
      <!--UPLOAD-->
   
      <form enctype="multipart/form-data" style="margin-top: 30%;">  
      
          <div>File Input</div>
        <div class="dropbox">
         
          <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
            class="input-file">
          <p v-if="isInitial">
            Drag your Training data file here to begin
            <br> or click to browse
          </p>
          <p v-if="isSaving">
            Uploading {{ fileCount }} files...
          </p>
          <p v-if="isSuccess" >
            Uploaded {{ fileCount }} file(s) successfully.
          </p>
          <!--FAILED-->
          <div v-if="isFailed">
            <h2>Uploaded failed.</h2>
            <p>
              <a href="javascript:void(0)" @click="resetfile()">Try again</a>
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
    
import axios from 'axios';
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.min.css';

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;
export default {
    components: {
      Loading
  },
  props: ['token'],
  data() {
    return {
      uploadedFiles: [],
      sheetnames: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'trainingdata',
      loader: false,
    }
  },

  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },

  methods: {
    resetfile() {
      // resetfile form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },

    filesChange(fieldName, fileList) {
    this.currentStatus = STATUS_SAVING;
      this.$emit('fileobject', fileList);
      this.currentStatus = STATUS_SUCCESS;
    },
  },
  mounted() {
    this.resetfile();
  },
}
</script>

<style scoped>
 .dropbox {

    outline: 2px dashed grey;
    outline-offset: -10px;
    background: lightcyan;
   
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px;
    position: relative;
    cursor: pointer;
    box-shadow: 1px 2px 6px 0px grey;

  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }

.dropbox input[type=file] {
    z-index: 9;
}
</style>
