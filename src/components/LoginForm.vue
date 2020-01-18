<template>
  <div>
    <form @submit.prevent>
      <div class="form-group">
        <label for>Kullanıcı adı yada email</label>
        <input
          v-model="user.username"
          type="text"
          class="form-control"
          placeholder="example@domain.com"
        />
      </div>
      <div class="form-group">
        <label for>Şifre</label>
        <input v-model="user.password" type="password" placeholder="******" class="form-control" />
      </div>
      <div class="d-flex justify-content-end">
        <div @click="login" class="btn btn-sm">Giriş Yap</div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      await this.$store
        .dispatch("User/getUser", {
          username: this.user.username,
          password: this.user.password
        })
        .then(res => {
          if (res.message.status == "error") {
            alert(`${this.user.username} is not defined`);
          } else {
            this.user.username = "";
            this.user.password = "";
            this.$router.push("-1");
          }

          console.log(res);
        });
    }
  }
};
</script>

<style scoped>
.form-control {
  background: #000;
  border-color: transparent;
  color: #fff;
}
.btn {
  color: #fff;
  background: #f64c72 !important;
}
::placeholder {
  color: rgba(255, 255, 255, 0.7);
}
</style>        
