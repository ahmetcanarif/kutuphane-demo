<template>
  <div id="app">
    <HomeLayout>
      <template slot="header"></template>
      <template slot="main">
        <router-view></router-view>
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
</style>
