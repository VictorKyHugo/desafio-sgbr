import { defineStore } from "pinia";
import { ref, computed } from "vue";

import * as GifsListService from "../services/gifs.service";

export const useGifsStore = defineStore("gifs", () => {
  const gifs = ref([]);

  const fetchGifsListData = async (offset) => {
    return await GifsListService.fetchGifs(offset)
      .then((data) => {
        gifs.value = [...gifs.value, ...data.gifs_preview];
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const onLoad = async (index, done) => {
    const getOffset = computed(() => {
      const itemsPerPage = 50;

      //subtracts 1 to index start at 0
      return (index - 1) * itemsPerPage;
    });
    await fetchGifsListData(getOffset.value);
    done();
  };

  return { onLoad, gifs };
});
