<script>
  // Import the base chart
  import {Bar} from 'vue-chartjs'

  // Extend it
  export default{
  	extends : Bar,
    props: ['chartdata', 'options'],
    mounted () {
      this.renderChart(this.chartdata, this.options)
    }
  }
</script>