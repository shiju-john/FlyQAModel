<template>
  <div class="chatbot">
     <ChatWindow  v-bind:class="{ 'animated zoomOut': !isChatOpen,'animated  zoomIn':isChatOpen }"
      :agentProfile="agentProfile"
      :onUserInputSubmit="onMessageWasSent"
      :messageList="messages"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :onClose="closeChat"
      :open="openChat"
      :showEmoji="false"
      :showFile="false"
      :cutomFunction="onremark">
      </ChatWindow>
      <a href="#" v-bind:class="{ 'float': !isChatOpen,'float1':isChatOpen }"  @click.prevent="openChat()">
<img class="chat"   src="../../static/img/chat-icon.png">
</a>
  </div>
</template>

<script>
import axios from 'axios'
import ChatWindow from './chatbot/ChatWindow'
export default {
props: ['messages', 'version','token'],
  components: {
    ChatWindow,
  },

  data() {
    return {
      agentProfile: {
        teamName: 'Neon Digital Assistant',
        imageUrl: ''
      },
      newMessagesCount: 1,
      isChatOpen: false,
      loader:false
    }
  },

  created: function () {
    window.addEventListener('keydown', (e) => {
      if (e.key == 'Escape') {
        this.isChatOpen = false;
      }
    });
  },
  methods: {

    onremark(remark) {
      this.$emit('remarkssent', {
        text: remark,
      })
    },

    onMessageWasSent(msg) {
      this.loader=true;
      this.$emit('messageSent', msg)
        axios.post(process.env.AI_URL + 'botservice', {
        question: msg.text,
        product_version: this.version,
        token:this.token
      }).then((resp) => {
        this.$emit('messageSent', {
          author: 'bot',
          type: 'text',
          text: resp.data.answers[0].featureStatus,
          welcomemsg: 'false',
          answerarray: resp.data.answers,
          question: resp.data.question,
          timestamp: new Date().toLocaleString()
        })
      }).catch(err => {
        this.loader=false;
        const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
        this.$emit('messageSent', {
          author: 'error',
          type: 'text',
          text: message,
          timestamp: new Date().toLocaleString()
        })
      })
    },
    openChat() {
      this.isChatOpen = !this.isChatOpen
      this.newMessagesCount = 0;
    },
    closeChat() {
      this.isChatOpen = false;
    }
  }
}
</script>
<style scoped>
*{padding:0;margin:0;}

body {
  font-family: Verdana, Geneva, sans-serif;
  font-size: 18px;
  background-color: #CCC;
}

.float {
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 1%;
  right: 40px;
  background-color: #0C9;
  color: #FFF;
  border-radius: 50px;
  text-align: center;
  box-shadow: 2px 2px 3px #999;
  -webkit-transition: opacity 1s ease-in-out, -webkit-transform 1s ease-in-out;
  display: block;
}

.float1 {
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 1%;
  right: 40px;
  background-color: #0C9;
  color: #FFF;
  border-radius: 50px;
  text-align: center;
  box-shadow: 2px 2px 3px #999;
  -ms-transform: rotate(180deg);
  /* IE 9 */
  -webkit-transform: rotate(180deg);
  /* Chrome, Safari, Opera */
  transform: rotate(180deg);
  /* opacity: 0; */
  display: none;
}

.my-float {
  margin-top: 22px;
}

.fa {
  padding: 22px !important;
}

.sc-chat-window[data-v-2a21bba5] {
  width: 370px;
  height: calc(100% - 30%) !important;
}

.chat {
  padding: 26%;
  -webkit-transition: opacity 1s ease-in-out, -webkit-transform 1s ease-in-out;
}

.chat1 {
  padding: 26%;
  opacity: 0;
  -ms-transform: rotate(180deg);
  /* IE 9 */
  -webkit-transform: rotate(180deg);
  /* Chrome, Safari, Opera */
  transform: rotate(180deg);
}

.sc-chat-window[data-v-2a21bba5] {
  width: 320px;
  height: calc(100% - 120px);
  max-height: 483px;
  position: fixed;
  right: 25px;
  bottom: 17px !important;
  box-sizing: border-box;
  box-shadow: 0px 7px 40px 2px rgba(148, 149, 150, 0.3);
  background: white;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: justify;
  justify-content: space-between;
  /* transition: 0.4s ease-in-out; */
  border-radius: 10px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  /* -webkit-transition: opacity .5s ease-in-out, -webkit-transform .5s ease-in-out; */
  	/* -webkit-transform: translate(-100px,-100px); */
  transform: scale(1);
}

.sc-chat-window1[data-v-2a21bba5] {
  width: 320px;
  height: calc(100% - 120px);
  max-height: 483px;
  position: fixed;
  right: 25px;
  bottom: 25px !important;
  box-sizing: border-box;
  box-shadow: 0px 7px 40px 2px rgba(148, 149, 150, 0.3);
  background: white;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: justify;
  justify-content: space-between;
  /* transition: 0.4s ease-in-out; */
  border-radius: 10px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    -webkit-transition: opacity .5s ease-in-out, -webkit-transform .7s ease-in-out;

  transform: scale(1);
    	/* -webkit-transform: translate(-40px,-40px); */
}

</style>