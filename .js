/**
 * Generador de contraseñas seguras
 * @param {number} length - longitud deseada (4-256)
 * @param {object} options - flags de caracteres
 * @returns {string} contraseña generada
 */
export function generatePassword(length = 12, options = {}) {
  const {
    lowercase = true,
    uppercase = true,
    numbers  = true,
    symbols  = false,
    strict   = false // al menos un carácter de cada tipo seleccionado
  } = options;

  if (length < 4 || length > 256) {
    throw new RangeError('Longitud debe estar entre 4 y 256');
  }

  const lowers = 'abcdefghijklmnopqrstuvwxyz';
  const uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const nums   = '0123456789';
  const syms   = '!@#$%^&*()_+[]{}|;:,.<>?';

  let pool = '';
  if (lowercase) pool += lowers;
  if (uppercase) pool += uppers;
  if (numbers)   pool += nums;
  if (symbols)   pool += syms;
  if (!pool) throw new Error('Al menos un conjunto de caracteres debe estar activo');

  let password = '';
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);

  for (let i = 0; i < length; i++) {
    password += pool[randomValues[i] % pool.length];
  }

  if (strict) {
    const tests = [
      { active: lowercase, regex: /[a-z]/ },
      { active: uppercase, regex: /[A-Z]/ },
      { active: numbers,   regex: /[0-9]/ },
      { active: symbols,   regex: /[^A-Za-z0-9]/ }
    ].filter(t => t.active);

    const valid = tests.every(t => t.regex.test(password));
    if (!valid) return generatePassword(length, options); // retry
  }

  return password;
}
