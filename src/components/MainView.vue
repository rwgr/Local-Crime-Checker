<template>
  <div class="container">
    <div class="location-flex flex-center loggedin-view">
      <button class="btn btn-new-location" @click.prevent="resetArea">
        Select new area
      </button>
      <div v-if="postcode !== ''">
        Location: Within 1 mile of {{ postcode }}, {{ areaName }}
        <InformationCircleIcon
          class="icon icon-info"
          @click.prevent="infoDialog('accuracy')"
        ></InformationCircleIcon>
      </div>
      <div v-else>Location: Within 1 mile of {{ areaName }}</div>
      <p>
        Most recent data from: {{ lastUpdated }}
        <InformationCircleIcon
          class="icon icon-info"
          @click.prevent="infoDialog('recent')"
        ></InformationCircleIcon>
      </p>
    </div>

    <div class="filter">
      <div class="filter-month">
        <div>
          <button class="btn btn-filter" @click.prevent="defaultMonthlyView">
            Monthly Crime Comparsion
          </button>
        </div>
      </div>

      <div class="filter-year">
        <div>
          <button class="btn btn-filter" @click.prevent="defaultYearlyView">
            Yearly Crime Comparison
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { InformationCircleIcon } from "@heroicons/vue/outline";

export default {
  components: {
    InformationCircleIcon,
  },
  setup() {
    const store = useStore();
    const areaName = computed(() => store.getters.getAreaName);
    const postcode = computed(() => store.getters.getCurrentPostCode);
    const lastUpdated = computed(() => store.getters.getLastUpdated);
    const displayCrime = computed(() => store.getters.getDisplayCrime);
    const showCustomMonthYear = computed(
      () => store.getters.getShowCustomMonthYear
    );

    async function defaultMonthlyView() {
      try {
        await store.dispatch("resetCustomCrimes");
        await store.dispatch("streetLevelCrime", null);
      } catch (err) {
        console.error(err);
        store.dispatch("updateError", err);
      }
    }
    async function defaultYearlyView() {
      try {
        await store.dispatch("resetCustomCrimes");
        await store.dispatch("yearCrime", null);
      } catch (err) {
        console.error(err);
        store.dispatch("updateError", err);
      }
    }

    function changeShowCustomMonthYear() {
      store.dispatch("changeShowCustomMonthYear");
    }

    function resetArea() {
      store.dispatch("resetArea");
    }

    function infoDialog(info) {
      store.dispatch("infoDialog", info);
    }

    return {
      resetArea,
      postcode,
      areaName,
      lastUpdated,
      defaultMonthlyView,
      showCustomMonthYear,
      displayCrime,
      changeShowCustomMonthYear,
      defaultYearlyView,
      infoDialog,
    };
  },
};
</script>

<style scoped>
.loggedin-view {
  /* color: #fff; */
  color: #270011;
  font-size: 2rem;
  font-weight: 600;
  /* animation: moveInLeft 1s ease-out; */
}

.filter {
  display: flex;
  border: 6px solid #270011;
  gap: 3rem;
  margin-bottom: 0.2rem;
  margin-top: 1.2rem;
  background-color: #fff;
  justify-content: space-between;
}

.filter-month {
  display: flex;
  flex-direction: column;
  padding: 0.2rem 2rem;
  align-items: center;
}

.filter-year {
  display: flex;
  flex-direction: column;
  padding: 0.2rem 2rem;
  align-items: center;
}
.filter-heading {
  font-size: 2rem;
  text-align: start;
  padding: 0 2rem;
  margin-bottom: 1rem;
  align-self: start;
  margin-top: 0.4rem;
  font-weight: 700;
}

.filter-heading-default {
  text-align: end;
  align-self: end;
}

.filter button {
  margin-bottom: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
}

.btn-filter {
  margin-top: 1.2rem;
}

.btn-new-location {
  background-color: #003a83;
  padding: 1rem 2rem;
}

.btn-change {
  font-size: 1.6rem;
  /* background-color: #b56689; */
  background-color: #003a83;
  padding: 1rem 2rem;
  animation: moveOut 1s ease-in-out;
}

.btn-change:hover,
.btn-new-location:hover,
.btn-change:active,
.btn-new-location:active {
  background-color: black;
}
</style>
