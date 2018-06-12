<template>
  <div class='ProductChartView' >
   <!--  <div class = "chartnoborder" v-if="productchartData.bardata.type === ''">
    </div>
     <div  v-else>  -->
       <!--  <bar-chart :colors="['#ef9309', '#e55b5b']" :data="[{'name': 'shiju', data: [['Sun',32,20,22], ['Mon', 46,34,44], ['Tue', 28,56,76]]},
        {'name': 'arun', data: [['Sun',32,20,22], ['Mon', 46,34,44], ['Tue', 28,56,76]]}]" :stacked="true"></bar-chart> -->
        <div class='chart' v-if= "productchartData.piedata.type !== ''">
            <pie-chart   :title ="productchartData.piedata.title" :data="productchartData.piedata.data"  :library="pieevents"/>
        </div>
        <div class='chart'   v-if= "productchartData.bardata.type !== ''">
            <column-chart id ="product_pie_chart" :width= "'100%'"  :title ="productchartData.bardata.title" :data="productchartData.bardata.data" :library="barevents" /> 
        </div>     
     <!--  </div>  -->    
  </div>
</template>

<script>

import axios from 'axios'

export default {
 
  props :['productchartData','innerChart'],

  data () {

   return {  
    
      barevents :{  
            title: { fontColor: "white"},
            onClick : this.clickFunction    
          }
    }
  },
  methods: {

      clickFunction : function (event,data){        

        var newArray = this.$children.filter(function (el) {
          return el.id === 'product_pie_chart';
        });
        

        /*let element = newArray[0].chart.chart.getElementsAtEvent(event)[0];
        if (element instanceof Object ){
            axios.post(process.env.API_URL + '/rfc_chart', { label: element._model.label, chartType : 'bar' }).then((resp) => {
                console.log(resp.data ) 
                this.productchartData.bardata.title = resp.data.title;
                this.productchartData.bardata.type = resp.data.type;
                this.productchartData.bardata.data = resp.data.data;  

            }).catch(err => {
            const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
            alert("error");
           })
        }*/

      },      

    },
 
}
</script>

<style scoped>
.chart{
  width: 99%;
  height: 99%;
  display: inline-block;
  margin: 5px 1px;
  padding: 1px;
  border: 1px groove lightgrey;
}

.chartnoborder{
  width: 49%;
  height: 100%;
  display: inline-block;
  margin: 5px 1px;
  padding: 1px;
  
}
</style>
