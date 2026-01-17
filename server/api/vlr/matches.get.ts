const cache = new Map<string, { data: any; expires: number }>();

export default defineEventHandler(async (event) => {
  const { page = 1, limit } = getQuery(event);

  const pageNum = Number(page);
  const limitNum = limit ? Number(limit) : null;

  const key = `matches-${pageNum}-${limitNum ?? "all"}`;
  const now = Date.now();

  const cached = cache.get(key);
  if (cached && cached.expires > now) {
    return cached.data;
  }

  const data = await $fetch("https://vlr.orlandomm.net/api/v1/matches", {
    query: { page: pageNum },
  });

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
