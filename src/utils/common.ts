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

export function formatStatus(status: string) {
  return status
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getCheckInCountdown(checkInStr: string): string | null {
  const now = new Date();
  const checkInDate = new Date(checkInStr.replace(' ', 'T'));
  const diffMs = checkInDate.getTime() - now.getTime();

  // if (diffMs <= 0)
  //   return null; // already started

  // const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // if (diffDays <= 4)
  //   return null;

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);

  const parts: string[] = [];
  if (days > 0)
    parts.push(`${days} day${days > 1 ? 's' : ''}`);
  if (hours > 0)
    parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
  if (minutes > 0 && days === 0)
    parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
  // if (diffDays < 4)
  return `Check-in starts in ${parts.join(' ')}`;
  // else
  //   return `Check-in starts at ${formatDate(checkInDate, { month: 'short', day: 'numeric' }, 'en-US')}`;
}
