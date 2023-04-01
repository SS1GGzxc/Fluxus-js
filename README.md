# Fluxus-js
> Fast and simple JS Framework

### Installation
```sh
  npm install fluxus-js
```
```sh
  yarn add fluxus-js
```
```sh
  pnpm add fluxus-js
```

### Get Started
``` JS
  // config.js you can edit it in node_modules/fluxus.js/components/
  const confing = {
    workPath: "src", // set work path
  }
```


``` sh
  # Start Development Server
  npx fluxusDev path # set path to app.ts file
  # files automatically building from *.ts to *.js and starting using in index.html
```
``` sh
  # Build All Project
  npx fluxusBuild # no arguments
  # you get folder "dist" with "main.js", "index.html" and other non-script files
```




### Usage
``` HTML
  <!-- index.html -->
  ...
  <body>
    <div id="app"></div>
    <script type="module" src="./main.js"></script> <!-- set path where tsc will compile files -->
  </body>
  ...
```


``` JavaScript
  // app.ts
  import fluxus from 'fluxus-js'


  const node = {
    tag: "div",
    children: [
      {
        tag: "div",
        props: {
          style: "font-size: 30px"
        },
        children: [
          {
            tag: "button",
            props: {
              onClick: 'console.log("привет!")'
            },
            children: "Нажми на меня!"
          }
        ]
      }
    ]
  }

  const app = new fluxus(node, document.getElementById("app")); // possible not to define anything
  app.render(); // also you can set new node and new parent
```
