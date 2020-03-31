This is a plugin for Mirador that has custom loading logic for some of our assets in the Annotation Interoperability project. I also use it to see how a custom Mirador plugin may be structured.

* `plugin.js` has the plugin definition, consumed by Mirador
* `JHAnnotationFetcher.js` is the React component that _is_ the plugin
* `container.js` maps some Mirador functions and state to the plugins `props`

