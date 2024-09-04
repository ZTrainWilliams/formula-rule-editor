import { createStore } from 'vuex';

export const store = createStore({
  state() {
    return {
      userInfo: {
        id: 0,
        username: '',
        nickname: '',
      },
      screenIsFull: false,
    };
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
  },
});
