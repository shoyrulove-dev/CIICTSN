import type { VideoItem } from "@/types/cms";

export function VideoEmbed({ item }: { item: VideoItem }) {
  return <article className="video-card"><div className="video-frame"><iframe src={item.embedUrl} title={item.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div><div><span>Video Presmile</span><h3>{item.title}</h3><p>{item.description}</p></div></article>;
}
