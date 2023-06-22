<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar class="bg-amber-700">
        <q-toolbar-title> Orchestra Gifs </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <GifListComponent />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import GifListComponent from "src/components/GifListComponent.vue";
</script>
