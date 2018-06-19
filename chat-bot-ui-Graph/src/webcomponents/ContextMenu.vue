<template>
  <div class='menu'>
    <context-menu id="context-menu" ref="ctxMenu">
	  	<li @click="doSomething(...)">option 1</li>
	  	<li class="disabled">option 2</li>
	  	<li>option 3</li>
	</context-menu>
  </div> 
</template>

<script>
import contextMenu from 'vue-context-menu'
export default {
  name: 'my-component',
  components: { contextMenu },
  methods: { doSomething }
  
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
</style>
