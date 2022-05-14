import { formatUTC } from '~/utils/format-utc';

export function getDateString(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const endsSameDay = startDate.getDate() === endDate.getDate();

  if (!end || endsSameDay && startDate.getTime() === endDate.getTime()) {
    return formatUTC(start);
  }

  if (startDate.getDate() === endDate.getDate()) {
    return `${formatUTC(start)} - ${formatUTC(end, { hour: 'numeric' })}`;
  }

  return `${formatUTC(start)} - ${formatUTC(end)}`;
}