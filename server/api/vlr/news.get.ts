const cache = new Map<string, { data: any; expires: number }>();

export default defineEventHandler(async (event) => {
  const { limit } = getQuery(event);
  const limitNum = limit ? Number(limit) : null;

  const key = `vlr-news-${limitNum ?? "all"}`;
  const now = Date.now();

  const cached = cache.get(key);
  if (cached && cached.expires > now) {
    return cached.data;
  }

  const data = await $fetch("https://vlrggapi.vercel.app/news");

  const slicedData = limitNum
    ? {
        ...data,
        data: {
          ...data.data,
          segments: data.data?.segments?.slice(0, limitNum),
        },
      }
    : data;

  cache.set(key, {
    data: slicedData,
    expires: now + 5 * 60 * 1000,
  });

  return slicedData;
});
