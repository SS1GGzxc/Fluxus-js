import { execaCommand } from "execa";
import chokidar from "chokidar";
import Listr from 'listr';
import fs from 'fs'
import confing from "../components/config.js";

export default class FluxusNode {
  args: string[];
  fileName: string;
  cwd: string;
  watchPaths: string[];
  ignoredPaths: string;
  nodeServer: any;
  tscServer: any;
  port: string = "";
  constructor() {
    this.__init__();
  }

  __init__() {
    this.args = process.argv;
    this.fileName = this.args[2] || " ";
    this.cwd = process.cwd();
    this.watchPaths = [
      `${this.cwd}/${confing.workPath}/**/*.ts`,
      `${this.cwd}/${confing.workPath}/*.ts`
    ];
    this.ignoredPaths = "**/node_modules/*";

    this.reload();
    this.startWatching();
    this.listeningEvents();
    for(var i = 0; i < 4; i++) {
      this.port += Math.floor(Math.random() * 10).toString();
    }
  }

  reload() {
    if (this.nodeServer) this.nodeServer.kill('SIGKILL');
    if (this.tscServer) this.tscServer.kill('SIGKILL');
    const fileMas = this.fileName.split("/");
    const file = fileMas[fileMas.length - 1];
    if (file?.endsWith(".ts")) {
      new Listr([{
        title: "Building TypeScript files...",
        task: async () => {
          this.tscServer = await execaCommand("tsc")
          return new Listr([
            {
              title: "Copping TypeScript files...",
              task: () => {
                fs.copyFileSync(`${this.cwd+"/index.html"}`, `${this.cwd+"/.dist/index.html"}`)
              }
            }
          ])
        }
      }, {
        title: "Staring local server...",
        task: async () => {
          this.nodeServer = await execaCommand(`npx fluxusServer -p ${this.port}`);
          console.log(`Server started at http://localhost:${this.port}`)
        }
      }
    ]).run();
    }
  }

  startWatching() {
    chokidar.watch(this.watchPaths, {
      ignored: this.ignoredPaths,
      ignoreInitial: true
    }).on('change', (event, path) => {
      new Listr([{
        title: "Reloading site dates",
        task: () => this.reload()
      }]).run();
    });
  }

  listeningEvents() {
    process.stdin.on("data", (chunk) => {
      let cliInput = chunk.toString();
      switch(cliInput) {
        case 'rs\n':
          this.reload();
          break
      }
    });
  }
}
