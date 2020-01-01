<template>
  <div class="row shadow m-3 profile-card p-3 rounded">
    <div class="col-md-3" style="height:100%;">
      <ProfileNav />
    </div>
    <div class="col-md-9" style="height:100%;overflow:auto;">
      <router-view></router-view>
    </div>
  </div>
</template>
<style scoped>
html,
body {
  height: 100%;
}
.bg-gray {
  background: #e6e6e6;
}
.permision {
  color: rgba(0, 0, 0, 0.4);
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
