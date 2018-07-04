<template>
<div class="statusTracker">
  <div  v-if="status">
 <input type="text" id="myInput" v-on:keyup="myFunction()" placeholder="Search for names.." title="Type in a name">
  <table id="myTable">
    <tr class="header">
      <th>Name</th>
      <th>Product Version</th>
      <th>Uploaded User</th>
      <th>Uploaded Time</th>
      <th>Status</th>
      <th>Response</th>
    </tr>
    <tr v-for="data in statusdata">
      <td>{{data.name}}</td>
      <td>{{data.productVersion}}</td>
      <td>{{data.uploadedUser}}</td>
      <td>{{data.uploadedTime}}</td>
      <td>{{data.status}}</td>
      <td v-if="data.status=='completed'">
        <button class="btn btn-primary" :v-model="statusid=data.id" v-on:click="clik(data.id)">
          <i class="fa fa-reply"></i>
        </button>
        <td v-if="data.status=='uploaded'">
          <button disabled class="btn btn-primary" >
            <i class="fa fa-reply"></i>
          </button>
        </td>
    </tr>
  </table>
  </div>
 
  <answerSelect v-if="answer"></answerSelect>
</div>
</template>

<script>
import axios from 'axios';
import answerSelect from './answerSelect'
export default {

  components: {
    answerSelect
     },

  data() {
    return {
      statusdata: [],
      status:'',
      uploadedUser:'',
      uploadedTime:'',
      productVersion:'',
      completed:'',
      statusid:'',
      answer:false,
      status:true
    }
  },
  created: function () {
     this.getstatusdatas();
  },

  beforeDestroy() {
   },

  methods: {
    clik(a){
      // console.log(a)
      this.answer=true;
      this.status=false;
    },
    myFunction() {
      var input, filter, table, tr, td, i;
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      table = document.getElementById("myTable");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }       
      }
    },
    getstatusdatas() {
    //   axios.get(process.env.REM_URL + '&status=OPEN', {}).then((resp) => {
        this.statusdata = [
                {   
                    id:'stat-1',
                    name:'test_1',
                    status:'uploaded',
                    uploadedUser:'user_1',
                    uploadedTime:'10:30',
                    productVersion:'3.5',
                    completed:false
                }
                ,{
                    id:'stat-2',
                    name:'test_2',
                    status:'completed',
                    uploadedUser:'user_2',
                    uploadedTime:'3:30',
                    productVersion:'3.3',
                    completed:true
                    }
            
        ];

        // console.log(this.statusdata);
    //   }).catch(err => {
    //     const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
    //     alert(message);
    //   })
    },
  }
}

</script>

<style scoped>

* {
  box-sizing: border-box;
}

#myInput {
 
  background-position: 10px 10px;
  background-repeat: no-repeat;
  width: 100%;
  /* font-size: 16px; */
  padding: 12px 20px 12px 40px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
}
tr:nth-child(even) {
    background-color: #dddddd;
}

#myTable {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #ddd;
  box-shadow: 0px 0px 3px 0px grey;
  /* font-size: 18px; */
}

#myTable th, #myTable td {
  text-align: left;
  padding: 12px;
}

#myTable tr {
  border-bottom: 1px solid #ddd;
}

#myTable tr.header, #myTable tr:hover {
  background-color: #f1f1f1;
}
</style>

