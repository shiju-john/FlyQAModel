<template>
<div class='Message' :class='modifiers'>
  <div class='Message__Author'>
    {{ message.author }}
  </div>
  <div class='Message__Text'>
    {{ message.text }}
    <span class="span" v-if="message.remarks" v-on:click="myFunction(message)">....
    </span>
  </div>
  <div class='Message__Timestamp'>
    {{ message.timestamp }}
  </div>
  <div v-if="message.accuracy" class='Message__accuracy'>
    I am {{message.accuracy}} % sure
  </div>
</div>
<!-- modal dialog box -->
</template>

<script>


export default {
  props: ['message'],

  data() {
     
    return {
      // display:false,
      remark:[],
      modifiers: {
        'Message--Mine': this.message.author === 'me',
        'Message--Error': this.message.author === 'error'
      }     
    }
  },
  methods: {
    myFunction(a) {
    this.remark=a;
    this.$emit('remarkssent', {
        text: this.remark,
      })
    } 
  }
}
</script>

<style scoped>
.Message {
  display: flex;
  flex-direction: column;
  align-self: flex-start;
}

.Message--Mine {
  align-self: flex-end;
  margin-top: -10px;
}

.Message--Mine .Message__Author {
  align-self: flex-end;
  margin-top: -10px;
}

.Message--Mine .Message__Timestamp {
  align-self: flex-start;
  margin-left: 35px;
}

.Message--Mine .Message__Text {
  background-color: #7518a0;
  margin-left: 35px;
}

.Message--Error .Message__Text {
  background-color: #b7263c;
}

.Message__Author {
  font-weight: 500;
  padding: 5px;
  color: #FFFFFF;
}

.Message__Text {
  color: #FFFFFF;
  background-color: #306696;
  border-radius: 10px;
  padding: 10px 15px;

}

.Message__Timestamp {
  color: grey;
  font-size: 0.5em;
  padding: 4px;
  align-self: flex-end;
}
.Message__accuracy {
  color: grey;
  font-size: 0.6em;
  padding: 1px;
  margin-top: -3px;
  margin-right: 4px;
  align-self: flex-end;
}

/* popup css */
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  .span{
    font-weight: bold;
    cursor: pointer;
  }
</style>
