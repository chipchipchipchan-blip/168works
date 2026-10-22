// public 内の画像にも Vite の公開先パスを付けます。外部URLはそのまま使います。
export function assetUrl(path: string): string {
  if (!path || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
