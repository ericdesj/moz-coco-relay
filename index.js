let express = require('express');
let request = require("request");

let app = express();

app.get('/mozilla_dxr/', function(req, res) {

    let hgBranch = req.query.branch;
    let hgRevision = req.query.revision;
    let hgPath = req.query.path;
    let uri = `https://hg.mozilla.org/${hgBranch}/raw-file/${hgRevision}/${hgPath}`;

    // https://hg.mozilla.org/mozilla-central/raw-file/3154da520af5/browser/base/content/test/alerts/browser_notification_close.js
    //mozilla_dxr?branch=mozilla-central&revision=3154da520af5&path=browser/base/content/test/alerts/browser_notification_close.js

    request(uri, function(error, response, body) {
        res.send(body);
    });

    // res.send("tagId is set to " + req.query.tagId);
})

app.listen(5000);