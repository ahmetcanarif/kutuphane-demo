<template>
  <div class="bg-primary">
    <div class="container">
      <div class="row content">
        <div class="col-md-6">
          <h1 class="title">Read a Book?</h1>
          <p
            class="desc"
          >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi, rerum aperiam qui exercitationem ipsa distinctio.</p>
          <button class="btn btn-secondary btn-sm">Get Started</button>
        </div>
        <div class="col-md-6">
          <img
            class="img-fluid"
            src="https://images.unsplash.com/photo-1510172951991-856a654063f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
            alt
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.bg-primary {
  height: 450px;
  background-color: #212121 !important;
  align-items: center !important;
  justify-content: center;
  display: flex;
}
.title {
  color: white;
}
.content {
  align-items: center;
}
.img-fluid {
  height: 300px;
  width: 100%;
}
.desc {
  color: rgba(255, 255, 255, 0.7);
}
.btn-secondary {
  border-color: #f64c72;
  background: #f64c72;
  outline: 0 !important;
}
.btn-secondary:focus {
  outline: 0 !important;
  background: #f64c72 !important;
  border-color: #f64c72 !important;
}
</style>