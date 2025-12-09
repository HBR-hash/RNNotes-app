import { formatDate } from '../src/utils/format';

describe('formatDate util', () => {
  test('formats ISO string into readable date', () => {
    const iso = '2025-12-09T09:05:00.000Z';
    const out = formatDate(iso);
    expect(typeof out).toBe('string');
    expect(out.length).toBeGreaterThan(0);
    expect(out).toContain('2025');
  });

  test('returns empty string for invalid input', () => {
    expect(formatDate(null as any)).toBe('');
    expect(formatDate('invalid-date')).toBe('');
  });
});
