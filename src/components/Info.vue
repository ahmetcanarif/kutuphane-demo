<template>
  <div class="bg-primary p-5 mt-5">
    <div class="row align-items-center justify-content-center">
      <div class="col-md-3 text-center info-row" v-for="item in info" :key="item.id">
        <i :class="'fa-'+item.bilgilendirme_icon" class="fa text-white fa-2x rounded-circle p-4"></i>
        <h4 class="title my-3">{{item.bilgilendirme_baslik}}</h4>
        <p class="desc">{{ item.bilgilendirme_icerik}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: []
    };
  },
  async mounted() {
    if (this.$store.getters["Info/getInfo"].length < 1) {
      await this.$store.dispatch("Info/getData").then(res => {
        console.log(res);
        this.info = res.data.info;
      });
    } else {
      this.info = await this.$store.getters["Info/getInfo"];
    }
  }
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css");
.bg-primary {
  background-color: #212121 !important;
}
.info-row {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.info-row:hover > i {
  background: #f64c72;
}
i {
  transition: 0.5s all;
  width: 32px;
  text-align: center;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  color: #fff;
}
.desc {
  color: rgba(255, 255, 255, 0.6);
}
</style>