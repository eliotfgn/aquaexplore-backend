const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'dist');

function generateIndexTs() {
    const files = fs
        .readdirSync(distPath)
        .filter((file) => file.endsWith('.ts') && file !== 'index.ts')
        .map((file) => `export * from './${file.replace('.ts', '')}';`);

    const indexContent = ['// @ts-nocheck', ...files].join('\n');

    fs.writeFileSync(path.join(distPath, 'index.ts'), indexContent);
}

generateIndexTs();
