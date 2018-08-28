
<template>
  <div id='app'>
    <div v-if="token" class="wrapper" style="overflow:auto;">
      <b-navbar toggleable="md" type="dark" variant="info" style="padding:0%">
        <div style="width:100%">
          <div style="float:left">
            <b-navbar-brand>
              <div class="company">
                <img style="width:143px;" src="../static/img/flytxt-logo-color.svg">
                <img :src="dp" onerror="this.src='../static/img/avatar.png'" style="cursor: pointer;" :title="name" class="avatar">
              </div>
              <i class="fa fa-home" style="font-size:22px; color:white; cursor:pointer; padding:10px;top: 9px;" v-on:click="home()" title="home">
              </i>
              <span v-if="chartEnabled!='landing'" style="font-size: small;font-weight: bold;
                top: 4px;">
                <i style="font-size:22px;top: 5px;    padding-right: 4px;" class="fa fa-angle-double-right"></i>{{cardtitle}}</span>
            </b-navbar-brand>
          </div>
          <div style="float:right;padding-right:8%;top:18px;">
            <!-- <i class="fas fa-bell  faa-ring animated" v-on:click="notify()" style="color:white;cursor:pointer;padding-right: 14px;font-size:22px;"
              title="Pending solutions">
              <b-badge variant="danger">{{msg}}</b-badge>
            </i> -->

            <!-- <i  class="fas fa-bell  faa-ring animated" v-on:click="notify()"  style="color:white;cursor:pointer;padding-right: 14px;font-size:22px;" title="Pending solutions">
              <b-badge variant="danger">{{msg}}</b-badge>
              </i> -->
            <select style="cursor: pointer;font-size: smaller;padding: 2px;width: 90px;border-radius: 4px;" title="select version" v-model="selectedversion">
              <option v-for="option of options">{{option}}</option>
            </select>
          </div>
        </div>
      </b-navbar>
      <div class="main">
        <quickMenu :menuUrlList="items" @process="onClick" />
        <landingpage v-if="chartEnabled==='landing'" :items='items' @onselect='onClick' class="landing"></landingpage>
        <b-card v-if="chartEnabled!='landing'">
          <statistics v-if="chartEnabled==='ST'" :token="token"></statistics>
          <ReqSolution v-if="chartEnabled==='REQ'" :children-request="letParentResponse" :token="token" @reqsent='onfeedback' />
          <formrfp v-if="chartEnabled==='RFPU'" :token="token" @finish="home" :version="options"></formrfp>
          <statusTracker v-if="chartEnabled==='RFPS'" :version="selectedversion" :token="token"></statusTracker>
          <!-- <multitrain v-if="chartEnabled==='PCM'"  :version="options" :token="token"></multitrain> -->
          <manualquestion v-if="chartEnabled==='ME'" :version="options" :token="token"></manualquestion>
        </b-card>
        <ModelDialog @submit="hide" :remarks='remarks' :token="token" :question='question' :version='version' />
      </div>
      <div>
        <chatbot :messages='messages' @messageSent='onMessageSent' :token="token" @remarkssent='onremarks' :version="selectedversion"></chatbot>
      </div>
    </div>
    <loginpage @login="loginsuccess" v-else></loginpage>
  </div>
</template>

<script>
  import Vue from 'vue'
  import ModelDialog from './webcomponents/ModelDialog'
  import ReqSolution from './webcomponents/ReqSolution'
  import quickMenu from './webcomponents/quickMenu'
  import chatbot from './webcomponents/chatbot'
  import landingpage from './webcomponents/landing-page'
  import statistics from './webcomponents/statistics'
  import RfpUploader from './webcomponents/RfpUploader'
  import formrfp from './webcomponents/form-rfp'
  import statusTracker from './webcomponents/statusTracker'
  import loginpage from './webcomponents/loginPage'
  // import multitrain from './webcomponents/manualProduct'
  import manualquestion from './webcomponents/manualQuestions'
  import axios from 'axios'
  
  export default {
    components: {
      ModelDialog,
      ReqSolution,
      quickMenu,
      chatbot,
      landingpage,
      statistics,
      RfpUploader,
      formrfp,
      statusTracker,
      loginpage,
      // multitrain,
      manualquestion
  
    },
    data() {
      return {
        msg: '',
        dp:String,
        name:String,
        remarks: [],
        question: String,
        token:'',
        version: String,
        flag: 'false',
        cardtitle: '',
        requestdata: [],
        feedbackdata: [],
        selectedversion: '',
        messages: [{
          author: 'bot',
          text: 'Let us discuss about Neon!',
          type: 'text',
          welcomemsg: 'true',
          timestamp: new Date().toLocaleString()
        }],
        chartEnabled: 'landing',
        options:[],
        items: [
           {
            url: 'https://storage.googleapis.com/complete-land-188108.appspot.com/vision/images/track.svg',
            name: ' RFP Status Tracker',
            type: 'RFPS',
            card: true,
            content: 'Know the Current Status of Uploaded RFP Files',
            icon: 'fa fa-map-signs',
          },
          {
            url: 'https://storage.googleapis.com/complete-land-188108.appspot.com/vision/images/pending.svg',
            name: 'Pending Solution',
            type: 'REQ',
            card: true,
            content: ' Solution Requirements with Pending Response.',
            icon: 'fa fa-hourglass-start',
          },
          {
            url: 'https://storage.googleapis.com/complete-land-188108.appspot.com/vision/images/upload.svg',
            name: ' RFP Uploader',
            type: 'RFPU',
            card: true,
            content: 'Upload an RFP File and Configure Templates',
            icon: 'fas fa-cloud-upload-alt',
          },
            {
            url: 'https://storage.googleapis.com/complete-land-188108.appspot.com/vision/images/manual.svg',
            name: 'Manual Entry',
            type: 'ME',
            card: true,
            content: 'Create/Update Training Data Manualy',
            icon: 'fas fa-edit',
          },
      
          {
            url: 'd',
            name: 'Sign-out',
            type: 'logout',
            card: false,
            content: 'd',
            icon: 'fa fa-power-off',
          },
          // {
          //   url: '../static/img/folder.svg',
          //   name: 'Multiple Training Data',
          //   type: 'PCM',
          //   card: true,
          //   content: 'Add multiple data files',
          //   icon: '',
          // },
      
           {
            url: 'https://storage.googleapis.com/complete-land-188108.appspot.com/vision/images/statistics.svg',
            name: 'Analytics',
            type: 'ST',
            card: true,
            content: 'Graphical representation of product compliance and solutions',
            icon: 'fas fa-chart-bar',
            submenu: [{
              url: '../static/img/rfp.svg',
              name: 'RFP Based',
              type: 'RFC',
              card: false,
              icon: 'fas fa-chart-bar',
            }, {
              url: '../static/img/tree.svg',
              name: 'Product Based',
              type: 'PDT',
              card: false,
              icon: 'fa fa-bar-chart',
            }]
          },
          
        ],
      }
    },
    
    mounted() {
     
      
     
      
    },
    methods: {
      notify(){
        this.chartEnabled = 'REQ';
        this.cardtitle="Pending Solution"
      },
      checkversion(){
         axios.get(process.env.AI_URL + "versions?status=OPEN&token=" + this.token, {}, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((resp) => {
        this.selectedversion = resp.data.product_versions[0]
        this.options = resp.data.product_versions;

      }).catch(err => {
        const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
      })
      },

    reqsolution() {
      axios.get(process.env.SERV_URL + 'visionendpoints?token=' + this.token + '&status=OPEN', {}
      ).then((resp) => {
       this.msg=resp.data.length;
      }).catch(err => {
        const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
      })
    },

      letParentResponse(request){
      this.msg = request;
    },
      logout(){
        this.token='';
      },

      loginsuccess(obj){
        this.token=obj.token;
        this.dp=obj.dp;
        this.name=obj.username;
        this.checkversion();
        this.reqsolution();
      },
      home() {
        this.chartEnabled = 'landing';
        this.cardtitle=''
        this.reqsolution();
      },
  
      onMessageSent(message) {
        this.messages.push(message)
      },
  
      onremarks(message) {
        this.remarks = message.text;
        this.question = message.text.question,
        this.flag = 'block',
        this.version = this.selectedversion;
        this.show();
      },
  
      onfeedback(data) {
        this.feedbackdata = data.reqdata;
        this.$modal.show('Feedback');
      },
  
      show() {
        this.$modal.show('ModelDialog');
      },
      hide() {
        this.$modal.hide('ModelDialog');
        this.$modal.hide('Feedback');
      },
      onClick(item) {
        this.flag = "true"
        this.cardtitle = item.name
        this.chartEnabled = item.type;
        this.showsheet = ''
  
        if (item.type === 'REQ') { 
          this.chartEnabled = item.type;
        }
  
        if (item.type === 'logout') {
          this.chartEnabled = 'landing';
          this.token='';
        }
      }
    }
  }
</script>

<style>
  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
  }
  
  .wrapper {
    width: 100%;
    background-color: white;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  
  .aside-left {
    width: 70%;
    float: left;
    height: auto;
  }
  
  .wrapper:after {
    content: "";
    display: block;
    clear: both;
  }
  
  .main {
    float: left;
    width: 100%;
    padding: 0 0px;
  }
  
  .main .card-body {
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 1.25rem;
  }
  
  .card-body {
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 0rem!important;
  }
  
  .wrapper .right {
    z-index: 998;
    -moz-opacity: 0.8;
    opacity: 1.8;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  
  .wrapper .test {
    display: flex;
    position: absolute;
    left: 0;
    bottom: 0;
    color: white;
  }
  
  .test>div {
    flex: 1;
  }
  
  #app {
    background-color: #1E1E1E;
    min-height: 100vh;
  }
  
  .MessageList {
    float: right;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 5px;
    margin: 0px auto;
    min-height: 92vh;
  }
  
  .leftClass {
    float: left;
    padding: 10px;
    margin: 0px auto;
    min-height: 90vh;
  }
  
  .menubar {
    margin-top: 3px;
    border: 1px groove lightgrey;
    padding: 2px;
    text-align: left;
    height: 25%;
    margin-right: 6px;
  }
  
  .chartArea {
    width: 100%;
    height: 100%;
  }
  
  .chart {
    width: 100%;
    height: 100%;
    display: inline-block;
    margin: 5px 1px;
    padding: 1px;
    border-radius: 6px;
    transition-property: border-radius;
    transition-duration: .5s;
    transition-timing-function: linear;
  }
  
  .listBox {
    float: right;
    width: 50%;
  }

  .landing{
    margin-left: 13%;
    margin-top: 3%;
  }
  
  @media only screen and (max-width:620px) {
    /* For mobile phones: */
    .menu,
    .main,
    .right {
      width: 100%;
    }
    .logo {
      width: 51%;
    }
  }
  
  .card {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 0px solid rgba(0, 0, 0, 0.125)!important;
    border-radius: 0.25rem;
  }
  
  .card-header {
    /* padding: 0.75rem 6.25rem!important; */
    margin-bottom: 0;
    background-color: rgba(0, 0, 0, 0)!important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  }
  
  .card-deck {
    -ms-flex-flow: row wrap;
    flex-flow: row wrap;
    margin-right: 0px!important;
    margin-left: -15px;
  }
  
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #17a2b8;
    color: white;
    text-align: center;
    height: 4%;
  }
  
  .navbar {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    box-shadow: 1px 2px 5px grey!important;
  }
  
  .navbar-nav {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: initial;
    margin-bottom: 0;
    list-style: none;
  }
  
  .form-inline {
    display: -ms-flexbox;
    -ms-flex-flow: row wrap;
    flex-flow: row wrap;
    -ms-flex-align: center;
    align-items: end;
  }
  
  .ml-auto,
  .mx-auto {
    margin-left: 60%!important;
  }

  .navbar-brand {
    display: inline-block;
    padding-top: 0rem!important;
    padding-bottom: 0rem!important;
    margin-right: 0rem!important;
    font-size: 0rem!important;
    line-height: inherit;
    white-space: nowrap;
}
.nav-pills .nav-link.active{
    color: #fff;
    background-color: #858585!important;
}


.btn-success {
    color: #fff;
    background-color: #17a2b8!important;
    border-color: #17a2b8!important;
}

.btn-success:hover {
    color: #fff;
    background-color: #04899e!important;
    border-color: #04899e!important;
}

.avatar {
    vertical-align: middle;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    left: -19px;
}

.avatar:hover {
    -ms-transform: scale(1.1); /* IE 9 */
    -webkit-transform: scale(1.1); /* Safari 3-8 */
    transform: scale(1.02); 
}
.company{
      /* background-color: rgba(255,255,255,0.88); */

    display: inline-block;
    overflow: hidden;
    padding: 0;
    vertical-align: middle;
    /* border: 1px solid #dadce0; */
    outline: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-border-radius: 8px;
    border-radius: 8px;
    /* box-shadow: 0px 0px 1px 0px #0f434b;  */
}

.badge {
    padding: 0.25em 0.4em;
    font-size: 52%!important;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    bottom: 13px;
    border-radius: 0.25rem;
}

</style>

