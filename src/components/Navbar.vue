<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <router-link to="/" tag="a" class="navbar-brand" href="#">Navbar</router-link>
      <button
        class="navbar-toggler text-white"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" exact active-class="active" to="/" tag="a">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/about" tag="a">About</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/book" tag="a">Books</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<style scoped>
.active {
  box-shadow: 0px -3px 0px #f64c72 inset;
}
.navbar {
  background: #242582;
  color: #fff;
  z-index: 1;
  height: 50px;
}
.nav-link,
.navbar-brand {
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
}
.nav-link.active {
  color: #f64c72;
}
.search {
  background: none;
  border: none;
  color: #f64c72;
  border: none;
  outline: none;
  outline-offset: -2px;
}
.search:focus {
  background: none;
  border-color: #f64c72;
  outline: none !important;
  outline-offset: -2px !important;
  color: #f64c72;
}

textarea:hover,
input:hover,
textarea:active,
input:active,
textarea:focus,
input:focus,
button:focus,
button:active,
button:hover,
label:focus,
.btn:active,
.btn.active {
  outline: 0px !important;
  -webkit-appearance: none;
  box-shadow: none !important;
}
.search::placeholder {
  color: #f64c72;
}
</style>
<script>
export default {};
</script>
