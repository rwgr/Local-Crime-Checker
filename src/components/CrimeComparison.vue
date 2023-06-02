<template>
  <div class="crime-comparison" v-if="showCustomMonthYear">
    <ul>
      <h3 class="crime-list-column-title" v-if="displayCrime === 'month'">
        Comparing Totals
      </h3>
      <h3 class="crime-list-column-title" v-else>
        Comparing Averages
        <InformationCircleIcon
          class="icon icon-info"
          @click.prevent="infoDialog('average')"
        ></InformationCircleIcon>
      </h3>
      <li class="crime-total-number">
        <div v-if="displayCrime === 'month'">
          {{
            Math.abs(
              (compare = (
                ((defaultCrimes.allCrimesTotal - customCrimes.allCrimesTotal) /
                  customCrimes.allCrimesTotal) *
                100
              ).toFixed(2))
            )
          }}%
          {{
            compare > 0 ? "Increase" : compare < 0 ? "Decrease" : "Unchanged"
          }}
        </div>
        <div v-else>
          {{
            Math.abs(
              (compare = (
                ((averageDefaultCrimes.allCrimesTotal -
                  averageCustomCrimes.allCrimesTotal) /
                  averageCustomCrimes.allCrimesTotal) *
                100
              ).toFixed(2))
            )
          }}%
          {{
            compare > 0 ? "Increase" : compare < 0 ? "Decrease" : "Unchanged"
          }}
        </div>
        <ChevronUpIcon
          class="icon chevron-up"
          v-if="compare > 0 && compare < 10"
        ></ChevronUpIcon>
        <ChevronDoubleUpIcon
          class="icon chevron-up"
          v-else-if="compare >= 10"
        ></ChevronDoubleUpIcon>
        <ChevronDownIcon
          class="icon chevron-down"
          v-else-if="compare < 0 && compare > -10"
        ></ChevronDownIcon>
        <ChevronDoubleDownIcon
          class="icon chevron-down"
          v-else-if="compare <= -10"
        ></ChevronDoubleDownIcon>
        <MinusIcon class="icon icon-unchanged" v-else></MinusIcon>
      </li>
      <li>
        <div v-if="displayCrime === 'month'">
          {{
            Math.abs(
              (compare = (
                ((defaultCrimes.antiSocialBehaviour.length -
                  customCrimes.antiSocialBehaviour.length) /
                  customCrimes.antiSocialBehaviour.length) *
                100
              ).toFixed(2))
            )
          }}%
          {{
            compare > 0 ? "Increase" : compare < 0 ? "Decrease" : "Unchanged"
          }}
        </div>
        <div v-else>
          {{
            Math.abs(
              (compare = (
                ((averageDefaultCrimes.antiSocialBehaviour -
                  averageCustomCrimes.antiSocialBehaviour) /
                  averageCustomCrimes.antiSocialBehaviour) *
                100
              ).toFixed(2))
            )
          }}%
          {{
            compare > 0 ? "Increase" : compare < 0 ? "Decrease" : "Unchanged"
          }}
        </div>
        <ChevronUpIcon
          class="icon chevron-up"
          v-if="compare > 0 && compare < 10"
        ></ChevronUpIcon>
        <ChevronDoubleUpIcon
          class="icon chevron-up"
          v-else-if="compare >= 10"
        ></ChevronDoubleUpIcon>
        <ChevronDownIcon
          class="icon chevron-down"
          v-else-if="compare < 0 && compare > -10"
        ></ChevronDownIcon>
        <ChevronDoubleDownIcon
          class="icon chevron-down"
          v-else-if="compare <= -10"
        ></ChevronDoubleDownIcon>
        <MinusIcon class="icon icon-unchanged" v-else></MinusIcon>
      </li>
      <li>
        <div v-if="displayCrime === 'month'">
          {{
            Math.abs(
              (compare = (
                ((defaultCrimes.bicycleTheft.length -
                  customCrimes.bicycleTheft.length) /
                  customCrimes.bicycleTheft.length) *
                100
              ).toFixed(2))
            )
          }}%
          {{
            compare > 0 ? "Increase" : compare < 0 ? "Decrease" : "Unchanged"
          }}
        </div>
        <div v-else>
          {{
            Math.abs(
              (compare = (
                ((averageDefaultCrimes.bicycleTheft -
                  averageCustomCrimes.bicycleTheft) /
                  averageCustomCrimes.bicycleTheft) *
                100
              ).toFixed(2))
            )
          }}%
          {{
            compare > 0 ? "Increase" : compare < 0 ? "Decrease" : "Unchanged"
          }}
        </div>
        <ChevronUpIcon
          class="icon chevron-up"
          v-if="compare > 0 && compare < 10"
        ></ChevronUpIcon>
        <ChevronDoubleUpIcon
          class="icon chevron-up"
          v-else-if="compare >= 10"
        ></ChevronDoubleUpIcon>
        <ChevronDownIcon
          class="icon chevron-down"
          v-else-if="compare < 0 && compare > -10"
        ></ChevronDownIcon>
        <ChevronDoubleDownIcon
          class="icon chevron-down"
          v-else-if="compare <= -10"
        ></ChevronDoubleDownIcon>
        <MinusIcon class="icon icon-unchanged" v-else></MinusIcon>
      </li>
      <li>
        <div v-if="displayCrime === 'month'">
          {{
            Math.abs(
              (compare = (
                ((defaultCrimes.burglary.length -
                  customCrimes.burglary.length) /
                  customCrimes.burglary.length) *
                100
              ).toFixed(2))
            )
          }}%
          {{
            compare > 0 ? "Increase" : compare < 0 ? "Decrease" : "Unchanged"
          }}
        </div>
        <div v-else>
          {{
            Math.abs(
              (compare = (
                ((averageDefaultCrimes.burglary -
                  averageCustomCrimes.burglary) /
                  averageCustomCrimes.burglary) *
                100
              ).toFixed(2))
            )
          }}%
          {{
            compare > 0 ? "Increase" : compare < 0 ? "Decrease" : "Unchanged"
          }}
        </div>
        <ChevronUpIcon
          class="icon chevron-up"
          v-if="compare > 0 && compare < 10"
        ></ChevronUpIcon>
        <ChevronDoubleUpIcon
          class="icon chevron-up"
          v-else-if="compare >= 10"
        ></ChevronDoubleUpIcon>
        <ChevronDownIcon
          class="icon chevron-down"
          v-else-if="compare < 0 && compare > -10"
        ></ChevronDownIcon>
        <ChevronDoubleDownIcon
          class="icon chevron-down"
          v-else-if="compare <= -10"
        ></ChevronDoubleDownIcon>
        <MinusIcon class="icon icon-unchanged" v-else></MinusIcon>
      </li>
      <li>
        <div v-if="displayCrime === 'month'">
          {{
            Math.abs(
              (compare = (
                ((defaultCrimes.criminalDamageArson.length -
                  customCrimes.criminalDamageArson.length) /
                  customCrimes.criminalDamageArson.length) *
                100
              ).toFixed(2))
            )
          }}%
          {{
            compare > 0 ? "Increase" : compare < 0 ? "Decrease" : "Unchanged"
          }}
        </div>
        <div v-else>
          {{
            Math.abs(
              (compare = (
                ((averageDefaultCrimes.criminalDamageArson -
                  averageCustomCrimes.criminalDamageArson) /
                  averageCustomCrimes.criminalDamageArson) *
                100
              ).toFixed(2))
            )
          }}%
          {{
            compare > 0 ? "Increase" : compare < 0 ? "Decrease" : "Unchanged"
          }}
        </div>
        <ChevronUpIcon
          class="icon chevron-up"
          v-if="compare > 0 && compare < 10"
        ></ChevronUpIcon>
        <ChevronDoubleUpIcon
          class="icon chevron-up"
          v-else-if="compare >= 10"
        ></ChevronDoubleUpIcon>
        <ChevronDownIcon
          class="icon chevron-down"
          v-else-if="compare < 0 && compare > -10"
        ></ChevronDownIcon>
        <ChevronDoubleDownIcon
          class="icon chevron-down"
          v-else-if="compare <= -10"
        ></ChevronDoubleDownIcon>
        <MinusIcon class="icon icon-unchanged" v-else></MinusIcon>
      </li>
      <li>
        <div v-if="displayCrime === 'month'">
          {{
            Math.abs(
              (compare = (
                ((defaultCrimes.drugs.length - customCrimes.drugs.length) /
                  customCrimes.drugs.length) *
                100
              ).toFixed(2))
            )
          }}%
          {{
            compare > 0 ? "Increase" : compare < 0 ? "Decrease" : "Unchanged"
          }}
        </div>
        <div v-else>
          {{
            Math.abs(
              (compare = (
                ((averageDefaultCrimes.drugs - averageCustomCrimes.drugs) /
                  averageCustomCrimes.drugs) *
                100
              ).toFixed(2))
            )
          }}%
          {{
            compare > 0 ? "Increase" : compare < 0 ? "Decrease" : "Unchanged"
          }}
        </div>
        <ChevronUpIcon
          class="icon chevron-up"
          v-if="compare > 0 && compare < 10"
        ></ChevronUpIcon>
        <ChevronDoubleUpIcon
          class="icon chevron-up"
          v-else-if="compare >= 10"
        ></ChevronDoubleUpIcon>
        <ChevronDownIcon
          class="icon chevron-down"
          v-else-if="compare < 0 && compare > -10"
        ></ChevronDownIcon>
        <ChevronDoubleDownIcon
          class="icon chevron-down"
          v-else-if="compare <= -10"
        ></ChevronDoubleDownIcon>
        <MinusIcon class="icon icon-unchanged" v-else></MinusIcon>
      </li>
      <li>
        <div v-if="displayCrime === 'month'">
          {{
            Math.abs(
              (compare = (
                ((defaultCrimes.otherTheft.length -
                  customCrimes.otherTheft.length) /
                  customCrimes.otherTheft.length) *
                100
              ).toFixed(2))
            )
          }}%
          {{
            compare > 0 ? "Increase" : compare < 0 ? "Decrease" : "Unchanged"
          }}
        </div>
        <div v-else>
          {{
            Math.abs(
              (compare = (
                ((averageDefaultCrimes.otherTheft -
                  averageCustomCrimes.otherTheft) /
                  averageCustomCrimes.otherTheft) *
                100
              ).toFixed(2))
            )
          }}%
          {{
            compare > 0 ? "Increase" : compare < 0 ? "Decrease" : "Unchanged"
          }}
        </div>
        <ChevronUpIcon
          class="icon chevron-up"
          v-if="compare > 0 && compare < 10"
        ></ChevronUpIcon>
        <ChevronDoubleUpIcon
          class="icon chevron-up"
          v-else-if="compare >= 10"
        ></ChevronDoubleUpIcon>
        <ChevronDownIcon
          class="icon chevron-down"
          v-else-if="compare < 0 && compare > -10"
        ></ChevronDownIcon>
        <ChevronDoubleDownIcon
          class="icon chevron-down"
          v-else-if="compare <= -10"
        ></ChevronDoubleDownIcon>
        <MinusIcon class="icon icon-unchanged" v-else></MinusIcon>
      </li>
      <li>
        <div v-if="displayCrime === 'month'">
          {{
            Math.abs(
              (compare = (
                ((defaultCrimes.possessionOfWeapons.length -
                  customCrimes.possessionOfWeapons.length) /
                  customCrimes.possessionOfWeapons.length) *
                100
              ).toFixed(2))
            )
          }}%
          {{
            compare > 0 ? "Increase" : compare < 0 ? "Decrease" : "Unchanged"
          }}
        </div>
        <div v-else>
          {{
            Math.abs(
              (compare = (
                ((averageDefaultCrimes.possessionOfWeapons -
                  averageCustomCrimes.possessionOfWeapons) /
                  averageCustomCrimes.possessionOfWeapons) *
                100
              ).toFixed(2))
            )
          }}%
          {{
            compare > 0 ? "Increase" : compare < 0 ? "Decrease" : "Unchanged"
          }}
        </div>
        <ChevronUpIcon
          class="icon chevron-up"
          v-if="compare > 0 && compare < 10"
        ></ChevronUpIcon>
        <ChevronDoubleUpIcon
          class="icon chevron-up"
          v-else-if="compare >= 10"
        ></ChevronDoubleUpIcon>
        <ChevronDownIcon
          class="icon chevron-down"
          v-else-if="compare < 0 && compare > -10"
        ></ChevronDownIcon>
        <ChevronDoubleDownIcon
          class="icon chevron-down"
          v-else-if="compare <= -10"
        ></ChevronDoubleDownIcon>
        <MinusIcon class="icon icon-unchanged" v-else></MinusIcon>
      </li>
      <li>
        <div v-if="displayCrime === 'month'">
          {{
            Math.abs(
              (compare = (
                ((defaultCrimes.publicOrder.length -
                  customCrimes.publicOrder.length) /
                  customCrimes.publicOrder.length) *
                100
              ).toFixed(2))
            )
          }}%
          {{
            compare > 0 ? "Increase" : compare < 0 ? "Decrease" : "Unchanged"
          }}
        </div>
        <div v-else>
          {{
            Math.abs(
              (compare = (
                ((averageDefaultCrimes.publicOrder -
                  averageCustomCrimes.publicOrder) /
                  averageCustomCrimes.publicOrder) *
                100
              ).toFixed(2))
            )
          }}%
          {{
            compare > 0 ? "Increase" : compare < 0 ? "Decrease" : "Unchanged"
          }}
        </div>
        <ChevronUpIcon
          class="icon chevron-up"
          v-if="compare > 0 && compare < 10"
        ></ChevronUpIcon>
        <ChevronDoubleUpIcon
          class="icon chevron-up"
          v-else-if="compare >= 10"
        ></ChevronDoubleUpIcon>
        <ChevronDownIcon
          class="icon chevron-down"
          v-else-if="compare < 0 && compare > -10"
        ></ChevronDownIcon>
        <ChevronDoubleDownIcon
          class="icon chevron-down"
          v-else-if="compare <= -10"
        ></ChevronDoubleDownIcon>
        <MinusIcon class="icon icon-unchanged" v-else></MinusIcon>
      </li>
      <li>
        <div v-if="displayCrime === 'month'">
          {{
            Math.abs(
              (compare = (
                ((defaultCrimes.robbery.length - customCrimes.robbery.length) /
                  customCrimes.robbery.length) *
                100
              ).toFixed(2))
            )
          }}%
          {{
            compare > 0 ? "Increase" : compare < 0 ? "Decrease" : "Unchanged"
          }}
        </div>
        <div v-else>
          {{
            Math.abs(
              (compare = (
                ((averageDefaultCrimes.robbery - averageCustomCrimes.robbery) /
                  averageCustomCrimes.robbery) *
                100
              ).toFixed(2))
            )
          }}%
          {{
            compare > 0 ? "Increase" : compare < 0 ? "Decrease" : "Unchanged"
          }}
        </div>
        <ChevronUpIcon
          class="icon chevron-up"
          v-if="compare > 0 && compare < 10"
        ></ChevronUpIcon>
        <ChevronDoubleUpIcon
          class="icon chevron-up"
          v-else-if="compare >= 10"
        ></ChevronDoubleUpIcon>
        <ChevronDownIcon
          class="icon chevron-down"
          v-else-if="compare < 0 && compare > -10"
        ></ChevronDownIcon>
        <ChevronDoubleDownIcon
          class="icon chevron-down"
          v-else-if="compare <= -10"
        ></ChevronDoubleDownIcon>
        <MinusIcon class="icon icon-unchanged" v-else></MinusIcon>
      </li>
      <li>
        <div v-if="displayCrime === 'month'">
          {{
            Math.abs(
              (compare = (
                ((defaultCrimes.shoplifting.length -
                  customCrimes.shoplifting.length) /
                  customCrimes.shoplifting.length) *
                100
              ).toFixed(2))
            )
          }}%
          {{
            compare > 0 ? "Increase" : compare < 0 ? "Decrease" : "Unchanged"
          }}
        </div>
        <div v-else>
          {{
            Math.abs(
              (compare = (
                ((averageDefaultCrimes.shoplifting -
                  averageCustomCrimes.shoplifting) /
                  averageCustomCrimes.shoplifting) *
                100
              ).toFixed(2))
            )
          }}%
          {{
            compare > 0 ? "Increase" : compare < 0 ? "Decrease" : "Unchanged"
          }}
        </div>
        <ChevronUpIcon
          class="icon chevron-up"
          v-if="compare > 0 && compare < 10"
        ></ChevronUpIcon>
        <ChevronDoubleUpIcon
          class="icon chevron-up"
          v-else-if="compare >= 10"
        ></ChevronDoubleUpIcon>
        <ChevronDownIcon
          class="icon chevron-down"
          v-else-if="compare < 0 && compare > -10"
        ></ChevronDownIcon>
        <ChevronDoubleDownIcon
          class="icon chevron-down"
          v-else-if="compare <= -10"
        ></ChevronDoubleDownIcon>
        <MinusIcon class="icon icon-unchanged" v-else></MinusIcon>
      </li>
      <li>
        <div v-if="displayCrime === 'month'">
          {{
            Math.abs(
              (compare = (
                ((defaultCrimes.theftFromThePerson.length -
                  customCrimes.theftFromThePerson.length) /
                  customCrimes.theftFromThePerson.length) *
                100
              ).toFixed(2))
            )
          }}%
          {{
            compare > 0 ? "Increase" : compare < 0 ? "Decrease" : "Unchanged"
          }}
        </div>
        <div v-else>
          {{
            Math.abs(
              (compare = (
                ((averageDefaultCrimes.theftFromThePerson -
                  averageCustomCrimes.theftFromThePerson) /
                  averageCustomCrimes.theftFromThePerson) *
                100
              ).toFixed(2))
            )
          }}%
          {{
            compare > 0 ? "Increase" : compare < 0 ? "Decrease" : "Unchanged"
          }}
        </div>
        <ChevronUpIcon
          class="icon chevron-up"
          v-if="compare > 0 && compare < 10"
        ></ChevronUpIcon>
        <ChevronDoubleUpIcon
          class="icon chevron-up"
          v-else-if="compare >= 10"
        ></ChevronDoubleUpIcon>
        <ChevronDownIcon
          class="icon chevron-down"
          v-else-if="compare < 0 && compare > -10"
        ></ChevronDownIcon>
        <ChevronDoubleDownIcon
          class="icon chevron-down"
          v-else-if="compare <= -10"
        ></ChevronDoubleDownIcon>
        <MinusIcon class="icon icon-unchanged" v-else></MinusIcon>
      </li>
      <li>
        <div v-if="displayCrime === 'month'">
          {{
            Math.abs(
              (compare = (
                ((defaultCrimes.vehicleCrime.length -
                  customCrimes.vehicleCrime.length) /
                  customCrimes.vehicleCrime.length) *
                100
              ).toFixed(2))
            )
          }}%
          {{
            compare > 0 ? "Increase" : compare < 0 ? "Decrease" : "Unchanged"
          }}
        </div>
        <div v-else>
          {{
            Math.abs(
              (compare = (
                ((averageDefaultCrimes.vehicleCrime -
                  averageCustomCrimes.vehicleCrime) /
                  averageCustomCrimes.vehicleCrime) *
                100
              ).toFixed(2))
            )
          }}%
          {{
            compare > 0 ? "Increase" : compare < 0 ? "Decrease" : "Unchanged"
          }}
        </div>
        <ChevronUpIcon
          class="icon chevron-up"
          v-if="compare > 0 && compare < 10"
        ></ChevronUpIcon>
        <ChevronDoubleUpIcon
          class="icon chevron-up"
          v-else-if="compare >= 10"
        ></ChevronDoubleUpIcon>
        <ChevronDownIcon
          class="icon chevron-down"
          v-else-if="compare < 0 && compare > -10"
        ></ChevronDownIcon>
        <ChevronDoubleDownIcon
          class="icon chevron-down"
          v-else-if="compare <= -10"
        ></ChevronDoubleDownIcon>
        <MinusIcon class="icon icon-unchanged" v-else></MinusIcon>
      </li>
      <li>
        <div v-if="displayCrime === 'month'">
          {{
            Math.abs(
              (compare = (
                ((defaultCrimes.violentCrime.length -
                  customCrimes.violentCrime.length) /
                  customCrimes.violentCrime.length) *
                100
              ).toFixed(2))
            )
          }}%
          {{
            compare > 0 ? "Increase" : compare < 0 ? "Decrease" : "Unchanged"
          }}
        </div>
        <div v-else>
          {{
            Math.abs(
              (compare = (
                ((averageDefaultCrimes.violentCrime -
                  averageCustomCrimes.violentCrime) /
                  averageCustomCrimes.violentCrime) *
                100
              ).toFixed(2))
            )
          }}%
          {{
            compare > 0 ? "Increase" : compare < 0 ? "Decrease" : "Unchanged"
          }}
        </div>
        <ChevronUpIcon
          class="icon chevron-up"
          v-if="compare > 0 && compare < 10"
        ></ChevronUpIcon>
        <ChevronDoubleUpIcon
          class="icon chevron-up"
          v-else-if="compare >= 10"
        ></ChevronDoubleUpIcon>
        <ChevronDownIcon
          class="icon chevron-down"
          v-else-if="compare < 0 && compare > -10"
        ></ChevronDownIcon>
        <ChevronDoubleDownIcon
          class="icon chevron-down"
          v-else-if="compare <= -10"
        ></ChevronDoubleDownIcon>
        <MinusIcon class="icon icon-unchanged" v-else></MinusIcon>
      </li>
      <li>
        <div v-if="displayCrime === 'month'">
          {{
            Math.abs(
              (compare = (
                ((defaultCrimes.otherCrime.length -
                  customCrimes.otherCrime.length) /
                  customCrimes.otherCrime.length) *
                100
              ).toFixed(2))
            )
          }}%
          {{
            compare > 0 ? "Increase" : compare < 0 ? "Decrease" : "Unchanged"
          }}
        </div>
        <div v-else>
          {{
            Math.abs(
              (compare = (
                ((averageDefaultCrimes.otherCrime -
                  averageCustomCrimes.otherCrime) /
                  averageCustomCrimes.otherCrime) *
                100
              ).toFixed(2))
            )
          }}%
          {{
            compare > 0 ? "Increase" : compare < 0 ? "Decrease" : "Unchanged"
          }}
        </div>
        <ChevronUpIcon
          class="icon chevron-up"
          v-if="compare > 0 && compare < 10"
        ></ChevronUpIcon>
        <ChevronDoubleUpIcon
          class="icon chevron-up"
          v-else-if="compare >= 10"
        ></ChevronDoubleUpIcon>
        <ChevronDownIcon
          class="icon chevron-down"
          v-else-if="compare < 0 && compare > -10"
        ></ChevronDownIcon>
        <ChevronDoubleDownIcon
          class="icon chevron-down"
          v-else-if="compare <= -10"
        ></ChevronDoubleDownIcon>
        <MinusIcon class="icon icon-unchanged" v-else></MinusIcon>
      </li>
    </ul>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, reactive } from "vue";
import { ChevronUpIcon } from "@heroicons/vue/solid";
import { ChevronDownIcon } from "@heroicons/vue/solid";
import { ChevronDoubleUpIcon } from "@heroicons/vue/solid";
import { ChevronDoubleDownIcon } from "@heroicons/vue/solid";
import { MinusIcon } from "@heroicons/vue/solid";
import { InformationCircleIcon } from "@heroicons/vue/outline";
export default {
  components: {
    ChevronUpIcon,
    ChevronDownIcon,
    ChevronDoubleUpIcon,
    ChevronDoubleDownIcon,
    InformationCircleIcon,
    MinusIcon,
  },
  setup() {
    const store = useStore();
    const defaultCrimes = computed(() => store.getters.getDefaultCrimes);
    const customCrimes = computed(() => store.getters.getCustomCrimes);
    const displayCrime = computed(() => store.getters.getDisplayCrime);
    const averageDefaultCrimes = computed(
      () => store.getters.getAverageDefaultCrimes
    );
    const averageCustomCrimes = computed(
      () => store.getters.getAverageCustomCrimes
    );
    const showCustomMonthYear = computed(
      () => store.getters.getShowCustomMonthYear
    );

    function infoDialog(info) {
      store.dispatch("infoDialog", info);
    }
    return {
      displayCrime,
      showCustomMonthYear,
      defaultCrimes,
      customCrimes,
      averageDefaultCrimes,
      averageCustomCrimes,
      infoDialog,
    };
  },
};
</script>

<style scoped>
.crime-comparison {
  font-size: 2rem;
  text-align: center;
  padding: 1rem 0 0rem 0;
  /* background-color: #fff; */
  /* background-color: #f3e6eb; */
  /* background-color: #e6ebf3; */
  background-color: rgba(238, 237, 237, 0.425);
  grid-column: 4;
}
.crime-comparison li {
  list-style: none;
  justify-content: space-between;
  padding: 0 0.2rem 0 1rem;
  /* min-width: 20.5rem; */
  color: #003a83;
  font-weight: 700;
  border-bottom: 2px dashed #83003a;
  height: 3rem; /* 3.6rem to fit all */
  margin-bottom: 0.6rem;
  display: flex;
  align-items: center;
  animation: moveInBottom 1s ease-in-out;
}

.icon {
  width: 3rem;
  height: 3rem;
}
.chevron-up {
  color: red;
}

.chevron-down {
  color: green;
}
.icon-unchanged {
  color: #555;
}

.icon-info {
  width: 1.6rem;
  height: 1.6rem;
  cursor: pointer;
  /* color: #003a83; */
}

.crime-list-column-title {
  font-size: 1.8rem;
  text-align: center;
  border-bottom: 2px dashed #83003a;
  animation: moveInLeft 1s ease-in-out;
  margin-bottom: 0.3rem;
}
</style>
