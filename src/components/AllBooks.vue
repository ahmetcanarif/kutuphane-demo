<template>
  <div class="container mt-5">
    <h1
      style="font-size:32px;"
      class="font-weight-bold text-center title col-md-12 mt-5"
    >KİTAPLARIMIZ</h1>
    <div class="row mt-5">
      <div class="col-md-3 my-4">
        <div class="sticky-top">
          <div class="list-group dark shadow">
            <div
              @click="filteredCategory('Tümü')"
              :class="{'active':selectedCategory == 'Tümü'}"
              class="list-group-item bg-dark"
            >Tümü</div>

            <div
              @click="filteredCategory(categories.tur)"
              v-for="categories in category"
              :key="categories.id"
              :class="{'active':selectedCategory === categories.tur}"
              class="list-group-item bg-dark"
            >{{ categories.tur }}</div>
          </div>
        </div>
      </div>
      <Loading v-if="loading" />
      <div v-if="!loading" class="col-md-9">
        <div v-if="isFilterCategory">
          <div class="alert alert-dark mt-4" v-if="filteredData.length === 0">
            <span class="text-bold">{{ selectedCategory}}</span>
            isimli kategoriye ait herhangi bir kitap bulunamadı.
          </div>
          <div
            class="row shadow bg-dark my-4 pt-3"
            v-for="(book,index) in filteredDisplay"
            :key="index"
          >
            <div class="col-md-4">
              <img
                style="height: 90% !important;width: 100%;"
                class="img-fluid"
                :src="`http://localhost/kutuphane/admin/kitap_img/${book.resim}`"
              />
            </div>
            <div class="col-md-8 d-flex flex-column">
              <h3 class="mt-0 book-title font-weight-bold">{{ book.ad }}</h3>
              <div style="border-bottom: 1px dashed #ccc;" class="mb-2"></div>
              <div class="d-flex" style="flex:1;">
                <p class="mx-0 book-body">{{ book.aciklama | kisalt }}</p>
              </div>
            </div>
            <div class="detay bg-light-dark col-md-12 py-2">
              <div class="d-flex justify-content-between align-items-center">
                <i v-if="book.stok > 0" @click="saveLikeBook(book.id)" class="far fa-heart" />
                <router-link :to="`/book/${book.id}`" class="btn btn-sm btn-secondary mr-3">View -></router-link>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!isFilterCategory">
          <div class="row shadow bg-dark my-4 pt-3" v-for="(book,index) in display" :key="index">
            <div class="col-md-4">
              <img
                style="height:90% !important;width: 100%;"
                class="img-fluid"
                :src="`http://localhost/kutuphane/admin/kitap_img/${book.resim}`"
              />
            </div>
            <div class="col-md-8 d-flex flex-column">
              <h3 class="mt-0 book-title font-weight-bold">{{ book.ad }}</h3>
              <div style="border-bottom: 1px dashed #ccc;" class="mb-2"></div>
              <div class="d-flex" style="flex:1;">
                <p class="mx-0 book-body">{{ book.aciklama | kisalt }}</p>
              </div>
            </div>
            <div class="detay bg-light-dark col-md-12 py-2">
              <div class="d-flex justify-content-between align-items-center">
                <i v-if="book.stok > 0" @click="saveLikeBook(book.id)" class="far fa-heart" />

                <router-link :to="`/book/${book.id}`" class="btn btn-sm btn-secondary mr-3">View -></router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center col-md-12" v-if="!isFilterCategory">
        <nav class="d-flex justify-content-center" aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <span
                class="page-link"
                :class="{'d-none':page === 1}"
                @click="page = page - 1"
                aria-hidden="true"
              >&laquo;</span>
            </li>
            <li
              :class="{'active':pages === page}"
              @click="nextPage(pages)"
              v-for="(pages,index) in pagesTotal"
              :key="index"
              class="page-item"
            >
              <span class="page-link" href="#">{{ pages }}</span>
            </li>

            <li class="page-item">
              <span
                class="page-link"
                :class="{'d-none':page === last}"
                @click="page = page + 1"
                aria-hidden="true"
              >&raquo;</span>
            </li>
          </ul>
        </nav>
      </div>
      <div class="text-center col-md-12 mb-5" v-if="isFilterCategory">
        <nav class="d-flex justify-content-center" aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <span
                class="page-link"
                :class="{'d-none':page === 1}"
                @click="page = page - 1"
                aria-hidden="true"
              >&laquo;</span>
            </li>
            <li
              :class="{'active':pages === page}"
              @click="nextPage(pages)"
              v-for="(pages,index) in filteredPagesTotal"
              :key="index"
              class="page-item"
            >
              <span class="page-link" href="#">{{ pages }}</span>
            </li>

            <li class="page-item">
              <span
                class="page-link"
                :class="{'d-none':page === filteredLast}"
                @click="page = page + 1"
                aria-hidden="true"
              >&raquo;</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Loading from "./Loading";
export default {
  components: {
    Loading
  },
  data() {
    return {
      data: [],
      category: [],
      filteredData: [],
      selectedCategory: "",
      loading: true,
      range: 10,
      page: 1,
      pageTotal: 5,
      allPages: [],
      isFilterCategory: false
    };
  },
  filters: {
    kisalt(val) {
      console.log("filrer:", val);
      return val.substr(0, 10);
    }
  },
  async mounted() {
    this.selectedCategory = "Tümü";
    if (this.$store.state.Book.books.length !== 0) {
      this.data = this.$store.getters["Book/getBooks"];
      this.loading = false;
    } else {
      await this.$store.dispatch("Book/getData").then(() => {
        this.data = this.$store.getters["Book/getBooks"];
        this.loading = false;
        let lastPage = Math.floor(this.data.length / this.range) + 1;
        for (let i = 1; i <= lastPage; i++) {
          this.allPages.push(i);
        }
      });
    }
    if (this.$store.state.Book.categories.length !== 0) {
      this.category = this.$store.getters["Book/getCategory"];
    } else {
      await this.$store.dispatch("Book/getCategory").then(() => {
        this.category = this.$store.getters["Book/getCategory"];
      });
    }
  },
  filters: {
    kisalt(value) {
      if (value.length < 300) value;
      return value.substr(0, 300) + "...";
    }
  },
  methods: {
    saveLikeBook(id) {
      alert(id);
    },
    filteredCategory(category) {
      this.scrollToTop();
      this.page = 1;
      this.selectedCategory = category;
      if (category === "Tümü") {
        this.isFilterCategory = false;
        let lastPage = Math.floor(this.data.length / this.range) + 1;
        this.allPages = [];
        for (let i = 1; i <= lastPage; i++) {
          this.allPages.push(i);
        }
      } else {
        this.isFilterCategory = true;
        this.filterCategory = true;
        const result = this.data.filter(i => i.tur === category);
        this.filteredData = result;
      }
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    nextPage(page) {
      this.page = page;
    }
  },
  watch: {
    page(a) {
      this.page = a;
      this.scrollToTop();
    },
    filteredData(a) {
      let lastPage = Math.floor(this.filteredData.length / this.range) + 1;
      this.allPages = [];
      for (let i = 1; i <= lastPage; i++) {
        this.allPages.push(i);
      }
    }
  },
  computed: {
    last() {
      return Math.floor(this.data.length / this.range) + 1;
    },
    filteredLast() {
      return Math.floor(this.filteredData.length / this.range) + 1;
    },
    pagesTotal() {
      let lastPage = Math.floor(this.data.length / this.range) + 1;
      let pageSay;
      if (this.allPages.length > 3) {
        if (this.page >= 3) {
          pageSay = this.allPages.slice(this.page - 3, this.page + 2);
        } else if (this.page === 1) {
          pageSay = this.allPages.slice(this.page - 1, this.page + 2);
        } else if (this.page === 2) {
          pageSay = this.allPages.slice(this.page - 2, this.page + 2);
        } else if (this.page === this.allPages.length) {
          pageSay = this.allPages.slice(this.page - 5, this.page + 2);
        }
      } else {
        pageSay = this.allPages;
      }
      return pageSay;
    },
    filteredPagesTotal() {
      let pageSay;
      let lastPage = Math.floor(this.filteredData.length / this.range) + 1;
      if (this.allPages.length > 3) {
        if (this.page >= 3) {
          pageSay = this.allPages.slice(this.page - 3, this.page + 2);
        } else if (this.page === 1) {
          pageSay = this.allPages.slice(this.page - 1, this.page + 2);
        } else if (this.page === 2) {
          pageSay = this.allPages.slice(this.page - 2, this.page + 2);
        } else if (this.page === this.allPages.length) {
          pageSay = this.allPages.slice(this.page - 5, this.page + 2);
        }
      } else {
        pageSay = Math.floor(this.filteredData.length / this.range) + 1;
      }
      return pageSay;
    },

    display() {
      let range = this.range;
      let offset = this.page * this.range;
      //return this.data.slice(this.data, offset);
      return this.data.slice(this.page - 1, this.page + this.range);
    },
    filteredDisplay() {
      let range = this.range;
      let offset = this.page + this.range;
      //return this.data.slice(this.data, offset);
      return this.filteredData.slice(this.page - 1, offset);
    }
  }
};
</script>

<style scoped>
.book-card {
  background: #212121 !important;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
  border-radius: 7px;
  transition: 0.5s;
}
.img-fluid {
  height: 250px;
}
.list-group-item.active {
  background: #f64c72 !important;
  color: #232323;
}
.list-group-item {
  color: #232323;
}
.page-item.active span {
  background-color: #f64c72 !important;
}
.alert-dark {
  border: none !important;
  color: #fff;
  background: rgba(0, 0, 0, 0.4);
  font-size: 17px;
}
.page-item span {
  color: #fff;
  border: none;
  background-color: #212121 !important;
}
.book-title,
.title {
  color: #fff !important;
}
.book-body {
  color: rgba(255, 255, 255, 0.5) !important;
}
.book-title {
  font-size: 20px;
}
.bg-dark {
  background-color: #212121 !important;
  color: #fff !important;
}
.bg-light-dark {
  background: rgba(55, 55, 55, 0.3);
}
.book-body {
  color: rgba(0, 0, 0, 0.5);
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
.list-group,
.list-group-item {
  border: none !important	;
}
.text-bold {
  font-weight: bold;
  color: #f64c72;
}
.list-group-item:last-child {
  border-radius: 0px !important;
}
.book-card:hover {
  transform: scale(1.01);
}
.btn-secondary {
  border-color: #f64c72;
  background: #f64c72;
  outline: 0 !important;
}
.btn-secondary:focus {
  outline: 0 !important;
  background: #f64c72 !important;
  border-color: #f64c72 !important;
}
</style>