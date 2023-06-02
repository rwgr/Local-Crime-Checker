export default {
  getAreaName(state) {
    return state.areaName;
  },
  getLastUpdated(state) {
    return state.lastUpdated;
  },
  getDefaultCrimes(state) {
    return state.defaultCrimes;
  },
  getCustomCrimes(state) {
    return state.customCrimes;
  },
  getAverageDefaultCrimes(state) {
    return state.averageDefaultCrimes;
  },
  getAverageCustomCrimes(state) {
    return state.averageCustomCrimes;
  },
  // getDefaultYearCrime(state) {
  //   return state.defaultYearCrime;
  // },
  // getCustomYearCrime(state) {
  //   return state.customYearCrime;
  // },
  getDisplayCrime(state) {
    return state.displayCrime;
  },
  getCustomDate(state) {
    return state.customDate;
  },
  getStreetLevelCrimesComparison(state) {
    const defaultCrimes = state.defaultCrimes;
    const customCrimes = state.customCrimes;
  },
  getIsLoading(state) {
    return state.isLoading;
  },
  getShowCustomMonthYear(state) {
    return state.showCustomMonthYear;
  },
  getError(state) {
    return state.error;
  },
  getIsLoading(state) {
    return state.isLoading;
  },
  getCurrentPostCode(state) {
    return state.currentPostCode;
  },
  getShowMonthAverage(state) {
    return state.showMonthAverage;
  },
  getInfoDialog(state) {
    return state.infoDialog;
  },
  getCustomSelectMonth(state) {
    return state.customSelectMonth
  }
};
