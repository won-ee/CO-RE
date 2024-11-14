import { useMemo } from 'react';

function useDateDiff(date: string | null | undefined) {
  return useMemo(() => {
    if (!date) {
      return "Invalid date"; // date가 null 또는 undefined일 때 반환할 메시지
    }

    const now = new Date();
    const commitDate = new Date(date);
    const diffInMs = now.getTime() - commitDate.getTime();

    const minutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years >= 1) {
      return `authored ${years} years ago`;
    }
    if (months >= 1) {
      return `authored ${months} months ago`;
    }
    if (weeks >= 1) {
      return `authored ${weeks} weeks ago`;
    }
    if (days >= 1) {
      return `authored ${days} days ago`;
    }
    if (hours >= 1) {
      return `authored ${hours} hours ago`;
    }
    if (minutes >= 1) {
      return `authored ${minutes} minutes ago`;
    }
    return "Just now";
  }, [date]);
}

export default useDateDiff;
