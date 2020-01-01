<template>
  <div class="home">
    <Hero />
    <PopularBook />
    <Info />
    <LastBook />
  </div>
</template>

<script>
// @ is an alias to /src
import PopularBook from "@/components/PopularBook";
import LastBook from "@/components/LastBook";
import Hero from "@/components/Hero";
import Info from "@/components/Info";

export default {
  name: "home",
  components: {
    PopularBook,
    LastBook,
    Hero,
    Info
  },
  mounted() {
    this.$store.dispatch("Book/getData");
  }
};
</script>
<style >
.home div {
  height: 100%;
}
</style>