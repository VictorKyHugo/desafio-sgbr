<template>
  <q-infinite-scroll
    class="grid grid-cols-5 items-center justify-center"
    @load="onLoad"
    :disable="disableGifsScroll"
  >
    <div
      v-for="(gif, index) in gifs"
      :key="index"
      class="m-12 justify-self-center"
    >
      <q-card
        class="p-0.5 hover:cursor-pointer hover:before:absolute hover:before:inset-0.5 hover:before:z-10 hover:before:bg-black hover:before:opacity-20 hover:before:content-['hello']"
      >
        <q-img
          class="aspect-square h-40 w-40 object-cover"
          :src="gif"
          alt="aaaa"
        />
      </q-card>
    </div>
    <template v-slot:loading>
      <div class="mb-4 flex justify-center">
        <q-spinner-dots color="primary" size="40px" />
      </div>
    </template>
  </q-infinite-scroll>

  <div v-if="disableGifsScroll" class="mb-10 text-center text-xl">
    Acabou os gifs, tente fazer outra pesquisa 😊
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useGifsStore } from "stores/gifsStore";

// Store
const store = useGifsStore();
const { onLoad } = store;
const { gifs, disableGifsScroll } = storeToRefs(store);
</script>
