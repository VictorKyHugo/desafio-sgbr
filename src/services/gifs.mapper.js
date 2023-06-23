export const mapGifList = (gifs) => {
  return {
    gifs_preview: gifs.data.map((gif) => gif.images.fixed_height_small.url),
    gifs_fullsized: gifs.data.map((gif) => gif.images.original.url),
  };
};
