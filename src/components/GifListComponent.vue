<template>
  <GifModalComponent data-test="gif-modal-component" v-if="isModalOpen" />
  <q-infinite-scroll
    class="grid grid-cols-2 items-center justify-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
    @load="onLoad"
    :disable="isGifsScrollDisabled"
  >
    <div
      v-for="(gif, index) in gifs"
      :key="index"
      class="m-12 justify-self-center"
    >
      <q-card
        @click="toggleModal(index)"
        class="p-0.5 hover:cursor-pointer hover:before:absolute hover:before:inset-0.5 hover:before:z-10 hover:before:bg-black hover:before:opacity-20 hover:before:content-['hello']"
      >
        <q-img class="aspect-square h-44 w-44 object-cover" :src="gif" />
      </q-card>
    </div>
    <template v-slot:loading>
      <div class="mb-4 flex justify-center">
        <q-spinner-dots color="primary" size="40px" />
      </div>
    </template>
  </q-infinite-scroll>

  <div
    v-if="isGifsScrollDisabled"
    data-test="no-gifs-message"
    class="mb-10 mt-2 text-center text-xl"
  >
    Acabou os gifs, tente fazer outra pesquisa 😊
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useGifsStore } from "stores/gifsStore";
import GifModalComponent from "./GifModalComponent.vue";

// Store
const store = useGifsStore();
const { onLoad, toggleModal } = store;
const { gifs, isGifsScrollDisabled, isModalOpen } = storeToRefs(store);
</script>
