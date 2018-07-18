
<template>
  <div id='app'>
    <div v-if="token" class="wrapper" style="overflow:auto;">
      <b-navbar toggleable="md" type="dark" variant="info" style="padding:0%">
        <div style="width:100%">
          <div style="float:left">
            <b-navbar-brand>
              <img style="width:143px;" src="../static/img/flytxt-logo-color.svg">
              <i class="fa fa-home" style="font-size:28px; color:white; cursor:pointer; padding:10px;top: 9px;left: -24px;" v-on:click="home()" title="home"></i>
              <span v-if="chartEnabled!='landing'"  style="font-size: small;left: -21px;font-weight: bold;
                top: 4px;"><i style="font-size:28px;top: 5px;    padding-right: 4px;" class="fa fa-angle-double-right"></i>{{cardtitle}}</span>            </b-navbar-brand>
          </div>
          <div style="float:right;;padding-right:8%;top:21px;">
            <select style="cursor: pointer;font-size: smaller;" title="select version" v-model="selectedversion">
                <option v-for="option of options">{{option.text}}</option>
              </select>
          </div>
        </div>
      </b-navbar>
      <div class="main">
        <quickMenu :menuUrlList="items" @process="onClick" />
        <landingpage v-if="chartEnabled==='landing'" :items='items' @onselect='onClick' class="landing"></landingpage>
        <b-card  v-if="chartEnabled!='landing'">
          <statistics v-if="chartEnabled==='ST'" :token="token"></statistics>
          <ReqSolution v-if="chartEnabled==='REQ'" :requestdata='requestdata' :token="token" @reqsent='onfeedback' />
          <formrfp v-if="chartEnabled==='RFPU'" :token="token" @finish="home"></formrfp>
          <statusTracker v-if="chartEnabled==='RFPS'"  :version="selectedversion" :token="token"></statusTracker>
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
      loginpage
  
    },
    data() {
      return {
        remarks: [],
        question: String,
        token:'',
        version: String,
        flag: 'false',
        cardtitle: '',
        requestdata: [],
        feedbackdata: [],
        selectedversion: 'Neon 3.5',
        messages: [{
          author: 'bot',
          text: 'Let us discuss about Neon!',
          type: 'text',
          welcomemsg: 'true',
          timestamp: new Date().toLocaleString()
        }],
        chartEnabled: 'landing',
        selected: 'Neon 3.5',
        options: [{
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
        items: [{
            url: 'https://storage.googleapis.com/complete-land-188108.appspot.com/vision/images/statistics.svg',
            name: 'Analytics',
            type: 'ST',
            card: true,
            content: 'Graphical representation of product compliance and solutions',
            icon: 'fa fa-bar-chart',
            submenu: [{
              url: '../static/img/rfp.svg',
              name: 'RFP Based',
              type: 'RFC',
              card: false,
              icon: 'fa fa-bar-chart',
            }, {
              url: '../static/img/tree.svg',
              name: 'Product Based',
              type: 'PDT',
              card: false,
              icon: 'fa fa-bar-chart',
            }]
          },
          {
            url: 'https://storage.googleapis.com/complete-land-188108.appspot.com/vision/images/pending.svg',
            name: 'Pending Solution',
            type: 'REQ',
            card: true,
            content: ' Solution requirements with pending response.',
            icon: 'fa fa-hourglass-start',
          },
          {
            url: 'https://storage.googleapis.com/complete-land-188108.appspot.com/vision/images/upload.svg',
            name: ' RFP Uploader',
            type: 'RFPU',
            card: true,
            content: 'Upload a RFP File',
            icon: 'fa fa-cloud-upload',
          },
          {
            url: 'https://storage.googleapis.com/complete-land-188108.appspot.com/vision/images/track.svg',
            name: ' RFP Status Tracker',
            type: 'RFPS',
            card: true,
            content: 'Know the current status',
            icon: 'fa fa-map-signs',
          },
      
          {
            url: 'd',
            name: '',
            type: 'logout',
            card: false,
            content: 'd',
            icon: 'fa fa-power-off',
          },
          
        ],
      }
    },
  
    methods: {
      logout(){
        this.token='';
      },

      loginsuccess(token){
        this.token=token;
      },
      home() {
        this.chartEnabled = 'landing';
        this.cardtitle=''
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
                      console.log(process.env.SERV_URL + 'visionendpoints?token='+this.token+'&status=OPEN')
          var token=this.token;
          console.log(token);
          axios.get(process.env.SERV_URL + "visionendpoints?status=OPEN&token="+token, {
          },
          {
        headers: {
          'Content-Type': 'application/json'
        }}
          ).then((resp) => {
            this.requestdata = resp.data;
          }).catch(err => {
            const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
          })
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
</style>

