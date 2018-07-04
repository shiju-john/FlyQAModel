<template>
  <div class="answerSelect">
    <div class="flex-container">
      <div>
        <table class="question">
            
          <tr>
            <th style="background-color: #086d9b;
            color: white;">Question</th>
          </tr>
          <tr v-for="answer in answers" v-on:click="clik(answer.id)">
            <td :v-model="questionId=answer.id" >{{answer.question}}</td>
          </tr>
        </table>
      </div>
      <div>
        <div>
          <b-tabs  >
            <b-tab :title=a.id v-for="a in ans" v-on:click="toggle">
              <table class="answer">
                <tr>
                  <th>Answer:</th>
                  <td height="200">
                    <textarea >{{a.answer}}</textarea></td>
                </tr>
                <tr>
                  <th>Document :</th>
                  <td height="10"> <textarea v-on:keyup="edited">{{a.doc_ref}}</textarea></td>
                </tr>
                <tr>
                  <th>Feature Status:</th>
                  <td> 
                    <select name="" id=""  @change="edited">
                        <option value="">Fully Compliance</option>
                        <option value="">Partially Compliance</option>
                        <option value="">Non Compliance</option>  
                    </select>
                </td>
                </tr>
                <tr>
                  <th>User Status:</th>
                  <td>
                    <select name="" id="" @change="edited">
                        <option value="">accept</option>
                        <option value="">reject</option>
                    </select>
                </td>
                </tr>
              </table>
              <div align="center" >
                <b-button variant="success" v-if="updateFlag">Update</b-button>
                </div>
            </b-tab>
          </b-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
export default {

  components: {
     },

  data() {
    return {
        answers:[],
        questionId:'',
        ans:[],
        updateFlag:false
    }
  },
  created: function () {
    this.getanswers();
    
  },

  beforeDestroy() {
   },

  methods: {
      toggle(){
        this.updateFlag=false
      },
      edited(){
          this.updateFlag=true;
      },

    clik(id){
      for (let i = 0; i < this.answers.length; i++) {
          if(this.answers[i].id==id){
              this.ans=this.answers[i].answers
              this.updateFlag!=this.updateFlag
          }else{
          }
          
      }

    },

    getanswers() {
        this.answers = [
            {   
                id:'q-1',
                question:'Describe the market share that has your company and product.',
                rownumber:'1',
                template_ref:'temp_1',
                answers:[
                    {
                        id:'ans-1',
                        answer:'Flytxt’ s solutions are deployed at leading CSPs across the globe covering a subscriber base of about 600+ million. It commands 75% market share in African telecom market including GFAs with major telecom groups. Its clientele also includes major tier 1 APAC operators. The company has to its credit, one of the biggest analytics platform deployments in Telecom vertical covering more than 200 million subscribers. Currently, we are expanding our global foot print to Europe and Latin America.',
                        doc_ref:'Flytxt will share product user manual',
                        featureStatus:'complaince',
                        userStatus:'accept',
                        },
                    {
                        id:'ans-2',
                        answer:'The Business Consulting of Flytxt comes from its Marketing Service Delivery (MSD) team. The philosophy of MSD is to create & maximize incremental value for CSPs through deployment of best in class Customer Value Management practices, supported by Flytxt Big Data technology platform. The MSD team comprises of a team of seasoned Telecom Marketing professionals that carries with it the experience and expertise of implementing CLV programs across operators, across geographies and across product lines & revenue streams.',
                        doc_ref:'The Business Consulting of Flytxt comes from its Marketing Service Delivery-2',
                        featureStatus:'complaince',
                        userStatus:'reject',
                    },
                    {
                        id:'ans-3',
                        answer:'Flytxt uses various open source software which has communities of developers but for NEON product we don’t have communities of developers. NEON product has been built by Flytxt’s engineering team and supported by themselves only. However Flytxt engineering and data science team actively contributes to open source projects like Apache Spark, Zeppelin, VoltDB, Parquet, Spring Security Maven, DC.js, Polymer Project, Blockly Block ',
                        doc_ref:'The Business Consulting of Flytxt comes from-3',
                        featureStatus:'complaince',
                        userStatus:'reject',
                    }
                ]
                
            },
            {   
                id:'q-2',
                question:'How many employees are assigned specifically to the product.',
                rownumber:'1.1',
                template_ref:'temp_1.1',
                answers:[
                    {
                        id:'ans-1.1',
                        answer:'235 employees among the total strength are assigned specifically to its flagship product NEON. Apart from this, there are also shared resources like R&D, sales team, finance team etc. who are associated with the product.',
                        doc_ref:'doc-1.1',
                        featureStatus:'bb',
                        userStatus:'',
                        },
                    {
                        id:'ans-2.1',
                        answer:'answer-2.1',
                        doc_ref:'doc-2.1',
                        featureStatus:'bb',
                        userStatus:'bb',
                    },
                    {
                        id:'ans-3.1',
                        answer:'The initial version NEON 3.0 was an integrated real-time and closed-loop campaign management platform. It had near-real time capability and could perform Descriptive analytics and Heuristic analytics .Based on the CSPs needs and requirements, Flytxt has continuously upgraded NEON in-order to deliver best possible technology, features and functions. NEON 4.0 is the most advanced version of Flytxt’s award winning NEON Customer Experience and revenue management platform. NEON 4.0 is a big data analytics powered platform with real-time event triggered marketing and multi-dimensional advanced analytics capabilities. Neon 4.0 is purpose built for generating real time insights and enriching them using insight generated from longer term analytics. It also combines various big data technologies like Hadoop, In-memory capabilities and relational databases that brings in cutting edge differentiators to CIOs, CFOs & CMOs. NEON-dX is the latest version which was released recently. It comes with more advanced self-serve data analytics features like UI driven data ETL and an advanced analytics workbench which allows data scientists to build new models or work on model templates made available by Flytxt data science team. This speeds up model deployment and execution to realise business value faster. NEON-dX has also more intuitive UIs for executing outbound and inbound multi-channel marketing campaigns. ',
                        doc_ref:'doc-3.1',
                        featureStatus:'bb',
                        userStatus:'bb',
                    }
                ]
            }  
        ];
        this.clik(this.answers[0].id)
    },
  }

}

</script>

<style scoped>

table[data-v-03ad4c97] {
    font-family: inherit;
    border-collapse: inherit;
    /* width: 100%; */
}

td, th {
    text-align: left;
    padding: 8px;
}

th{
    width:20%;
}
/* .question > th {
    width:20%;
}
.answer >th {
    width:10%;
} */

tr:hover {background-color:#f5f5f5;}



.flex-container > div {
    border-radius: 8px;
    width: 50%;
    box-shadow: 0px 0px 3px 0px grey;
    margin: 10px;
    padding: 0.80%;
    /* margin-top: 0%; */
    height: 557px;
}


.flex-container {
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    box-shadow: 0px 0px 0px 0px grey;
    /* border-radius: 16px; */
    margin-top: 0%;
}

textarea {
    width: 100%;
  top: 0; left: 0; right: 0; bottom: 0;
  position: absolute;
	resize: none;
	-webkit-box-sizing: border-box; /* <=iOS4, <= Android  2.3 */
      -moz-box-sizing: border-box; /* FF1+ */
           box-sizing: border-box; /* Chrome, IE8, Opera, Safari 5.1*/
    border: none;
    border-bottom: 1px solid #7d7d7d;
}

select {
    border: 0;
    width: 100%;
}

</style>

