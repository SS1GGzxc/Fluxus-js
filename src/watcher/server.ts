#!/usr/bin/env node
import express from 'express';

const app = express();
const cwd = process.cwd();
const port = Number(process.argv[process.argv.indexOf("-p") + 1]) || undefined;
const helpCommand = process.argv[process.argv.indexOf("-h")];
let outDir = process.argv[process.argv.indexOf("-o") + 1] || "";

if(helpCommand === "-h"){
  console.log();
}
if (outDir.startsWith("/usr/bin/node")) {
  outDir = ".dist"
}
if(port === undefined) {
  console.log('Set port to start server: "-p port"');
  process.exit(1);
} else {
  app.get('/', (req, res) => {
    const path = `${cwd}/${outDir}/index.html`
    res.sendFile(path);
  });

  app.get('/*', (req, res) => {
    const file = JSON.parse(JSON.stringify(req.params));
    const fileName = file['0'];
    if (fileName.startsWith("node_modules/")) {
      const path = `${cwd}/${fileName}`
      res.sendFile(path);
    } else {
      const path = `${cwd}/${outDir}/${file['0']}`;
      res.sendFile(path);
    }
});

  app.listen(port, () => {
    console.log('Server started at http://localhost:' + port);
  });
}
