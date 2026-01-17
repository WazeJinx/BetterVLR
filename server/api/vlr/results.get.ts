const cache = new Map<string, { data: any; expires: number }>();

export default defineEventHandler(async (event) => {
  const { page = 1 } = getQuery(event);
  const key = `results-${page}`;
  const now = Date.now();

  const cached = cache.get(key);
  if (cached && cached.expires > now) {
    return cached.data;
  }

  const data = await $fetch("https://vlr.orlandomm.net/api/v1/results", {
    params: { page },
  });

  cache.set(key, {
    data,
    expires: now + 5 * 60 * 1000,
  });

  return data;
});
