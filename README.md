# mirador-test-plugin

## Prerequisites

* [Node.js](https://nodejs.org/en/) >= 8 must be installed
* [Yarn](https://yarnpkg.com/) package manager. Although NPM will still be functional

### Development

If not done already, you'll have to install all of the project dependencies using your chosen package manager. Run the `yarn` command to do this.

`yarn start` will start up a test server that will autoreload changes. The command will start up the projects demo, so if you need to change configuration of the test app, see `demo/src/`. In your browser, go to <http://localhost:3000> to see the demo.

## Building

### Demo

`yarn run build-demo` will build the demo app in a way that can be deployed to a web server. The built app can be found at `demo/dist/` Again, the demo app is defined in `demo/src/`
