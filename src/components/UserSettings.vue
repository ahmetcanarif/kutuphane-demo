<template>
  <div class="row ml-2">
    <div class="col-md-12 bg-purple rounded py-1 mb-2">
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
              @click="isActiveModal = !isActiveModal"
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
      <div :class="{'d-block':isActiveModal}" class="modals">
        <div class="modals-card">
          <div class="modal-title">
            <span class="title">Şifre Değiştir</span>
            <span @click="isActiveModal = !isActiveModal" class="close-btn">x</span>
          </div>
          <div class="modal-body">
            <form action>
              <div class="form-group">
                <label class="col-form-label">Eski Şifre</label>
                <input type="text" v-model="changePass.lastPass" class="form-control" />
              </div>
              <div class="form-group">
                <label class="col-form-label">Yeni Şifre</label>
                <input type="text" v-model="changePass.newPass" class="form-control" />
              </div>
              <div class="form-group">
                <label class="col-form-label">Yeni Şifre (Tekrar)</label>
                <input type="text" v-model="changePass.newPassAgain" class="form-control" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              @click="isActiveModal = !isActiveModal"
              class="btn btn-sm btn-outline-danger"
            >Vazgeç</button>
            <button
              :disabled="saveButtonActive"
              @click="registerPass()"
              class="btn btn-sm btn-primary"
            >Değiştir</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {
      changePass: { lastPass: "", newPass: "", newPassAgain: "" },
      error: [],
      updateUser: {},
      isActiveModal: false
    };
  },
  methods: {
    updateProfil() {
      this.$store
        .dispatch("User/updateProfil", this.updateUser)
        .then(res => {});
    },
    registerPass() {
      this.$store.dispatch("User/changePassword", this.changePass).then(res => {
        console.log(res);
      });
    }
  },
  computed: {
    saveButtonActive() {
      if (
        this.changePass.lastPass.length > 0 &&
        this.changePass.newPass.length > 0 &&
        this.changePass.newPassAgain.length > 0
      ) {
        return false;
      } else {
        return true;
      }
    }
  },
  async mounted() {
    setTimeout(() => {
      let userData = this.$store.getters["User/getUser"];
      this.updateUser = {
        ...userData
      };
    }, 200);
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
  background: #212121;
  border-radius: 8px;
  box-sizing: border-box;
  color: #fff;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 400px;
  left: 50%;
  top: 50%;
  z-index: 111 !important;
  transform: translate(-50%, -50%);
}
.modal-body {
  display: flex;
  flex: 1;
  height: auto;
}
.modal-title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 7px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background: #000;
  align-items: center;
}
.modal-footer {
  display: flex;
  width: 100%;
  padding: 7px;
  background: #000;
}
.modal-title .title {
  font-size: 19px;
  color: #fff;
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