const cache = new Map<string, { data: any; expires: number }>();

export default defineEventHandler(async () => {
  const key = "vlr-news";
  const now = Date.now();

  const cached = cache.get(key);
  if (cached && cached.expires > now) {
    return cached.data;
  }

  const data = await $fetch("https://vlrggapi.vercel.app/news");

  cache.set(key, {
    data,
    expires: now + 5 * 60 * 1000, // 5 mins
  });

  return data;
});
