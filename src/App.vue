<template>
  <div id="app">
    <HomeLayout>
      <template slot="header"></template>
      <template slot="main">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </template>
      <template slot="footer">
        <Footer />
      </template>
    </HomeLayout>
  </div>
</template>
    </HomeLayout>
  </div>
</template>
<script>
import HomeLayout from "@/layouts/HomeLayout";
export default {
  components: {
    HomeLayout
  },
  created() {
    const user_token = localStorage.getItem("user_token");
    if (user_token) {
      this.$store.dispatch("User/getTokenUser", user_token);
    }
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Quicksand&display=swap");
@import url("./assets/css/main.css");
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css");
body {
  background: #f7f7f7;
  font-family: "Quicksand", sans-serif;
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
* {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
.fade-fade-leave-active,
.fade-enter-active {
  transition: all 0.8s ease;
}

.fade-enter, .fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
