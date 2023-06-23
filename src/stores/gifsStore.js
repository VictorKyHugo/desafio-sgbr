import { defineStore } from "pinia";
import { ref, computed } from "vue";

import * as GifsListService from "../services/gifs.service";

export const useGifsStore = defineStore("gifs", () => {
  const gifsPreview = ref([]);
  const gifsFullsized = ref([]);
  const offsetIndex = ref(0);

  const onLoad = async (index, done) => {
    const getOffset = computed(() => {
      const itemsPerPage = 50;
      const offset = offsetIndex.value * itemsPerPage;

      offsetIndex.value += 1;

      return offset;
    });

    if (isUserSearching.value) {
      await searchGifsListData(getOffset.value, searchQuery.value);
    } else {
      await fetchGifsListData(getOffset.value);
    }

    done();
  };

  // Gif List without search

  const fetchGifsListData = async (offset) => {
    return await GifsListService.fetchGifs(offset)
      .then((data) => {
        //check if there's data
        if (data.gifs_preview.length) {
          gifsPreview.value = [...gifsPreview.value, ...data.gifs_preview];
          gifsFullsized.value = [
            ...gifsFullsized.value,
            ...data.gifs_fullsized,
          ];
        } else {
          isGifsScrollDisabled.value = true;
        }
      })
      .catch((err) => {
        console.error(err);
        isGifsScrollDisabled.value = true;
      });
  };

  //Gif Search

  const isUserSearching = ref(false);
  const isGifsScrollDisabled = ref(false);
  const searchQuery = ref("");

  const searchGifsListData = async (offset, string) => {
    return await GifsListService.searchGifs(offset, string)
      .then((data) => {
        //check if there's data
        if (data.gifs_preview.length) {
          gifsPreview.value = [...gifsPreview.value, ...data.gifs_preview];
          gifsFullsized.value = [
            ...gifsFullsized.value,
            ...data.gifs_fullsized,
          ];
        } else {
          isGifsScrollDisabled.value = true;
        }
      })
      .catch((err) => {
        console.error(err);
        isGifsScrollDisabled.value = true;
      });
  };

  const resetGifsList = () => {
    offsetIndex.value = 1;
    isGifsScrollDisabled.value = false;
    gifsPreview.value = [];
    gifsFullsized.value = [];
  };

  const searchGifs = (string) => {
    searchQuery.value = string;
    isUserSearching.value = true;

    searchGifsListData(offsetIndex.value, searchQuery.value);
  };

  // Modal

  const isModalOpen = ref(false);
  const selectedGifIndex = ref("");

  const toggleModal = (index) => {
    isModalOpen.value = !isModalOpen.value;
    selectedGifIndex.value = index;
  };

  const getSelectedGif = computed(() => {
    return gifsFullsized.value[selectedGifIndex.value];
  });

  return {
    gifsPreview,
    gifsFullsized,
    onLoad,
    fetchGifsListData,
    searchGifsListData,
    resetGifsList,
    searchGifs,
    isGifsScrollDisabled,
    isModalOpen,
    toggleModal,
    getSelectedGif,
  };
});
