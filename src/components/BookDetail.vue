<template>
  <div class="container my-5">
    <div class="row bg-dark shadow px-3 py-4">
      <div class="col-md-3 p-0">
        <img
          class="img-fluid shadow"
          src="http://kbimages1-a.akamaihd.net/Images/1666c157-d3f1-44b2-b68d-939fc040e74a/255/400/False/image.jpg"
          alt
        />
      </div>
      <div class="col-md-9 flex-column d-flex">
        <h1 class="book-title">Kırk Haramiler</h1>
        <p style="flex:1;" class="text-muted">
          Değerli Çocuklar,
          Şeker mi Şeker Kitaplar, çocuklar için vazgeçilmez 50 klasik bu sette... Üstelik 20 tanesi MEB tavsiyeli... Çocuklarımızın mutlaka okumaları gereken doğu-batı klasikleri onların seveceği bir üslupla yeniden yazıldı.
          Çocuk Klasikleri şipşirin hazırlanmış Şeker Kitaplar Evi kutusunda okuyucularını bekliyor. Şeker Kitaplar Evi'nin kapıları tüm kitapsever çocuklara açık... İçeride onları heyecanlı, duygulu, şaşırtıcı pek çok macera bekliyor.
        </p>
        <div>
          <div class="badge badge-secondary p-2">Sayfa Sayısı: 9</div>
          <div class="badge badge-secondary p-2 ml-3">Stok: 29</div>
          <div class="badge badge-secondary p-2 ml-3">Fiyat: 3,50 TL</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { book: null };
  },
  async mounted() {}
};
</script>

<style scoped>
.book-title {
  font-weight: 600;
}
.bg-dark {
  background-color: #212121;
}
</style>