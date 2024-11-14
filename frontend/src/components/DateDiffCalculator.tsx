interface DateDiffCalculatorProp {
  date: string;
}

function DateDiffCalculator({ date }: DateDiffCalculatorProp) {
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
}

export default DateDiffCalculator;
