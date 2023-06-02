import { createStore } from "vuex";
import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

const store = createStore({
  state() {
    return {
      lat: null,
      lng: null,
      areaName: null,
      lastUpdated: null,
      customDate: null,
      defaultCrimes: {},
      customCrimes: {},
      averageDefaultCrimes: {},
      averageCustomCrimes: {},
      displayCrime: null,
      showCustomMonthYear: false,
      error: null,
      currentPostCode: null,
      showMonthAverage: false,
      infoDialog: null,
      customSelectMonth: null,
    };
  },
  mutations,
  actions,
  getters,
});

export default store;
