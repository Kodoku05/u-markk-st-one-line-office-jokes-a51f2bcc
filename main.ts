// CommonJS avoids implicit ES-module reparsing during direct Node execution.
const { mkdirSync, writeFileSync } = require('node:fs');
const { join } = require('node:path');

const joke = 'The CEO replaced our suggestion box with a swear jar; his bonus was funded by lunch.';

try {
  // Count Unicode characters, matching the entry gate rather than UTF-16 units.
  const characters = [...joke].length;
  if (characters < 1 || characters > 199 || !joke.trim() || /[\r\n\u2028\u2029]/u.test(joke)) {
    throw new Error('The joke must be one nonempty line of 1–199 characters.');
  }

  const outputDirectory = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  mkdirSync(outputDirectory, { recursive: true });
  writeFileSync(join(outputDirectory, 'entry.txt'), joke, 'utf8');
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Failed to write entry.txt: ${message}`);
  process.exitCode = 1;
}
