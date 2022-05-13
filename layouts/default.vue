<template>
  <div class="px-6 py-6 m-auto bg-gray-50 h-screen flex flex-col">
    <AppHeader 
      :logo="appLogo"
      :title="appTitle" />

    <Nuxt class="flex-1" />

    <AppFooter />
  </div>
</template>

<script lang="ts">
export default {
  computed: {
    appTitle() {
      return this.$store.state.appTitle;
    },
    appLogo() {
      return this.$store.state.appLogo;
    },
  },
}
</script>