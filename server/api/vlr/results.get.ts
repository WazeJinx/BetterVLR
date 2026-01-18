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
  const { page = 1, limit } = getQuery(event);

  const pageNum = Number(page);
  const limitNum = limit ? Number(limit) : null;

  const key = `results-${pageNum}-${limitNum ?? "all"}`;
  const now = Date.now();

  const cached = cache.get(key);
  if (cached && cached.expires > now) {
    return cached.data;
  }

  let data;
  try {
    data = await fetchWithTimeout(
      "https://vlr.orlandomm.net/api/v1/results",
      {
        query: { page: pageNum },
      },
      8000,
    );
  } catch (err) {
    console.error("Results API timeout", err);
    throw createError({
      statusCode: 504,
      statusMessage: "Results API timeout",
    });
  }

  const slicedData = limitNum
    ? {
        ...data,
        data: data.data?.slice(0, limitNum),
      }
    : data;

  cache.set(key, {
    data: slicedData,
    expires: now + 5 * 60 * 1000,
  });

  return slicedData;
});
