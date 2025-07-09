export function formatDate(
  input: string | Date | undefined | null,
  options?: Intl.DateTimeFormatOptions,
  locale: string = 'en-US',
): string {
  let date: Date;

  if (!input)
    return '';

  if (typeof input === 'string') {
    // Convert "2026-07-21 23:24:00" → "2026-07-21T23:24:00"
    const isoSafe = input.replace(' ', 'T');
    date = new Date(isoSafe);
  } else {
    date = input;
  }

  if (Number.isNaN(date?.getTime()))
    return 'Invalid Date';

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    ...(options || {}),
  }).format(date);
}
