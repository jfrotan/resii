<template>
    <div>
        <nav class='navbar is-info is-fixed-top' role='navigation' aria-label='main navigation'>
            <button class='button navbar-burger' data-target='navMenu'>
                    <span></span>
                    <span></span>
                    <span></span>
            </button>
            <div class='navbar-menu'>
              
                <div class='navbar-start'>
                    <!-- navbar items -->
                    <a class='navbar-item'>
                        <button class ='title has-text-light' tag='h1' @click="RedirectHomePage($store.state.isUserLoggedIn)"> Resi</button>
                    </a>
                </div>
                <div  class='navbar-end'>
                    <!-- navbar items -->
                    <!-- <router-link to ='register'> Sign-Up </router-link> -->
                    <router-link v-if="$store.state.isUserLoggedIn && $store.state.isAdmin"  tag='a' class='navbar-item' :to="{name: 'admin'}">
                        Admin
                    </router-link>
                    <router-link v-if="$store.state.isUserLoggedIn"  tag='a' class='navbar-item' :to="{name: 'upload-resume'}">
                        Upload
                    </router-link>
                    <router-link v-if="$store.state.isUserLoggedIn"  tag='a' class='navbar-item' :to="{name: 'generate-resume'}">
                        Generate
                    </router-link>
                     <router-link v-if="$store.state.isUserLoggedIn"  tag='a' class='navbar-item' :to="{name: 'index'}">
                        View
                    </router-link>
                    <a class='navbar-item' v-if="$store.state.isUserLoggedIn" @click="logout">
                        Logout
                    </a>
                    <a class='navbar-item' v-if="!$store.state.isUserLoggedIn" @click="login">
                        Login
                    </a>
                </div>
            </div>
        </nav>
        <hr class='navbar-divider'>
    </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUser', null);
      this.$store.dispatch('setRole', false);
      this.$router.push({
        name: 'login'
      });
    },
    login() {
      this.$router.push({
        name: 'login'
      });
    },
    RedirectHomePage(LoggedIn) {
      if (!LoggedIn) {
        this.$router.push({
          name: 'login'
        });
      } else {
        this.$router.push({
          name: 'upload-resume'
        });
      }
    }
  }
};
document.addEventListener('DOMContentLoaded', function() {
  // Get all 'navbar-burger' elements
  var $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll('.navbar-burger'),
    0
  );
  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(function($el) {
      $el.addEventListener('click', function() {
        // Get the target from the 'data-target' attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);
        // Toggle the class on both the 'navbar-burger' and the 'navbar-menu'
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});
</script>

<style>
button {
  background-color: hsl(204, 86%, 53%);
}
</style>
