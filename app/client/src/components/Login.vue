<template>
  <section class='hero'>
    <div class='hero-body'>
        <div class='container'>
            <div class='column is-5 is-offset-4'>
                <div class='box'>
                  <h3 class='title is-3 has-text-centered'>Login</h3>
                  
                  <div class='field'>
                    <label class='label'>Email Address</label>
                    <div class='control'>
                      <input class='input' type='email' v-model='User.email' @input='emailInputChanged' @blur='emailInputChanged' @focus='emailFlag = true; allFieldsValid=true; errorMessage="" ' placeholder='E-mail' />
                    </div>
                  </div>
                  <span class='error' v-if='!emailFlag'>Please enter a valid email address!</span>

                  <div class='field'>
                    <label class='label'>Password</label>
                    <div class='control'>
                      <input class='input' type='password' v-model='User.password' @blur='passwordFlag = validatePassword()' @focus='passwordFlag=true; allFieldsValid=true; errorMessage="" ' placeholder='Password' />
                    </div>
                  </div>
                  <span class='error' v-if='!passwordFlag'>Please enter your account password.</span>
                  <br>
                  <div class="has-text-centered">
                    <span class='error' v-if='!allFieldsValid'>All fields must be valid!</span>
                  </div>
                  <div class="columns has-text-centered">
                    <div class="column">
                        <button class='button is-link' @click='confirmAll'>Login</button>
                    </div>
                  </div>      
                  <div class="has-text-centered">
                    <span class='error' v-if="errorMessage != ''">{{errorMessage}}</span>
                  </div>            
            </div>

            <!-- Register an account option outside of box -->
            <div class='has-text-centered'>
              <div>
                  <router-link tag='a' id="neo" class='is-link' :to="{name: 'register'}">
                      Don't have an account? Register one for free!
                  </router-link>
              </div>
            </div>
            <!-- <pdf ref="generatedResume" src="PrashadSean_Resume.pdf"></pdf> -->
        </div>
    </div>
  </div>
  </section>
</template>

<script>
import Authentication from '@/services/AuthenticationService';
import Lodash from 'lodash';

export default {
  name: 'Login',
  data() {
    return {
      emailFlag: true,
      passwordFlag: true,
      allFieldsValid: true,
      User: {
        email: '',
        password: '',
        accountRole: ''
      },
      errorMessage: ''
    };
  },
  methods: {
    confirmAll: function() {
      if (this.emailFlag === true && this.passwordFlag === true) {
        this.Login();
        this.allFieldsValid = true;
      } else {
        this.allFieldsValid = false;
      }
    },
    emailInputChanged: Lodash.debounce(function() {
      var emailFormat = new RegExp(
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      );
      if (!this.User.email.match(emailFormat)) {
        this.emailFlag = false;
      } else {
        this.emailFlag = true;
      }
    }, 1000),
    validatePassword: function() {
      return this.User.password.length >= 8;
    },
    async Login() {
      try {
        // Send a json object to the database, w/e is passed. We access via response.body - (this is handled/bundled by body-parser)
        // We receive the url for redirection in the response.
        const response = await Authentication.Login({
          User: {
            email: this.User.email,
            password: this.User.password
          }
        });
        this.$store.dispatch('setToken', response.data.token);
        this.$store.dispatch('setUser', response.data.user);
        if (response.data.user.accountRole === 'admin') {
          this.$store.dispatch('setRole', true);
        }
        // Vue Router redirection
        this.$router.push({
          name: 'upload-resume'
        });
      } catch (e) {
        console.log(e);
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
#neo {
  color: hsl(204, 86%, 53%);
}
.error {
  color: red;
}
</style>
