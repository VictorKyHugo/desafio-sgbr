<template>
  <div>
    <div
      @click="toggleModal"
      data-test="modal-background"
      class="absolute bottom-0 top-0 z-20 min-h-full w-20 min-w-full bg-black opacity-60"
    ></div>
    <q-img
      class="fixed inset-0 z-30 mx-auto my-auto aspect-square w-4/12"
      :src="getSelectedGif"
    />
    <q-icon
      name="close"
      data-test="modal-close"
      size="3rem"
      @click="toggleModal"
      class="fixed right-6 top-20 z-40 cursor-pointer"
    />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useGifsStore } from "stores/gifsStore";

// Store
const store = useGifsStore();
const { toggleModal } = store;
const { getSelectedGif } = storeToRefs(store);
</script>
