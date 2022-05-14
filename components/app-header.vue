<template>
  <div class="flex items-center justify-center">
    <transition 
      mode="out-in"
      name="fade">
      <img 
        class="w-12 mix-blend-multiply rounded-lg"
        :key="logo"
        :src="logo" />
    </transition>

    <h1 class="ml-4 text-2xl font-bold relative">
      <span v-text="'IRL Events'" />

      <transition 
        mode="out-in"
        name="slide">
        <div 
          v-if="username"
          class="absolute top-100 text-sm"
          :key="username"
          v-text="username" />
      </transition>
    </h1>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    logo: { type: String, required: true },
    username: String,
  },
}
</script>

<style>
/* .fade-enter-active, .fade-leave-active {
  transition: all .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
} */

.slide-enter-active , .slide-leave-active{
  transition: all .5s cubic-bezier(0.4, 0, 0.6, 1);
}

.slide-enter, .slide-leave-to  {
  opacity: 0;
  transform: translateY(-1rem);
}

.fade-enter-active , .fade-leave-active{
  transition: all .35s ease-in-out;
}

.fade-enter, .fade-leave-to  {
  opacity: 0;
  transform: scale(0);
}
</style>