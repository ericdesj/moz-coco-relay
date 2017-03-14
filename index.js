let express = require('express');
let request = require("request");
let cheerio = require('cheerio');

let app = express();

// TODO: make import for the CSS
let css = "/* pygments_style = colorful */" +
".hll { background-color: #ffffcc }" +
".c { color: #888888 } /* Comment */" +
".err { color: #FF0000; background-color: #FFAAAA } /* Error */" +
".k { color: #008800; font-weight: bold } /* Keyword */" +
".o { color: #333333 } /* Operator */" +
".ch { color: #888888 } /* Comment.Hashbang */" +
".cm { color: #888888 } /* Comment.Multiline */" +
".cp { color: #557799 } /* Comment.Preproc */" +
".cpf { color: #888888 } /* Comment.PreprocFile */" +
".c1 { color: #888888 } /* Comment.Single */" +
".cs { color: #cc0000; font-weight: bold } /* Comment.Special */" +
".gd { color: #A00000 } /* Generic.Deleted */" +
".ge { font-style: italic } /* Generic.Emph */" +
".gr { color: #FF0000 } /* Generic.Error */" +
".gh { color: #000080; font-weight: bold } /* Generic.Heading */" +
".gi { color: #00A000 } /* Generic.Inserted */" +
".go { color: #888888 } /* Generic.Output */" +
".gp { color: #c65d09; font-weight: bold } /* Generic.Prompt */" +
".gs { font-weight: bold } /* Generic.Strong */" +
".gu { color: #800080; font-weight: bold } /* Generic.Subheading */" +
".gt { color: #0044DD } /* Generic.Traceback */" +
".kc { color: #008800; font-weight: bold } /* Keyword.Constant */" +
".kd { color: #008800; font-weight: bold } /* Keyword.Declaration */" +
".kn { color: #008800; font-weight: bold } /* Keyword.Namespace */" +
".kp { color: #003388; font-weight: bold } /* Keyword.Pseudo */" +
".kr { color: #008800; font-weight: bold } /* Keyword.Reserved */" +
".kt { color: #333399; font-weight: bold } /* Keyword.Type */" +
".m { color: #6600EE; font-weight: bold } /* Literal.Number */" +
".s { background-color: #fff0f0 } /* Literal.String */" +
".na { color: #0000CC } /* Name.Attribute */" +
".nb { color: #007020 } /* Name.Builtin */" +
".nc { color: #BB0066; font-weight: bold } /* Name.Class */" +
".no { color: #003366; font-weight: bold } /* Name.Constant */" +
".nd { color: #555555; font-weight: bold } /* Name.Decorator */" +
".ni { color: #880000; font-weight: bold } /* Name.Entity */" +
".ne { color: #FF0000; font-weight: bold } /* Name.Exception */" +
".nf { color: #0066BB; font-weight: bold } /* Name.Function */" +
".nl { color: #997700; font-weight: bold } /* Name.Label */" +
".nn { color: #0e84b5; font-weight: bold } /* Name.Namespace */" +
".nt { color: #007700 } /* Name.Tag */" +
".nv { color: #996633 } /* Name.Variable */" +
".ow { color: #000000; font-weight: bold } /* Operator.Word */" +
".w { color: #bbbbbb } /* Text.Whitespace */" +
".mb { color: #6600EE; font-weight: bold } /* Literal.Number.Bin */" +
".mf { color: #6600EE; font-weight: bold } /* Literal.Number.Float */" +
".mh { color: #005588; font-weight: bold } /* Literal.Number.Hex */" +
".mi { color: #0000DD; font-weight: bold } /* Literal.Number.Integer */" +
".mo { color: #4400EE; font-weight: bold } /* Literal.Number.Oct */" +
".sb { background-color: #fff0f0 } /* Literal.String.Backtick */" +
".sc { color: #0044DD } /* Literal.String.Char */" +
".sd { color: #DD4422 } /* Literal.String.Doc */" +
".s2 { background-color: #fff0f0 } /* Literal.String.Double */" +
".se { color: #666666; font-weight: bold; background-color: #fff0f0 } /* Literal.String.Escape */" +
".sh { background-color: #fff0f0 } /* Literal.String.Heredoc */" +
".si { background-color: #eeeeee } /* Literal.String.Interpol */" +
".sx { color: #DD2200; background-color: #fff0f0 } /* Literal.String.Other */" +
".sr { color: #000000; background-color: #fff0ff } /* Literal.String.Regex */" +
".s1 { background-color: #fff0f0 } /* Literal.String.Single */" +
".ss { color: #AA6600 } /* Literal.String.Symbol */" +
".bp { color: #007020 } /* Name.Builtin.Pseudo */" +
".vc { color: #336699 } /* Name.Variable.Class */" +
".vg { color: #dd7700; font-weight: bold } /* Name.Variable.Global */" +
".vi { color: #3333BB } /* Name.Variable.Instance */" +
".il { color: #0000DD; font-weight: bold } /* Literal.Number.Integer.Long */";


app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.send("hg Mozilla relay service");
});

// TODO: change dxr to hg
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

// TODO: create new endpoint without CSS
app.get('/mozilla_styled/', function(req, res) {
    let hgBranch = req.query.branch;
    let hgRevision = req.query.revision;
    let hgPath = req.query.path;
    let uri = "https://hg.mozilla.org/integration/mozilla-inbound/file/722daec5cc3e/browser/components/downloads/content/contentAreaDownloadsView.js";

    // mozilla_dxr?branch={BRANCH}&revision={REVSION}&path={path}
    request(uri, function(error, response, body) {

        let $ = cheerio.load(body);
        let code = $('div.page_body');
        // $('<style>'+ css +'</style>').insertBefore('.sourcelines');
        $('<link rel="stylesheet" type="text/css" href="stylesheets/style.css">').insertBefore('.sourcelines');

        res.send(code.html());
    });
})
app.listen(process.env.PORT || 5000);