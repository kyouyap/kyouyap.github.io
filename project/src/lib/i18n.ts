export type Lang = 'ja' | 'en';

export const getLang = (pathname: string): Lang =>
  pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'ja';

export const swapLang = (pathname: string, target: Lang): string => {
  const current = getLang(pathname);
  if (current === target) return pathname;
  if (target === 'en') {
    if (pathname === '/') return '/en/';
    return `/en${pathname}`;
  }
  // target === 'ja'
  if (pathname === '/en' || pathname === '/en/') return '/';
  return pathname.slice(3); // strip "/en"
};
