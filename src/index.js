const express = require('express');

const app = express();

app.use(express.json());

app.get("/", (req,res) => {
    return res.send({message: "O app está ok"})
})

app.listen(3000);