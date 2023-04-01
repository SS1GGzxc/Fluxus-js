#!/usr/bin/env node
import Listr from 'listr';
import {execaCommand} from 'execa';
import fs from 'fs';

const cwd = process.cwd();

console.log(cwd);
const task = new Listr([
  {
    title: "Building project",
    task: () => {
      return new Listr([
        {
          title: "Building TypeScript files",
          task: async () => {await fs.mkdirSync(`${cwd}/dist`);await execaCommand("tsc")}
        },
        {
          title: "Compiling JavaScript files...",
          task: async () => {await execaCommand("npx webpack --mode production ./.dist/main.js")}
        }
      ], {concurrent: true});
    }
  },
  {
    title: "Copping files to output directory...",
    task: async () => {await fs.copyFileSync(`${cwd+"/index.html"}`, `${cwd+"/dist/index.html"}`)}
  },
  {
    title: "Cleaning files...",
    task: async () => {await fs.rmSync(`${cwd+"/.dist"}`, {recursive: true, force: true})},
  }
]).run();
