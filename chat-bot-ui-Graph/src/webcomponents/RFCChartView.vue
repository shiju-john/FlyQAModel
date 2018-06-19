<template>
  <div class='RFCChartView' >
   <!--  <div class = "chartnoborder" v-if="chartData.piedata.type === ''">
    </div>
     <div  v-else>  -->
       <!--  <bar-chart :colors="['#ef9309', '#e55b5b']" :data="[{'name': 'shiju', data: [['Sun',32,20,22], ['Mon', 46,34,44], ['Tue', 28,56,76]]},
        {'name': 'arun', data: [['Sun',32,20,22], ['Mon', 46,34,44], ['Tue', 28,56,76]]}]" :stacked="true"></bar-chart> -->
        <div class='chart' v-if= "chartData.piedata.type !== ''">
            <pie-chart id ="rfc_pie_chart"  :title ="chartData.piedata.title" :data="chartData.piedata.data"  :library="pieevents"/>
        </div>
        <div class='chart' v-if= "chartData.bardata.type !== ''">
            <bar-chart :colors= "['#ff9900']" :title ="chartData.bardata.title" :data="chartData.bardata.data" :library="barptions"/> 
        </div>     
     <!--  </div>   -->   
  </div>
</template>

<script>

import axios from 'axios'

export default {
 
  props :['chartData','innerChart'],

  data () {
     return {       
        pieevents :{  
              title: { fontColor: "white"},
              onClick : this.clickFunction    
        },

         barptions :{  
              title: { fontColor: "white"}                
        },

      }
  },
  methods: {

      clickFunction : function (event,data){        

        var newArray = this.$children.filter(function (el) {
          return el.id === 'rfc_pie_chart';
        });
        let element = newArray[0].chart.chart.getElementsAtEvent(event)[0];

        if (element instanceof Object ){
            axios.post(process.env.API_URL + '/rfc_chart', { label:element._model.label, chartType : 'bar' }).then((resp) => {            
                this.chartData.bardata.title = resp.data.title;
                this.chartData.bardata.type = resp.data.type;
                this.chartData.bardata.data = resp.data.data; 
            }).catch(err => {
                const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
                alert(message);
          })
        }
        },      

    },
 
}
</script>

<style scoped>


.chartnoborder{
  width: 49%;
  height: 100%;
  display: inline-block;
  margin: 5px 1px;
  padding: 1px;
  
}
</style>
