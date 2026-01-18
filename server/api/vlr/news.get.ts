function fetchWithTimeout(url: string, options: any = {}, timeout = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  return $fetch(url, {
    ...options,
    signal: controller.signal,
  }).finally(() => {
    clearTimeout(timer);
  });
}

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

  let data;
  try {
    data = await fetchWithTimeout(
      "https://vlrggapi.vercel.app/news",
      {},
      8000, // ⏱️ hard timeout
    );
  } catch (err) {
    console.error("News API timeout", err);
    throw createError({
      statusCode: 504,
      statusMessage: "News API timeout",
    });
  }

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
