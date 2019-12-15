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
            <router-link tag="a" to="/book" exact active-class="active">
              <div class="list-group-item active">Tümü</div>
            </router-link>

            <router-link tag="a" to="/book/" active-class="active">
              <div class="list-group-item">asdasd</div>
            </router-link>
          </div>
        </div>
      </div>
      <Loading v-if="loading" />
      <div v-if="!loading" class="col-md-9">
        <div class="row shadow bg-white my-4 py-3" v-for="(photo,index) in display" :key="index">
          <div class="col-md-4">
            <img style="height: 100% !important;width: 100%;" class="img-fluid" src="img" />
          </div>
          <div class="col-md-8 d-flex flex-column">
            <h3 class="mt-0 book-title font-weight-bold">{{ photo.title | capitalize }}</h3>
            <div style="border-bottom: 1px dashed #ccc;" class="mb-2"></div>
            <div class="d-flex" style="flex:1;">
              <p class="mx-0 book-body">{{ photo.body}}</p>
            </div>
            <div class="detay">
              <div class="row">
                <span class="btn btn-sm btn-secondary ml-auto mr-3">View -></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center col-md-12">
        <button :disabled="page === 1" @click="page = page - 1" class="mx-4 btn btn-primary">Prev</button>
        <button
          class="btn btn-sm btn-primary"
          :class="{'btn-warning':pages === page}"
          @click="nextPage(pages)"
          v-for="(pages,index) in last"
          :key="index"
        >{{ pages }}</button>
        <button :disabled="page == last" @click="page = page + 1" class="mx-4 btn btn-primary">Next</button>
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
      loading: true,
      range: 10,
      page: 1,
      pageTotal: 3
    };
  },
  mounted() {
    this.getData();
  },
  filters: {
    capitalize(val) {
      return val.charAt(0).toUpperCase() + val.slice(1);
    }
  },
  methods: {
    async getData() {
      await axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then(res => {
          this.data = res.data;
          this.loading = false;
        });
    },
    nextPage(page) {
      console.log(page);
      this.page = page;
    }
  },
  watch: {
    page(a) {
      this.page = a;
      console.log(a);
    }
  },
  computed: {
    last() {
      return this.data.length / this.range;
    },
    display() {
      let range = this.range;
      let offset = this.range * this.page;
      console.log(offset);
      return this.data.slice(this.data, offset);
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
  background: rgba(255, 255, 255, 0.3);
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