<template>
  <div class="flex items-center justify-center">
    <img 
      class="w-12 mix-blend-multiply"
      :src="logo" />

    <h1 
      class="ml-4 text-2xl font-bold"
      v-text="title" />
  </div>
</template>

<script lang="ts">
export default {
  props: {
    logo: { type: String, required: true },
    title: { type: String, required: true },
  },
}
</script>