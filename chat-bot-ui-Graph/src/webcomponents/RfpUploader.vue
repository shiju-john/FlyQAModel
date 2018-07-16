<template>
  <div class="RfpUploader">
    <div class="container">
      <!--UPLOAD-->
      <form enctype="multipart/form-data">  
        <div class="dropbox">
          <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
            class="input-file">
          <p v-if="isInitial">
            Drag your RFP file here to begin
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
              <a href="javascript:void(0)" @click="reset()">Try again</a>
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
    
import axios from 'axios'
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;
export default {
  props: ['token'],
  data() {
    return {
      uploadedFiles: [],
      sheetnames: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'rfpfile'
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
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    save(formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING;
      this.upload(formData)
    },

    upload(data) {
      // const url = `http://192.168.127.17:8080/fileupload`;
      const url =process.env.SERV_URL+'uploaderendpoints?token='+this.token;
      // const url='http://192.168.127.76:8000';

      axios.post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((resp) => {
        this.$emit('sheetnames', resp.data)
        this.currentStatus = STATUS_SUCCESS;
      }).catch(err => {
        const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
        console.log(message);
      })
    },

    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();

      if (!fileList.length) return;
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          formData.append('filetoupload', fileList[x], fileList[x].name);
        });
      // save it
      this.save(formData);
    }
  },
  mounted() {
    this.reset();
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
