<template>
  <div>
    <div class="location-info-box flex-column">
      <h1 class="location-info-heading">Review crime in your area</h1>
      <ul class="location-info-text-box">
        <p class="location-info-subheading location-info-text">
          Providing updates for crime levels in your local area, with
          comparisons showing changes over time.
        </p>
        <li class="location-info-text">
          Data provided by the UK Police public crime API
        </li>
        <li class="location-info-text">
          Geographic Coverage: England, Wales, Northern Ireland
        </li>
        <li class="location-info-text">
          Time Period Covered: 2020-02 to {{ lastUpdated }}
        </li>
      </ul>
    </div>
    <h2 class="location-title">Please provide your location:</h2>

    <div class="location-flex">
      <div class="postcode-search flex-center flex-column">
        <label for="postcode">Enter Your Postcode:</label>
        <input
          type="text"
          autocomplete="off"
          id="postcode"
          v-model="postcode"
        />
        <button class="btn-postcode-search btn" @click.prevent="postcodeSubmit">
          Search
        </button>
      </div>
      <div class="geolocation-search flex-column">
        <h3>Use Geolocation:</h3>
        <LocationMarkerIcon class="icon-geolocate"></LocationMarkerIcon>
        <button
          class="btn btn-postcode-search"
          @click.prevent="geolocatePosition"
        >
          Geolocate
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";
import { LocationMarkerIcon } from "@heroicons/vue/solid";
import { computed } from "vue";

export default {
  components: {
    LocationMarkerIcon,
  },
  setup() {
    const store = useStore();
    const postcode = ref("");
    const lastUpdated = computed(() => store.getters.getLastUpdated);

    function geolocatePosition() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            store.dispatch("locationSubmit", { lat, lng });
          },
          () => {
            store.dispatch(
              "updateError",
              "Could not get your position! Please enable geolocation on your browser or device and try again."
            );
          }
        );
      }
    }

    async function postcodeSubmit() {
      try {
        await store.dispatch("updatePostCode", postcode.value);
        await store.dispatch("locationSubmit", postcode.value);
      } catch (err) {
        console.error(err);
        store.dispatch("updateError", err);
      }
    }
    return {
      postcode,
      geolocatePosition,
      postcodeSubmit,
      lastUpdated,
    };
  },
};
</script>

<style scoped>
.location-info-heading {
  margin-top: 2rem;
  font-size: 4rem;
  margin-bottom: 2rem;
  align-self: center;
  letter-spacing: 1.8;
}

.location-info-text {
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.location-info-subheading {
  font-size: 2.2rem;
}

.location-info-text-box {
  align-self: center;
}
.location-info-text-box li {
  margin-left: 5%;
}

.location-title {
  text-align: center;
  font-size: 2.8rem;
  color: #270011;
  margin-top: 2rem;
  /* color: #83003a; */
}
.postcode-search {
  font-size: 4rem;
  padding: 1rem;
  background-color: #fff;
  width: 60%;
  border: 6px solid #270011;
}

.postcode-search label {
  color: #83003a;
  font-weight: 700;
}

.postcode-search input {
  font-size: 5rem;
  padding: 2rem;
  width: 80%;
  text-align: center;
  margin-top: 1.5rem;
  margin-bottom: 1.2rem;
  color: #83003a;
  border: 8px solid #83003a;
}
.btn-postcode-search {
  font-size: 3rem;
  border: none;
  letter-spacing: 0.2rem;
}

.geolocation-search {
  font-size: 4rem;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #fff;
  width: 40%;
  border: 6px solid #270011;
}
.geolocation-search h3 {
  color: #83003a;
  font-weight: 700;
  font-size: 4rem;
  text-align: center;
}

.icon-geolocate {
  width: 10rem;
  color: #83003a;
}
</style>
