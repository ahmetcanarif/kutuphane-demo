<template>
  <div class="container my-4 rounded py-4 bg-dark">
    <div
      class="images rounded"
      :style="`background:url('http://localhost/kutuphane/admin/kitap_img/${book.resim}')`"
    >
      <div class="thumbnail rounded">
        <h2>{{ book.ad }}</h2>
        <h6>{{ book.yazar }}</h6>
      </div>
    </div>

    <div class="row d-flex justify-content-between mt-4">
      <div class="col-md-6">
        <div class="card bg-black">
          <div class="card-header text-white border-bottom border-secondary">
            <h5 class="m-0">Detay</h5>
          </div>
          <div class="card-body p-2">
            <table class="table-hover text-white table">
              <tr>
                <th width="150">Kitap Adı :</th>
                <td>{{ book.ad }}</td>
              </tr>
              <tr>
                <th width="150">Tür :</th>
                <td>{{ book.tur }}</td>
              </tr>
              <tr>
                <th width="150">Yazar :</th>
                <td>{{ book.yazar }}</td>
              </tr>
              <tr>
                <th width="150">Yayınevi :</th>
                <td>{{ book.yayinevi}}</td>
              </tr>
              <tr>
                <th width="150">Sayfa Sayısı :</th>
                <td>{{ book.sayfa_sayisi}}</td>
              </tr>
              <tr>
                <th width="150">Fiyat :</th>
                <td>{{ book.fiyat | priceFormat(book.fiyat)}} ₺</td>
              </tr>
              <tr :class="{'bg-danger':book.stok === 0}">
                <th width="150">Stok :</th>
                <td>{{ book.stok }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card bg-black border-0 sticky-top">
          <div class="card-body d-flex flex-column align-items-center">
            <div style="width:80%">
              <div class="mb-3 text-center">
                <i class="far fa-check-circle fa-2x text-pink"></i>
              </div>
              <h5 class="mb-3 text-center font-weight-bold text-white">Bu kitabı beğendin mi?</h5>

              <div class="d-flex align-items-center text-center btn-group mb-3 px-2 rounded">
                <i class="text-danger far fa-heart"></i>

                <button class="btn btn-block text-secondary ml-0">Beğenilen kitaplara ekle</button>
              </div>
              <div class="d-flex align-items-center bg-pink text-center btn-group px-2 rounded">
                <i class="text-danger fas fa-shopping-cart"></i>

                <button
                  :disabled="book.stok === 0"
                  class="btn btn-block text-secondary ml-0"
                >Okumak için ayırt</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <h3 class="text-white col-md-12">Açıklama</h3>
      <div class="col-md-12">
        <p class="text-muted">{{ book.aciklama}}</p>
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
  },
  filters: {
    priceFormat(prices) {
      let currency_symbol = "₺";
      let price = prices;
      let formattedOutput = new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
        minimumFractionDigits: 2
      });

      return formattedOutput.format(price).replace(currency_symbol, "");
    }
  }
};
</script>

<style scoped>
.bg-dark {
  background-color: #212121 !important;
}
.bg-black {
  background: #191919;
  color: #494949;
}
.btn-group {
  cursor: pointer;
}
.btn-group button {
  font-size: 15px;
  font-weight: 600;
}
.btn-group:hover {
  background: #212121;
  transition: 400ms all;
}
table td,
table th {
  border: none !important;
}
.text-pink {
  font-size: 46px;
  color: #2ef92e;
}
.bg-pink {
  transition: 400ms all;
  background: #f64c72;
}

.images {
  background-position: center !important;
  height: 300px !important ;
  width: 100%;
  position: relative;
}

.thumbnail {
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.6) 70%
  );

  position: absolute;
  width: 100%;
  color: #fff;
  height: 100%;
  left: 0;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
}
.thumbnail h2 {
  font-size: 50px;
  letter-spacing: 7px;
}
.thumbnail h6 {
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 7px;
}
li {
  list-style: none;
}
button {
  font-weight: bold;
}
.bg-pink button,
.bg-pink i {
  color: #fff !important;
  font-weight: bold !important;
}
.bg-pink:hover i {
  color: #f64c72 !important;
}
</style>