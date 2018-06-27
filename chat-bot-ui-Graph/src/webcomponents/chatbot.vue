<template>
  <div class="chatbot">
    <ChatWindow
      :agentProfile="agentProfile"
      :onUserInputSubmit="onMessageWasSent"
      :messageList="messages"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :onClose="closeChat"
      :open="openChat"
      :showEmoji="false"
      :showFile="false"
      :cutomFunction="onremark" />
      <a href="#" class="float" @click.prevent="openChat()">
<img class="chat" src="../../static/img/chat-icon.png">
</a>
  </div>
</template>

<script>
import axios from 'axios'

import ChatWindow from './chatbot/ChatWindow'
export default {
   props: ['messages'],
   components: {ChatWindow},

  data() {
    return {
      agentProfile: {
        teamName: 'chatbot',
        imageUrl: '../../static/img/robot.png'
      },
      newMessagesCount: 1,
      isChatOpen: false,
      flag:true
    }
  },
  methods: {

    onremark(remark){
     this.$emit('remarkssent', {
        text: remark,
      })
    },

    onMessageWasSent (msg) {
       this.$emit('messageSent',msg)

      axios.post(process.env.API_URL + '/ask', {
        question: msg.text
      }).then((resp) => {
        this.$emit('messageSent', {
          author: 'bot',
          type:'text',
          text: resp.data.answer,
          accuracy: resp.data.accuracy,
          remarks: resp.data.remarks,
          question: resp.data.question,
          timestamp: new Date().toLocaleString()
        })
      }).catch(err => {
        const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
        this.$emit('messageSent', {
          author: 'error',
          text: message,
          timestamp: new Date().toLocaleString()
        })
      })
    },
    openChat () {
      this.isChatOpen = !this.isChatOpen
      this.newMessagesCount = 0
    },
    closeChat () {
      this.isChatOpen = false
    }
  }
}
</script>
<style scoped>
*{padding:0;margin:0;}

body{
	font-family:Verdana, Geneva, sans-serif;
	font-size:18px;
	background-color:#CCC;
}

.float{
	position:fixed;
	width:60px;
	height:60px;
	bottom:1%;
	right:40px;
	background-color:#0C9;
	color:#FFF;
	border-radius:50px;
	text-align:center;
	box-shadow: 2px 2px 3px #999;
}

.my-float{
	margin-top:22px;
}

.fa{
      padding: 22px!important;
}

.sc-chat-window[data-v-2a21bba5] {
    width: 370px;
    height: calc(100% - 30%)!important;
    }

    .chat{
      padding: 26%;
    }

    .sc-chat-window[data-v-2a21bba5] {
    width: 320px;
    height: calc(100% - 120px);
    max-height: 590px;
    position: fixed;
    right: 25px;
    bottom: 76px!important;
    box-sizing: border-box;
    box-shadow: 0px 7px 40px 2px rgba(148, 149, 150, 0.3);
    background: white;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: justify;
    justify-content: space-between;
    transition: 0.3s ease-in-out;
    border-radius: 10px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>