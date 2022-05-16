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
        <template v-if="plans.length">
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
        </template>

        <template v-else>
          <Plan 
            v-for="i in 5"
            :key="i" />
        </template>
      </TransitionGroup>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Plan } from '~/apollo/types/plan';
import { User } from '~/apollo/types/user'
import { eventHeight } from '~/config/event-height';
import { UserAndPlansResponse } from '~/apollo/types/user-and-plans-response';
import * as mockQuery from '~/apollo/mocks/get-user-and-plans.json';
import getUserAndPlans from '~/apollo/queries/get-user-and-plans.gql';
import advancedGetUserAndPlans from '~/apollo/queries/advanced-get-user-and-plans.gql';
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
      plans:[],
      user: {},
    }
  },
  mounted() {
    this.$store.commit('setCurrentUsername', this.$route.params.username);
  },
  async fetch() {
    const data = await this.fetchUserAndPlans(
      this.$route.params.username, 
      { useMockData: false },
    );

    this.$store.commit('setAppLogo', data.user.image);

    this.plans = data.userPlans.plans.sort((a: Plan, b: Plan) => a.start!.utc >= b.start!.utc ? 1 : -1);
    this.user = data.user;
  },
  fetchOnServer: false,
  fetchKey: 'username-page-fetch',
  methods: {
    // Would better fit in a standalone service eventually.
    async fetchUserAndPlans(
      username: string, 
      options: { useMockData?: boolean, useAdvancedQuery?: boolean } = {},
    ): Promise<UserAndPlansResponse> {
      if (options.useMockData) {
        return new Promise(resolve => {
          setTimeout(() => resolve(mockQuery.data), 2000);
        });
      }

      try {
        // @ts-ignore
        const { data } = await this.$apollo.query({
          query: options.useAdvancedQuery ? advancedGetUserAndPlans : getUserAndPlans,
          variables: {
            dateFilter: "upcoming",
            dateFilterOnEmpty: "past",
            page: 0,
            username,
          },
        });
        
        if (!data.user) {
          throw new Error('No user found.');
        }

        return {
          userPlans: data.userPlans,
          user: data.user,
        };
      } catch (e) {
        console.error(e);

        return mockQuery.data;
      }
    },

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