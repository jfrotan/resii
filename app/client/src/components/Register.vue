<template>
  <section class='hero'>
    <div class='hero-body'>
        <div class='container'>
            <div class='column is-5 is-offset-4'>
                <div class='box'>
                  <h3 class='title is-3 has-text-centered'>Register an Account</h3>
                  
                  <div class='field'>
                    <label class='label'>Email Address</label>
                    <div class='control'>
                      <input class='input' type='email' v-model='User.email' @focus='emailFlag=true; allFieldsValid=true' placeholder='E-mail' @blur='validateEmail()' autofocus>
                    </div>
                  </div>
                  <span class='error' v-if='!emailFlag'>Please enter a valid email address!</span>

                  <div class='field'>
                    <label class='label'>Password</label>
                    <div class='control'>
                      <input class='input' type='password' v-model='User.password' placeholder='Password' @focus='passwordFlag=true; confirmFlag=true; allFieldsValid=true' @blur='validatePassword()' >
                    </div>
                  </div>
                  <span class='error' v-if='!passwordFlag'>Password must be minimum eight characters, at least one letter and one number!</span>

                  <div class='field'>
                    <label class='label'>Confirm Password</label>
                    <div class='control'>
                      <input class='input' type='password' v-model='User.passwordConf' placeholder='Confirm Password' @blur='confirmPassword()' @focus='confirmFlag=true; allFieldsValid=true'>
                    </div>
                  </div>
                  <div>
                    <span class='error' v-if='!confirmFlag'>Passwords must match!</span>
                  </div>
                  <div class="has-text-centered">
                    <span class='error' v-if='!allFieldsValid'>All fields must be valid!</span>
                  </div>
                  <div class='field'>
                    <div class='control has-text-centered'>
                      <button class='button is-link' @click='confirmAll'>Confirm</button>
                    </div>
                  </div>
                  
                  <div class="has-text-centered">
                    <span class='error' v-if="errorMessage != ''">{{errorMessage}}</span>
                  </div>
                </div>
            </div>
        </div>
    </div>
  </section>
</template>

<script>
import Authentication from '@/services/AuthenticationService';
import Lodash from 'lodash';

export default {
  name: 'Register',
  data() {
    return {
      emailFlag: true,
      passwordFlag: true,
      confirmFlag: true,
      allFieldsValid: true,
      errorMessage: '',
      User: {
        email: '',
        password: '',
        passwordConf: ''
      }
    };
  },
  methods: {
    /**
     * TODO: Fix up error message such that it disappears when the user changes up their submission - use a lostFocus event with a regex to validate if we get a valid e-mail, password etc etc
     */
    confirmAll: function() {
      if (
        this.emailFlag === true &&
        this.passwordFlag === true &&
        this.confirmFlag === true
      ) {
        this.Register();
        this.allFieldsValid = true;
      } else {
        this.allFieldsValid = false;
      }
    },
    confirmPassword: function() {
      if (
        this.User.password === this.User.passwordConf &&
        this.User.passwordConf.length > 0
      ) {
        this.confirmFlag = true;
      } else {
        this.confirmFlag = false;
      }
    },
    validatePassword: function() {
      var passwordFormat = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
      if (!this.User.password.match(passwordFormat)) {
        this.passwordFlag = false;
      } else {
        this.passwordFlag = true;
        // check for existing confirm password value
        this.confirmPassword();
      }
    },
    // this object does not work with es6 ()=>{} function operator
    // see link for more info https://github.com/vuejs-templates/browserify-simple/issues/6#issuecomment-214003282
    validateEmail: function() {
      var emailFormat = new RegExp(
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      );
      if (!this.User.email.match(emailFormat)) {
        this.emailFlag = false;
      } else {
        this.emailFlag = true;
      }
    },
    async Register() {
      try {
        // Send a json object to the database, w/e is passed. We access via response.body - (this is handled/bundled by body-parser)
        // We receive the url for redirection in the response.
        const response = await Authentication.Register({
          User: {
            email: this.User.email,
            password: this.User.password,
            passwordConf: this.User.passwordConf,
            accountStatus: 'active',
            accountRole: 'user'
          }
        });
        this.$store.dispatch('setToken', response.data.token);
        this.$store.dispatch('setUser', response.data.user);
        this.$router.push({
          name: 'upload-resume'
        });
      } catch (e) {
        this.errorMessage = e.response.data.error;
      }
    }
  }
};
</script>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.error {
  color: #ff0000;
  text-align: center;
}
</style>
