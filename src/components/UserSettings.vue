<template>
  <div class="row ml-2">
    <div class="col-md-12 bg-purple rounded ml-2 py-1 mb-2">
      <span class="title mb-3">Okuduğun Kitaplar</span>
    </div>
    <div class="col-md-12">
      <div v-if="error.length > 0" class="alert alert-danger">
        <p v-for="(text,index) in error" :key="index">{{ text }}</p>
      </div>
      <form @submit.prevent class="mt-4">
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-2 col-form-label">Ad Soyad</label>
          <div class="col-md-4">
            <input type="text" v-model="updateUser.ad" class="form-control" />
          </div>
        </div>
        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
          <div class="col-md-4">
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              id="staticEmail"
              v-model="updateUser.email"
            />
            {{ updateUser}} data
            <br />
            -- state {{ $store.state.User.user}}
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
          <div class="ml-3">
            <a
              @click="passwordModal()"
              class="form-control-plaintext text-white btn btn-sm btn-primary"
            >Değiştir</a>
          </div>
        </div>
        <div class="col-md-6">
          <button class="btn btn-purple float-right">Kaydet</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: [],
      us: { ad: "ahmet" },
      updateUser: {}
    };
  },
  methods: {
    updateProfil() {
      this.$store.dispatch("User/updateProfil", this.updateUser).then(res => {
        console.log(res);
      });
    },
    passwordModal() {
      alert();
    }
  },
  async mounted() {
    const userData = this.$store.state.User.user;
    this.updateUser = userData;
  }
};
</script>

<style scoped>
.btn-purple {
  color: #fff;
  background: #5806d2;
  border: none;
}
.form-control {
  border-color: #5806d2;
  color: rgba(0, 0, 0, 0.6);
}

.setting-title {
  font-size: 26px;
  display: inline;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  font-weight: bold;
}
</style>