const fs = require('fs');
const files = [
  'src/routes/social-science-excellence.tsx',
  'src/routes/signup.tsx',
  'src/routes/partners.tsx',
  'src/routes/mentorship-program.tsx',
  'src/routes/meet-the-team.tsx',
  'src/routes/login.tsx',
  'src/routes/index.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8').split('\n');
  let start = -1;
  let end = -1;
  for (let i = 0; i < content.length; i++) {
    if (content[i].startsWith('function Nav() {')) start = i;
    if (start !== -1 && i > start && content[i].startsWith('function ')) {
      end = i - 1;
      break;
    }
  }
  if (start !== -1 && end === -1) end = content.length - 1; 

  if (start !== -1) {
    // Remove the function
    content.splice(start, end - start + 1);
    
    // Join back
    let newContent = content.join('\n');
    
    // Prepend the import if not exists
    if (!newContent.includes('from "../components/Navbar"')) {
      newContent = 'import { Navbar as Nav } from "../components/Navbar";\n' + newContent;
    }
    
    fs.writeFileSync(file, newContent);
    console.log('Updated ' + file);
  }
}
