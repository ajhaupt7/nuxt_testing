<template>
  <div 
    :key="username" 
    class="h-6 w-6 rounded-full ring-2 ring-white bg-cover bg-center inline-flex items-center justify-center"
    :class="backgroundColor"
    :style="{ backgroundImage: `url(${image})` }" 
    :alt="username">
    <span 
      v-text="username[0]"
      v-if="!image"
      class="uppercase text-xs opacity-25" />
  </div>
</template>

<script lang="ts">
import { getRandomElement } from '~/utils/get-random-element';
import Vue from 'vue';

export default Vue.extend({
  props: {
    username: { type: String, required: true },
    image: String,
  },
  computed: {
    backgroundColor() {
      // Full classes here so they don't get purged in production.
      const colors = ['bg-red-400', 'bg-green-400', 'bg-blue-400', 'bg-indigo-400', 'bg-yellow-400'];

      return getRandomElement(colors)
    }
  },
})
</script>