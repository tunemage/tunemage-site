function serviceUrl(value: string, hosts: readonly string[]) {
  const url = URL.parse(value.trim());
  if (!url || !['https:', 'http:'].includes(url.protocol) || url.username || url.password || url.port) return;
  if (hosts.includes(url.hostname)) return url;
}

export function musicLinks(data: { spotify: string; youtube: string; suno: string }) {
  const spotify = serviceUrl(data.spotify, ['open.spotify.com', 'spotify.com', 'www.spotify.com', 'play.spotify.com', 'spotify.link', 'spoti.fi']);
  const youtube = serviceUrl(data.youtube, ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com', 'youtu.be', 'www.youtube-nocookie.com']);
  const suno = serviceUrl(data.suno, ['suno.com', 'www.suno.com', 'suno.ai', 'www.suno.ai', 'app.suno.ai']);

  let videoId = '';
  if (youtube?.hostname === 'youtu.be') {
    videoId = /^\/([\w-]+)\/?$/.exec(youtube.pathname)?.[1] ?? '';
  } else if (youtube?.pathname === '/watch' || youtube?.pathname === '/watch/') {
    videoId = youtube.searchParams.get('v') ?? '';
  } else if (youtube) {
    videoId = /^\/(?:embed|shorts|live)\/([\w-]+)\/?$/.exec(youtube.pathname)?.[1] ?? '';
  }
  const video = /^[A-Za-z0-9_-]{11}$/.test(videoId) ? videoId : undefined;

  return {
    spotify: spotify?.href,
    youtube: video && `https://www.youtube.com/watch?v=${video}`,
    suno: suno?.href,
    embed: video && `https://www.youtube-nocookie.com/embed/${video}?autoplay=0&playsinline=1`,
  };
}
