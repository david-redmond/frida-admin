const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 2000;
const PUBLIC_DIR = path.join(__dirname, "public");

const server = http.createServer((req, res) => {
  // Determine the requested file path

  const otherDocs = [
    "asset-manifest.json",
    "/manifest.json",
    "/favicon.ico",
    "/logo192.png",
    "/logo512.png",
    "/robots.txt",
  ];

  let filePath;
  if (otherDocs.includes(req.url)) {
    console.log(1);
    filePath = path.join(PUBLIC_DIR, req.url);
  } else if (req.url.startsWith("/static/")) {
    console.log(2);
    filePath = path.join(PUBLIC_DIR, req.url);
  } else {
    console.log(3);
    filePath = path.join(PUBLIC_DIR, "index.html");
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("File not found");
    } else {
      const contentType = getContentType(filePath);
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

function getContentType(filePath) {
  const extname = path.extname(filePath);
  switch (extname) {
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "text/javascript";
    case ".json":
      return "application/json";
    default:
      return "text/plain";
  }
}
