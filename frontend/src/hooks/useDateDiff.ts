import { useMemo } from 'react';

function useDateDiff(date: string | null | undefined, text?:string) {
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
      return `${text} ${years} years ago`;
    }
    if (months >= 1) {
      return `${text} ${months} months ago`;
    }
    if (weeks >= 1) {
      return `${text} ${weeks} weeks ago`;
    }
    if (days >= 1) {
      return `${text} ${days} days ago`;
    }
    if (hours >= 1) {
      return `${text} ${hours} hours ago`;
    }
    if (minutes >= 1) {
      return `${text} ${minutes} minutes ago`;
    }
    return "Just now";
  }, [date, text]);
}

export default useDateDiff;
