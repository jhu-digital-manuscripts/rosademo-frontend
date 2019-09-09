import ReactDOM from "react-dom";
import React from "react";
import Mirador from "./Mirador";
import annotationsTabBar from "./annotationsTabBar";

ReactDOM.render(
  <Mirador config={{ id: "mirador", windows: [{manifestId: 'https://rosetest.library.jhu.edu/rosademo/iiif/rose/SeldenSupra57/manifest', canvasId: 'https://rosetest.library.jhu.edu/rosademo/iiif/rose/SeldenSupra57/1r/canvas'}] }} plugins={[annotationsTabBar]}/>,
  document.getElementById("root")
);
