<template>
  <form class='MessageForm' v-on:submit.prevent='onSubmit'>
    <textarea v-model='text'  class='MessageForm__Text' placeholder='Type yor Query ...'> </textarea>
    <button class='MessageForm__Send'>&#10003;</button>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      text: ''
    }
  },
  methods: {
    
    onSubmit() {
      if (this.text.length === 0) {
        return
      }

      this.$emit('messageSent', {
        author: 'me',
        text: this.text,
        timestamp: new Date().toLocaleString()
      })

      axios.post(process.env.API_URL + '/ask', {
        question: this.text
      }).then((resp) => {
        this.$emit('messageSent', {
          author: 'bot',
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

      this.text = ''
    }
  }
}
</script>

<style scoped>
.MessageForm {
  align-self: flex-end;
  padding: 10px;
}

.MessageForm__Text {
  height: 1.5em;
  font-size: 1em;
  border-radius: 10px;
  border-width: 1px;
  border-style: solid;
  border-color: black;
  border-image: initial;
  padding: 5px 10px;
  margin: 1px;
  width: 280px;
  height: 41px;
}

.MessageForm__Text:focus {
  outline: none;
}

.MessageForm__Text::-webkit-input-placeholder {
  font-weight: 100;
}

.MessageForm__Send {
  outline: none;
  border: 0px;
  color: #FFFFFF;
  background-color: #7518a0;
  font-size: 1em;
  border-radius: 10px;
  padding: 5px 10px;
  float: right;
  margin-top: 15px;
  margin-left: 9px;
}

.MessageForm__Send:active {
  background-color: #306696;
}

textarea {
    resize: none;
}
</style>
