<template>
  <div class="backdrop">
    <dialog open class="dialog flex-column" v-if="infoDialog === 'average'">
      <h3 class="dialog-heading">Averages</h3>
      <p class="dialog-text">{{ averageInfo }}</p>
      <button class="btn" @click.prevent="closeInfoDialog">Close</button>
    </dialog>
    <dialog
      open
      class="dialog flex-column"
      v-else-if="infoDialog === 'accuracy'"
    >
      <h3 class="dialog-heading">Location accuracy</h3>
      <p class="dialog-text">{{ locationAccuracyInfo }}</p>
      <button class="btn" @click.prevent="closeInfoDialog">Close</button>
    </dialog>
    <dialog open class="dialog flex-column" v-else-if="infoDialog === 'recent'">
      <h3 class="dialog-heading">Most Recent Data</h3>
      <p class="dialog-text">{{ mostRecentInfo }}</p>
      <button class="btn" @click.prevent="closeInfoDialog">Close</button>
    </dialog>
    <dialog open class="dialog flex-column" v-else>
      <button class="btn" @click.prevent="closeInfoDialog">Close</button>
    </dialog>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    const store = useStore();
    const infoDialog = computed(() => store.getters.getInfoDialog);

    const averageInfo = "Averages are per month, unless otherwise stated. ";

    const locationAccuracyInfo =
      "Inconsistent geocoding policies in police forces mean we cannot be confident that the location data provided is fully accurate or consistent. This is especially true of crimes where the exact location is not known (e.g. because the victim is not sure where it happened). Estimates of geocoding accuracy in different forces range from 60% to 97%.";

    const mostRecentInfo =
      "The most recent crime data available will typically lag a few months behind the current month. Our website will update automatically once the UK Police API provides new data. Available data spans in time from February 2020, until the month specified as most recent. ";

    function closeInfoDialog() {
      store.dispatch("closeInfoDialog");
    }
    return {
      infoDialog,
      closeInfoDialog,
      averageInfo,
      locationAccuracyInfo,
      mostRecentInfo,
    };
  },
};
</script>

<style scoped>
.dialog {
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
  text-align: center;
}

.dialog-heading {
  text-align: center;
  padding: 1rem;
  font-size: 2.6rem;
  color: #333;
  margin-bottom: 1rem;
}

.dialog-text {
  margin-bottom: 2rem;
  font-size: 2rem;
  text-align: start;
}
</style>
