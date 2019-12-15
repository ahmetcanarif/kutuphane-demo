<template>
  <div>
    <Header>
      <slot name="header">
        <Navbar />
      </slot>
    </Header>
    <main>
      <slot></slot>
    </main>
    <div>
      <slot name="footer">
        <Footer />
      </slot>
    </div>
  </div>
</template>

<script>
import Header from "../components/Navbar";
import Footer from "../components/Footer";
export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss" scoped>
</style>