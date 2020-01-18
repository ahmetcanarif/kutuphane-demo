<template>
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-6">
        <div class="card text-white bg-dark">
          <div class="card-header">
            <h3>Login Form</h3>
          </div>
          <div class="card-body">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";
export default {
  components: {
    LoginForm
  }
};
</script>

<style scoped>
.bg-dark {
  background: #212121 !important;
}
.card-header {
  border-color: #fff;
}
</style>