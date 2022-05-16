<template>
  <li 
    class="flex flex-col items-stretch justify-center"
    :class="{[`!h-auto`]: isOpen }">
    <a 
      class="block cursor-pointer h-full"
      :class="{ [`hover:bg-gray-100`]: !isOpen, [`pointer-events-none`]: !title }"
      @click="setOpen(!isOpen)">
      <div class="px-4 py-4 flex items-center sm:px-6">
        <div class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
          <div class="flex-shrink-0 mb-2">
            <img 
              v-if="image"
              class="h-12 w-12 rounded-md" :src="image" alt="" />

            <div 
              v-else
              class="h-12 w-12 bg-gray-200 rounded-md animate-pulse" />
          </div>

          <div class="min-w-0 flex-1 sm:px-4">
            <div v-if="title">
              <p class="text-sm font-bold text-indigo-500 truncate">{{ title }}</p>

              <p 
                v-if="start"
                class="mt-2 flex items-center text-sm text-gray-400">
                <span v-text="date" />
              </p>
            </div>

            <div v-else>
              <p class="bg-gray-200 w-48 h-4 rounded-md animate-pulse">{{ title }}</p>
              <p class="bg-gray-200 w-24 h-4 mt-4 rounded-md animate-pulse">{{ title }}</p>
            </div>
          </div>

          <div class="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
            <div class="flex overflow-hidden -space-x-1">
              <template v-for="attendee in attendees">
                <Attendee 
                  :image="attendee.image"
                  :key="attendee.username"
                  :username="attendee.username" />
              </template>
            </div>
          </div>
        </div>

        <div class="ml-5 flex-shrink-0">
          <IconChevronRight 
            class="h-5 w-5 text-gray-400 transition-all" 
            :class="{ [`rotate-90`]: isOpen }"
            aria-hidden="true" />
        </div>
      </div>

      <div 
        v-if="isOpen"
        class="px-4 py-4 flex flex-col items-start sm:px-6 text-gray-600 text-sm">
        <p 
          v-if="description"
          v-text="description" />

          <div class="mt-4 flex items-center">
            <span 
              v-if="totalAttending"
              class="cursor-default inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800">
              <svg class="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400" fill="currentColor" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="3" />
              </svg>
              Total Attending: {{ totalAttending }}
            </span>

            <div class="w-12 h-0.5 bg-indigo-400 mx-4" />
            
            <a 
              class="inline-flex items-center rounded-md text-indigo-600 font-semibold hover:underline"
              :href="link"
              target="_blank">
              Get Tickets
              <IconExternalLink class="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
            </a>
        </div>
      </div>
    </a>
  </li>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Attendee } from '~/apollo/types/plan'
import { getDateString } from '~/utils/get-date-string';

export default Vue.extend({
  props: {
    image: String,
    description: String,
    link: String,
    title: String,
    end: Object as PropType<{ utc: string}>,
    start: Object as PropType<{ utc: string}>,
    attendees: { type: Array as PropType<Attendee[]>, default: () => ([]) },
    totalAttending: Number,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    date(): string | null {
      if (!this.start) {
        return null;
      }

      return getDateString(this.start.utc, this.end?.utc);
    },
  },
  methods: {
    setOpen(state: boolean) {
      this.isOpen = state;
    },
  },
})
</script>