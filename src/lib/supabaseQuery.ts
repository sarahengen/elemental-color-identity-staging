/**
 * Runs a Supabase query with a wall-clock timeout.
 * Returns { timedOut: true } instead of throwing so callers can degrade gracefully.
 */
export async function runQueryWithTimeout<T>(
  label: string,
  queryFn: () => PromiseLike<{ data: T | null; error: { message?: string } | null }>,
  timeoutMs = 12000
): Promise<{
  data: T | null;
  error: { message?: string } | null;
  timedOut: boolean;
}> {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const timeoutPromise = new Promise<{
    data: null;
    error: null;
    timedOut: true;
  }>((resolve) => {
    timer = setTimeout(() => {
      console.warn(`⏱️ ${label}: timed out after ${timeoutMs}ms`);
      resolve({ data: null, error: null, timedOut: true });
    }, timeoutMs);
  });

  const queryPromise = Promise.resolve(queryFn()).then((result) => ({
    data: result.data,
    error: result.error,
    timedOut: false as const,
  }));

  try {
    return await Promise.race([queryPromise, timeoutPromise]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}
