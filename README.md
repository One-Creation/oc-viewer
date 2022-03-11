# oc-viewer

One Creation Viewer module

## Install

npm install oc-viewer

## Usage

Leave a place for the iframe on the template.

```html
<div id="oc-viewer"></div>
```

Instantiate the plugin with the required params.

```javascript
const ocViewer = require("oc-viewer");

const viewer = new ocViewer({
  entryPoint: "#oc-viewer",
  contributionId: "your-contribution-id",
  policyId: "your-policy-id",
  authToken: "your-oc-token",
});
```
