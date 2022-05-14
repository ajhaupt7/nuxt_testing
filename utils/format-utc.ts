export function formatUTC(
  dateString: string, 
  options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: 'numeric',
  }, 
) {
  const date = new Date(dateString);

  return date.toLocaleString('en-US', options);
}