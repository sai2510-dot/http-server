const http = require('http');
const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2));
const port = args.port || 3000;

const server = http.createServer((req, res) => {
  let filePath = '';

  if (req.url === '/') {
    filePath = path.join(__dirname, 'home.html');
  } else if (req.url === '/project') {
    filePath = path.join(__dirname, 'project.html');
  } else if (req.url === '/registration') {
    filePath = path.join(__dirname, 'registration.html');
  } else {
    res.writeHead(404);
    res.end('Page not found');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading page');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
