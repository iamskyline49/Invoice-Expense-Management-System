// ============================================================
//  JWT Token Generator for Testing
//  Run: node generate-token.js
//  This generates a valid JWT token using the same secret
//  from your app.module.ts
// ============================================================

const crypto = require('crypto');

// ⚠️ IMPORTANT: This must match JWT_SECRET in your .env or app.module.ts
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Simple JWT generator (alternative to using jsonwebtoken package)
function createToken(payload, secret) {
  // Header
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  // Create the signature
  const headerEncoded = base64UrlEncode(JSON.stringify(header));
  const payloadEncoded = base64UrlEncode(JSON.stringify(payload));

  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${headerEncoded}.${payloadEncoded}`)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  return `${headerEncoded}.${payloadEncoded}.${signature}`;
}

function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// Generate token with manager data
const managerPayload = {
  id: 1,
  name: 'Prottoy Manager',
  iat: Math.floor(Date.now() / 1000), // issued-at time
  exp: Math.floor(Date.now() / 1000) + 86400, // expires in 24 hours
};

const token = createToken(managerPayload, JWT_SECRET);

console.log('═'.repeat(65));
console.log('  ✅ JWT TOKEN GENERATED SUCCESSFULLY');
console.log('═'.repeat(65));
console.log('\n📌 Token:\n');
console.log(token);
console.log('\n📋 Use this in your requests:\n');
console.log(`Authorization: Bearer ${token}`);
console.log('\n📊 Payload:\n');
console.log(JSON.stringify(managerPayload, null, 2));
console.log('\n⏰ Expires in 24 hours');
console.log('═'.repeat(65));

// Output for easy copying
console.log('\n💾 For test-runner.js, replace line:');
console.log(`   const TOKEN = '${token}';`);
