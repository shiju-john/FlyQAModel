<template>
  <BarChart v-if="chartData" :chart-data="chartData"/>
</template>
<script>
  import BarChart from './BarChart'
  
  export default {
    name: 'BarChartView',
    props:['chartData'],
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components: {BarChart}

  };
</script>