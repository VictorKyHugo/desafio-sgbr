<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar class="bg-amber-600">
        <q-toolbar-title> Giphy </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <SearchGifListComponent />
      <GifListComponent />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import GifListComponent from "src/components/GifListComponent.vue";
import SearchGifListComponent from "src/components/SearchGifListComponent.vue";
</script>
