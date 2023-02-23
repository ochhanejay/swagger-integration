const express = require("express");
const swaggerUi = require('swagger-ui-express');
const cors = require("cors");
const path = require("path");

const app = express();
const userRouter = require("./routes/routes");
const categoryRouter = require("./routes/expenseRoutes");
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));

// app.get("/", (req, res) =>
// {console.log("server stareddddd");
//   res.json({ success: true, message: "server is running!" })}
// );
app.use(express.static(path.join(__dirname + "/public")));
app.all('/login', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});
app.all('/expenses', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});
app.all('/monthly', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});
app.use("/api", userRouter);
app.use("/api", categoryRouter);

module.exports = app;
