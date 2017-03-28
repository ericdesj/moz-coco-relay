let express = require('express');
let request = require("request");
let cheerio = require('cheerio');

let app = express();
app.use(express.static(__dirname + '/public/'));

app.get('/', function(req, res) {
    res.send("hg Mozilla relay service");
});

/**
 * Get the raw file from the hg repository
 *
 */
app.get('/mozilla_hg_raw/', function(req, res) {
    let hgBranch = req.query.branch;
    let hgRevision = req.query.revision;
    let hgPath = req.query.path;
    let uri = `https://hg.mozilla.org/${hgBranch}/raw-file/${hgRevision}/${hgPath}`;

    // mozilla_hg_raw/?branch={BRANCH}&revision={REVSION}&path={path}
    request(uri, function(error, response, body) {
        res.send(body);
    });
});

/**
 * Get the formatted file from the hg repository
 *
 */
app.get('/mozilla_hg/', function(req, res) {
    let hgBranch = req.query.branch;
    let hgRevision = req.query.revision;
    let hgPath = req.query.path;
    let uri = `https://hg.mozilla.org/${hgBranch}/file/${hgRevision}/${hgPath}`;

    // mozilla_hg/?branch={BRANCH}&revision={REVSION}&path={path}
    request(uri, function(error, response, body) {
        let $ = cheerio.load(body);
        let code = $('div.page_body');
        res.send(code.html());
    });
});

/**
 * Example of the formatted hg code with css syntax highlight
 */
app.get('/mozilla_hg_example/', function(req, res) {
    let hgBranch = req.query.branch;
    let hgRevision = req.query.revision;
    let hgPath = req.query.path;
    let uri = "https://hg.mozilla.org/integration/mozilla-inbound/file/722daec5cc3e/browser/components/downloads/content/contentAreaDownloadsView.js";

    // mozilla_hg_example/
    request(uri, function(error, response, body) {
        let $ = cheerio.load(body);
        let code = $('div.page_body');
        $('<link rel="stylesheet" type="text/css" href="stylesheets/hgStyle.css">').insertBefore('.sourcelines');
        res.send(code.html());
    });
});

/**
 * Get the formatted file from the dxr repository.
 *
 * Issue #1: For raw source code, dxr points to hg which is problematic when we are looking for generated files
 *
 */
// app.get('/mozilla_dxr_raw/', function(req, res) {
//     let dxrBranch = req.query.branch;
//     let dxrRevision = req.query.revision;
//     let dxrPath = req.query.path;
//     let uri = `https://hg.mozilla.org/${dxrBranch}/raw-file/${dxrRevision}/${dxrPath}`;
//
//     // mozilla_dxr/?branch={BRANCH}&revision={REVSION}&path={path}
//     request(uri, function(error, response, body) {
//         let $ = cheerio.load(body);
//         let code = $('div.content');
//         res.send(code.html());
//     });
// });

/**
 * Get the formatted file from the dxr repository
 *
 */
app.get('/mozilla_dxr/', function(req, res) {
    let dxrBranch = req.query.branch;
    let dxrRevision = req.query.revision;
    let dxrPath = req.query.path;
    let uri = `https://dxr.mozilla.org/${dxrBranch}/rev/${dxrRevision}/${dxrPath}`;

    // mozilla_dxr/?branch={BRANCH}&revision={REVSION}&path={path}
    request(uri, function(error, response, body) {
        let $ = cheerio.load(body);
        let code = $('div.content');
        res.send(code.html());
    });
});

/**
 * Example of the formatted dxr code with css syntax highlight
 *
 */
app.get('/mozilla_dxr_example/', function(req, res) {
    let dxrBranch = req.query.branch;
    let dxrRevision = req.query.revision;
    let dxrPath = req.query.path;
    let uri = `https://dxr.mozilla.org/mozilla-central/rev/9577dde/browser/components/downloads/test/unit/head.js`;

    // mozilla_dxr/?branch={BRANCH}&revision={REVSION}&path={path}
    request(uri, function(error, response, body) {
        let $ = cheerio.load(body);
        let code = $('div.content');
        $('<link rel="stylesheet" type="text/css" href="stylesheets/dxrStyle.css">').insertBefore('.bubble');
        res.send(code.html());
    });
});
app.listen(process.env.PORT || 5000);