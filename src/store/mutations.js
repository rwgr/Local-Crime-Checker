export default {
  locationSubmit(state, payload) {
    state.lat = payload.lat;
    state.lng = payload.lng;
    state.areaName = payload.areaName;
    state.isLoading = false;
  },
  defaultStreetLevelCrime(state, payload) {
    state.defaultCrimes = payload;
    state.displayCrime = "month";
    state.isLoading = false;
    console.log(state.defaultCrimes);
  },
  customStreetLevelCrime(state, payload) {
    state.customCrimes = payload;
    state.isLoading = false;
    state.showCustomMonthYear = true;
    console.log(state.customCrimes);
  },
  lastUpdated(state, payload) {
    state.lastUpdated = payload.slice(0, 7);
  },
  resetArea(state) {
    state.lat = null;
    state.lng = null;
    state.areaName = null;
    state.customDate = null;
    state.defaultCrimes = {};
    state.customCrimes = {};
    state.averageDefaultCrimes = {};
    state.averageCustomCrimes = {};
    state.displayCrime = null;
    state.showCustomMonthYear = false;
  },
  updateCustomDate(state, payload) {
    state.customDate = payload;
  },
  defaultYearCrime(state, payload) {
    state.defaultCrimes = payload;
    state.displayCrime = "year";
    state.isLoading = false;
    const defaultMonthNumber = +state.lastUpdated.slice(-2);
    const averageDefaultCrimes = {
      allCrimesTotal: +(payload.allCrimesTotal / defaultMonthNumber).toFixed(2),
      antiSocialBehaviour: +(
        payload.antiSocialBehaviour.length / defaultMonthNumber
      ).toFixed(2),
      bicycleTheft: +(payload.bicycleTheft.length / defaultMonthNumber).toFixed(
        2
      ),
      burglary: +(payload.burglary.length / defaultMonthNumber).toFixed(2),
      criminalDamageArson: +(
        payload.criminalDamageArson.length / defaultMonthNumber
      ).toFixed(2),
      drugs: +(payload.drugs.length / defaultMonthNumber).toFixed(2),
      otherTheft: +(payload.otherTheft.length / defaultMonthNumber).toFixed(2),
      possessionOfWeapons: +(
        payload.possessionOfWeapons.length / defaultMonthNumber
      ).toFixed(2),
      publicOrder: +(payload.publicOrder.length / defaultMonthNumber).toFixed(
        2
      ),
      robbery: +(payload.robbery.length / defaultMonthNumber).toFixed(2),
      shoplifting: +(payload.shoplifting.length / defaultMonthNumber).toFixed(
        2
      ),
      theftFromThePerson: +(
        payload.theftFromThePerson.length / defaultMonthNumber
      ).toFixed(2),
      vehicleCrime: +(payload.vehicleCrime.length / defaultMonthNumber).toFixed(
        2
      ),
      violentCrime: +(payload.violentCrime.length / defaultMonthNumber).toFixed(
        2
      ),
      otherCrime: +(payload.otherCrime.length / defaultMonthNumber).toFixed(2),
    };
    state.averageDefaultCrimes = averageDefaultCrimes;
    state.showMonthAverage = false;
  },
  customYearCrime(state, payload) {
    state.customCrimes = payload;
    state.isLoading = false;
    state.showCustomMonthYear = true;

    let averageCustomCrimes = {};
    if (state.customDate === "2019") {
      averageCustomCrimes = {
        allCrimesTotal: +(payload.allCrimesTotal / 6).toFixed(2),
        antiSocialBehaviour: +(payload.antiSocialBehaviour.length / 6).toFixed(
          2
        ),
        bicycleTheft: +(payload.bicycleTheft.length / 6).toFixed(2),
        burglary: +(payload.burglary.length / 6).toFixed(2),
        criminalDamageArson: +(payload.criminalDamageArson.length / 6).toFixed(
          2
        ),
        drugs: +(payload.drugs.length / 6).toFixed(2),
        otherTheft: +(payload.otherTheft.length / 6).toFixed(2),
        possessionOfWeapons: +(payload.possessionOfWeapons.length / 6).toFixed(
          2
        ),
        publicOrder: +(payload.publicOrder.length / 6).toFixed(2),
        robbery: +(payload.robbery.length / 6).toFixed(2),
        shoplifting: +(payload.shoplifting.length / 6).toFixed(2),
        theftFromThePerson: +(payload.theftFromThePerson.length / 6).toFixed(2),
        vehicleCrime: +(payload.vehicleCrime.length / 6).toFixed(2),
        violentCrime: +(payload.violentCrime.length / 6).toFixed(2),
        otherCrime: +(payload.otherCrime.length / 6).toFixed(2),
      };
    } else {
      averageCustomCrimes = {
        allCrimesTotal: +(payload.allCrimesTotal / 12).toFixed(2),
        antiSocialBehaviour: +(payload.antiSocialBehaviour.length / 12).toFixed(
          2
        ),
        bicycleTheft: +(payload.bicycleTheft.length / 12).toFixed(2),
        burglary: +(payload.burglary.length / 12).toFixed(2),
        criminalDamageArson: +(payload.criminalDamageArson.length / 12).toFixed(
          2
        ),
        drugs: +(payload.drugs.length / 12).toFixed(2),
        otherTheft: +(payload.otherTheft.length / 12).toFixed(2),
        possessionOfWeapons: +(payload.possessionOfWeapons.length / 12).toFixed(
          2
        ),
        publicOrder: +(payload.publicOrder.length / 12).toFixed(2),
        robbery: +(payload.robbery.length / 12).toFixed(2),
        shoplifting: +(payload.shoplifting.length / 12).toFixed(2),
        theftFromThePerson: +(payload.theftFromThePerson.length / 12).toFixed(
          2
        ),
        vehicleCrime: +(payload.vehicleCrime.length / 12).toFixed(2),
        violentCrime: +(payload.violentCrime.length / 12).toFixed(2),
        otherCrime: +(payload.otherCrime.length / 12).toFixed(2),
      };
    }
    state.averageCustomCrimes = averageCustomCrimes;
    console.log(payload);
  },
  customMonthAverage(state, payload) {
    state.customCrimes = payload;
    state.isLoading = false;
    state.displayCrime = "year";
    state.showCustomMonthYear = true;
    const defaultMonthNumber = +state.lastUpdated.slice(-2);
    const averageDefaultCrimes = {
      allCrimesTotal: +state.defaultCrimes.allCrimesTotal,
      antiSocialBehaviour: +state.defaultCrimes.antiSocialBehaviour.length,
      bicycleTheft: +state.defaultCrimes.bicycleTheft.length,
      burglary: +state.defaultCrimes.burglary.length,
      criminalDamageArson: +state.defaultCrimes.criminalDamageArson.length,
      drugs: +state.defaultCrimes.drugs.length,
      otherTheft: +state.defaultCrimes.otherTheft.length,
      possessionOfWeapons: +state.defaultCrimes.possessionOfWeapons.length,
      publicOrder: +state.defaultCrimes.publicOrder.length,
      robbery: +state.defaultCrimes.robbery.length,
      shoplifting: +state.defaultCrimes.shoplifting.length,
      theftFromThePerson: +state.defaultCrimes.theftFromThePerson.length,
      vehicleCrime: +state.defaultCrimes.vehicleCrime.length,
      violentCrime: +state.defaultCrimes.violentCrime.length,
      otherCrime: +state.defaultCrimes.otherCrime.length,
    };
    const averageCustomCrimes = {
      allCrimesTotal: +(payload.allCrimesTotal / 3).toFixed(2),
      antiSocialBehaviour: +(payload.antiSocialBehaviour.length / 3).toFixed(2),
      bicycleTheft: +(payload.bicycleTheft.length / 3).toFixed(2),
      burglary: +(payload.burglary.length / 3).toFixed(2),
      criminalDamageArson: +(payload.criminalDamageArson.length / 3).toFixed(2),
      drugs: +(payload.drugs.length / 3).toFixed(2),
      otherTheft: +(payload.otherTheft.length / 3).toFixed(2),
      possessionOfWeapons: +(payload.possessionOfWeapons.length / 3).toFixed(2),
      publicOrder: +(payload.publicOrder.length / 3).toFixed(2),
      robbery: +(payload.robbery.length / 3).toFixed(2),
      shoplifting: +(payload.shoplifting.length / 3).toFixed(2),
      theftFromThePerson: +(payload.theftFromThePerson.length / 3).toFixed(2),
      vehicleCrime: +(payload.vehicleCrime.length / 3).toFixed(2),
      violentCrime: +(payload.violentCrime.length / 3).toFixed(2),
      otherCrime: +(payload.otherCrime.length / 3).toFixed(2),
    };
    state.averageDefaultCrimes = averageDefaultCrimes;
    state.averageCustomCrimes = averageCustomCrimes;
    state.showMonthAverage = true;
  },
  isLoading(state, payload) {
    state.isLoading = payload;
  },
  changeShowCustomMonth(state) {
    state.showCustomMonth = !state.showCustomMonth;
  },
  resetCustomCrimes(state) {
    state.defaultCrimes = {};
    state.averageDefaultCrimes = {};
    state.showCustomMonthYear = false;
    state.displayCrime = null;
    state.customCrimes = {};
    state.averageCustomCrimes = {};
    state.customSelectMonth = null;
  },
  changeShowCustomMonth(state) {
    state.showCustomMonthYear = false;
    state.displayCrime = "month";
  },
  changeShowCustomYear(state) {
    state.showCustomMonthYear = false;
    state.displayCrime = "year";
  },
  closeError(state) {
    state.error = null;
  },

  updateError(state, payload) {
    state.error = payload;
    state.isLoading = false;
  },
  updatePostCode(state, payload) {
    state.currentPostCode = payload;
  },
  infoDialog(state, payload) {
    state.infoDialog = payload;
  },
  closeInfoDialog(state) {
    state.infoDialog = null;
  },
  changeCustomSelectMonth(state, payload) {
    state.customSelectMonth = payload;
  },
};
