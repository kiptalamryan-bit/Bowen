const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, 'dist');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };
const server = http.createServer((req, res) => {
  const requested = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  const file = path.join(root, path.normalize(requested).replace(/^[/\\]+/, ''));
  if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); res.end('Not found'); return; }
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
server.listen(4173, '0.0.0.0', () => console.log('Kivora preview: http://localhost:4173'));
