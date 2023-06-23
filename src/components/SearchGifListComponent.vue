<template>
  <q-form @submit.prevent="onSearch" class="flex justify-center">
    <q-input
      data-test="search-input"
      v-model="inputText"
      class="mt-2 w-4/6"
      label="Pesquisar Gifs"
    >
      <template v-slot:append>
        <q-icon
          data-test="clear-input-icon"
          v-if="inputText"
          name="close"
          @click="resetInputText"
          class="cursor-pointer"
        />
        <q-icon name="search" @click="onSearch" class="cursor-pointer" />
      </template>
    </q-input>
  </q-form>
</template>

<script setup>
import { useGifsStore } from "stores/gifsStore";
import { ref } from "vue";

const inputText = ref("");

const resetInputText = () => {
  inputText.value = "";
};

const onSearch = () => {
  resetGifsList();
  searchGifs(inputText.value);
  resetInputText();
};

// Store
const store = useGifsStore();
const { resetGifsList, searchGifs } = store;
</script>
