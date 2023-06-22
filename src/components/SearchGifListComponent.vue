<template>
  <q-form @submit.prevent="(e) => onSearch(e)" class="flex justify-center">
    <q-input v-model="text" class="w-4/6" label="Pesquisar Gifs">
      <template v-slot:append>
        <q-icon
          v-if="text !== ''"
          name="close"
          @click="text = ''"
          class="cursor-pointer"
        />
        <q-icon name="search" class="cursor-pointer" @click="searchGifs" />
      </template>
    </q-input>
  </q-form>
</template>

<script setup>
import { useGifsStore } from "stores/gifsStore";
import { ref } from "vue";

const text = ref("");

const onSearch = (e) => {
  const stringQuery = e.target[0].value;

  resetGifsList();
  searchGifs(stringQuery);
  text.value = "";
};

// Store
const store = useGifsStore();
const { resetGifsList, searchGifs } = store;
</script>
