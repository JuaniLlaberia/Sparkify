export const formatRelativeDate = (date: Date | string | number): string => {
  const inputDate = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - inputDate.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 24) {
    return diffHours === 0
      ? 'Created just now'
      : `Created ${diffHours} hours ago`;
  }

  if (diffDays === 1) {
    return 'Created yesterday';
  }

  return `Created ${inputDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })}`;
};
