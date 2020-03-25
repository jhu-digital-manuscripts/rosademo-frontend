# mirador-anniop

This repository has some custom Mirador plugin code for the Annotation Interoperability project. In order to see the work here, this repo provides a demo app with an instance of the Mirador 3 viewer that can show IIIF manifests and web annotations from various sources.

## Prerequisites

* [Node.js](https://nodejs.org/en/) >= 8 must be installed
* [Yarn](https://yarnpkg.com/) package manager. Although NPM will still be functional

The scripts defined in `package.json` use [nwb](https://github.com/insin/nwb), which is defined as a devDependency. They should work out of the box after installing dependencies. If not, you may need to install `nwb` manually by running `npm install -g nwb`.

### Development

If not done already, you'll have to install all of the project dependencies using your chosen package manager. Run the `yarn` command to do this.

`yarn start` will start up a test server that will autoreload changes. The command will start up the projects demo, so if you need to change configuration of the test app, see `demo/src/`. In your browser, go to <http://localhost:3000> to see the demo.

## Building

### Demo

`yarn run build-demo` will build the demo app in a way that can be deployed to a web server. The built app can be found at `demo/dist/` Again, the demo app is defined in `demo/src/`

## Credit

Much credit goes to [GroovinChip]<https://github.com/groovinchip> with the help of [mejackreed]<https://github.com/mejackreed> for their original work at <https://github.com/GroovinChip/RoseDemo-FrontEnd>.
