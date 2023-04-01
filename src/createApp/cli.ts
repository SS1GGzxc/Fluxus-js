#!/usr/bin/env node
import Listr from "listr";
import { execaCommand } from "execa";

const argv = process.argv;
const cwd = process.cwd();
const nameApp = argv[2]
const options = argv.toString().split(nameApp || "")[1];

new Listr([
  {
    title: `Creating ${nameApp}`,
    task: () => {return new Listr([
      {
      title: "",
      task: () => {}
    }
  ])}
  }
], {concurrent: true}).run();
