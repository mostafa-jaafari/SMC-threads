import { Timestamp } from "firebase/firestore";

interface getRelativeTimeParams {
  createdAt: Timestamp | string | undefined;
}

export function getRelativeTime({ createdAt }: getRelativeTimeParams) {
  if (!createdAt) return "just now";

  let postDate: Date;

  if (createdAt instanceof Timestamp) {
    postDate = createdAt.toDate();
  } else {
    postDate = new Date(createdAt);
  }

  const now = new Date();
  const diffMs = now.getTime() - postDate.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);

  const intervals = {
    y: 31536000,
    min: 2592000,
    w: 604800,
    d: 86400,
    h: 3600,
    m: 60,
    s: 1,
  };

  if (diffSeconds < 0) {
    return "just now";
  }

  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffSeconds / seconds);
    if (interval >= 1) {
      return interval === 1 ? `1 ${unit}` : `${interval} ${unit}`;
    }
  }

  return "just now";
}
