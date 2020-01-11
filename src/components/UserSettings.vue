<template>
  <div class="row ml-2">
    <div class="col-md-12 bg-purple rounded ml-2 py-1 mb-2">
      <span class="setting-title mb-3">Ayarlar</span>
    </div>
    <div class="col-md-12">
      <div v-if="error.length > 0" class="alert alert-danger">
        <p v-for="(text,index) in error" :key="index">{{ text }}</p>
      </div>
      <form @submit.prevent class="mt-4">
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-2 col-form-label">Ad Soyad</label>
          <div class="col-md-4">
            <input type="text" v-model="updateUser.ad_soyad" class="form-control" />
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
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
          <div class="ml-3">
            <a
              @click="activeModal = !activeModal"
              class="text-white btn btn-sm btn-primary"
            >Değiştir</a>
          </div>
        </div>
        <div class="col-md-6">
          <button @click="updateProfil()" class="btn btn-purple float-right">Kaydet</button>
        </div>
      </form>
    </div>
    <transition name="fade" mode="out-in">
      <div :class="{'d-block':activeModal}" class="modals">
        <div class="modals-card">
          <div class="modal-title">
            <span class="title">Title</span>
            <span @click="activeModal = !activeModal" class="close-btn">x</span>
          </div>
          <div
            class="modal-body"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nulla tempore, nostrum vel numquam quibusdam.</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: [],
      updateUser: {},
      activeModal: false
    };
  },
  methods: {
    updateProfil() {
      this.$store.dispatch("User/updateProfil", this.updateUser).then(res => {
        //console.log(res);
      });
    },
    passwordModal() {
      alert("");
    }
  },
  async mounted() {
    let userData = this.$store.getters["User/getUser"];
    this.updateUser = {
      ...userData
    };
  }
};
</script>

<style scoped>
body {
  position: relative;
}
.fade-enter-active {
  transition: all 0.5s ease;
}
.fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(50px);
  opacity: 0;
}
.modals {
  display: none;
  z-index: 999;
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}
.modals-card {
  background: white;
  border-radius: 8px;
  box-sizing: border-box;
  height: 300px;
  position: absolute;
  width: 400px;
  left: 50%;
  top: 50%;
  z-index: 111 !important;
  transform: translate(-50%, -50%);
}
.modal-title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 7px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background: #f1f1f1;
  align-items: center;
}
.modal-title .title {
  font-size: 22px;
  color: #000;
}
.close-btn {
  font-size: 22px;
  margin-right: 6px;
  font-weight: bold;
}
.btn-purple {
  color: #fff;
  background: #f64c72;
  border: none;
}
label {
  color: #fff;
}
.form-control-plaintext {
  padding-left: 10px;
}
.form-control-plaintext,
.form-control {
  border: none;
  background: #000;
  color: rgba(255, 255, 255, 0.6) !important;
}

.setting-title {
  font-size: 26px;
  color: #fff;

  font-weight: bold;
}
</style>