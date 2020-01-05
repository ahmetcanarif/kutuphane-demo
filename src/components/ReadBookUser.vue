<template>
  <div class="row px-4 justify-content-between">
    <h1 class="title mb-3 col-md-12">Okuduğun Kitaplar</h1>

    <div
      v-for="(book,index) in readUserBook"
      :key="index"
      style="width:200px !important;"
      class="shadow col-md-3 d-flex flex-column m-2 text-center book-card rounded px-0"
    >
      <div>
        <img
          class="img-fluid mb-2"
          style="height:300px !important; width:100%; border-top-left-radius:7px;border-top-right-radius:7px;"
          :src="`http://localhost/kutuphane/admin/kitap_img/${book.resim}`"
          alt
        />
      </div>
      <div class="book-title">{{ book.ad }}</div>
      <router-link
        :to="`book/${book.id}`"
        tag="button"
        class="btn detail-btn btn-sm btn-block text-white font-weight-bold mt-4"
      >View</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      readUserBook: []
    };
  },
  async mounted() {
    this.readBookUser = await this.$store
      .dispatch("User/getUserReadBooks")
      .then(res => {
        this.readUserBook = res.readBook;
      });
  }
};
</script>

<style>
.book-title {
  font-size: 18px;
  margin-top: 12px;
  color: #fff;
  font-weight: bold;
}

.detail-btn {
  background-color: #5806d2;
}
.title {
  font-size: 26px;
  font-weight: bold;
  color: #fff;
}
.book-card {
  background: #000 !important;
}
</style>