<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <router-link to="/" tag="a" class="navbar-brand" href="#">Navbar</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars text-white"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" exact active-class="active" to="/" tag="a">Anasayfa</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/book" tag="a">Kitaplar</router-link>
          </li>
          <li v-if="this.$store.getters['User/isAuth']" class="nav-item">
            <router-link class="nav-link" active-class="active" to="/profile" tag="a">Profil</router-link>
          </li>

          <li v-if="!this.$store.getters['User/isAuth']">
            <router-link to="/login" class="btn login-btn nav-link">Giriş Yap</router-link>
          </li>
          <li v-if="this.$store.getters['User/isAuth']">
            <a @click="logout" class="btn btn-outline signup-btn ml-4 nav-link">Çıkış Yap</a>
          </li>
          <li v-if="!this.$store.getters['User/isAuth']">
            <router-link to="/signup" class="btn btn-outline signup-btn nav-link">Kayıt Ol</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import SignIn from "./SignIn";
export default {
  components: {
    SignIn
  },
  data() {
    return { isActiveModal: false, isActiveDropdown: false };
  },
  methods: {
    closeLoginModal(property) {
      this.isActiveModal = property;
    },

    logout() {
      this.$store.commit("User/CLEAR_USER");
      this.$store.commit("User/CLEAR_TOKEN");
      this.$router.push("/");
    }
  },
  watch: {
    $route(to, from) {
      this.isActiveDropdown = false;
    }
  }
};
</script>
<style scoped>
.dropdown {
  background: #151414;
  height: auto;
  width: 150px;
  color: #fff;
  position: absolute;
  display: flex;
  left: -100%;
  display: none;
  top: 100%;
  flex-direction: column !important;
}
.dropdown router-link.active {
  background: #212121;
}
.dropdown li {
  padding: 5px;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}
.dropdown li:last-child {
  border: none !important;
}
.active {
  box-shadow: 0px -3px 0px #f64c72 inset;
}
.navbar {
  /*background: #242582;*/
  background: #212121;
  color: #fff;
  z-index: 1;
  height: 50px;
}
.login-btn {
  background: #f64c72;
  color: #fff !important;
  font-weight: 600;
  margin-left: 35px;
}
.signup-btn {
  border-color: #f64c72;
  color: #f64c72 !important;
  font-weight: 600;
  margin-left: 5px;
}
.nav-link,
.navbar-brand {
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
}
.nav-link.active {
  color: #f64c72;
}

textarea:hover,
input:hover,
textarea:active,
input:active,
textarea:focus,
input:focus,
button:focus,
button:active,
button:hover,
label:focus,
.btn:active,
.btn.active {
  outline: 0px !important;
  -webkit-appearance: none;
  box-shadow: none !important;
}
.search::placeholder {
  color: #f64c72;
}
</style>
