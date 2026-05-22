import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist/client');
const membersDir = path.join(distDir, 'members');

if (fs.existsSync(distDir)) {
  if (!fs.existsSync(membersDir)) {
    fs.mkdirSync(membersDir, { recursive: true });
  }
  fs.copyFileSync(
    path.join(distDir, 'index.html'),
    path.join(membersDir, 'index.html')
  );
  console.log('Successfully copied index.html to members/index.html for static routing support!');
} else {
  console.error('dist/client directory not found!');
}
