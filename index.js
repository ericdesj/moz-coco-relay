let express = require('express');
let request = require("request");
let cheerio = require('cheerio');

let app = express();
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.send("hg Mozilla relay service");
});

app.get('/mozilla_hg_raw/', function(req, res) {
    let hgBranch = req.query.branch;
    let hgRevision = req.query.revision;
    let hgPath = req.query.path;
    let uri = `https://hg.mozilla.org/${hgBranch}/raw-file/${hgRevision}/${hgPath}`;

    // mozilla_hg_raw?branch={BRANCH}&revision={REVSION}&path={path}
    request(uri, function(error, response, body) {
        res.send(body);
    });
})

app.get('/mozilla_hg/', function(req, res) {
    let hgBranch = req.query.branch;
    let hgRevision = req.query.revision;
    let hgPath = req.query.path;
    let uri = `https://hg.mozilla.org/${hgBranch}/file/${hgRevision}/${hgPath}`;

    // mozilla_hg?branch={BRANCH}&revision={REVSION}&path={path}
    request(uri, function(error, response, body) {
        let $ = cheerio.load(body);
        let code = $('div.page_body');
        res.send(code.html());
    });
})

app.get('/mozilla_hg_example/', function(req, res) {
    let hgBranch = req.query.branch;
    let hgRevision = req.query.revision;
    let hgPath = req.query.path;
    let uri = "https://hg.mozilla.org/integration/mozilla-inbound/file/722daec5cc3e/browser/components/downloads/content/contentAreaDownloadsView.js";

    // mozilla_hg_example/
    request(uri, function(error, response, body) {
        let $ = cheerio.load(body);
        let code = $('div.page_body');
        $('<link rel="stylesheet" type="text/css" href="stylesheets/style.css">').insertBefore('.sourcelines');
        res.send(code.html());
    });
})
app.listen(process.env.PORT || 5000);