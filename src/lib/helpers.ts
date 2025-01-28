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

export const formatNumber = (value: number) => {
  const formatter = new Intl.NumberFormat('en-US', {});
  return formatter.format(value);
};

export const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const formatFileSize = (sizeInBytes: number) => {
  const sizeInKB = sizeInBytes / 1024;
  return sizeInKB >= 1024
    ? `${(sizeInKB / 1024).toFixed(2)} MB`
    : `${sizeInKB.toFixed(2)} KB`;
};
