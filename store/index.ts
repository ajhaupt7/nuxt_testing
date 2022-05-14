interface State {
  appLogo: string;
  currentUsername?: string;
}

export const state: () => State = () => ({
  appLogo: 'images/irl.png',
  currentUsername: undefined,
})

export const mutations = {
  setAppLogo(state: State, url: string) {
    state.appLogo = url;
  },

  setCurrentUsername(state: State, username?: string) {
    state.currentUsername = username;
  }
}