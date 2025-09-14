#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('❌ Harap masukkan path file .js');
  console.error('📌 Contoh: scan-endpoints ./file.js');
  process.exit(1);
}

const filePath = path.resolve(args[0]);
if (!fs.existsSync(filePath)) {
  console.error('❌ File tidak ditemukan:', filePath);
  process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf-8');

// Regex untuk mencari endpoint API
const regex = /\b(?:fetch|axios|get|post|put|delete|makeAPICall)\s*\(\s*['"`]([^'"`]+)['"`]/gi;

const endpoints = new Set();
let match;

while ((match = regex.exec(content)) !== null) {
  endpoints.add(match[1]);
}

if (endpoints.size === 0) {
  console.log('⚠️ Tidak ditemukan endpoint dalam file ini.');
} else {
  console.log('📍 Endpoint ditemukan:');
  for (const ep of endpoints) {
    console.log('-', ep);
  }
}
