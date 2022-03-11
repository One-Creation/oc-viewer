# oc-viewer

One Creation Viewer module

## Install

npm install oc-viewer

## Usage

```html
<div id="oc-viewer"></div>
```

```javascript
const ocViewer = require("oc-viewer");

const viewer = new ocViewer({
  entryPoint: "#oc-viewer",
  contributionId: "your-contribution-id",
  policyId: "your-policy-id",
  authToken: "your-oc-token",
});
```
