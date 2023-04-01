#!/usr/bin/env node
import Listr from 'listr';
import FluxusNode from './watcher.js'

new Listr([
  {
    title: "Starting Development...",
    task: () => {new FluxusNode();}
  }
]).run();
