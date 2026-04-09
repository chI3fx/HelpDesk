const crypto = require('crypto');

const ITERATIONS = 120000;
const KEY_LENGTH = 64;
const DIGEST = 'sha512';

function base64UrlEncode(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlDecode(input) {
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
  return Buffer.from(padded, 'base64').toString('utf8');
}

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto
    .pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST)
    .toString('hex');
  return { salt, hash };
}

function verifyPassword(password, salt, expectedHash) {
  const { hash } = hashPassword(password, salt);
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(expectedHash));
}

function signToken(payload, secret, ttlSeconds = 60 * 60 * 24 * 7) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const body = { ...payload, exp };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedBody = base64UrlEncode(JSON.stringify(body));
  const unsigned = `${encodedHeader}.${encodedBody}`;
  const signature = crypto
    .createHmac('sha256', secret)
    .update(unsigned)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return `${unsigned}.${signature}`;
}

function verifyToken(token, secret) {
  try {
    const [encodedHeader, encodedBody, signature] = token.split('.');
    if (!encodedHeader || !encodedBody || !signature) return null;

    const unsigned = `${encodedHeader}.${encodedBody}`;
    const expectedSig = crypto
      .createHmac('sha256', secret)
      .update(unsigned)
      .digest('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
      return null;
    }

    const payload = JSON.parse(base64UrlDecode(encodedBody));
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;

    return payload;
  } catch (err) {
    return null;
  }
}

module.exports = {
  hashPassword,
  verifyPassword,
  signToken,
  verifyToken,
};
