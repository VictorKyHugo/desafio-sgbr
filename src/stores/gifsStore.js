import { defineStore } from "pinia";
import { ref, computed } from "vue";

import * as GifsListService from "../services/gifs.service";

export const useGifsStore = defineStore("gifs", () => {
  const gifs = ref([]);
  const offsetIndex = ref(0);
  const isUserSearching = ref(false);
  const disableGifsScroll = ref(false);
  const searchQuery = ref("");

  const fetchGifsListData = async (offset) => {
    return await GifsListService.fetchGifs(offset)
      .then((data) => {
        //check if there's data
        if (data.gifs_preview.length) {
          gifs.value = [...gifs.value, ...data.gifs_preview];
        } else {
          disableGifsScroll.value = true;
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const searchGifsListData = async (offset, string) => {
    return await GifsListService.searchGifs(offset, string)
      .then((data) => {
        //check if there's data
        if (data.gifs_preview.length) {
          gifs.value = [...gifs.value, ...data.gifs_preview];
        } else {
          disableGifsScroll.value = true;
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

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

  const resetGifsList = () => {
    offsetIndex.value = 1;
    disableGifsScroll.value = false;
    gifs.value = [];
  };

  const searchGifs = (string) => {
    searchQuery.value = string;
    isUserSearching.value = true;

    searchGifsListData(offsetIndex.value, searchQuery.value);
  };

  return {
    onLoad,
    resetGifsList,
    searchGifs,
    gifs,
    disableGifsScroll,
  };
});
