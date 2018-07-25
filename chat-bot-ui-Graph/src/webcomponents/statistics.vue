<template>
  <div class="statistics">
    <div class="tab">
      <button id ="bt1" class="tablinks active" v-on:click="openChart($event,'RFP')" >RFP Based</button>
      <button class="tablinks" v-on:click="openChart($event,'PDT')">Product Based</button>
    </div>
    <div id="RFP" class="tabcontent">
      <RFCChartView :chartData='chartData' />
    </div>
    <div id="PDT" class="tabcontent">
      <ProductChartView :productchartData='productchartData' />
    </div>
  </div>
</template>

<script>
import RFCChartView from '../webcomponents/RFCChartView'
import ProductChartView from '../webcomponents/ProductChartView'
import axios from 'axios'

export default {
  components: {
    RFCChartView,
    ProductChartView,
  },
  mounted() {
    this.openChart('', 'RFP');
  },

  data() {
    return {
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
      },

    }
  },
  methods: {
    openChart(e,cityName) {

      if (cityName === 'RFP') {
        axios.post(process.env.API_URL + '/rfc_chart', {
          type: cityName,
          chartType: 'pie'
        }).then((resp) => {
          this.chartData.piedata.title = resp.data.title;
          this.chartData.piedata.type = resp.data.type;
          this.chartData.piedata.data = resp.data.data;
        }).catch(err => {
          const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
          // alert(message);
          this.$toaster.error('This service willbe activated soon')
        })
      } else if (cityName === 'PDT') {
        axios.post(process.env.API_URL + '/product_chart', {
          type: cityName,
          chartType: 'bar'
        }).then((resp) => {
          this.productchartData.bardata.title = resp.data.title;
          this.productchartData.bardata.type = resp.data.type;
          this.productchartData.bardata.data = resp.data.data;
        }).catch(err => {
          const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
          // alert(message);
          this.$toaster.error('This service willbe activated soon')
        })
      }

      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(cityName).style.display = "block";
      if(e!=''){
         e.currentTarget.className += " active";
      }else{
        document.getElementById('bt1').className += " active";
      }
    }

  }
}
</script>

<style scoped>

/* Style the tab */
.tab {
    overflow: hidden;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
}

/* Style the buttons inside the tab */
.tab button {
    background-color: inherit;
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    transition: 0.3s;
    font-size: 17px;
}

/* Change background color of buttons on hover */
.tab button:hover {
    background-color: #ddd;
}

/* Create an active/current tablink class */
.tab button.active {
    background-color: #ccc;
}

/* Style the tab content */
.tabcontent {
    display: none;
    padding: 6px 12px;
    border: 1px solid #ccc;
    border-top: none;
}
</style>
