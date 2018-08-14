<template>
<div class="parent" style=" background-image: url('https://storage.googleapis.com/complete-land-188108.appspot.com/vision/images/part.jpg');background-size: cover;">
  <div style="border-radius: 10px;margin-right: 40px;">
    <div>
      <img src="../../static/img/flytxt-logo-color.svg">
    </div>
    <div>
      <g-signin-button :params="googleSignInParams" @success="onSignInSuccess" @error="onSignInError">
        <Spinner v-if="loader" size="small"></Spinner>
        <span v-else>sign in</span>
        
      </g-signin-button>
    </div>
    <div style="font-size: 11px;padding: 3%;">Please sign in using your Flytxt Mail Id</div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import Spinner from 'vue-simple-spinner'


export default {

  components: {
    Spinner
     },
  data() {
    return {
      /**
       * The Auth2 parameters, as seen on
       * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
       * As the very least, a valid client_id must present.
       * @type {Object}
       */
      googleSignInParams: {
        client_id: '310884155109-4bvcjo9r1njgmqdascm60r2jeuhtgf1o.apps.googleusercontent.com'
      },
      loader:false
    }
  },
  methods: {
    onSignInSuccess(googleUser) {
  
      this.loader=true;
      const profile = googleUser.getBasicProfile() 
      if (googleUser.getHostedDomain() !== undefined && googleUser.getHostedDomain() === "flytxt.com") {

        axios.post(process.env.SERV_URL + 'visionendpoints?action=login', 
        {
          token: googleUser.getAuthResponse().id_token,
          name:profile.ig,
          nickname:profile.ofa
        }).then((resp) => {
              var obj={};
       obj.dp=googleUser.w3.Paa;
          obj.token=resp.data.token;
          obj.username=googleUser.w3.ig;
          
                //emit token here
        this.$emit('login',obj)
        this.disconnect()
        }).catch(err => {
          
          const message = err.response ? `${err.response.status} ${err.response.data}` : err.message
           disconnect(message)
        })
      } else {
          this.disconnect("Invalid Login !. Please use flytxt E-mail for sign-in.");
      }
    },

    disconnect(msg){
      this.loader=false;
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.disconnect();
        msg ?  this.$toaster.error(msg) :null
    },
    onSignInError(error) {
      this.loader=false
      this.$toaster.error(error)
    }
  }
}
</script>

<style>
.g-signin-button {
  display: inline-block;
  padding: 10px;
  background-color: #e86824;
  color: #fff;
  margin-top: 10%;
  cursor: pointer;
  width:30%;
}

.parent {
  display: flex;
  background-color:#003750;
  height: 100vh;
   text-align: center;
   
}

.parent > div {
background-color:white;
    padding: 20px;
    width: 398px;
    margin: 0 auto;
    height: 277px;
    margin-top: 15%;
    box-shadow:1px 0px 3px 0px  grey;
    font-family: inherit;
    font-weight: 500;
}

</style>