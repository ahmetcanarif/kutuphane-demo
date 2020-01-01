<template>
  <div class="container mt-5">
    <h1
      style="font-size:32px;"
      class="font-weight-bold text-center title col-md-12 mt-5"
    >KİTAPLARIMIZ</h1>
    <div class="row mt-5">
      <div class="col-md-3 my-4">
        <div class="sticky-top">
          <div class="list-group shadow">
            <div
              @click="filteredCategory('Tümü')"
              :class="{'active':selectedCategory == 'Tümü'}"
              class="list-group-item"
            >Tümü</div>

            <div
              @click="filteredCategory(categories.tur)"
              v-for="categories in category"
              :key="categories.id"
              :class="{'active':selectedCategory === categories.tur}"
              class="list-group-item"
            >{{ categories.tur }}</div>
          </div>
        </div>
      </div>
      <Loading v-if="loading" />
      <div v-if="!loading" class="col-md-9">
        <div v-if="isFilterCategory">
          <div class="alert alert-warning" v-if="filteredData.length === 0">lorem</div>
          <div
            class="row shadow bg-white my-4 py-3"
            v-for="(book,index) in filteredDisplay"
            :key="index"
          >
            <div class="col-md-4">
              <img
                style="height: 100% !important;width: 100%;"
                class="img-fluid"
                :src="`http://localhost/kutuphane/admin/kitap_img/${book.resim}`"
              />
            </div>
            <div class="col-md-8 d-flex flex-column">
              <h3 class="mt-0 book-title font-weight-bold">{{ book.ad }}</h3>
              <div style="border-bottom: 1px dashed #ccc;" class="mb-2"></div>
              <div class="d-flex" style="flex:1;">
                <p class="mx-0 book-body">{{ book.tur}}</p>
              </div>
              <div class="detay">
                <div class="row">
                  <router-link
                    :to="`/book/${book.id}`"
                    class="btn btn-sm btn-secondary ml-auto mr-3"
                  >View -></router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!isFilterCategory">
          <div class="row shadow bg-white my-4 py-3" v-for="(book,index) in display" :key="index">
            <div class="col-md-4">
              <img
                style="height: 100% !important;width: 100%;"
                class="img-fluid"
                :src="`http://localhost/kutuphane/admin/kitap_img/${book.resim}`"
              />
            </div>
            <div class="col-md-8 d-flex flex-column">
              <h3 class="mt-0 book-title font-weight-bold">{{ book.ad }}</h3>
              <div style="border-bottom: 1px dashed #ccc;" class="mb-2"></div>
              <div class="d-flex" style="flex:1;">
                <p class="mx-0 book-body">{{ book.tur}}</p>
              </div>
              <div class="detay">
                <div class="row">
                  <router-link
                    :to="`/book/${book.id}`"
                    class="btn btn-sm btn-secondary ml-auto mr-3"
                  >View -></router-link>
                </div>
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
      <div class="text-center col-md-12" v-if="isFilterCategory">
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
  async mounted() {
    this.selectedCategory = "Tümü";
    await this.$store.dispatch("Book/getData").then(() => {
      const res = this.$store.getters["Book/getBooks"];
      this.data = res.books;
      this.loading = false;
      let lastPage = Math.floor(this.data.length / this.range) + 1;
      for (let i = 1; i <= lastPage; i++) {
        this.allPages.push(i);
      }
    });
    await this.$store.dispatch("Book/getCategory").then(() => {
      const res = this.$store.getters["Book/getCategory"];
      this.category = res.category;
    });
  },
  filters: {
    capitalize(val) {
      return val.charAt(0).toUpperCase() + val.slice(1);
    }
  },
  methods: {
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
  background: #fff !important;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
  border-radius: 7px;
  transition: 0.5s;
}
.img-fluid {
  height: 250px;
}
.active {
  background: #f3f3f3;
  color: #232323;
}
.list-group-item {
  color: #232323;
}
.title {
  color: #f64c72;
}
.book-title {
  font-size: 20px;
  color: #232323;
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