<template>
  <div class="row border-right profile-nav" style="height:100% !important;">
    <div class="align-items-center flex-column d-flex col-md-12">
      <img
        src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png"
        style="width:100px;height:100px;"
        alt
      />
      <span class="name">{{ user.ad_soyad }}</span>
      <span class="role">{{ user.ad}}</span>
    </div>
    <div class="col-md-12 mt--2">
      <ul class="d-flex flex-column user-nav">
        <router-link
          tag="li"
          exact
          active-class="active"
          class="nav-item"
          to="/profile"
        >Okuduğun Kitaplar</router-link>
        <router-link tag="li" active-class="active" class="nav-item" to="/profile/setting">Ayarlar</router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      us: { ad: "asdasdasd" }
    };
  },
  mounted() {
    setTimeout(() => {
      this.user = this.$store.state.User.user;
    }, 100);
  }
};
</script>

<style>
.name {
  font-weight: 600;
  margin-top: 10px;
  color: #fff;
}
.border-right {
  border-width: 2px !important;
  border-color: #000 !important;
}

.mt--2 {
  margin-top: -150px;
}
.role {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 400;
}
ul,
li {
  padding: 0;
  margin: 0;
}
.user-nav {
  list-style: none;
}
.user-nav li {
  background-color: #2d2d2d;
  color: #fff !important;
  display: block;
  border-radius: 7px;
  padding: 7px;
  margin: 5px 0px;
  width: 100%;
}
.nav-item {
  color: #212121 !important;
}
.user-nav li.active {
  background-color: #f64c72;
  color: #fff !important;
}
.profile-nav {
  height: 100%;
}
</style>