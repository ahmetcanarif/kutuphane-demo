<template>
  <div class="row bg-dark shadow m-3 profile-card p-3 rounded">
    <div class="col-md-3" style="height:100%;">
      <ProfileNav />
    </div>
    <div class="col-md-9" style="height:100%;overflow:auto;">
      <transition mode="out-in" name="slide-fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<style scoped>
html,
body {
  height: 100%;
}
.profile-card {
  background: #fff;
}
.bg-dark {
  background: #212121 !important;
}
.permision {
  color: rgba(0, 0, 0, 0.4);
}
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(50px);
  opacity: 0;
}
</style>
<script>
import ReadBookUser from "@/components/ReadBookUser";
import ProfileNav from "@/components/ProfileNavbar";

export default {
  name: "Profile",
  components: { ReadBookUser, ProfileNav }
};
</script>
