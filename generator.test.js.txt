import { generatePassword } from '../src/generator.js';

test('longitud correcta', () => {
  const p = generatePassword(20);
  expect(p).toHaveLength(20);
});

test('contiene mayúsculas y minúsculas por defecto', () => {
  const p = generatePassword(100);
  expect(/[a-z]/.test(p)).toBe(true);
  expect(/[A-Z]/.test(p)).toBe(true);
});

test('modo estricto fuerza símbolos', () => {
  const p = generatePassword(10, { symbols: true, strict: true });
  expect(/[^A-Za-z0-9]/.test(p)).toBe(true);
});
