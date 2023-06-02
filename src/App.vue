<template>
  <div class="app">
    <the-header></the-header>
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
    <the-footer></the-footer>
  </div>
</template>

<script>
import { useStore } from "vuex";
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
export default {
  components: {
    TheHeader,
    TheFooter,
  },
  setup() {
    const store = useStore();

    store.dispatch("lastUpdated");

    return {};
  },
};
</script>

<style>
/* Triadic, #83003a #3A8300 #003A83
tints: #f3e6eb  #e6ebf3 */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body {
  font-family: sans-serif;
  color: #270011;
  font-weight: 400;
  font-size: 1.5rem;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 3.2rem;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.flex-center {
  align-items: center;
  justify-content: center;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 0.4fr 0.4fr 1fr 0.4fr 0.4fr 1fr;
  margin-bottom: 4rem;
  /* border: 6px solid #00341d; */
  border: 6px solid #270011;
  animation: moveInLeft 1s ease-out;
}

.hide {
  opacity: 0;
}

.location-flex {
  display: flex;
  gap: 5rem;
  margin-top: 2rem;
  /* animation: moveInLeft 1s ease-out; */
}

/* Transitions */
.route-enter-from {
  opacity: 0;
  transform: translateZ(100);
}
.route-enter-active {
  transition: all 0.5s ease-in;
}

.route-leave-active {
  transition: all 0.5s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateZ(0rem);
}

.route-leave-to {
  opacity: 0;
  transform: translateZ(-100);
}

.icon-info {
  width: 1.6rem;
  height: 1.6rem;
  cursor: pointer;
  /* color: #003a83; */
}

.btn {
  background-color: #83003a;
  color: #fff;
  border: none;
  font-size: 1.8rem;
  padding: 1rem 5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s;
}
.btn:hover,
.btn:active {
  background-color: #270011;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

@keyframes moveInLeft {
  0% {
    opacity: 0;
    transform: translateX(-10rem);
  }

  80% {
    transform: translateX(1rem);
  }

  100% {
    opacity: 1;
    transform: translate(0);
  }
}

@keyframes moveInRight {
  0% {
    opacity: 0;
    transform: translateX(10rem);
  }

  80% {
    transform: translateX(-1rem);
  }

  100% {
    opacity: 1;
    transform: translate(0);
  }
}

@keyframes moveOut {
  0% {
    opacity: 0;
    transform: translateZ(0);
  }

  100% {
    opacity: 1;
    transform: translateZ(-100rem);
  }
}

@keyframes moveInBottom {
  0% {
    opacity: 0;
    transform: translateY(3rem);
  }

  100% {
    opacity: 1;
    transform: translate(0);
  }
}
</style>
