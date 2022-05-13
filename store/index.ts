import { defaultTitle } from '~/config/default-title';

interface State {
  appLogo: string;
  appTitle: string;
}

export const state: () => State = () => ({
  appLogo: 'images/irl.png',
  appTitle: defaultTitle,
})

export const mutations = {
  setAppLogo(state: State, url: string) {
    state.appLogo = url;
  },

  setAppTitle(state: State, title: string) {
    state.appTitle = title;
  }
}