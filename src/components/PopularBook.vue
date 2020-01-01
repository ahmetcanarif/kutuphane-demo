<template>
  <div style="height:100% !important" class="container mt-5">
    <h2 class="text-center title">The Most Popular</h2>
    <div class="row justify-content-center">
      <div v-for="book in books" :key="book.id" class="col-md-3 m-2 text-center book-card py-3">
        <div>
          <img
            class="img-fluid mb-2"
            :src="`http://localhost/kutuphane/admin/kitap_img/${book.resim}`"
            alt
          />
        </div>
        <div class="book-title">{{ book.ad }}</div>
        <div class="book-author">{{ book.yazar }}</div>
        <div class="book-publishing-house">{{ book.yayinevi }}</div>
        <router-link
          :to="`book/${book.id}`"
          tag="button"
          class="btn detail-btn btn-sm btn-block btn-primary mt-3"
        >View</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: []
    };
  },
  async mounted() {
    await this.$store.dispatch("Book/getPopularBooks").then(() => {
      const res = this.$store.getters["Book/getPopularBook"];
      this.books = res.popularBooks;
    });
  }
};
</script>

<style scoped>
.book-card {
  background: #fff !important;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
  border-radius: 7px;
  transition: 0.5s;
}
.img-fluid {
  height: 250px;
}
.title {
  color: #f64c72;
}
.book-title {
  font-size: 20px;
  color: #553d67;
}
.book-publishing-house,
.book-author {
  color: #99738e;
  font-weight: 500;
  font-size: 14px;
}
.detail-btn,
.detail-btn:focus {
  background: #f64c72 !important;
  border-color: #f64c72 !important;
}
.detail-btn {
  font-weight: 600;
}
.book-card:hover {
  transform: scale(1.01);
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
</style>