import fs from 'fs';
import path from 'path';


const gitToken = process.env.GIT_TOKEN;

if (!gitToken) {
  console.error('GIT_TOKEN environment variable is not set.');
  process.exit(1);
}

// Path to the .gitmodules file
const gitmodulesPath = path.join(__dirname, '.gitmodules');

// Read the .gitmodules file
let gitmodulesContent = fs.readFileSync(gitmodulesPath, 'utf-8');

// Replace the placeholder with the actual token
gitmodulesContent = gitmodulesContent.replace(
  'https://TOKEN_PLACEHOLDER@github.com',
  `https://${gitToken}@github.com`
);

// Write the updated content back to .gitmodules
fs.writeFileSync(gitmodulesPath, gitmodulesContent, 'utf-8');

console.log('.gitmodules updated with Git token!');
