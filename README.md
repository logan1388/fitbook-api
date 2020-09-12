# FitBook API

## Running code locally

- Install all required modules by running command

```
yarn install
```

- Build code

```
yarn tsc
```

- Run code

Ensure default.json file is present in config folder. Sample data format is available in sample-default.json file.

```
node build/index.js
```

- Clean build and run code locally

To clean up build folder, translate TypeScript to Javascript and start the server using just one command.

```
yarn local
```
