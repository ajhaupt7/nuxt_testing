<template>
  <div class="max-w-3xl w-full m-auto py-8">
    <div 
      class="bg-white shadow overflow-hidden sm:rounded-md">
      <div v-if="$fetchState.error">
        Something went wrong: {{ $fetchState.error.message }}
      </div>

      <TransitionGroup
        appear
        tag="ul"
        class="divide-y divide-gray-200"
        :css="false"
        @after-enter="onAfterEnter"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave">
        <Plan 
          v-for="(plan, index) in plans"
          :class="`min-h-[${eventHeight}]`"
          :key="plan.key"
          :data-index="index"
          :description="plan.description"
          :link="plan.link"
          :image="plan.image"
          :title="plan.title"
          :end="plan.end"
          :start="plan.start"
          :attendees="plan.attendingOrInterested"
          :total-attending="plan.attendingOrInterestedCount" />
      </TransitionGroup>
    </div>
  </div>
</template>

<script lang="ts">
import { fetchUserAndPlans } from '~/services/fetch-user-and-plans';
import Vue from 'vue';
import { Plan } from '~/apollo/types/plan';
import { User } from '~/apollo/types/user'
import { eventHeight } from '~/config/event-height';
import gsap from 'gsap';

export default Vue.extend({
  name: 'Username',
  data(): {
    eventHeight: string;
    plans: Plan[];
    user: User | {}; 
  } {
    return {
      eventHeight,
      plans: Array.from(Array(5).keys()).map(i => ({ key: i.toString() })),
      user: {},
    }
  },
  mounted() {
    this.$store.commit('setCurrentUsername', this.$route.params.username);
  },
  async fetch() {
    const data = await fetchUserAndPlans(
      this.$route.params.username, 
      // @ts-ignore
      this.$apollo.query,
      { useMockData: true },
    );

    this.$store.commit('setAppLogo', data.user.image);

    this.plans = data.userPlans.plans.sort((a: Plan, b: Plan) => a.start!.utc >= b.start!.utc ? 1 : -1);
    this.user = data.user;
  },
  fetchOnServer: false,
  fetchKey: 'username-page-fetch',
  methods: {
    onAfterEnter(el: HTMLElement) {
      el.style.height = 'auto';
    },

    onBeforeEnter(el: HTMLElement) {
      el.style.opacity = '0';
      el.style.height = '0';
    },

    onEnter(el: HTMLElement, done: gsap.Callback) {
      gsap.to(el, {
        opacity: 1,
        minHeight: eventHeight,
        delay: Number(el.dataset.index) * 0.15,
        onComplete: done
      })
    },

    onLeave(el: HTMLElement, done: gsap.Callback) {
      gsap.to(el, {
        opacity: 0,
        height: 0,
        minHeight: 0,
        delay: Number(el.dataset.index) * 0.15,
        onComplete: done
      })
    },
  }
});
</script>