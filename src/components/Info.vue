<template>
  <div class="bg-primary p-5 mt-5">
    <div class="row align-items-center justify-content-center">
      <div class="col-md-3 text-center info-row">
        <i class="fa fa-home text-white fa-2x rounded-circle p-4"></i>
        <h4 class="title my-3">Populer Book</h4>
        <p
          class="desc"
        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. A quas aperiam aliquam natus nobis optio.</p>
      </div>
      <div class="col-md-3 text-center info-row">
        <i class="fa fa-bars text-white fa-2x rounded-circle p-4"></i>
        <h4 class="title my-3">Populer Book</h4>
        <p
          class="desc"
        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. A quas aperiam aliquam natus nobis optio.</p>
      </div>
      <div class="col-md-3 text-center info-row">
        <i class="fa fa-list text-white fa-2x rounded-circle p-4"></i>
        <h4 class="title my-3">Populer Book</h4>

        <p
          class="desc"
        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. A quas aperiam aliquam natus nobis optio.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css");
.bg-primary {
  background-color: #242582 !important;
}
.info-row{
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
  align-items: center
}
.title {
  color: #fff;
}
.desc {
  color: rgba(255, 255, 255, 0.6);
}
</style>