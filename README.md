# Coco Relay

Relay service for the Coco [tool](https://github.com/ericdesj/moz-codecover-ui).

Deploy your own copy of _Coco Relay_ with Heroku.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
 
#### Make a request
You will need the following information from Mozilla hg: branch, revision and full path.

- Query format (raw): `mozilla_hg_raw?branch={BRANCH}?revision={REVSION}?path={path}`
- Query format (html): `mozilla_hg?branch={BRANCH}?revision={REVSION}?path={path}`

#### Example:
* https://still-scrubland-32510.herokuapp.com/mozilla_hg_example
* https://still-scrubland-32510.herokuapp.com/mozilla_hg?branch=integration/mozilla-inbound/&revision=722daec5cc3e&path=browser/components/downloads/content/contentAreaDownloadsView.js
