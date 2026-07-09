#!/usr/bin/env node

/**
 * fc.js — Short alias entry point
 * ─────────────────────────────────────────────────────────────────
 * Menangani format perintah: fc -cb <command>
 *
 * Cara kerja:
 *   fc -cb install         → jalankan install
 *   fc -cb install --key   → jalankan install dengan key
 *   fc -cb -v              → tampilkan versi
 *   fc -cb --help          → tampilkan bantuan
 *
 * '-cb' akan distripping dari argv lalu diteruskan ke index.js
 * ─────────────────────────────────────────────────────────────────
 */

const args = process.argv.slice(2); // ambil semua argumen setelah 'fc'

// Cek apakah argumen pertama adalah '-cb'
if (args[0] === '-cb') {
  // Hapus '-cb' dari process.argv agar commander tidak bingung
  process.argv.splice(2, 1);

  // Handle shorthand: fc -cb -v → tampilkan versi
  // (karena -V kapital mungkin tidak terbiasa)
  const remaining = process.argv.slice(2);
  if (remaining[0] === '-v') {
    process.argv[2] = '-V'; // ubah ke -V yang dikenali commander
  }
} else if (args.length === 0 || args[0] !== '-cb') {
  // Jika tidak ada -cb, tampilkan panduan singkat
  console.log('\nUsage: fc -cb <command>\n');
  console.log('Commands:');
  console.log('  fc -cb install             Install chatbot plugin ke proyek Anda');
  console.log('  fc -cb install --key <key> Install dengan license key langsung');
  console.log('  fc -cb --help              Tampilkan bantuan lengkap');
  console.log('  fc -cb -v                  Tampilkan versi\n');
  process.exit(0);
}

// Teruskan ke logic utama CLI
require('./index.js');
