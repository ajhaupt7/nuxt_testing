<template>
  <div class="px-6 py-6 m-auto bg-gray-50 h-full flex flex-col">
    <AppHeader 
      :logo="appLogo"
      :username="currentUsername" />

    <Nuxt class="flex-1" />

    <AppFooter />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  computed: {
    currentUsername(): string {
      return this.$store.state.currentUsername;
    },
    appLogo(): string {
      return this.$store.state.appLogo;
    },
  },
})
</script>