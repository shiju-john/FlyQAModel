
<template> 
  <div id='app'>
  
    <div class="wrapper" style="overflow:auto">
        <div class ='aside-left'>
          <div class="main">
            <div class="menubar"> 
                <ul id="example-1" class="container">
                    <li v-for="item in items" v-bind:style="{ backgroundImage: 'url(' + item.url + ')' }" v-on:click="onClick(item)">
                      <div class="chartHeading">
                            {{item.name}}
                      </div>
                    </li>
                </ul>
                <div>
                </div>
        
            </div>
            <div class="chartArea">               
                  <RFCChartView v-if="chartEnabled==='RFC'" :chartData='chartData'/> 
                  <ProductChartView v-if="chartEnabled==='PDT'" :productchartData='productchartData'/>   
                  <ModelDialog  :remarks='remarks' :question='question' :version='version'/>
                  <ReqSolution v-if="chartEnabled==='REQ'" :requestdata='requestdata'/>  
                  
 

            </div>
          </div> 
                
        </div>

        <div class ="right" >
          <div class = 'bottop'>
            <span class="label">Product Version</span>
            <select class="listBox" v-model="selected">
                <option v-for="option in options" v-bind:value="option.value">
                  {{ option.text }}
                 </option>
            </select>

          </div>
          <div class='MessageList'>
              <Message v-for='message in messages' :message='message' @remarkssent='onremarks'/>
              <MessageForm @messageSent='onMessageSent'/>
          </div>
        </div>      
        
      </div>

    </div>

</template>



<script>
import Vue from 'vue'
import Message from './components/Message'
import MessageForm from './components/MessageForm'
import RFCChartView from './components/RFCChartView'
import ProductChartView from './components/ProductChartView'
import ModelDialog from './components/ModelDialog'
import ReqSolution from './components/ReqSolution'
// import modal_test from './components/modal_test'

import axios from 'axios'


export default {
  components: {
    Message,
    MessageForm,
    RFCChartView,
    ProductChartView,
    ModelDialog,
    ReqSolution,
    // modal_test
    
  },
  data() {
    return {
      remarks: [],
      question:String,
      version:String,
      flag: 'none',
      requestdata:[],

      messages: [{
        author: 'bot',
        text: 'Let us discuss about Neon!',
        timestamp: new Date().toLocaleString()
      }],



      chartEnabled: '',
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
        url: '../static/img/pie1.jpeg',
        name: 'RFP Based',
        type: 'RFC'
      }, {
        url: '../static/img/bar.jpeg',
        name: 'Product Based',
        type: 'PDT'
      },
      {
        url: '../static/img/pending_req.png',
        name: 'Pending Solution',
        type: 'REQ'
      }
      
      ],


      chartData: {
        piedata: {
          title: '',
          type: '',
          data: ''
        },
        bardata: {
          title: '',
          type: '',
          data: ''
        }
      },

      productchartData: {
        piedata: {
          title: '',
          type: '',
          data: ''
        },
        bardata: {
          title: '',
          type: '',
          data: ''
        }
      }

    }
  },

  methods: {
    onMessageSent(message) {
      this.messages.push(message)
    },

    onremarks(message) {
      this.remarks = message.text.remarks;
      this.question=message.text.question,
      this.flag = 'block',
      this.version=this.selected;
      this.show();

      // console.log(message);
    },

    initRFCdata: function (value) {
      if (value === 'pie' || value === 'all') {
        this.chartData.piedata = {
          type: '',
          title: '',
          data: ''
        }
      }
      if (value === 'bar' || value === 'all') {
        this.chartData.bardata = {
          type: '',
          title: '',
          data: ''
        }

      }

    },

    initProductdata: function (value) {
      if (value === 'pie' || value === 'all') {
        this.productchartData.piedata = {
          type: '',
          title: '',
          data: ''
        }
      }
      if (value === 'bar' || value === 'all') {
        this.productchartData.bardata = {
          type: '',
          title: '',
          data: ''
        }

      }

    },
show () {
    this.$modal.show('ModelDialog');
  },
  hide () {
    this.$modal.hide('ModelDialog');
  },
    onClick(item) {
      // this.show();
      if (item.type === 'RFC') {
        this.chartEnabled = item.type;
        axios.post(process.env.API_URL + '/rfc_chart', {
          type: item.type,
          chartType: 'pie'
        }).then((resp) => {
          this.chartData.piedata.title = resp.data.title;
          this.chartData.piedata.type = resp.data.type;
          this.chartData.piedata.data = resp.data.data;
          this.initRFCdata('bar');

        }).catch(err => {
          const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
          alert(message);
        })
      }
      if (item.type === 'PDT') {
        this.chartEnabled = item.type;
        this.initRFCdata('all');
        axios.post(process.env.API_URL + '/product_chart', {
          type: item.type,
          chartType: 'bar'
        }).then((resp) => {
          this.productchartData.bardata.title = resp.data.title;
          this.productchartData.bardata.type = resp.data.type;
          this.productchartData.bardata.data = resp.data.data;
          this.initProductdata('pie');
          console.log(resp.data.data)
        }).catch(err => {
          const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
          alert(message);
        })
      }
      if(item.type==='REQ'){
        this.chartEnabled = item.type;
        axios.get(process.env.REM_URL +'&status=OPEN', {

        }).then((resp) => {
          this.requestdata=resp.data;
          // console.log(this.requestdata);
        }).catch(err => {
          const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
          alert(message);
        })
      }
    }

  },
  updated() {
    this.$el.querySelector('form').scrollIntoView()
  }

}
</script>

<style>
/*@import url('https://fonts.googleapis.com/css?family=Lato:100,300,700');*/

* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
.wrapper {
  position: relative;
  width: 100%;
  height: auto;
}
.aside-left {
  width:70%;
  float: left;
  height: auto;
}
.wrapper:after{
  content: "";
  display:block;
  clear: both;
}


.main {
  float:left;
  width:100%;
  padding:0 0px;
}
.right {
  /*background-color:#e5e5e5;*/
  float:right;
  width:30%;
  padding:1px;
  margin-top:1px;
  text-align:center;
  height: 99vh;
  overflow-y: scroll;

   border: 4px solid #e5e5e5;
   z-index: 1001;
  -moz-opacity: 0.8;
  opacity: .80;
  filter: alpha(opacity=80);

}
.wrapper .test {
    display: flex;
    position: absolute;
    left:0;
    bottom: 0;
    color:white;
}
.test > div {
    flex: 1;
}
h2 {
    color: white;
}

.bottop {
  /*background:white;*/
  padding:2px;
  text-align:left;
  height: 5vh;
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
  background-color: #252526;
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
  /*border-color: #93b1e2;*/
  padding:2px;
  text-align:left;
  height: 25%;
  margin-right:6px;
}
.chartArea{  
   width: 100%;
   height: 100%; 
}
.chart{
  width: 49.2%;
  height: 100%;
  display: inline-block;
  margin: 5px 1px;
  padding: 1px;
  border: 1px groove lightgrey;
   box-shadow: 2px 5px 1px 1px #85a6c6;
    /*/*background: #2db34a; */
    border-radius: 6px;
    transition-property: border-radius;
    transition-duration: .5s;
    transition-timing-function: linear;
}

.container {
  list-style: none;
}

.container li {
    /**//*float: left;*/
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
    /*/*background: #2db34a; */
    border-radius: 6px;
    transition-property: border-radius;
    transition-duration: .5s;
    transition-timing-function: linear;

}

ul li:hover {
 background: #555;
 background-size: 100% ;
 background-repeat: no-repeat;
 border-radius: 50%;

}
.container li:active{
      background-color: indianred;
      cursor:pointer;
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
.label{
  color: white;
  font-size: 10pt;
}

.listBox{
 float:right;
 width: 50%;
}
       
@media only screen and (max-width:620px) {
  /* For mobile phones: */
  .menu, .main, .right {
    width:100%;
  }
}

</style>

