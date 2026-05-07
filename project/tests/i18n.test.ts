import { describe, expect, it } from 'vitest';
import { getLang, swapLang } from '@/lib/i18n';

describe('getLang', () => {
  it('returns "ja" for the root', () => {
    expect(getLang('/')).toBe('ja');
  });
  it('returns "ja" for arbitrary JP routes', () => {
    expect(getLang('/pairkan/')).toBe('ja');
  });
  it('returns "en" for the EN root', () => {
    expect(getLang('/en/')).toBe('en');
    expect(getLang('/en')).toBe('en');
  });
  it('returns "en" for nested EN routes', () => {
    expect(getLang('/en/pairkan/')).toBe('en');
  });
});

describe('swapLang', () => {
  it('ja → en for the root', () => {
    expect(swapLang('/', 'en')).toBe('/en/');
  });
  it('ja → en for nested route', () => {
    expect(swapLang('/pairkan/', 'en')).toBe('/en/pairkan/');
  });
  it('en → ja for the EN root', () => {
    expect(swapLang('/en/', 'ja')).toBe('/');
  });
  it('en → ja for nested route', () => {
    expect(swapLang('/en/pairkan/', 'ja')).toBe('/pairkan/');
  });
  it('is a no-op when target equals current', () => {
    expect(swapLang('/pairkan/', 'ja')).toBe('/pairkan/');
    expect(swapLang('/en/pairkan/', 'en')).toBe('/en/pairkan/');
  });
});
