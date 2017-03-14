let express = require('express');
let request = require("request");

let app = express();

app.get('/', function(req, res) {
    res.send("hg Mozilla relay service");
});

app.get('/mozilla_dxr/', function(req, res) {
    let hgBranch = req.query.branch;
    let hgRevision = req.query.revision;
    let hgPath = req.query.path;
    let uri = `https://hg.mozilla.org/${hgBranch}/raw-file/${hgRevision}/${hgPath}`;

    // mozilla_dxr?branch={BRANCH}&revision={REVSION}&path={path}
    request(uri, function(error, response, body) {
        res.send(body);
    });
})
app.listen(process.env.PORT || 5000);