import type { TrekReel } from "@/data/trek-reels";
import { isVideoMediaUrl } from "@/lib/media-url";
import { buildVideoPosterUrl } from "@/utils/mediaTransform";

/** Playable source for a reel — `thumb` may itself be a video for legacy entries. */
export function reelVideoSrc(reel: TrekReel): string | undefined {
  if (reel.videoSrc) return reel.videoSrc;
  if (reel.thumb && isVideoMediaUrl(reel.thumb)) return reel.thumb;
  return undefined;
}

/** Preview still: catalog image first — some reel MP4s have a black first frame (e.g. Roopkund). */
export function reelPosterSrc(
  reel: TrekReel,
  videoSrc: string,
): string | undefined {
  if (reel.thumb && !isVideoMediaUrl(reel.thumb)) return reel.thumb;
  return buildVideoPosterUrl(videoSrc, 480);
}
