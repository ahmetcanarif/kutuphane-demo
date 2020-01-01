<template>
  <div class="row px-4">
    <div class="col-md-12">
      <span class="title mb-3 d-inline-block border-bottom">Okuduğun Kitaplar</span>
    </div>

    <div
      v-for="(book,index) in readUserBook"
      :key="index"
      style="width:200px !important"
      class="shadow d-flex flex-column m-2 justify-content-around text-center book-card rounded px-0"
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
        class="btn detail-btn btn-sm btn-block btn-primary mt-4"
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
  color: #212121;
  font-weight: bold;
}
.title {
  font-size: 25px;
  font-weight: bold;
  padding-bottom: 5px;
}
</style>