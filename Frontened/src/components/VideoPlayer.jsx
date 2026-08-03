import { MediaPlayer, MediaProvider } from "@vidstack/react";

import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

const VideoPlayer = ({ src, poster, title }) => {
  return (
    <MediaPlayer
      title={title}
      src={src}
      poster={poster}
      aspectRatio="16/9"
      playsInline
      crossOrigin="anonymous"
    >
      <MediaProvider />
      <DefaultVideoLayout icons={defaultLayoutIcons} />
    </MediaPlayer>
  );
};

export default VideoPlayer;