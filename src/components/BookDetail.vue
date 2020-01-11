<template>
  <div class="container my-5">
    <div class="row bg-dark rounded shadow px-3 py-4">
      <div class="col-md-3 p-0">
        <img
          class="img-fluid shadow"
          :src="`http://localhost/kutuphane/admin/kitap_img/${book.resim}`"
          alt
        />
      </div>
      <div class="col-md-9 flex-column d-flex">
        <h2 class="book-title">{{ book.ad }}</h2>
        <p style="flex:1;" class="text-muted">{{ book.aciklama}}</p>
        <div>
          <div
            class="badge font-weight-bold badge-secondary p-2"
          >Sayfa Sayısı : {{ book.sayfa_sayisi}}</div>
          <div
            :class="{'bg-danger':book.stok == 0}"
            class="badge font-weight-bold badge-secondary p-2 ml-3"
          >Stok : {{ book.stok }}</div>
          <div class="badge font-weight-bold badge-secondary p-2 ml-3">Fiyat : {{ book.fiyat}} TL</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { book: {} };
  },
  async mounted() {
    if (this.$store.state.Book.books.length > 0) {
      const res = this.$store.state.Book.books.filter(item => {
        return item.id === this.$route.params.id;
      });
      this.book = res[0];
    } else {
      this.$store
        .dispatch("Book/getOneBook", this.$route.params.id)
        .then(res => {
          this.book = res.book;
        });
    }
  }
};
</script>

<style scoped>
.book-title {
  font-weight: 600;
  color: #fff;
}
.font-weight-bold {
  font-size: 13px !important;
}
.bg-dark {
  background-color: #212121 !important;
}
</style>