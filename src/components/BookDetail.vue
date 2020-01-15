<template>
  <div class="container my-4 rounded py-4 bg-dark">
    <div
      class="images rounded"
      :style="`background:url('http://localhost/kutuphane/admin/kitap_img/${book.resim}')`"
    >
      <div class="ss rounded">
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
                <td width="150">Kitap Adı :</td>
                <td>{{ book.ad }}</td>
              </tr>
              <tr>
                <td width="150">Tür :</td>
                <td>{{ book.tur }}</td>
              </tr>
              <tr>
                <td width="150">Yazar :</td>
                <td>{{ book.yazar }}</td>
              </tr>
              <tr>
                <td width="150">Yayınevi :</td>
                <td>{{ book.yayinevi}}</td>
              </tr>
              <tr>
                <td width="150">Sayfa Sayısı :</td>
                <td>{{ book.sayfa_sayisi}}</td>
              </tr>
              <tr>
                <td width="150">Fiyat :</td>
                <td>{{ book.fiyat | priceFormat(book.fiyat)}} ₺</td>
              </tr>
              <tr>
                <td width="150">Stok :</td>
                <td>{{ book.stok }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card bg-black border-0 sticky-top">
          <div class="card-body d-flex text-center flex-column align-items-center">
            <span>
              <i class="far fa-check-circle fa-2x text-pink"></i>
            </span>
            <p
              class="mt-3"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, voluptatum?</p>
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
.font-weight-bold {
  font-size: 13px !important;
}
.bg-dark {
  background-color: #212121 !important;
}
.bg-black {
  background: #191919;
  color: #494949;
}
table td {
  border: none !important;
}
.text-pink {
  font-size: 46px;
  color: green;
}
.images {
  background-position: center !important;
  height: 300px !important ;
  width: 100%;
  position: relative;
}

.ss {
  background: rgba(0, 0, 0, 0.7);
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
.ss h2 {
  font-size: 50px;
  letter-spacing: 7px;
}
.ss h6 {
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 7px;
}
</style>