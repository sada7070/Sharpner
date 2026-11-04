const express = require("express");

const app = express();

app.get("/sum", function(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a+b
    });
});

app.get("/multiply", function(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a*b
    });
});

app.get("/subtract", function(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a-b
    });
});

app.get("/divide", function(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    if(b != 0) {
        res.json({
            ans: a/b       
        });
    } else {
        console.log("Divider can not be zero");
    }
});

app.listen(3000);