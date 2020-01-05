<template>
  <div class="container my-5">
    <div class="row bg-dark rounded shadow px-3 py-4">
      <div class="col-md-3 p-0">
        <img
          class="img-fluid shadow"
          src="http://kbimages1-a.akamaihd.net/Images/1666c157-d3f1-44b2-b68d-939fc040e74a/255/400/False/image.jpg"
          alt
        />
      </div>
      <div class="col-md-9 flex-column d-flex">
        <h2 class="book-title">{{ book.ad }} s</h2>
        <p style="flex:1;" class="text-muted">{{ book.aciklama}}</p>
        <div>
          <div class="badge badge-secondary p-2">Sayfa Sayısı : {{ book.sayfa_sayisi}}</div>
          <div class="badge badge-secondary p-2 ml-3">Stok : {{ book.stok }}</div>
          <div class="badge badge-secondary p-2 ml-3">Fiyat : {{ book.fiyat}} TL</div>
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
    const res = this.$store.state.Book.books.filter(item => {
      return item.id === this.$route.params.id;
    });
    this.book = res[0];
  }
};
</script>

<style scoped>
.book-title {
  font-weight: 600;
  color: #fff;
}
.bg-dark {
  background-color: #212121 !important;
}
</style>