<template>
  <div>
    <div class="modal" id="exampleModalCenter" v-if="status">
      <div class="modal-dialog col-md-5" role="document">
        <div class="modal-content">
          <div class="alert" v-if="message != ''">{{ message }}</div>
          <form class="my-4">
            <div class="container">
              <div class="form-group">
                <label class="text-dark">Email</label>
                <input
                  v-model="username"
                  type="text"
                  class="form-control"
                  placeholder="example@doamin.com"
                />
              </div>
              <div class="form-group">
                <label class="text-dark">Şifre</label>
                <input v-model="password" type="text" placeholder="******" class="form-control" />
              </div>
            </div>
          </form>
          <div class="modal-footer">
            <button
              type="button"
              @click="loginModalClose"
              class="btn btn-outline-secondary btn-sm"
              data-dismiss="modal"
            >Kapat</button>
            <button type="button" class="btn btn-success btn-sm" @click="login">Giriş Yap</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      message: ""
    };
  },
  props: {
    status: {
      required: true
    }
  },
  methods: {
    loginModalClose() {
      this.$emit("closedLoginModal", false);
    },
    async login() {
      await this.$store
        .dispatch("User/getUser", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          if (res.error) {
            this.message = res.error.message;
          } else {
            this.username = "";
            this.password = "";
            this.message = res.message.message;
            setTimeout(() => {
              this.$emit("closedLoginModal", false);
              this.message = "";
              this.$router.push("/profile");
            }, 1500);
          }
          console.log(res);
        });
    }
  }
};
</script>

<style >
.modal {
  display: block !important;
  background: rgba(0, 0, 0, 0.5);
}
.modal-dialog {
  border: none !important;
}
</style>