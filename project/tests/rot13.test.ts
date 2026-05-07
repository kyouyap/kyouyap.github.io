import { describe, expect, it } from 'vitest';
import { rot13 } from '@/lib/rot13';

describe('rot13', () => {
  it('rotates lowercase letters', () => {
    expect(rot13('abc')).toBe('nop');
    expect(rot13('hello')).toBe('uryyb');
  });

  it('rotates uppercase letters', () => {
    expect(rot13('ABC')).toBe('NOP');
  });

  it('preserves non-letters', () => {
    expect(rot13('a.b@c, 0')).toBe('n.o@p, 0');
  });

  it('is involutive (rot13 ∘ rot13 = identity)', () => {
    const s = 'kyouyap@gmail.com';
    expect(rot13(rot13(s))).toBe(s);
  });

  it('handles empty string', () => {
    expect(rot13('')).toBe('');
  });
});
