<template>
  <div>
    <div class="titles">
      <div class="titles-custom">
        <div v-if="displayCrime === 'month'">
          <h2 class="title-custom" :class="!showCustomMonthYear ? 'hide' : ''">
            Month: {{ customDate }}
          </h2>
          <button
            class="btn btn-titles-change"
            @click="changeShowCustomMonth"
            v-if="showCustomMonthYear"
          >
            Change Comparsion
          </button>
        </div>
        <div v-else-if="showMonthAverage">
          <h2 class="title-custom" :class="!showCustomMonthYear ? 'hide' : ''">
            Month: {{ customDate }}
          </h2>
          <button
            class="btn btn-titles-change"
            @click="changeShowCustomMonth"
            v-if="showCustomMonthYear"
          >
            Change Comparsion
          </button>
        </div>
        <div v-else-if="customDate === '2019'">
          <h2 class="title-custom" :class="!showCustomMonthYear ? 'hide' : ''">
            Year: {{ customDate }} (Jul-Dec)
          </h2>
          <button
            class="btn btn-titles-change"
            @click="changeShowCustomYear"
            v-if="showCustomMonthYear"
          >
            Change Comparsion
          </button>
        </div>
        <div v-else>
          <h2 class="title-custom" :class="!showCustomMonthYear ? 'hide' : ''">
            Year: {{ customDate }}
          </h2>
          <button
            class="btn btn-titles-change"
            @click="changeShowCustomYear"
            v-if="showCustomMonthYear"
          >
            Change Comparsion
          </button>
        </div>
      </div>
      <div class="titles-default">
        <h2 class="title-default" v-if="displayCrime === 'month'">
          Month: {{ lastUpdated }}
        </h2>
        <h2 class="title-default" v-else-if="showMonthAverage">
          Month: {{ lastUpdated }}
        </h2>
        <h2 class="title-default" v-else>
          Year: {{ lastUpdated.slice(0, 4) }}
        </h2>
      </div>
    </div>
    <div class="grid">
      <div class="crime-view crime-custom" v-if="showCustomMonthYear">
        <ul
          class="crime-list-categories crime-list-custom-categories"
          :class="displayCrime === 'month' ? 'custom-cat-month' : ''"
        >
          <h3 class="crime-list-column-title">Categories</h3>
          <li>Total Crimes</li>
          <li>Anti-Social Behaviour</li>
          <li>Bicycle Theft</li>
          <li>Burglary</li>
          <li>Crim. Damage/Arson</li>
          <li>Drugs</li>
          <li>Other Theft</li>
          <li>Possession Weapons</li>
          <li>Public Order</li>
          <li>Robbery</li>
          <li>Shoplifting</li>
          <li>Theft From Person</li>
          <li>Vehicle Crime</li>
          <li>Violence/Sex Offence</li>
          <li>Other Crime</li>
        </ul>
        <ul
          class="crime-list-totals"
          :class="displayCrime === 'month' ? 'custom-monthly-totals' : ''"
        >
          <h3 class="crime-list-column-title">Total</h3>
          <li class="crime-total-number">
            {{ customCrimes.allCrimesTotal }}
          </li>
          <li>
            {{ customCrimes.antiSocialBehaviour.length }}
          </li>
          <li>{{ customCrimes.bicycleTheft.length }}</li>
          <li>{{ customCrimes.burglary.length }}</li>
          <li>
            {{ customCrimes.criminalDamageArson.length }}
          </li>
          <li>{{ customCrimes.drugs.length }}</li>
          <li>{{ customCrimes.otherTheft.length }}</li>
          <li>
            {{ customCrimes.possessionOfWeapons.length }}
          </li>
          <li>{{ customCrimes.publicOrder.length }}</li>
          <li>{{ customCrimes.robbery.length }}</li>
          <li>{{ customCrimes.shoplifting.length }}</li>
          <li>
            {{ customCrimes.theftFromThePerson.length }}
          </li>
          <li>{{ customCrimes.vehicleCrime.length }}</li>
          <li>
            {{ customCrimes.violentCrime.length }}
          </li>
          <li>{{ customCrimes.otherCrime.length }}</li>
        </ul>
        <ul class="crime-list-averages" v-if="displayCrime === 'year'">
          <h3 class="crime-list-column-title">Average</h3>
          <li class="crime-total-number">
            {{ averageCustomCrimes.allCrimesTotal }}
          </li>
          <li>
            {{ averageCustomCrimes.antiSocialBehaviour }}
          </li>
          <li>
            {{ averageCustomCrimes.bicycleTheft }}
          </li>
          <li>{{ averageCustomCrimes.burglary }}</li>
          <li>
            {{ averageCustomCrimes.criminalDamageArson }}
          </li>
          <li>{{ averageCustomCrimes.drugs }}</li>
          <li>{{ averageCustomCrimes.otherTheft }}</li>
          <li>
            {{ averageCustomCrimes.possessionOfWeapons }}
          </li>
          <li>{{ averageCustomCrimes.publicOrder }}</li>
          <li>{{ averageCustomCrimes.robbery }}</li>
          <li>
            {{ averageCustomCrimes.shoplifting }}
          </li>
          <li>
            {{ averageCustomCrimes.theftFromThePerson }}
          </li>
          <li>
            {{ averageCustomCrimes.vehicleCrime }}
          </li>
          <li>
            {{ averageCustomCrimes.violentCrime }}
          </li>
          <li>{{ averageCustomCrimes.otherCrime }}</li>
        </ul>
      </div>
      <div class="custom-crime-placeholder" v-else>
        <div v-if="displayCrime === 'month'" class="flex-column">
          <h3>Compare to...</h3>
          <button @click.prevent="customMonthPrior" class="btn btn-custom">
            Previous Month
          </button>
          <button class="btn btn-custom" @click="showHideCustomSelect">
            Specific Month
          </button>
          <div class="btn-monthYears-flex" v-if="showCustomSelect">
            <button
              class="btn btn-monthYears"
              :class="
                customSelectMonth === '2020'
                  ? 'btn-monthYears-current-year'
                  : ''
              "
              @click.prevent="changeCustomSelectMonth('2020')"
            >
              2020
            </button>
            <button
              class="btn btn-monthYears"
              :class="
                customSelectMonth === '2021'
                  ? 'btn-monthYears-current-year'
                  : ''
              "
              @click.prevent="changeCustomSelectMonth('2021')"
            >
              2021
            </button>
            <button
              class="btn btn-monthYears"
              :class="
                customSelectMonth === '2022'
                  ? 'btn-monthYears-current-year'
                  : ''
              "
              @click.prevent="changeCustomSelectMonth('2022')"
            >
              2022
            </button>
            <button
              class="btn btn-monthYears"
              :class="
                customSelectMonth === '2023'
                  ? 'btn-monthYears-current-year'
                  : ''
              "
              @click.prevent="changeCustomSelectMonth('2023')"
            >
              2023
            </button>
          </div>
          <div
            class="custom-crime-specific"
            v-if="customSelectMonth === '2023'"
          >
            <select
              name="customSelect"
              id="custom-select"
              v-model="customSelect"
              class="select-custom-monthyear"
            >
              <option
                :value="lastUpdated.slice(0, 4) + '-01'"
                v-if="+lastUpdated.slice(5, 8) >= 1"
              >
                January {{ lastUpdated.slice(0, 4) }}
              </option>
              <option
                :value="lastUpdated.slice(0, 4) + '-02'"
                v-if="+lastUpdated.slice(5, 8) > 2"
              >
                February {{ lastUpdated.slice(0, 4) }}
              </option>
              <option
                :value="lastUpdated.slice(0, 4) + '-03'"
                v-if="+lastUpdated.slice(5, 8) > 3"
              >
                March {{ lastUpdated.slice(0, 4) }}
              </option>
              <option
                :value="lastUpdated.slice(0, 4) + '-04'"
                v-if="+lastUpdated.slice(5, 8) > 4"
              >
                April {{ lastUpdated.slice(0, 4) }}
              </option>
              <option
                :value="lastUpdated.slice(0, 4) + '-05'"
                v-if="+lastUpdated.slice(5, 8) > 5"
              >
                May {{ lastUpdated.slice(0, 4) }}
              </option>
              <option
                :value="lastUpdated.slice(0, 4) + '-06'"
                v-if="+lastUpdated.slice(5, 8) > 6"
              >
                June {{ lastUpdated.slice(0, 4) }}
              </option>
              <option
                :value="lastUpdated.slice(0, 4) + '-07'"
                v-if="+lastUpdated.slice(5, 8) > 7"
              >
                July {{ lastUpdated.slice(0, 4) }}
              </option>
              <option
                :value="lastUpdated.slice(0, 4) + '-08'"
                v-if="+lastUpdated.slice(5, 8) > 8"
              >
                August {{ lastUpdated.slice(0, 4) }}
              </option>
              <option
                :value="lastUpdated.slice(0, 4) + '-09'"
                v-if="+lastUpdated.slice(5, 8) > 9"
              >
                September {{ lastUpdated.slice(0, 4) }}
              </option>
              <option
                :value="lastUpdated.slice(0, 4) + '-10'"
                v-if="+lastUpdated.slice(5, 8) > 10"
              >
                October {{ lastUpdated.slice(0, 4) }}
              </option>
              <option
                :value="lastUpdated.slice(0, 4) + '-11'"
                v-if="+lastUpdated.slice(5, 8) > 11"
              >
                November {{ lastUpdated.slice(0, 4) }}
              </option>
              <option
                :value="lastUpdated.slice(0, 4) + '-12'"
                v-if="+lastUpdated.slice(5, 8) > 12"
              >
                December {{ lastUpdated.slice(0, 4) }}
              </option>
            </select>
            <button
              class="btn btn-confirm"
              @click.prevent="changeCustomMonth(customSelect)"
            >
              Confirm
            </button>
          </div>
          <div
            class="custom-crime-specific"
            v-if="customSelectMonth === '2021' || customSelectMonth === '2022'"
          >
            <select
              name="customSelect"
              id="custom-select"
              v-model="customSelect"
              class="select-custom-monthyear"
            >
              <option :value="customSelectMonth + '-01'">
                January {{ customSelectMonth }}
              </option>
              <option :value="customSelectMonth + '-02'">
                February {{ customSelectMonth }}
              </option>
              <option :value="customSelectMonth + '-03'">
                March {{ customSelectMonth }}
              </option>
              <option :value="customSelectMonth + '-04'">
                April {{ customSelectMonth }}
              </option>
              <option :value="customSelectMonth + '-05'">
                May {{ customSelectMonth }}
              </option>
              <option :value="customSelectMonth + '-06'">
                June {{ customSelectMonth }}
              </option>
              <option :value="customSelectMonth + '-07'">
                July {{ customSelectMonth }}
              </option>
              <option :value="customSelectMonth + '-08'">
                August {{ customSelectMonth }}
              </option>
              <option :value="customSelectMonth + '-09'">
                September {{ customSelectMonth }}
              </option>
              <option :value="customSelectMonth + '-10'">
                October {{ customSelectMonth }}
              </option>
              <option :value="customSelectMonth + '-11'">
                November {{ customSelectMonth }}
              </option>
              <option :value="customSelectMonth + '-12'">
                December {{ customSelectMonth }}
              </option>
            </select>
            <button
              class="btn btn-confirm"
              @click.prevent="changeCustomMonth(customSelect)"
            >
              Confirm
            </button>
          </div>
          <div
            class="custom-crime-specific"
            v-else-if="customSelectMonth === '2020'"
          >
            <select
              name="customSelect"
              id="custom-select"
              v-model="customSelect"
              class="select-custom-monthyear"
            >
              <option value="2020-02">February 2020</option>
              <option value="2020-03">March 2020</option>
              <option value="2020-04">April 2020</option>
              <option value="2020-05">May 2020</option>
              <option value="2020-06">June 2020</option>
              <option value="2020-07">July 2020</option>
              <option value="2020-08">August 2020</option>
              <option value="2020-09">September 2020</option>
              <option value="2020-10">October 2020</option>
              <option value="2020-11">November 2020</option>
              <option value="2020-12">December 2020</option>
            </select>
            <button
              class="btn btn-confirm"
              @click.prevent="changeCustomMonth(customSelect)"
            >
              Confirm
            </button>
          </div>
          <button class="btn btn-custom" @click.prevent="customMonthCompare(3)">
            Previous 3 Months
          </button>
        </div>
        <div v-else class="flex-column">
          <h3>Compare to...</h3>
          <button @click.prevent="customYearPrior" class="btn btn-custom">
            Previous Year
          </button>
          <button class="btn btn-custom" @click="showHideCustomSelect">
            Specific Year
          </button>
          <div class="custom-crime-specific" v-if="showCustomSelect">
            <select
              name="customSelect"
              id="custom-select"
              v-model="customSelect"
              class="select-custom-monthyear"
            >
              <option value="2020">2020 (Feb-Dec)</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
            </select>
            <button
              class="btn btn-confirm"
              @click.prevent="changeCustomYear(customSelect)"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
      <crime-comparison v-if="showCustomMonthYear"></crime-comparison>
      <div v-else class="comparison-placeholder"></div>
      <div
        class="crime-view crime-default"
        :class="!showCustomMonthYear ? 'crime-default-precustom' : ''"
      >
        <ul class="crime-list-averages" v-if="displayCrime === 'year'">
          <h3 class="crime-list-column-title">Average</h3>
          <li class="crime-total-number">
            {{ averageDefaultCrimes.allCrimesTotal }}
          </li>
          <li>
            {{ averageDefaultCrimes.antiSocialBehaviour }}
          </li>
          <li>
            {{ averageDefaultCrimes.bicycleTheft }}
          </li>
          <li>
            {{ averageDefaultCrimes.burglary }}
          </li>
          <li>
            {{ averageDefaultCrimes.criminalDamageArson }}
          </li>
          <li>
            {{ averageDefaultCrimes.drugs }}
          </li>
          <li>
            {{ averageDefaultCrimes.otherTheft }}
          </li>
          <li>
            {{ averageDefaultCrimes.possessionOfWeapons }}
          </li>
          <li>
            {{ averageDefaultCrimes.publicOrder }}
          </li>
          <li>
            {{ averageDefaultCrimes.robbery }}
          </li>
          <li>
            {{ averageDefaultCrimes.shoplifting }}
          </li>
          <li>
            {{ averageDefaultCrimes.theftFromThePerson }}
          </li>
          <li>
            {{ averageDefaultCrimes.vehicleCrime }}
          </li>
          <li>
            {{ averageDefaultCrimes.violentCrime }}
          </li>
          <li>
            {{ averageDefaultCrimes.otherCrime }}
          </li>
        </ul>
        <ul class="crime-list-totals">
          <h3 class="crime-list-column-title">Total</h3>
          <li class="crime-total-number">{{ defaultCrimes.allCrimesTotal }}</li>
          <li>
            {{ defaultCrimes.antiSocialBehaviour.length }}
          </li>
          <li>{{ defaultCrimes.bicycleTheft.length }}</li>
          <li>{{ defaultCrimes.burglary.length }}</li>
          <li>
            {{ defaultCrimes.criminalDamageArson.length }}
          </li>
          <li>{{ defaultCrimes.drugs.length }}</li>
          <li>{{ defaultCrimes.otherTheft.length }}</li>
          <li>
            {{ defaultCrimes.possessionOfWeapons.length }}
          </li>
          <li>{{ defaultCrimes.publicOrder.length }}</li>
          <li>{{ defaultCrimes.robbery.length }}</li>
          <li>{{ defaultCrimes.shoplifting.length }}</li>
          <li>
            {{ defaultCrimes.theftFromThePerson.length }}
          </li>
          <li>{{ defaultCrimes.vehicleCrime.length }}</li>
          <li>
            {{ defaultCrimes.violentCrime.length }}
          </li>
          <li>{{ defaultCrimes.otherCrime.length }}</li>
        </ul>
        <ul
          class="crime-list-categories"
          :class="displayCrime === 'month' ? 'default-cat-month' : ''"
        >
          <h3 class="crime-list-column-title">Categories</h3>
          <li>Total Crimes</li>
          <li>Anti-Social Behaviour</li>
          <li>Bicycle Theft</li>
          <li>Burglary</li>
          <li>Crim. Damage/Arson</li>
          <li>Drugs</li>
          <li>Other Theft</li>
          <li>Possession Weapons</li>
          <li>Public Order</li>
          <li>Robbery</li>
          <li>Shoplifting</li>
          <li>Theft From Person</li>
          <li>Vehicle Crime</li>
          <li>Violence/Sex Offence</li>
          <li>Other Crime</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import CrimeComparison from "../components/CrimeComparison.vue";

export default {
  components: {
    CrimeComparison,
  },
  setup() {
    const store = useStore();
    const customSelect = ref("");
    const defaultCrimes = computed(() => store.getters.getDefaultCrimes);
    const customCrimes = computed(() => store.getters.getCustomCrimes);
    const displayCrime = computed(() => store.getters.getDisplayCrime);

    const averageDefaultCrimes = computed(
      () => store.getters.getAverageDefaultCrimes
    );
    const averageCustomCrimes = computed(
      () => store.getters.getAverageCustomCrimes
    );

    const lastUpdated = computed(() => store.getters.getLastUpdated);
    const customDate = computed(() => store.getters.getCustomDate);
    const showCustomMonthYear = computed(
      () => store.getters.getShowCustomMonthYear
    );
    const showMonthAverage = computed(() => store.getters.getShowMonthAverage);
    const customSelectMonth = computed(
      () => store.getters.getCustomSelectMonth
    );

    async function changeCustomMonth(month) {
      if (month !== null) {
        try {
          await store.dispatch("streetLevelCrime", month);
        } catch (err) {
          alert(err);
        }
      } else {
        return;
      }
    }

    async function changeCustomYear(year) {
      if (year !== null) {
        try {
          await store.dispatch("yearCrime", year);
          console.log("year", year);
        } catch (err) {
          console.error(err);
          store.dispatch("updateError", err);
        }
      } else {
        return;
      }
    }

    async function customYearPrior() {
      try {
        const yearPrior = +lastUpdated.value.slice(0, 4) - 1;
        await store.dispatch("yearCrime", yearPrior);
      } catch (err) {
        console.error(err);
        store.dispatch("updateError", err);
      }
    }

    async function customMonthPrior() {
      let monthPriorNumber = +lastUpdated.value.slice(-2) - 1;
      let monthPrior;
      if (monthPriorNumber === 0) {
        const prevYear = lastUpdated.value.slice(0, 4) - 1;
        monthPrior = prevYear + "-" + "12";
      } else if (monthPriorNumber < 10) {
        monthPriorNumber = "0" + monthPriorNumber;
        monthPrior = lastUpdated.value.slice(0, 4) + "-" + monthPriorNumber;
      } else {
        monthPrior = lastUpdated.value.slice(0, 4) + "-" + monthPriorNumber;
      }

      try {
        await store.dispatch("streetLevelCrime", monthPrior);
      } catch (err) {
        console.error(err);
        store.dispatch("updateError", err);
      }
    }

    function customMonthCompare(months) {
      const payload = lastUpdated.value;
      store.dispatch("customMonthAverage", payload);
    }

    let showCustomSelect = ref(false);
    function showHideCustomSelect() {
      showCustomSelect.value = !showCustomSelect.value;
    }

    function changeCustomSelectMonth(month) {
      store.dispatch("changeCustomSelectMonth", month);
    }

    function changeShowCustomMonth() {
      store.dispatch("changeShowCustomMonth");
    }
    function changeShowCustomYear() {
      store.dispatch("changeShowCustomYear");
    }

    return {
      defaultCrimes,
      customCrimes,
      averageDefaultCrimes,
      averageCustomCrimes,
      lastUpdated,
      customDate,
      changeCustomMonth,
      changeCustomYear,
      displayCrime,
      showCustomMonthYear,
      customYearPrior,
      customMonthPrior,
      showCustomSelect,
      showHideCustomSelect,
      customSelect,
      customMonthCompare,
      showMonthAverage,
      changeShowCustomMonth,
      changeShowCustomYear,
      changeCustomSelectMonth,
      customSelectMonth,
    };
  },
};
</script>

<style scoped>
.titles {
  display: flex;
  justify-content: space-between;
  font-size: 2.2rem;
  /* color: #333; */
  color: #270011;
  margin-top: 1.2rem;
}
.titles-custom div {
  display: flex;
}
.btn-titles-change {
  font-size: 1.6rem;
  padding: 0.2rem 1.2rem;
  background-color: #003a83;
  display: inline-block;
  margin-bottom: 0.2rem;
  margin-left: 1rem;
}

.btn-titles-change:hover,
.btn-titles-change:active {
  background-color: #270011;
}

.title-custom {
  margin-left: 4rem;
}
.title-default {
  margin-right: 4rem;
}
.crime-view {
  font-size: 2rem;
  /* background-color: #cce6db; */
  background-color: #fff;
}

.crime-view li {
  list-style: none;
  border-bottom: 2px dashed #83003a;
  margin-bottom: 0.6rem;
  display: flex;
  align-items: center;
}

.grid li {
  border-bottom: 2px dashed #83003a;
  height: 3rem; /* 3.6rem to fit all */
  margin-bottom: 0.6rem;
  display: flex;
  align-items: center;
  animation: moveInBottom 1s ease-in-out;
}

.crime-custom {
  padding: 1rem 0 0.5rem 1rem;
  grid-column: 1 / 4;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 1.2rem;
  min-width: 33rem;
}

.crime-custom li {
  display: flex;
  justify-content: flex-start;
  text-align: start;
}

.crime-default {
  padding: 1rem 1rem 0rem 0;
  grid-column: 5 / 8;
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  gap: 1.2rem;
  min-width: 33rem;
}

.crime-default li {
  display: flex;
  justify-content: flex-end;
  text-align: end;
}

.crime-default-precustom {
  grid-column: 3/8;
}

.crime-total-number {
  font-size: 2.1rem;
  font-weight: 600;
}

.crime-list-column-title {
  font-size: 1.8rem;
  text-align: center;
  border-bottom: 2px dashed #83003a;
  animation: moveInLeft 1s ease-in-out;
  margin-bottom: 0.3rem;
}

.crime-list-totals li {
  padding: 1rem;
  text-align: end;
}
.crime-list-averages {
  text-align: end;
}

.custom-crime-placeholder {
  min-width: 32rem;
  /* background-color: #cce6db; */
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  animation: moveOut 0.3s ease-in-out;
}

.custom-crime-placeholder h3 {
  font-size: 2rem;
  color: #83003a;
}

.btn-custom {
  margin-top: 1.2rem;
  width: 26.1rem;
}

.btn-monthYears-flex {
  display: flex;
  width: 26.1rem;
  margin-top: 1.2rem;
  gap: 0.2rem;
}

.btn-monthYears {
  width: 25%;
  padding: 0.6rem 1.2rem;
  background-color: #003a83;
}

.btn-monthYears:hover,
.btn-monthYears:active {
  background-color: #270011;
}

.btn-monthYears-current-year {
  background-color: #83003a;
}

.custom-crime-specific {
  display: flex;
  align-items: center;
  margin-top: 1.2rem;
  border: 2px solid #83003a;
}

.select-custom-monthyear {
  font-size: 2rem;
  width: 80%;
  padding: 0.5rem 0.5rem;
  text-align: center;
}

.select-custom-monthyear:focus-visible {
  outline: none;
}

.btn-confirm {
  font-size: 1.2rem;
  padding: 1.1rem 1rem;
}

.custom-monthly-totals {
  grid-column: 3;
}

.default-monthly-totals {
  grid-column: 5;
}

.crime-list-categories {
  text-align: end;
  font-size: 1.8rem;
  font-weight: 700;
  color: #83003a;
}

.crime-list-custom-categories {
  grid-column: 1;
  text-align: start;
}

.default-cat-month {
  grid-column: 2/4;
}

.custom-cat-month {
  grid-column: 1/3;
}

.comparison-placeholder {
  min-width: 24.36rem;
}
</style>
