import { Timestamp } from "firebase/firestore";


export function getRelativeTime(createdAt: Timestamp) {
  const now = new Date();
  const postDate = new Date(createdAt);
  
  // Calculate the difference in milliseconds
  const diffMs = now - postDate;
  
  // Convert to seconds
  const diffSeconds = Math.floor(diffMs / 1000);
  
  // Define time intervals in seconds
  const intervals = {
    y: 31536000,   // 365 * 24 * 60 * 60
    min: 2592000,   // 30 * 24 * 60 * 60
    w: 604800,     // 7 * 24 * 60 * 60
    d: 86400,       // 24 * 60 * 60
    h: 3600,       // 60 * 60
    m: 60,
    s: 1
  };
  
  // Handle future dates
  if (diffSeconds < 0) {
    return "just now";
  }
  
  // Find the appropriate interval
  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffSeconds / seconds);
    
    if (interval >= 1) {
      return interval === 1 ? `1 ${unit}` : `${interval} ${unit}`;
    }
  }
  
  return "just now";
}