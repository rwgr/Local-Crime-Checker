export default {
  async locationSubmit(context, payload) {
    try {
      context.commit("isLoading", true);
      const response = await fetch(
        `https://api.postcodes.io/postcodes${
          typeof payload === "string"
            ? "/" + payload
            : "?lon=" + payload.lng + "&lat=" + payload.lat
        }`
      );

      if (!response.ok) {
        throw new Error(
          "There was an issue in finding the location provided. Please ensure the postcode entered is correct, and try again."
        );
      }
      const responseData = await response.json();

      if (typeof payload === "string") {
        let {
          longitude: lng,
          latitude: lat,
          admin_district: areaName,
        } = responseData.result;

        context.commit("locationSubmit", { lat, lng, areaName });
      } else {
        let {
          longitude: lng,
          latitude: lat,
          admin_district: areaName,
        } = responseData.result[0];
        context.commit("locationSubmit", { lat, lng, areaName });
      }
    } catch (err) {
      console.error(err);
      context.commit("updateError", err);
    }
  },
  async updatePostCode(context, payload) {
    context.commit("updatePostCode", payload);
  },
  async streetLevelCrime(context, payload) {
    try {
      console.log("Payload:", payload);
      context.commit("isLoading", true);
      const lat = context.state.lat;
      const lng = context.state.lng;
      const date = "&date=" + payload;
      const response = await fetch(
        `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}${
          payload !== null ? date : ""
        }`
      );

      if (!response.ok) {
        throw new Error(response.ok);
      }
      const responseData = await response.json();
      const crimes = {
        allCrimesTotal: responseData.length,
        antiSocialBehaviour: [],
        bicycleTheft: [],
        burglary: [],
        criminalDamageArson: [],
        drugs: [],
        otherTheft: [],
        possessionOfWeapons: [],
        publicOrder: [],
        robbery: [],
        shoplifting: [],
        theftFromThePerson: [],
        vehicleCrime: [],
        violentCrime: [],
        otherCrime: [],
      };

      responseData.forEach((entry) => {
        entry.category === "anti-social-behaviour"
          ? crimes.antiSocialBehaviour.push(entry)
          : entry.category === "bicycle-theft"
          ? crimes.bicycleTheft.push(entry)
          : entry.category === "burglary"
          ? crimes.burglary.push(entry)
          : entry.category === "criminal-damage-arson"
          ? crimes.criminalDamageArson.push(entry)
          : entry.category === "drugs"
          ? crimes.drugs.push(entry)
          : entry.category === "other-theft"
          ? crimes.otherTheft.push(entry)
          : entry.category === "possession-of-weapons"
          ? crimes.possessionOfWeapons.push(entry)
          : entry.category === "public-order"
          ? crimes.publicOrder.push(entry)
          : entry.category === "robbery"
          ? crimes.robbery.push(entry)
          : entry.category === "shoplifting"
          ? crimes.shoplifting.push(entry)
          : entry.category === "theft-from-the-person"
          ? crimes.theftFromThePerson.push(entry)
          : entry.category === "vehicle-crime"
          ? crimes.vehicleCrime.push(entry)
          : entry.category === "violent-crime"
          ? crimes.violentCrime.push(entry)
          : entry.category === "other-crime"
          ? crimes.otherCrime.push(entry)
          : null;
      });
      context.commit("isLoading", false);
      if (payload === null) {
        context.commit("defaultStreetLevelCrime", crimes);
      } else {
        context.commit("customStreetLevelCrime", crimes);
        context.commit("updateCustomDate", payload);
      }
    } catch (err) {
      console.error(err);
      context.commit("updateError", err);
    }
  },
  async yearCrime(context, payload) {
    try {
      context.commit("isLoading", true);
      const fetchFail =
        "There was a problem with fetching the requested information. The most common cause is that the API is currently receiving too many requests. Please  try again in a few moments. If the issue persists, the requested information may no longer be available. You can see any recent changes to availability of data on the Police API site at: https://data.police.uk/changelog/.";
      const errorHandle = () => context.commit("updateError", fetchFail);
      const lat = context.state.lat;
      const lng = context.state.lng;
      const date = "&date=";

      function url(month) {
        return `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}${date}${
          payload !== null ? payload : new Date().getFullYear()
        }${month}`;
      }

      // Different try/catch for null, as throws errors and failed fetches seem to halt process
      if (payload === null) {
        const lastUpdated = +context.state.lastUpdated.slice(5, 7);
        console.log(lastUpdated);
        const urls = [];
        for (let i = 1; i <= lastUpdated; i++) {
          urls.push(fetch(url(`-0${i}`)).then((resp) => resp.json()));
        }
        console.log(urls);
        const response = (async function () {
          let results = await Promise.all(urls);
          const resultsFlat = results.flat();
          const crimes = {
            allCrimesTotal: resultsFlat.length,
            antiSocialBehaviour: [],
            bicycleTheft: [],
            burglary: [],
            criminalDamageArson: [],
            drugs: [],
            otherTheft: [],
            possessionOfWeapons: [],
            publicOrder: [],
            robbery: [],
            shoplifting: [],
            theftFromThePerson: [],
            vehicleCrime: [],
            violentCrime: [],
            otherCrime: [],
          };
          resultsFlat.forEach((entry) => {
            entry.category === "anti-social-behaviour"
              ? crimes.antiSocialBehaviour.push(entry)
              : entry.category === "bicycle-theft"
              ? crimes.bicycleTheft.push(entry)
              : entry.category === "burglary"
              ? crimes.burglary.push(entry)
              : entry.category === "criminal-damage-arson"
              ? crimes.criminalDamageArson.push(entry)
              : entry.category === "drugs"
              ? crimes.drugs.push(entry)
              : entry.category === "other-theft"
              ? crimes.otherTheft.push(entry)
              : entry.category === "possession-of-weapons"
              ? crimes.possessionOfWeapons.push(entry)
              : entry.category === "public-order"
              ? crimes.publicOrder.push(entry)
              : entry.category === "robbery"
              ? crimes.robbery.push(entry)
              : entry.category === "shoplifting"
              ? crimes.shoplifting.push(entry)
              : entry.category === "theft-from-the-person"
              ? crimes.theftFromThePerson.push(entry)
              : entry.category === "vehicle-crime"
              ? crimes.vehicleCrime.push(entry)
              : entry.category === "violent-crime"
              ? crimes.violentCrime.push(entry)
              : entry.category === "other-crime"
              ? crimes.otherCrime.push(entry)
              : null;
          });
          context.commit("isLoading", false);
          context.commit("defaultYearCrime", crimes);
        })();
      } else if (payload === "2020") {
        const urls = [
          fetch(url("-02"))
            .then((resp) => resp.json())
            .catch(errorHandle),
          fetch(url("-03"))
            .then((resp) => resp.json())
            .catch(errorHandle),
          fetch(url("-04"))
            .then((resp) => resp.json())
            .catch(errorHandle),
          fetch(url("-05"))
            .then((resp) => resp.json())
            .catch(errorHandle),
          fetch(url("-06"))
            .then((resp) => resp.json())
            .catch(errorHandle),
          fetch(url("-07"))
            .then((resp) => resp.json())
            .catch(errorHandle),
          fetch(url("-08"))
            .then((resp) => resp.json())
            .catch(errorHandle),
          fetch(url("-09"))
            .then((resp) => resp.json())
            .catch(errorHandle),
          fetch(url("-10"))
            .then((resp) => resp.json())
            .catch(errorHandle),
          fetch(url("-11"))
            .then((resp) => resp.json())
            .catch(errorHandle),
          fetch(url("-12"))
            .then((resp) => resp.json())
            .catch(errorHandle),
        ];
        const response = (async function () {
          let results = await Promise.all(urls);
          const resultsFlat = results.flat();
          const crimes = {
            allCrimesTotal: resultsFlat.length,
            antiSocialBehaviour: [],
            bicycleTheft: [],
            burglary: [],
            criminalDamageArson: [],
            drugs: [],
            otherTheft: [],
            possessionOfWeapons: [],
            publicOrder: [],
            robbery: [],
            shoplifting: [],
            theftFromThePerson: [],
            vehicleCrime: [],
            violentCrime: [],
            otherCrime: [],
          };
          resultsFlat.forEach((entry) => {
            entry.category === "anti-social-behaviour"
              ? crimes.antiSocialBehaviour.push(entry)
              : entry.category === "bicycle-theft"
              ? crimes.bicycleTheft.push(entry)
              : entry.category === "burglary"
              ? crimes.burglary.push(entry)
              : entry.category === "criminal-damage-arson"
              ? crimes.criminalDamageArson.push(entry)
              : entry.category === "drugs"
              ? crimes.drugs.push(entry)
              : entry.category === "other-theft"
              ? crimes.otherTheft.push(entry)
              : entry.category === "possession-of-weapons"
              ? crimes.possessionOfWeapons.push(entry)
              : entry.category === "public-order"
              ? crimes.publicOrder.push(entry)
              : entry.category === "robbery"
              ? crimes.robbery.push(entry)
              : entry.category === "shoplifting"
              ? crimes.shoplifting.push(entry)
              : entry.category === "theft-from-the-person"
              ? crimes.theftFromThePerson.push(entry)
              : entry.category === "vehicle-crime"
              ? crimes.vehicleCrime.push(entry)
              : entry.category === "violent-crime"
              ? crimes.violentCrime.push(entry)
              : entry.category === "other-crime"
              ? crimes.otherCrime.push(entry)
              : null;
          });
          context.commit("isLoading", false);
          context.commit("updateCustomDate", payload);
          context.commit("customYearCrime", crimes);
        })();
      } else {
        // try {
        const urls = [
          fetch(url("-01"))
            .then((resp) => resp.json())
            .catch(errorHandle),
          fetch(url("-02"))
            .then((resp) => resp.json())
            .catch(errorHandle),
          fetch(url("-03"))
            .then((resp) => resp.json())
            .catch(errorHandle),
          fetch(url("-04"))
            .then((resp) => resp.json())
            .catch(errorHandle),
          fetch(url("-05"))
            .then((resp) => resp.json())
            .catch(errorHandle),
          fetch(url("-06"))
            .then((resp) => resp.json())
            .catch(errorHandle),
        ];
        const urls2 = [
          fetch(url("-07"))
            .then((resp) => resp.json())
            .catch(errorHandle),
          fetch(url("-08"))
            .then((resp) => resp.json())
            .catch(errorHandle),
          fetch(url("-09"))
            .then((resp) => resp.json())
            .catch(errorHandle),
          fetch(url("-10"))
            .then((resp) => resp.json())
            .catch(errorHandle),
          fetch(url("-11"))
            .then((resp) => resp.json())
            .catch(errorHandle),
          fetch(url("-12"))
            .then((resp) => resp.json())
            .catch(errorHandle),
        ];

        const response = (async function () {
          let results1 = await Promise.all(urls);
          let results2 = await Promise.all(urls2);
          const results = results1.concat(results2);
          const resultsFlat = results.flat();
          const crimes = {
            allCrimesTotal: resultsFlat.length,
            antiSocialBehaviour: [],
            bicycleTheft: [],
            burglary: [],
            criminalDamageArson: [],
            drugs: [],
            otherTheft: [],
            possessionOfWeapons: [],
            publicOrder: [],
            robbery: [],
            shoplifting: [],
            theftFromThePerson: [],
            vehicleCrime: [],
            violentCrime: [],
            otherCrime: [],
          };
          resultsFlat.forEach((entry) => {
            entry.category === "anti-social-behaviour"
              ? crimes.antiSocialBehaviour.push(entry)
              : entry.category === "bicycle-theft"
              ? crimes.bicycleTheft.push(entry)
              : entry.category === "burglary"
              ? crimes.burglary.push(entry)
              : entry.category === "criminal-damage-arson"
              ? crimes.criminalDamageArson.push(entry)
              : entry.category === "drugs"
              ? crimes.drugs.push(entry)
              : entry.category === "other-theft"
              ? crimes.otherTheft.push(entry)
              : entry.category === "possession-of-weapons"
              ? crimes.possessionOfWeapons.push(entry)
              : entry.category === "public-order"
              ? crimes.publicOrder.push(entry)
              : entry.category === "robbery"
              ? crimes.robbery.push(entry)
              : entry.category === "shoplifting"
              ? crimes.shoplifting.push(entry)
              : entry.category === "theft-from-the-person"
              ? crimes.theftFromThePerson.push(entry)
              : entry.category === "vehicle-crime"
              ? crimes.vehicleCrime.push(entry)
              : entry.category === "violent-crime"
              ? crimes.violentCrime.push(entry)
              : entry.category === "other-crime"
              ? crimes.otherCrime.push(entry)
              : null;
          });
          context.commit("isLoading", false);
          context.commit("customYearCrime", crimes);
          context.commit("updateCustomDate", payload);
        })();
      }
    } catch (err) {
      console.error(err);
      context.commit("updateError", err);
    }
  },
  async lastUpdated(context) {
    try {
      const response = await fetch(
        `https://data.police.uk/api/crime-last-updated`
      );
      if (!response.ok) {
        throw new Error(response.ok);
      }
      const responseData = await response.json();
      context.commit("lastUpdated", responseData.date);
    } catch (err) {
      console.error(err);
      context.commit("updateError", err);
    }
  },
  async customMonthAverage(context, payload) {
    try {
      context.commit("isLoading", true);
      const fetchFail =
        "There was a problem with fetching the requested information. This is most commonly caused due to too many requests being sent at this current time. Please try again in a few moments. If the issue continues to persist the requested information may no longer be available.";
      const errorHandle = () => context.commit("updateError", fetchFail);
      const lat = context.state.lat;
      const lng = context.state.lng;
      const date = "&date=";
      const currentYear = +payload.slice(0, 4);
      const currentMonth = +payload.slice(-2);
      const previousYear = currentYear - 1;

      function url(month) {
        return `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}${date}${currentYear}-${month}`;
      }

      function previousYearUrl(month) {
        return `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}${date}${previousYear}-${month}`;
      }

      let monthPrior = "";
      let monthPrior2 = "";
      let monthPrior3 = "";
      let urls = [];

      if (currentMonth <= 3) {
        if (currentMonth === 3) {
          monthPrior = "02";
          monthPrior2 = "01";
          monthPrior3 = "12";
          urls = [
            fetch(url(monthPrior))
              .then((resp) => resp.json())
              .catch(errorHandle),
            fetch(url(monthPrior2))
              .then((resp) => resp.json())
              .catch(errorHandle),
            fetch(previousYearUrl(monthPrior3))
              .then((resp) => resp.json())
              .catch(errorHandle),
          ];
        } else if (currentMonth === 2) {
          monthPrior = "01";
          monthPrior2 = "12";
          monthPrior3 = "11";
          urls = [
            fetch(url(monthPrior))
              .then((resp) => resp.json())
              .catch(errorHandle),
            fetch(previousYearUrl(monthPrior2))
              .then((resp) => resp.json())
              .catch(errorHandle),
            fetch(previousYearUrl(monthPrior3))
              .then((resp) => resp.json())
              .catch(errorHandle),
          ];
        } else if (currentMonth === 1) {
          monthPrior = "12";
          monthPrior2 = "11";
          monthPrior3 = "10";
          urls = [
            fetch(previousYearUrl(monthPrior))
              .then((resp) => resp.json())
              .catch(errorHandle),
            fetch(previousYearUrl(monthPrior2))
              .then((resp) => resp.json())
              .catch(errorHandle),
            fetch(previousYearUrl(monthPrior3))
              .then((resp) => resp.json())
              .catch(errorHandle),
          ];
        }
      } else {
        // If month less than 10 need to add 0 also
        if (currentMonth <= 10) {
          urls = [
            fetch(url("0" + (currentMonth - 1)))
              .then((resp) => resp.json())
              .catch(errorHandle),
            fetch(url("0" + (currentMonth - 2)))
              .then((resp) => resp.json())
              .catch(errorHandle),
            fetch(url("0" + (currentMonth - 3)))
              .then((resp) => resp.json())
              .catch(errorHandle),
          ];
        } else if (currentMonth === 11) {
          urls = [
            fetch(url(currentMonth - 1))
              .then((resp) => resp.json())
              .catch(errorHandle),
            fetch(url("0" + (currentMonth - 2)))
              .then((resp) => resp.json())
              .catch(errorHandle),
            fetch(url("0" + (currentMonth - 3)))
              .then((resp) => resp.json())
              .catch(errorHandle),
          ];
        } else if (currentMonth === 12) {
          urls = [
            fetch(url(currentMonth - 1))
              .then((resp) => resp.json())
              .catch(errorHandle),
            fetch(url(currentMonth - 2))
              .then((resp) => resp.json())
              .catch(errorHandle),
            fetch(url("0" + (currentMonth - 3)))
              .then((resp) => resp.json())
              .catch(errorHandle),
          ];
        }
      }

      const response = (async function () {
        const results = await Promise.all(urls);
        const resultsFlat = results.flat();
        const crimes = {
          allCrimesTotal: resultsFlat.length,
          antiSocialBehaviour: [],
          bicycleTheft: [],
          burglary: [],
          criminalDamageArson: [],
          drugs: [],
          otherTheft: [],
          possessionOfWeapons: [],
          publicOrder: [],
          robbery: [],
          shoplifting: [],
          theftFromThePerson: [],
          vehicleCrime: [],
          violentCrime: [],
          otherCrime: [],
        };
        resultsFlat.forEach((entry) => {
          entry.category === "anti-social-behaviour"
            ? crimes.antiSocialBehaviour.push(entry)
            : entry.category === "bicycle-theft"
            ? crimes.bicycleTheft.push(entry)
            : entry.category === "burglary"
            ? crimes.burglary.push(entry)
            : entry.category === "criminal-damage-arson"
            ? crimes.criminalDamageArson.push(entry)
            : entry.category === "drugs"
            ? crimes.drugs.push(entry)
            : entry.category === "other-theft"
            ? crimes.otherTheft.push(entry)
            : entry.category === "possession-of-weapons"
            ? crimes.possessionOfWeapons.push(entry)
            : entry.category === "public-order"
            ? crimes.publicOrder.push(entry)
            : entry.category === "robbery"
            ? crimes.robbery.push(entry)
            : entry.category === "shoplifting"
            ? crimes.shoplifting.push(entry)
            : entry.category === "theft-from-the-person"
            ? crimes.theftFromThePerson.push(entry)
            : entry.category === "vehicle-crime"
            ? crimes.vehicleCrime.push(entry)
            : entry.category === "violent-crime"
            ? crimes.violentCrime.push(entry)
            : entry.category === "other-crime"
            ? crimes.otherCrime.push(entry)
            : null;
        });
        context.commit("isLoading", false);
        context.commit("customMonthAverage", crimes);
        context.commit("updateCustomDate", "Previous 3 Months");
      })();
    } catch (err) {
      console.error(err);
      context.commit("updateError", err);
    }
  },
  resetArea(context) {
    context.commit("resetArea");
  },
  resetCustomCrimes(context) {
    context.commit("resetCustomCrimes");
  },
  changeShowCustomMonth(context) {
    context.commit("changeShowCustomMonth");
  },
  changeShowCustomYear(context) {
    context.commit("changeShowCustomYear");
  },
  closeError(context) {
    context.commit("closeError");
  },
  updateError(context, payload) {
    context.commit("updateError", payload);
  },
  closeInfoDialog(context) {
    context.commit("closeInfoDialog");
  },
  infoDialog(context, payload) {
    context.commit("infoDialog", payload);
  },
  changeCustomSelectMonth(context, payload) {
    context.commit("changeCustomSelectMonth", payload);
  },
};
