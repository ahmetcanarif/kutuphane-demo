<template>
  <div class="row px-4 justify-content-between">
    <h1 class="title mb-3 col-md-12">Okuduğun Kitaplar</h1>
    <table v-if="readUserBook.length > 0" class="table table-dark table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th>#</th>
          <th>Kitap Adı</th>
          <th>Kitap Türü</th>
          <th>Aldığın Tarih</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in readUserBook" :key="book.id">
          <td>{{ book.id }}</td>
          <td>{{ book.ad }}</td>
          <td>{{ book.tur }}</td>
          <td>{{ book.verilme_tarihi | moment("DD-mm-YYYY") }}</td>
          <td>
            <router-link :to="`book/${book.id}`" class="detail-btn">Detay</router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else-if="readUserBook.length <= 0">
      <div class="alert alert-dark">Şuana kadar okumuş olduğun herhangi bir kitap bulunamadı.</div>
      <div class="alert alert-info">
        Beğendiğiniz kitapları bulmak, okumak için
        <router-link to="/book" tag="a">tıklayınız.</router-link>
      </div>
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
<style scoped>
.book-title {
  font-size: 18px;
  margin-top: 12px;
  color: #fff;
  font-weight: bold;
}
.thead-dark {
  background: #5806d2;
}
.alert-dark {
  background: #000;
  border: 0;
  color: #fff;
}
a {
  color: #f64c72 !important;
  font-weight: bold;
}
.alert-info {
  border: 0 !important;
  background: #00787d !important;
  color: #fff !important;
}
.detail-btn {
  background: #f64c72;
  padding: 5px 10px;
  color: #222;
  font-weight: 600;
  outline: none !important;
  border: none !important;
  border-radius: 3px;
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