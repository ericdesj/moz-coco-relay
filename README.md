# Coco Relay

Relay service for the Coco [tool](https://github.com/ericdesj/moz-codecover-ui).
 
mozilla_dxr?branch={BRANCH}&revision={REVSION}&path={path}

#### Make a request
You will need the following information from Mozilla hg: branch, revision and full path.

Query format: `mozilla_dxr?branch={BRANCH}revision={REVSION}path={path}`

#### Example:

Example for: https://hg.mozilla.org/integration/mozilla-inbound/file/722daec5cc3e/browser/components/downloads/content/contentAreaDownloadsView.js

https://still-scrubland-32510.herokuapp.com/mozilla_dxr?branch=integration/mozilla-inbound&revision=722daec5cc3e&path=/browser/components/downloads/content/contentAreaDownloadsView.js