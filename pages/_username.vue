<template>
  <div>
    {{ $route.params.username }}
    <div v-if="$fetchState.error">
      Something went wrong: {{ $fetchState.error.message }}
    </div>
  </div>
</template>

<script>
import { fetchUserAndPlans } from '~/services/fetch-user-and-plans';

export default {
  name: 'Username',
  data() {
    return {
      user: {},
      userPlans: {},
    }
  },
  mounted() {
    this.$store.commit('setAppTitle', `Searching for ${this.$route.params.username}`);
  },
  async fetch() {
    const data = await fetchUserAndPlans(
      this.$route.params.username, 
      this.$apollo.query,
      this.$config.API_ENV === 'test',
    );

    return data;
  },
  fetchOnServer: false,
  fetchKey: 'username-page-fetch',
}
</script>