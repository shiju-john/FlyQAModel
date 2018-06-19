<template>
<modal name="Feedback"  :width="900"
         :height="180">
    <div  class="replytab">
       <!-- <span class="span">Solution Response</span> -->

  <table>
    <tr>
<span class="head1">Solution Response</span>
    </tr>
    <tr>
 <table >
          <tr>
            <th>Question</th>
            <th>Feature Status</th>
            <th>Remarks</th>
            <th>Doc_version</th>
            <th> </th>
          </tr>
          <tr>
            <td>{{this.feedbackdata.question}}</td>
            <td>
              <select v-model="featureStatus">
                <option disabled value="">Please select one</option>
                <option>Fully Compliance</option>
                <option>Partially Compliance</option>
                <option>Non Compliance</option>
              </select>
            </td>
            <td>
              <textarea v-model="remarks" rows="4" cols="30"></textarea>
            </td>
            <td>
              <textarea v-model="docversion" rows="4" cols="30"></textarea>
            </td>
            <td>
              <button  class="button button2" v-on:click="sendreply()">Save</button>
            </td>
          </tr>
      </table>
    </tr>
  </table>
   

      
    </div>
      <div id="snackbar">Solution request successfully processed!</div>

</modal>
<!-- modal dialog box -->
</template>

<script>
import axios from 'axios'


export default {

  props: ['feedbackdata'],
  data() {

    return {
      modifiers: {},
         remarks:'',
        docversion:'',
        featureStatus:''
    }
  },
  methods: {
    sendreply(){
      axios.put(process.env.REM_URL, {
        id :this.feedbackdata.question_id,
        question :this.feedbackdata.question,
        productVersion:this.feedbackdata.productVersion,
        requestUser:this.feedbackdata.requestUser,
        requestTime :this.feedbackdata.requestTime,
        answer:this.remarks,
        docLink :this.docversion,
        featureStatus :this.featureStatus
      }).then((resp) => {
        this.toast(this.$modal);
        console.log(resp);
      }).catch(err => {
        const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
        console.log(message);
      })
    },

    toast(modal) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    setTimeout(function(){ modal.hide('Feedback'); }, 1000);
}
    
    
  }
}

</script>

<style scoped>
.button {
    background-color: #7518a0;
    border: none;
    color: white;
    padding: 11px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    transition-duration: 0.4s;
    margin-left: 0px;
}



.button2:hover {
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
}


.head1{
font-weight: bold;
padding: 15px;
}

.head2{
background-color:#306696;
padding-top: 3%;
}

.save{
  cursor: pointer;
}
.replytab{
    background-color: white;
    width: 100%;
    margin-top: 18px;
}
textarea {
    resize: none;
}

/* table */

table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    /* background-color:#b2cfff */
    /* margin-top: 11px; */
}

td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
    font-size: 11px;
}

/* toast css */
#snackbar {
    visibility: hidden;
    min-width: 250px;
    margin-left: -125px;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    padding: 16px;
    position: fixed;
    z-index: 1;
    left: 50%;
    bottom: 30px;
    font-size: 17px;
}

#snackbar.show {
    visibility: visible;
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
    from {bottom: 0; opacity: 0;} 
    to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
    from {bottom: 30px; opacity: 1;} 
    to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
    from {bottom: 30px; opacity: 1;}
    to {bottom: 0; opacity: 0;}
}


</style>
