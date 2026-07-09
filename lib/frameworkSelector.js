/**
 * lib/frameworkSelector.js
 * ─────────────────────────────────────────────────────────────────
 * Modul untuk menampilkan prompt interaktif pemilihan framework.
 * Mengembalikan objek metadata yang digunakan oleh modul lain.
 * ─────────────────────────────────────────────────────────────────
 */

const inquirer = require('inquirer');
const chalk = require('chalk');

/**
 * Daftar framework yang didukung beserta metadata-nya.
 * 
 * ┌─ KUSTOMISASI ────────────────────────────────────────────────┐
 * │ Tambahkan entry baru di sini jika Anda mendukung framework   │
 * │ baru di masa depan (misal: Angular, Svelte, Next.js, dll.)   │
 * └──────────────────────────────────────────────────────────────┘
 */
const FRAMEWORK_MAP = {
  Laravel: {
    name: 'Laravel',
    extension: '.blade.php',
    targetDir: 'resources/views',
    templateFile: 'chatbot-ui.blade.php',
    supportsAutoRoute: true,
  },
  React: {
    name: 'React',
    extension: '.jsx',
    targetDir: 'src/components',
    templateFile: 'chatbot-component.jsx',
    supportsAutoRoute: false,
  },
  Vue: {
    name: 'Vue',
    extension: '.vue',
    targetDir: 'src/components',
    templateFile: 'ChatbotWidget.vue',
    supportsAutoRoute: false,
  },
  'HTML Biasa': {
    name: 'HTML Biasa',
    extension: '.html',
    targetDir: 'public',
    templateFile: 'chatbot-ui.html',
    supportsAutoRoute: false,
  },
};

/**
 * Menampilkan prompt interaktif dan mengembalikan metadata framework.
 * @returns {Promise<Object>} - Objek framework metadata
 */
async function selectFramework() {
  console.log(chalk.cyan('\n📦 Langkah 2: Deteksi Framework\n'));

  const { framework } = await inquirer.prompt([
    {
      type: 'list',
      name: 'framework',
      message: 'Framework apa yang Anda gunakan?',
      choices: [
        { name: '🔴  Laravel  (Blade Template)', value: 'Laravel' },
        { name: '⚛️   React    (JSX Component)',  value: 'React' },
        { name: '💚  Vue      (SFC Component)',   value: 'Vue' },
        { name: '🌐  HTML Biasa (Vanilla JS)',    value: 'HTML Biasa' },
      ],
    },
  ]);

  const meta = FRAMEWORK_MAP[framework];

  console.log(
    chalk.green(`\n✔ Framework dipilih: ${chalk.bold(meta.name)}`) +
    chalk.gray(` → file akan disimpan sebagai ${chalk.italic(meta.extension)} di ${chalk.italic(meta.targetDir)}/`)
  );

  return meta;
}

module.exports = { selectFramework };
