<template>
  <main class="main">
    <div class="container">
      <error-dialog v-if="error"></error-dialog>
      <info-dialog v-if="infoDialog"></info-dialog>
      <transition name="location" mode="out-in">
        <location-form v-if="areaName === null"></location-form>
      </transition>
      <transition name="confirmed" mode="out-in">
        <main-view v-if="areaName !== null"></main-view>
      </transition>
      <transition name="data" mode="out-in">
        <data-view v-if="displayCrime"></data-view>
      </transition>
      <base-spinner v-if="isLoading"></base-spinner>
    </div>
  </main>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import DataView from "../components/DataView.vue";
import ErrorDialog from "../components/ErrorDialog.vue";
import InfoDialog from "../components/InfoDialog.vue";
import BaseSpinner from "../components/BaseSpinner.vue";
import LocationForm from "../components/LocationForm.vue";
import MainView from "../components/MainView.vue";

export default {
  components: {
    DataView,
    ErrorDialog,
    InfoDialog,
    BaseSpinner,
    LocationForm,
    MainView,
  },
  setup() {
    const store = useStore();
    const areaName = computed(() => store.getters.getAreaName);
    const displayCrime = computed(() => store.getters.getDisplayCrime);
    const error = computed(() => store.getters.getError);
    const isLoading = computed(() => store.getters.getIsLoading);
    const infoDialog = computed(() => store.getters.getInfoDialog);

    return {
      areaName,
      displayCrime,
      error,
      infoDialog,
      isLoading,
    };
  },
};
</script>

<style scoped>
.main {
  flex: 1;
  width: 100%;
  /* background-color: #008349; */
  background-color: #ccd8e6;
}

/* Transitions */
.location-enter-from,
.confirmed-enter-from {
  opacity: 0;
  transform: translateX(100rem);
}
.location-enter-active {
  transition: all 0.3s ease-in 0.5s;
}

.location-leave-active {
  transition: all 0.3s ease-in;
}

.location-enter-to,
.location-leave-from {
  opacity: 1;
  transform: translateX(0rem);
}

.location-leave-to {
  opacity: 0;
  transform: translateX(-100rem);
}

.confirmed-enter-from {
  opacity: 0;
  transform: translateX(100rem);
}
.confirmed-enter-active {
  transition: all 0.3s ease-in 0.3s;
}

.confirmed-leave-active {
  transition: all 0.3s ease-out;
}

.confirmed-enter-to,
.confirmed-leave-from {
  opacity: 1;
  transform: translateX(0rem);
}

.confirmed-leave-to {
  opacity: 0;
  transform: translateX(-100rem);
}

.data-enter-from {
  opacity: 0;
  transform: translateX(100rem);
}
.data-enter-active {
  transition: all 0.3s ease-in 0.3s;
}

.data-leave-active {
  transition: all 0.3s ease-out;
}

.data-enter-to,
.data-leave-from {
  opacity: 1;
  transform: translateX(0rem);
}

.data-leave-to {
  opacity: 0;
  transform: translateX(-100rem);
}
</style>
