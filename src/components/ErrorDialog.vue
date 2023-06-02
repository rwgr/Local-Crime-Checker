<template>
  <div class="backdrop">
    <dialog open class="dialog flex-column">
      <h3 class="dialog-heading">An error occurred</h3>
      <p class="dialog-text">{{ error }}</p>
      <button class="btn" @click.prevent="closeError">Close</button>
    </dialog>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    const store = useStore();
    const error = computed(() => store.getters.getError);

    function closeError() {
      store.dispatch("closeError");
    }
    return {
      error,
      closeError,
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
  font-size: 1.6rem;
  text-align: start;
}
</style>
