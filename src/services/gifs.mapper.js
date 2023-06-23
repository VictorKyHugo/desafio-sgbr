export const mapGifList = (gifs) => {
  return {
    gifs: gifs.data.map((gif) => gif.images.downsized_medium.url),
  };
};
