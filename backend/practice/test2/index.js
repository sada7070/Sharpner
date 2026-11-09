const express = require("express");

const app = express();

// app.use(function(req, res, next) {
//     console.log("request received");
//     next();
// })

// app.get("/sum", function(req, res) {
//     const a = parseInt(req.query.a);
//     const b = parseInt(req.query.b);

//     res.json({
//         ans: a + b
//     })
// });

app.use(function(req, res, next) {
    const age = parseInt(req.query.age);
    if(age >= 18) {
        next();
    }
    else {
        res.json({
        message: "You are a minor"
        });
    }
});

app.get("/age", function(req, res) {
    const age = parseInt(req.query.age);

    res.json({
        message: "You are an adult"
    })
});

app.listen(3000);

