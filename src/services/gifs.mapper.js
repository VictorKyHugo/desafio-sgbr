export const mapGifList = (gifs) => {
  return {
    gifs_preview: gifs.data.map((gif) => gif.images.downsized_medium.url),
  };
};
