import { createApi } from 'unsplash-js';

export const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
  fetch: fetch,
});
