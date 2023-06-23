import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchGifs, searchGifs } from "../gifs.service";
import axios from "axios";

vi.mock("axios");

const apiKey = import.meta.env.VITE_GIPHY_API_KEY;
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

describe("Gifs Service", () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  describe("fetchGifs", () => {
    it("makes a GET request to fetch gifs", async () => {
      axios.get.mockResolvedValue({
        data: {
          data: gifsMock,
        },
      });

      const offset = "0";
      const gifs = await fetchGifs(offset);
      const apiKey = import.meta.env.VITE_GIPHY_API_KEY;

      expect(axios.get).toHaveBeenCalledWith(
        `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&offset=${offset}`
      );

      expect(gifs).toMatchInlineSnapshot(`
        {
          "gifs": [
            "https://giphy.com/gifs/nope-nah-fam-WTjnWYENpLxS8JQ5rz",
            "https://giphy.com/gifs/cat-turtle-eY2Q6hxp1ZeFi",
          ],
        }
      `);
    });

    it("makes a GET request to search gifs", async () => {
      axios.get.mockResolvedValue({
        data: {
          data: gifsMock,
        },
      });

      const offset = "0";
      const searchQuery = "Hollow Knight";
      const gifs = await searchGifs(offset, searchQuery);

      expect(axios.get).toHaveBeenCalledWith(
        `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&offset=${offset}&q=${searchQuery}`
      );

      expect(gifs).toMatchInlineSnapshot(`
        {
          "gifs": [
            "https://giphy.com/gifs/nope-nah-fam-WTjnWYENpLxS8JQ5rz",
            "https://giphy.com/gifs/cat-turtle-eY2Q6hxp1ZeFi",
          ],
        }
      `);
    });
  });
});
