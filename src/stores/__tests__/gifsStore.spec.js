import { setActivePinia, createPinia } from "pinia";
import { useGifsStore } from "../gifsStore";
import { describe, beforeEach, it, expect, vi } from "vitest";

import * as GifsListService from "../../services/gifs.service";

const gifsMock = [
  {
    images: {
      downsized_medium: {
        url: "https://giphy.com/gifs/nope-nah-fam-WTjnWYENpLxS8JQ5rz",
      },
    },
  },
  {
    images: {
      downsized_medium: {
        url: "https://giphy.com/gifs/cat-turtle-eY2Q6hxp1ZeFi",
      },
    },
  },
];

describe("Gifs Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it("should call fetchGifs from gifsListService", async () => {
    const store = useGifsStore();
    const fetchGifsSpy = vi.spyOn(GifsListService, "fetchGifs");

    const offset = "0";

    await store.fetchGifsListData(offset);

    expect(fetchGifsSpy).toHaveBeenCalled();
  });

  it("should call fetchGifs from gifsListService and throw a error", async () => {
    const store = useGifsStore();
    const fetchGifsSpy = vi
      .spyOn(GifsListService, "fetchGifs")
      .mockRejectedValue("error");

    const offset = "0";

    await store.fetchGifsListData(offset);

    expect(fetchGifsSpy).rejects.toMatch("error");
  });

  it("should call searchGifs from gifsListService", async () => {
    const store = useGifsStore();
    const searchGifsSpy = vi.spyOn(GifsListService, "searchGifs");

    const offset = "0";
    const queryString = "Golden Sun";

    await store.searchGifsListData(offset, queryString);

    expect(searchGifsSpy).toHaveBeenCalled();
  });

  it("should call searchGifs from gifsListService and throw a error", async () => {
    const store = useGifsStore();
    const fetchGifsSpy = vi
      .spyOn(GifsListService, "fetchGifs")
      .mockRejectedValue("error");

    const offset = "0";
    const queryString = "Golden Sun";

    await store.searchGifsListData(offset, queryString);

    expect(fetchGifsSpy).rejects.toMatch("error");
  });

  it("should call resetGifsList to reset offsetIndex, isGifsScrollDisabled and gifs", () => {
    const store = useGifsStore();

    store.offsetIndex = 22;
    store.isGifsScrollDisabled = true;
    store.gifs = gifsMock;

    const resetGifsSpy = vi
      .spyOn(store, "resetGifsList")
      .mockImplementation(() => {
        store.offsetIndex = 1;
        store.isGifsScrollDisabled = false;
        store.gifs = [];
      });

    store.resetGifsList();

    expect(resetGifsSpy).toHaveBeenCalled();
    expect(store.offsetIndex).toBe(1);
    expect(store.isGifsScrollDisabled).toBe(false);
    expect(store.gifs).toStrictEqual([]);
  });

  it("should call searchGifs function to search gifs", () => {
    const store = useGifsStore();

    store.isUserSearching = false;

    const searchGifsSpy = vi
      .spyOn(store, "searchGifs")
      .mockImplementation(() => {
        store.isUserSearching = true;
      });

    store.searchGifs();

    expect(searchGifsSpy).toHaveBeenCalled();
    expect(store.isUserSearching).toBe(true);
  });

  it("should toggle modal", () => {
    const store = useGifsStore();

    store.isModalOpen = false;

    const toggleModalSpy = vi
      .spyOn(store, "toggleModal")
      .mockImplementation(() => {
        store.isModalOpen = !store.isModalOpen;
      });

    store.toggleModal();
    expect(store.isModalOpen).toBe(true);
    store.toggleModal();
    expect(store.isModalOpen).toBe(false);

    expect(toggleModalSpy).toHaveBeenCalledTimes(2);
  });

  it("should get selectedGif by index", () => {
    const store = useGifsStore();

    store.gifs = gifsMock;
    store.selectedGifIndex = 1;
    const getSelectedGifSpy = store.gifs[store.selectedGifIndex];

    expect(getSelectedGifSpy).toMatchInlineSnapshot(`
      {
        "images": {
          "downsized_medium": {
            "url": "https://giphy.com/gifs/cat-turtle-eY2Q6hxp1ZeFi",
          },
        },
      }
    `);
  });
});
