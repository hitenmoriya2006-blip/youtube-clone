import { formatDistanceToNowStrict } from "date-fns";

const formatDuration = (duration) => {
    const totalSeconds = Math.floor(duration);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`;
    }

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

   const timeAgo = (date) => {
      if (!date || isNaN(new Date(date).getTime())) {
        return "";
      }
  
      return formatDistanceToNowStrict(new Date(date), {
        addSuffix: true,
      });
    };

export {formatDuration,timeAgo}