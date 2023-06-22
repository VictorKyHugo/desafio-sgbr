import { mapGifList } from "./gifs.mapper";
import axios from "axios";

const apiKey = import.meta.env.VITE_GIPHY_API_KEY;

export const fetchGifs = (offset) =>
  axios
    .get(
      `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&offset=${offset}`
    )
    .then((response) => mapGifList(response.data));

export const searchGifs = (offset, searchQuery) =>
  axios
    .get(
      `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&offset=${offset}&q=${searchQuery}`
    )
    .then((response) => mapGifList(response.data));
