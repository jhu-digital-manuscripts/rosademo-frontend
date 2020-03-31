This plugin replaces the original [WindowSideBarAnnotationsPanel](https://github.com/ProjectMirador/mirador/blob/master/src/components/WindowSideBarAnnotationsPanel.js) component, used to display annotations in the sidebar of a window.

### Motivation

Simply put, our project does things a bit differently from the way Mirador 3 has been designed. We have annotations from several different data sources for select manifests. On top of that we desire much more custom behavior to some of these annotations. On top of all this, all of our annotations follow the Web Annotation data model, as opposed to the standard IIIF annotation data model. Our web annotations have features, such as multiple bodies, that are not strictly supported by IIIF 3.


