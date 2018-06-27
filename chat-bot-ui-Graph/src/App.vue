
<template>
  <div id='app'>
    <div class="wrapper" style="overflow:auto">
      <b-navbar toggleable="md" type="dark" variant="info">
        <b-navbar-brand>
          <img style="width:50%;     margin-left: 16%;" src="../static/img/flytxt-logo-color.svg">
        </b-navbar-brand>
         <b-navbar-nav class="ml-auto">
          <i class="fa fa-home" style="font-size:28px; color:white; cursor:pointer; padding:10px;" v-on:click="home()" title="home"></i>
              <select style=" cursor:pointer;padding:5px; height: 10%;margin-top: 7%;" title="select version" v-model="selectedversion">
          <option  v-for="option of options">{{option.text}}</option>
        </select>
          <i class="fa fa-power-off" style="font-size:26px; color:white; cursor:pointer;padding:12px;" title="sign-out"></i>
          </b-navbar-nav>
      </b-navbar>
      <div class="main">
        <quickMenu :menuUrlList="items"  @process="onClick" />
          <landingpage v-if="chartEnabled==='landing'" :items='items' @onselect='onClick' class="landing"></landingpage>
          <b-card :header="cardtitle" v-if="chartEnabled!='landing'" > 
          <statistics v-if="chartEnabled==='ST'"></statistics>
          <ReqSolution v-if="chartEnabled==='REQ'" :requestdata='requestdata' @reqsent='onfeedback' />
          <formrfp  v-if="chartEnabled==='RFPU'"></formrfp>
         
        </b-card>
         <ModelDialog :remarks='remarks' :question='question' :version='version' />
      </div>
      <div class="footer">
        <chatbot :messages='messages' @messageSent='onMessageSent' @remarkssent='onremarks'></chatbot>
      </div>
    </div>
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
    formrfp 
 
  },
  data() {
    return {
      remarks: [],
      question: String,
      version: String,
      flag: 'false',
      cardtitle: '',
      requestdata: [],
      feedbackdata: [],
      selectedversion:'Neon 3.5',
      messages: [{
        author: 'bot',
        text: 'Let us discuss about Neon!',
        type: 'text',
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
          url: '../static/img/statistics.svg',
          name: 'Analytics',
          type: 'ST',
          card: true,
          content:'Graphical representation of product compliance and solutions',
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
          url: '../static/img/pending.svg',
          name: 'Pending Solution',
          type: 'REQ',
          card: true,
          content:' Solution requirements with pending response.',
          icon: 'fa fa-hourglass-start',
        },
        {
          url: '../static/img/upload.svg',
          name: ' RFP Uploader',
          type: 'RFPU',
          card: true,
          content:'Upload a RFP File',
          icon: 'fa fa-cloud-upload',
        },
        {
          url: '../static/img/track.svg',
          name: ' RFP Status Tracker',
          type: 'RFPS',
          card: true,
          content:'Know the current status',
          icon: 'fa fa-map-signs',
        },
      ],
    }
  },

  methods: {
    home() {
      this.chartEnabled = 'landing'
    },

    onMessageSent(message) {
      this.messages.push(message)
    },

    onremarks(message) {
      this.remarks = message.text.remarks;
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
      this.showsheet=''

      if (item.type === 'REQ') {

        this.chartEnabled = item.type;
        axios.get(process.env.REM_URL + '&status=OPEN', {

        }).then((resp) => {
          this.requestdata = resp.data;
        }).catch(err => {
          const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
          alert(message);
        })
      }

        if (item.type === 'RFPU') {
        this.chartEnabled = item.type;
      }
    }

  },
  updated() {
    this.$el.querySelector('form').scrollIntoView()
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

h2 {
  color: white;
}

.bottop {
  padding: 2px;
  text-align: left;
  height: 5vh;
  background-color: #f82363;
}

#app {
  font-family: 'Lato', sans-serif;
  font-weight: 300;
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

.container {
  list-style: none;
}

.container li {
  display: inline-block;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 25px;
  width: 100px;
  height: 100px;
  background-size: 90%;
  background-repeat: no-repeat;
  margin-bottom: 20px;
  position: relative;
  box-shadow: 2px 5px #06422a;
  border-radius: 6px;
  transition-property: border-radius;
  transition-duration: .5s;
  transition-timing-function: linear;
}

ul li:hover {
  background: #555;
  background-size: 100%;
  background-repeat: no-repeat;
  border-radius: 50%;
}

.container li:active {
  background-color: indianred;
  cursor: pointer;
}

.container li .chartHeading {
  position: absolute;
  bottom: -25px;
  left: 0;
  line-height: 20px;
  font-size: 13px;
  color: white;
  margin-left: 10px;
}

.container::after {
  content: "";
  display: table;
  clear: both;
}

.label {
  color: white;
  font-size: 10pt;
}

.listBox {
  float: right;
  width: 50%;
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

.footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #17a2b8;
    color: white;
    text-align: center;
    height: 5%;
    
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

    .form-inline {
    display: -ms-flexbox;
    /* display: flex; */
    -ms-flex-flow: row wrap;
    flex-flow: row wrap;
    -ms-flex-align: center;
    align-items: end;
    /* margin-left: 54%!important; */
}

.landing{
    margin:.1%;
        margin-left: 10%;
}
</style>

